#!/usr/bin/env python3
"""Fetch split-aware entry/as-of prices and write src/lib/data/hold-quotes.json.

Living names: Yahoo Finance chart API (close is split-adjusted to today).
Delisted names: Sharadar prints via exa.ai, then a documented cash or stock terminal.
As-of prices are the latest session close; rerunning on the same New York date
reuses cached history and only refreshes the as-of print.
"""

from __future__ import annotations

import json
import re
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/lib/data/hold-quotes.json"
UA = {"User-Agent": "Mozilla/5.0 (compatible; 100x-hold-quotes/1.0)"}
NY = ZoneInfo("America/New_York")

ENTRY_DATES = {
    2000: "2000-01-03",
    2003: "2003-01-02",
    2007: "2007-01-03",
    2008: "2008-01-02",
    2009: "2009-01-02",
    2012: "2012-01-03",
    2013: "2013-01-02",
    2016: "2016-01-04",
    2019: "2019-01-02",
    2020: "2020-01-02",
    2022: "2022-01-03",
    2023: "2023-01-03",
}

# Yahoo symbol when it differs from the game ticker.
YAHOO_SYMBOL = {
    "BRK": "BRK-B",  # Class B so a $2,000 lot is a real number of shares
    "FB": "META",
    "GOOG": "GOOG",
    "MOT": "MSI",  # Motorola Inc. continuing company after the 2011 split-up
    "BK": "BNY",  # ticker changed from BK to BNY
}

# Sharadar / exa.ai symbol for names Yahoo no longer carries.
EXA_SYMBOL = {
    "EA": "EA",
    "YHOO": "YHOO",
    "MER": "MER",
    "DELL": "DELL1",
    "LEH": "LEHMQ",
    "SUNW": "JAVA1",
    "EMC": "EMC1",
    "CPQ": "CPQ",
    "LU": "LU1",
    "WCOM": "WCOEQ",
    "WAMU": "WAMUQ",
    "WBA": "WBA",
}

ZERO_EQUITY = {
    "LEH": "Lehman Brothers filed for bankruptcy on 15 Sep 2008; common equity was cancelled.",
    "WCOM": "WorldCom filed for bankruptcy in 2002; common equity was cancelled.",
    "WAMU": "Washington Mutual was seized in Sep 2008; common equity was cancelled.",
}

# Cash per then-outstanding share at delisting / takeout.
CASH_TERMINAL = {
    "EA": {
        "cash": 209.70,
        "note": "Electronic Arts went private in 2026; last listed close used as the cash terminal.",
    },
    "SUNW": {
        "cash": 9.50,
        "note": "Oracle closed the Sun Microsystems cash acquisition at $9.50/share on 27 Jan 2010.",
    },
    "EMC": {
        "cash": 33.11,
        "note": "Dell/EMC 2016: $24.05 cash + 0.111 DVMT tracking share, later bought out near $82 ($24.05 + 0.111*82).",
    },
    "YHOO": {
        "cash": 73.88,
        "note": "Altaba cash: $51.50 pre-dissolution (Sep 2019) plus post-dissolution distributions through May 2025 totaling $22.38.",
    },
    "WBA": {
        "cash": 11.45,
        "note": "Sycamore Partners took Walgreens Boots Alliance private on 28 Aug 2025 at $11.45/share cash. Contingent VillageMD rights (up to $3) are excluded.",
    },
    "AOL": {
        "cash": 50.00,
        "note": "Independent AOL (post-2009 spin) was acquired by Verizon at $50/share in 2015. 2000-07 AOL/TWX path uses this only for the 2009-15 stub when no better series exists.",
    },
}

# Stock-for-stock: game ticker becomes ratio shares of acquirer (Yahoo symbol).
STOCK_TERMINAL = {
    "MER": {
        "acquirer": "BAC",
        "ratio": 0.8595,
        "note": "Bank of America closed the Merrill Lynch merger on 1 Jan 2009 at 0.8595 BAC per MER.",
    },
    "CPQ": {
        "acquirer": "HPQ",
        "ratio": 0.6325,
        "note": "HP closed the Compaq merger on 3 May 2002 at 0.6325 HPQ per CPQ.",
    },
    "LU": {
        "acquirer": "NOK",
        "ratio": 0.1952 * 0.55,
        "note": "Lucent → 0.1952 Alcatel ADS (Nov 2006) → 0.5500 Nokia (2016), or 0.10736 NOK per original Lucent share.",
    },
}

