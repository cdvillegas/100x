import { holdQuote } from "./hold-returns";
import { FIRMS } from "./catalog";
import { YEAR_ROWS, type RawRow } from "./fixtures";
import { fundamentalsFor } from "./fundamentals";

/**
 * First January a later winner is allowed on a board. Before that date the
 * name may already have prices and filings, but seating it would turn an
 * early year into an easy 100X (Apple 2003) or a mid-cap lottery ticket.
 * Dead tickers are not listed here: they are dropped because FMP has no card.
 */
const SEAT_FROM: Record<string, number> = {
  AAPL: 2007,
  AMZN: 2012,
  AVGO: 2016,
  BKNG: 2012,
  FB: 2013,
  GOOG: 2007,
  ISRG: 2012,
  META: 2022,
  NFLX: 2016,
  NVDA: 2016,
  TSLA: 2019,
};

/** Mid-cap years where the hold is a 100X+ lottery ticket. */
const SEAT_EXCEPT: Record<string, number[]> = {
  AMD: [2009, 2012, 2013, 2016, 2019],
  MU: [2008, 2009],
};

function eraWindow(ticker: string, year: number): boolean {
  const windows: Record<string, number[]> = {
    MOT: [2000, 2003, 2007],
    TYC: [],
  };
  if (windows[ticker]) return windows[ticker].includes(year);
  if (ticker === "FB") return year >= 2013 && year <= 2021;
  if (ticker === "META") return year >= 2022;
  if (ticker === "DELL") return year <= 2013 || year >= 2019;
  const from = SEAT_FROM[ticker];
  if (from != null) return year >= from;
  if (SEAT_EXCEPT[ticker]?.includes(year)) return false;
  return true;
}

function hasHoldQuote(year: number, ticker: string): boolean {
  try {
    holdQuote(year, ticker);
    return true;
  } catch {
    return false;
  }
}

export function hasCompleteCard(year: number, ticker: string): boolean {
  const snap = fundamentalsFor(year, ticker);
  return (
    snap != null &&
    snap.marketCap != null &&
    snap.revenue != null &&
    snap.trailingReturn != null
  );
}

function eligible(ticker: string, year: number): boolean {
  if (!FIRMS[ticker]) return false;
  if (!eraWindow(ticker, year)) return false;
  if (!hasCompleteCard(year, ticker)) return false;
  if (!hasHoldQuote(year, ticker)) return false;
  return true;
}

function billions(value: number): number {
  return Math.round((value / 1e9) * 10) / 10;
}

function overlayRow(ticker: string, year: number): RawRow {
  const snap = fundamentalsFor(year, ticker);
  if (
    !snap ||
    snap.marketCap == null ||
    snap.revenue == null ||
    snap.trailingReturn == null
  ) {
    throw new Error(`Incomplete card for ${ticker} ${year}`);
  }
  return [
    ticker,
    billions(snap.marketCap),
    billions(snap.revenue),
    snap.revenueGrowth == null ? null : Math.round(snap.revenueGrowth * 1000) / 10,
    snap.netMargin == null ? null : Math.round(snap.netMargin * 1000) / 10,
    snap.peRatio,
    Math.round(snap.trailingReturn * 1000) / 10,
    0,
  ];
}

function take100(year: number, head: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const pool = [...head, ...Object.keys(FIRMS)];
  for (const ticker of pool) {
    if (seen.has(ticker) || !eligible(ticker, year)) continue;
    seen.add(ticker);
    out.push(ticker);
    if (out.length === 100) return out;
  }
  throw new Error(`Year ${year} only resolved ${out.length} complete companies`);
}

function buildYear(year: number): RawRow[] {
  const curated = YEAR_ROWS[year];
  if (!curated) throw new Error(`Missing fixture year ${year}`);
  const rows = take100(
    year,
    curated.map((row) => row[0]),
  ).map((ticker) => overlayRow(ticker, year));
  if (rows.length !== 100) {
    throw new Error(`Year ${year} universe is ${rows.length}, need 100`);
  }
  return rows.sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0));
}

export const YEAR_UNIVERSE: Record<number, RawRow[]> = Object.fromEntries(
  Object.keys(YEAR_ROWS).map((year) => [Number(year), buildYear(Number(year))]),
);
