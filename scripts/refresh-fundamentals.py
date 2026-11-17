#!/usr/bin/env python3
"""Fetch point-in-time card fundamentals from FMP Premium and write fundamentals.json.

Market cap: FMP historical market cap on the entry session (or last session before).
Income: last annual statement whose filing date is on or before entry.
  Fallback: last fiscal period ended on or before entry when filingDate is missing.
Growth / margin / P/E are computed from that statement and the prior annual.
PRIOR: split-adjusted FMP close on entry vs ~365 calendar days earlier.

Delisted names FMP does not carry (YHOO, LEH, AOL, …) stay missing — never invented.
SUNW and LU are skipped: those live tickers are different companies.
"""

from __future__ import annotations

import json
import os
import re
import sys
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/lib/data/fundamentals.json"
CACHE = ROOT / "node_modules/.cache/fmp"
CACHE_LOCK = threading.Lock()
UA = {"User-Agent": "100x-fundamentals/1.0"}

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

# Game ticker -> FMP symbol when the economic entity still exists under a new code.
FMP_SYMBOL = {
    "BRK": "BRK-B",
    "FB": "META",
    "MOT": "MSI",
    "BK": "BNY",
}

# Live tickers that reused a dead name. Do not query; FMP would return the wrong company.
BLOCKED = {"SUNW", "LU"}

PRICE_LOOKBACK_DAYS = 400
MCAP_PAD_BEFORE = 14
MCAP_PAD_AFTER = 5