# Old Dell was taken private at $13.75; the current DELL listing is a different security.
DELL_LBO_CASH = 13.75
DELL_RELIST_YEAR = 2019

AOL_2000_FALLBACK = {
    "rawClose": 73.75,
    "sessionDate": "2000-01-07",
    "note": "CNN Moneyline reported AOL's Friday close at 73 3/4 the week of the Time Warner announcement; Sharadar AOL prints were unavailable.",
}


def ny_today() -> str:
    return datetime.now(NY).date().isoformat()


def parse_day(value: str) -> datetime:
    return datetime.strptime(value, "%Y-%m-%d").replace(tzinfo=timezone.utc)


def load_existing() -> dict:
    if OUT.exists():
        return json.loads(OUT.read_text())
    return {}


def http_json(url: str, retries: int = 4) -> dict | None:
    delay = 0.4
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=30) as response:
                return json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as err:
            if err.code in {404}:
                return None
            if err.code in {400, 429, 500, 502, 503} and attempt < retries - 1:
                time.sleep(delay)
                delay *= 2
                continue
            print(f"  HTTP {err.code} {url}")
            return None
        except Exception as err:  # noqa: BLE001
            if attempt < retries - 1:
                time.sleep(delay)
                delay *= 2
                continue
            print(f"  {type(err).__name__} {url}")
            return None
    return None


def http_text(url: str) -> str | None:
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=30) as response:
            return response.read().decode("utf-8", "replace")
    except Exception:  # noqa: BLE001
        return None


def yahoo_symbol(ticker: str) -> str:
    return YAHOO_SYMBOL.get(ticker, ticker)


def fetch_yahoo_series(symbol: str, start: str) -> dict | None:
    p1 = int(parse_day(start).timestamp()) - 20 * 86400
    p2 = int(datetime.now(timezone.utc).timestamp()) + 86400
    url = (
        "https://query1.finance.yahoo.com/v8/finance/chart/"
        f"{symbol}?period1={p1}&period2={p2}&interval=1d&events=div%2Csplit"
    )
    payload = http_json(url)
    if not payload:
        return None
    result = (payload.get("chart") or {}).get("result")
    if not result:
        return None
    row = result[0]
    stamps = row.get("timestamp") or []
    closes = (row.get("indicators") or {}).get("quote", [{}])[0].get("close") or []
    bars = []
    for stamp, close in zip(stamps, closes):
        if close is None:
            continue
        day = datetime.fromtimestamp(stamp, timezone.utc).date().isoformat()
        bars.append((day, float(close)))
    splits = []
    for item in ((row.get("events") or {}).get("splits") or {}).values():
        splits.append(
            {
                "date": datetime.fromtimestamp(item["date"], timezone.utc).date().isoformat(),
                "factor": float(item["numerator"]) / float(item["denominator"]),
            }
        )
    meta = row.get("meta") or {}
    last = bars[-1] if bars else None
    as_of_close = meta.get("regularMarketPrice")
    as_of_date = last[0] if last else None
    if as_of_close is None and last:
        as_of_close = last[1]
    return {
        "bars": bars,
        "splits": splits,
        "asOfClose": float(as_of_close) if as_of_close is not None else None,
        "asOfDate": as_of_date,
        "currency": meta.get("currency"),
    }


def split_factor_after(splits: list[dict], session_date: str) -> float:
    factor = 1.0
    for split in splits:
        if split["date"] > session_date:
            factor *= split["factor"]
    return factor


def session_on_or_before(bars: list[tuple[str, float]], target: str) -> tuple[str, float] | None:
    chosen = None
    for day, close in bars:
        if day <= target:
            chosen = (day, close)
        else:
            break
    if chosen and (parse_day(target) - parse_day(chosen[0])).days <= 10:
        return chosen
    return None


def fetch_exa_close(symbol: str, day: str) -> float | None:
    html = http_text(f"https://exa.ai/library/markets/stocks/{symbol}?date={day}")
    if not html:
        return None
    match = re.search(r"closed at ([0-9]+(?:\.[0-9]+)?)", html, re.I)
    dated = re.search(r"Stock Price on ([0-9]{4}-[0-9]{2}-[0-9]{2})", html)
    if not match:
        return None
    if dated and dated.group(1) != day:
        # Page fell through to a generic quote.
        if "closed at" not in html.lower()[:8000]:
            return None
    return float(match.group(1))


