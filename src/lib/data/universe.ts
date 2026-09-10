import { FIRMS } from "./catalog";
import { YEAR_ROWS, type RawRow } from "./fixtures";
import { sectorOf } from "./sectors";

const REGIME: Record<number, { drift: number; vol: number }> = {
  2000: { drift: -0.14, vol: 0.42 },
  2003: { drift: 0.16, vol: 0.2 },
  2007: { drift: 0.05, vol: 0.18 },
  2008: { drift: -0.36, vol: 0.38 },
  2009: { drift: 0.2, vol: 0.26 },
  2012: { drift: 0.11, vol: 0.15 },
  2013: { drift: 0.21, vol: 0.16 },
  2016: { drift: 0.1, vol: 0.14 },
  2019: { drift: 0.22, vol: 0.15 },
  2020: { drift: 0.14, vol: 0.26 },
  2022: { drift: -0.17, vol: 0.26 },
  2023: { drift: 0.18, vol: 0.2 },
};

function hash(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function unit(seed: string): number {
  return (hash(seed) % 10_000) / 10_000;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function round(value: number, digits = 1): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function eligible(ticker: string, year: number): boolean {
  const windows: Record<string, number[]> = {
    SUNW: [2000, 2003],
    CPQ: [2000],
    EMC: [2000, 2003, 2007, 2008, 2009, 2012],
    MOT: [2000, 2003, 2007],
    WCOM: [2000],
    TYC: [2000, 2003, 2007],
    MER: [2000, 2003, 2007, 2008],
    LEH: [2000, 2003, 2007],
    WAMU: [2000, 2003, 2007, 2008],
    AOL: [2000, 2003, 2007],
    YHOO: [2000, 2003, 2007, 2008, 2009, 2012, 2013, 2016],
    LU: [2000, 2003],
  };
  if (windows[ticker]) return windows[ticker].includes(year);
  if (ticker === "ACN" || ticker === "COP" || ticker === "MET" || ticker === "PRU") {
    return year >= 2003;
  }
  if (ticker === "GOOG") return year >= 2007;
  if (ticker === "FB") return year >= 2012 && year <= 2021;
  if (ticker === "META") return year >= 2022;
  if (ticker === "ABBV") return year >= 2013;
  if (ticker === "PYPL") return year >= 2016;
  if (ticker === "NOW") return year >= 2016;
  if (ticker === "DELL") return year <= 2013 || year >= 2019;
  if (ticker === "TMUS") return year >= 2013;
  if (ticker === "NFLX") return year >= 2012;
  if (ticker === "CRM") return year >= 2007;
  if (ticker === "AVGO") return year >= 2012;
  if (ticker === "TSLA") return year >= 2012;
  if (ticker === "CHTR") return year >= 2012;
  if (ticker === "BKNG") return year >= 2003;
  if (ticker === "MDLZ") return year >= 2013;
  if (ticker === "PM") return year >= 2009;
  if (ticker === "GM") return year >= 2012;
  if (ticker === "V") return year >= 2009;
  if (ticker === "MA") return year >= 2009;
  return true;
}

function generateRow(
  ticker: string,
  year: number,
  fillerIndex: number,
  ceilingMcap: number,
): RawRow {
  const sector = sectorOf(ticker);
  const regime = REGIME[year] ?? { drift: 0.08, vol: 0.18 };
  const t = fillerIndex / 79;
  const jitter = 0.94 + unit(`${year}:${ticker}:m`) * 0.1;
  const mcap = round(ceilingMcap * (1 - t * 0.84) * jitter, 1);

  const revenueRatio =
    sector === "technology"
      ? 0.18 + unit(`${ticker}:rev`) * 0.35
      : 0.45 + unit(`${ticker}:rev`) * 0.9;
  const revenue = round(Math.max(2, mcap * revenueRatio), 1);

  const growthBase =
    sector === "technology"
      ? 14
      : sector === "energy"
        ? 6
        : sector === "financials"
          ? 5
          : 7;
  const growth = round(growthBase + (unit(`${year}:${ticker}:g`) - 0.5) * 18, 0);

  const marginBase =
    sector === "technology"
      ? 18
      : sector === "financials"
        ? 16
        : sector === "healthCare"
          ? 14
          : 8;
  const margin = round(clamp(marginBase + (unit(`${year}:${ticker}:n`) - 0.5) * 10, 1, 40), 0);

  const peBase =
    sector === "technology" ? 28 : sector === "financials" ? 12 : 18;
  const pe = round(clamp(peBase + (unit(`${year}:${ticker}:pe`) - 0.5) * 16, 8, 70), 0);

  const trail =
    round((regime.drift + (unit(`${year}:${ticker}:t`) - 0.5) * regime.vol * 1.4) * 100, 0);

  let bonus = 0;
  if (sector === "technology" && year === 2000) bonus -= 0.22;
  if (sector === "technology" && year === 2023) bonus += 0.12;
  if (sector === "financials" && year === 2008) bonus -= 0.28;
  if (
    sector === "financials" &&
    (year === 2009 || year === 2013)
  ) {
    bonus += 0.1;
  }
  if (sector === "energy" && year === 2022) bonus += 0.28;
  if (sector === "energy" && year === 2020) bonus -= 0.18;
  if (sector === "consumer" && year === 2008) bonus += 0.08;

  const fwd = clamp(
    regime.drift + (unit(`${year}:${ticker}:f`) - 0.5) * 2 * regime.vol + bonus,
    -0.72,
    1.15,
  );

  return [ticker, mcap, revenue, growth, margin, pe, trail, round(fwd * 100, 0)];
}

function take100(year: number, head: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const pool = [
    ...head,
    ...Object.keys(FIRMS).filter((ticker) => eligible(ticker, year)),
  ];
  for (const ticker of pool) {
    if (seen.has(ticker) || !FIRMS[ticker]) continue;
    if (!eligible(ticker, year) && !head.includes(ticker)) continue;
    seen.add(ticker);
    out.push(ticker);
    if (out.length === 100) return out;
  }
  throw new Error(`Year ${year} only resolved ${out.length} companies`);
}

function buildYear(year: number): RawRow[] {
  const curated = YEAR_ROWS[year];
  if (!curated) throw new Error(`Missing fixture year ${year}`);
  const byTicker = new Map(curated.map((row) => [row[0], row]));
  const ranking = take100(
    year,
    curated.map((row) => row[0]),
  );
  const floor = Math.min(...curated.map((row) => row[1])) * 0.97;
  let fillerIndex = 0;
  const rows = ranking.map((ticker) => {
    const known = byTicker.get(ticker);
    if (known) return known;
    const row = generateRow(ticker, year, fillerIndex, floor);
    fillerIndex += 1;
    return row;
  });
  if (rows.length !== 100) {
    throw new Error(`Year ${year} universe is ${rows.length}, need 100`);
  }
  return rows;
}

export const YEAR_UNIVERSE: Record<number, RawRow[]> = Object.fromEntries(
  Object.keys(YEAR_ROWS).map((year) => [Number(year), buildYear(Number(year))]),
);