def load_key() -> str:
    env = os.environ.get("FMP_API_KEY")
    if env:
        return env.strip().strip('"')
    path = ROOT / ".env.local"
    if path.exists():
        for line in path.read_text().splitlines():
            if line.startswith("FMP_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("FMP_API_KEY missing from environment or .env.local")


def catalog_tickers() -> list[str]:
    catalog = (ROOT / "src/lib/data/catalog.ts").read_text()
    extra = (ROOT / "src/lib/data/catalog-extra.ts").read_text()
    tickers = set(re.findall(r"^  ([A-Z]{1,5}): \{", catalog, re.M))
    tickers |= set(re.findall(r'\["([A-Z0-9]{1,5})",', extra))
    return sorted(tickers)


def fmp_symbol(ticker: str) -> str | None:
    if ticker in BLOCKED:
        return None
    return FMP_SYMBOL.get(ticker, ticker)


def fetch(key: str, path: str, params: dict[str, str]) -> object:
    q = dict(params)
    q["apikey"] = key
    url = "https://financialmodelingprep.com" + path + "?" + urllib.parse.urlencode(q)
    req = urllib.request.Request(url, headers=UA)
    last_err: Exception | None = None
    for attempt in range(6):
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                raw = resp.read().decode("utf-8", "replace")
                return json.loads(raw) if raw else []
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", "replace")
            if exc.code in {429, 500, 502, 503} and attempt < 5:
                time.sleep(1.5 * (attempt + 1))
                last_err = exc
                continue
            try:
                parsed = json.loads(body)
            except Exception:
                parsed = {"Error Message": body[:300], "status": exc.code}
            return parsed
        except Exception as exc:
            last_err = exc
            time.sleep(1.5 * (attempt + 1))
    return {"Error Message": str(last_err)}


def is_error(data: object) -> str | None:
    if isinstance(data, dict):
        return data.get("Error Message") or data.get("error") or data.get("message")
    return None


def cache_path(kind: str, symbol: str) -> Path:
    folder = CACHE / kind
    folder.mkdir(parents=True, exist_ok=True)
    return folder / f"{symbol.replace('/', '_')}.json"


def load_cache(kind: str, symbol: str) -> object | None:
    path = cache_path(kind, symbol)
    with CACHE_LOCK:
        if path.exists():
            return json.loads(path.read_text())
    return None


def save_cache(kind: str, symbol: str, data: object) -> None:
    with CACHE_LOCK:
        cache_path(kind, symbol).write_text(json.dumps(data))


def cached_fetch(key: str, kind: str, symbol: str, path: str, params: dict[str, str], force: bool) -> object:
    if not force:
        hit = load_cache(kind, symbol)
        if hit is not None:
            return hit
    data = fetch(key, path, params)
    err = is_error(data)
    if err:
        return data
    save_cache(kind, symbol, data)
    time.sleep(0.05)
    return data


def fetch_range(
    key: str,
    kind: str,
    symbol: str,
    year: int,
    endpoint: str,
    start: str,
    end: str,
    force: bool,
) -> list[dict]:
    cache_key = f"{symbol}-{year}"
    if not force:
        hit = load_cache(kind, cache_key)
        if isinstance(hit, list):
            return hit
    data = fetch(key, endpoint, {"symbol": symbol, "from": start, "to": end})
    err = is_error(data)
    if err:
        print(f"  WARN {kind} {symbol} {year} {err[:120]}", flush=True)
        if "not available" in err.lower() or "limit" in err.lower():
            save_cache(kind, cache_key, [])
        time.sleep(0.2)
        return []
    rows = data if isinstance(data, list) else []
    save_cache(kind, cache_key, rows)
    time.sleep(0.02)
    return rows


def iso(value: object) -> str | None:
    if not value:
        return None
    text = str(value)[:10]
    if re.match(r"^\d{4}-\d{2}-\d{2}$", text):
        return text
    return None


def pick_on_or_before(rows: list[dict], field: str, target: str) -> dict | None:
    prior = [r for r in rows if iso(r.get("date")) and iso(r.get("date")) <= target]
    if prior:
        return max(prior, key=lambda r: iso(r.get("date")) or "")
    later = [r for r in rows if iso(r.get("date")) and iso(r.get("date")) <= add_days(target, 5)]
    if later:
        return min(later, key=lambda r: iso(r.get("date")) or "")
    return None


def add_days(date: str, days: int) -> str:
    dt = datetime.strptime(date, "%Y-%m-%d")
    return (dt + timedelta(days=days)).strftime("%Y-%m-%d")


def pick_statements(rows: list[dict], entry: str) -> tuple[dict | None, dict | None]:
    eligible: list[tuple[str, str, dict]] = []
    for row in rows:
        if not isinstance(row, dict):
            continue
        period = iso(row.get("date"))
        filed = iso(row.get("filingDate") or row.get("fillingDate"))
        cutoff = filed or period
        if period and cutoff and cutoff <= entry:
            eligible.append((cutoff, period, row))
    if not eligible:
        return None, None
    eligible.sort(key=lambda item: (item[0], item[1]), reverse=True)
    current = eligible[0][2]
    current_period = eligible[0][1]
    prior = None
    for _cutoff, period, row in eligible[1:]:
        if period < current_period:
            prior = row
            break
    return current, prior


def num(row: dict | None, *keys: str) -> float | None:
    if not row:
        return None
    for key in keys:
        value = row.get(key)
        if isinstance(value, (int, float)) and value == value:
            return float(value)
    return None


def ratio(num_value: float | None, den_value: float | None) -> float | None:
    if num_value is None or den_value is None or den_value == 0:
        return None
    return num_value / den_value


def close_of(row: dict | None) -> float | None:
    if not row:
        return None
    for key in ("adjClose", "close", "price"):
        value = row.get(key)
        if isinstance(value, (int, float)) and value == value and value > 0:
            return float(value)
    return None


def main() -> None:
    force = "--fresh" in sys.argv
    key = load_key()
    tickers = catalog_tickers()
    CACHE.mkdir(parents=True, exist_ok=True)

    entries: dict[str, dict[str, dict]] = {}
    missing: list[dict[str, str]] = []

    for i, ticker in enumerate(tickers, 1):
        symbol = fmp_symbol(ticker)
        print(f"[{i}/{len(tickers)}] {ticker} -> {symbol or 'SKIP'}", flush=True)
        if symbol is None:
            for year in ENTRY_DATES:
                missing.append({"ticker": ticker, "year": str(year), "reason": "blocked-ticker-reuse"})
            continue

        income = cached_fetch(
            key,
            "income",
            symbol,
            "/stable/income-statement",
            {"symbol": symbol, "period": "annual", "limit": "40"},
            force,
        )
        if is_error(income):
            print(f"  income error: {is_error(income)[:160]}", flush=True)
            income = []
        if not isinstance(income, list):
            income = []

        by_year: dict[str, dict] = {}

        def year_series(year: int, entry: str) -> tuple[int, str, list[dict], list[dict]]:
            mcaps = fetch_range(
                key,
                "mcap",
                symbol,
                year,
                "/stable/historical-market-capitalization",
                add_days(entry, -MCAP_PAD_BEFORE),
                add_days(entry, MCAP_PAD_AFTER),
                force,
            )
            prices = fetch_range(
                key,
                "price",
                symbol,
                year,
                "/stable/historical-price-eod/full",
                add_days(entry, -PRICE_LOOKBACK_DAYS),
                entry,
                force,
            )
            return year, entry, mcaps, prices

        series: list[tuple[int, str, list[dict], list[dict]]] = []
        with ThreadPoolExecutor(max_workers=8) as pool:
            futs = [
                pool.submit(year_series, year, entry) for year, entry in ENTRY_DATES.items()
            ]
            for fut in futs:
                series.append(fut.result())

        for year, entry, mcaps, prices in series:
            stmt, prior = pick_statements(income, entry)
            mcap_row = pick_on_or_before(mcaps, "marketCap", entry)
            px_entry = pick_on_or_before(prices, "close", entry)
            px_prior = pick_on_or_before(prices, "close", add_days(entry, -365))

            revenue = num(stmt, "revenue")
            prior_rev = num(prior, "revenue")
            net_income = num(stmt, "netIncome")
            market_cap = num(mcap_row, "marketCap")
            growth = None
            if revenue and prior_rev and prior_rev != 0:
                growth = revenue / prior_rev - 1
            if revenue is not None and revenue <= 0:
                revenue = None
                growth = None

            margin = ratio(net_income, revenue) if revenue else None
            pe = ratio(market_cap, net_income) if net_income and net_income > 0 else None
            if pe is not None and (pe <= 0 or pe > 400):
                pe = None

            entry_px = close_of(px_entry)
            prior_px = close_of(px_prior)
            trail = None
            if entry_px and prior_px and px_entry is not px_prior:
                trail = entry_px / prior_px - 1

            snapshot = {
                "fmp": symbol,
                "entryDate": entry,
                "marketCap": round(market_cap, 0) if market_cap else None,
                "marketCapDate": iso(mcap_row.get("date")) if mcap_row else None,
                "revenue": round(revenue, 0) if revenue else None,
                "revenueGrowth": round(growth, 6) if growth is not None else None,
                "netMargin": round(margin, 6) if margin is not None else None,
                "peRatio": round(pe, 2) if pe is not None else None,
                "trailingReturn": round(trail, 6) if trail is not None else None,
                "fiscalDate": iso(stmt.get("date")) if stmt else None,
                "filingDate": iso(stmt.get("filingDate") or stmt.get("fillingDate")) if stmt else None,
                "netIncome": round(net_income, 0) if net_income is not None else None,
            }
            by_year[str(year)] = snapshot
            holes = [
                name
                for name in ("marketCap", "revenue", "revenueGrowth", "netMargin", "peRatio", "trailingReturn")
                if snapshot[name] is None
            ]
            if holes:
                missing.append(
                    {"ticker": ticker, "year": str(year), "reason": ",".join(holes)}
                )
        entries[ticker] = by_year

    payload = {
        "source": "Financial Modeling Prep stable API (Premium)",
        "fetchedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "methodology": (
            "Market cap is FMP historical market capitalization on the entry session "
            "(last session on or before that date). Revenue, growth, net margin, and P/E "
            "use the last annual income statement with a filing date on or before entry "
            "(fiscal period end if filingDate is missing). P/E is entry market cap divided "
            "by that year's net income. PRIOR is the split-adjusted FMP close on entry "
            "versus the last session ~365 days earlier. Missing fields stay null."
        ),
        "symbolMap": FMP_SYMBOL,
        "blocked": sorted(BLOCKED),
        "missing": missing,
        "entries": entries,
    }
    OUT.write_text(json.dumps(payload, indent=2) + "\n")
    print(f"Wrote {OUT} tickers={len(entries)} missing_fields={len(missing)}")


if __name__ == "__main__":
    main()