def universe_pairs() -> dict[str, list[int]]:
    # Import from a tiny node dump so we stay aligned with YEAR_UNIVERSE.
    import subprocess

    script = r"""
import { YEAR_UNIVERSE } from "./src/lib/data/universe.ts";
const map = {};
for (const [year, rows] of Object.entries(YEAR_UNIVERSE)) {
  for (const row of rows) {
    const t = row[0];
    (map[t] ||= []).push(Number(year));
  }
}
console.log(JSON.stringify(map));
"""
    raw = subprocess.check_output(
        ["npx", "tsx", "-e", script],
        cwd=ROOT,
        text=True,
    )
    return json.loads(raw.strip().splitlines()[-1])


def round_price(value: float) -> float:
    if value <= 0:
        return 0.0
    if value >= 1000:
        return round(value, 2)
    if value >= 1:
        return round(value, 4)
    return round(value, 6)


def round_multiple(value: float) -> float:
    if value <= 0:
        return 0.0
    if value >= 100:
        return round(value, 2)
    if value >= 10:
        return round(value, 3)
    return round(value, 4)


def main() -> None:
    existing = load_existing()
    as_of_today = ny_today()
    pairs = universe_pairs()
    tickers = sorted(pairs)
    quotes: dict[str, dict] = existing.get("quotes", {})
    yahoo_cache: dict[str, dict] = {}

    def yahoo(symbol: str, start: str) -> dict | None:
        if symbol not in yahoo_cache:
            print(f"yahoo {symbol}")
            yahoo_cache[symbol] = fetch_yahoo_series(symbol, start)
            time.sleep(0.12)
        return yahoo_cache[symbol]

    for ticker in tickers:
        years = pairs[ticker]
        start = min(ENTRY_DATES[y] for y in years)
        symbol = yahoo_symbol(ticker)
        series = None
        use_old_dell = ticker == "DELL" and min(years) < DELL_RELIST_YEAR
        if ticker != "AOL" and (ticker not in EXA_SYMBOL or ticker == "DELL"):
            series = yahoo(symbol, start if ticker != "DELL" else "2016-09-01")

        entry_map: dict[str, dict] = {}
        as_of_close = series["asOfClose"] if series else None
        as_of_date = series["asOfDate"] if series else as_of_today

        for year in years:
            target = ENTRY_DATES[year]
            record = None

            if ticker == "DELL" and year < DELL_RELIST_YEAR:
                raw = fetch_exa_close("DELL1", target)
                time.sleep(0.08)
                if raw is None:
                    print(f"  missing DELL1 {target}")
                    continue
                multiple = DELL_LBO_CASH / raw
                record = {
                    "entryDate": target,
                    "sessionDate": target,
                    "splitAdjClose": raw,
                    "rawClose": raw,
                    "splitFactorAfter": 1,
                    "asOfClose": DELL_LBO_CASH,
                    "asOfDate": "2013-10-29",
                    "multiple": round_multiple(multiple),
                    "terminal": f"Dell LBO cash-out at ${DELL_LBO_CASH:.2f}/share (Oct 2013). Later DELL listing is a different security.",
                }
            elif ticker in ZERO_EQUITY:
                raw = fetch_exa_close(EXA_SYMBOL[ticker], target)
                time.sleep(0.08)
                if raw is None:
                    print(f"  missing {ticker} {target}")
                    continue
                record = {
                    "entryDate": target,
                    "sessionDate": target,
                    "splitAdjClose": raw,
                    "rawClose": raw,
                    "splitFactorAfter": 1,
                    "asOfClose": 0,
                    "asOfDate": as_of_today,
                    "multiple": 0,
                    "terminal": ZERO_EQUITY[ticker],
                }
            elif ticker in CASH_TERMINAL and ticker not in {"AOL"}:
                raw = fetch_exa_close(EXA_SYMBOL[ticker], target)
                time.sleep(0.08)
                if raw is None:
                    print(f"  missing {ticker} {target}")
                    continue
                cash = CASH_TERMINAL[ticker]["cash"]
                record = {
                    "entryDate": target,
                    "sessionDate": target,
                    "splitAdjClose": raw,
                    "rawClose": raw,
                    "splitFactorAfter": 1,
                    "asOfClose": cash,
                    "asOfDate": as_of_today,
                    "multiple": round_multiple(cash / raw),
                    "terminal": CASH_TERMINAL[ticker]["note"],
                }
            elif ticker in STOCK_TERMINAL:
                raw = fetch_exa_close(EXA_SYMBOL[ticker], target)
                time.sleep(0.08)
                info = STOCK_TERMINAL[ticker]
                acquirer = yahoo(info["acquirer"], "1999-12-01")
                if raw is None or not acquirer or not acquirer["asOfClose"]:
                    print(f"  missing stock terminal {ticker} {target}")
                    continue
                as_of_close = acquirer["asOfClose"]
                as_of_date = acquirer["asOfDate"]
                multiple = info["ratio"] * as_of_close / raw
                record = {
                    "entryDate": target,
                    "sessionDate": target,
                    "splitAdjClose": raw,
                    "rawClose": raw,
                    "splitFactorAfter": 1,
                    "asOfClose": round_price(info["ratio"] * as_of_close),
                    "asOfDate": as_of_date,
                    "multiple": round_multiple(multiple),
                    "terminal": info["note"],
                }
            elif ticker == "AOL":
                if year == 2000:
                    raw = AOL_2000_FALLBACK["rawClose"]
                    session = AOL_2000_FALLBACK["sessionDate"]
                    note = AOL_2000_FALLBACK["note"] + " " + CASH_TERMINAL["AOL"]["note"]
                else:
                    raw = fetch_exa_close("TWX", target)
                    time.sleep(0.08)
                    session = target
                    note = (
                        "2003-07 listings used Time Warner (TWX) after the AOL merger. "
                        "Terminal is the later independent-AOL Verizon takeout at $50, "
                        "which understates a holder who also kept the Time Warner stub."
                    )
                if raw is None:
                    print(f"  missing AOL {target}")
                    continue
                cash = CASH_TERMINAL["AOL"]["cash"]
                # 2009 1-for-3 TW reverse split, then 1 AOL per 20 TWX at the spin.
                spun_aol = (1 / 3) / 20 if year <= 2007 else 1
                terminal = cash * spun_aol
                as_of_close = terminal
                as_of_date = "2015-06-23"
                record = {
                    "entryDate": target,
                    "sessionDate": session,
                    "splitAdjClose": raw,
                    "rawClose": raw,
                    "splitFactorAfter": 1,
                    "asOfClose": round_price(terminal),
                    "asOfDate": "2015-06-23",
                    "multiple": round_multiple(terminal / raw),
                    "terminal": note,
                }
            else:
                if not series:
                    print(f"  no yahoo series {ticker}")
                    continue
                hit = session_on_or_before(series["bars"], target)
                if not hit:
                    print(f"  no session {ticker} {target}")
                    continue
                session_date, split_adj = hit
                factor = split_factor_after(series["splits"], session_date)
                raw = split_adj * factor
                as_of_close = series["asOfClose"]
                as_of_date = series["asOfDate"]
                multiple = 0 if not split_adj else as_of_close / split_adj
                record = {
                    "entryDate": target,
                    "sessionDate": session_date,
                    "splitAdjClose": round_price(split_adj),
                    "rawClose": round_price(raw),
                    "splitFactorAfter": round(factor, 6),
                    "asOfClose": round_price(as_of_close),
                    "asOfDate": as_of_date,
                    "multiple": round_multiple(multiple),
                    "terminal": None,
                }

            entry_map[str(year)] = record

        for key, prior in (quotes.get(ticker) or {}).get("entries", {}).items():
            if key not in entry_map:
                entry_map[key] = prior

        quotes[ticker] = {
            "yahoo": symbol,
            "asOfClose": round_price(as_of_close) if as_of_close else 0,
            "asOfDate": as_of_date,
            "entries": entry_map,
        }

    missing = []
    for ticker, years in pairs.items():
        have = quotes.get(ticker, {}).get("entries", {})
        for year in years:
            if str(year) not in have:
                missing.append(f"{ticker}:{year}")

    payload = {
        "source": "Yahoo Finance v8 chart API for listed names; Sharadar prints via exa.ai for delisted names; SEC-documented cash/stock terminals where the listing ended.",
        "asOfDate": as_of_today,
        "fetchedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "methodology": "Hold multiple is split-adjusted close on the entry session divided into the as-of close (price return, splits included, dividends not reinvested). Tape/raw close is the split-adjusted print times the product of splits after that session — the price an investor saw on the screen that day.",
        "missing": missing,
        "quotes": quotes,
    }
    OUT.write_text(json.dumps(payload, indent=2) + "\n")
    print(f"wrote {OUT} tickers={len(quotes)} missing={len(missing)}")
    for item in missing:
        print("  MISSING", item)


if __name__ == "__main__":
    main()
