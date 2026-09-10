import type { SectorKey } from "../types";
import { sectorOf } from "./sectors";

export const AS_OF_DATE = "2026-09-10";

const HOLD_YEARS = [
  2000, 2003, 2007, 2008, 2009, 2012, 2013, 2016, 2019, 2020, 2022, 2023,
] as const;

/** Curated gameplay estimates by entry year. These are not a licensed or fully sourced total-return series. */
const SERIES: Record<string, number[]> = {
  AAPL: [230, 900, 75, 33, 80, 16, 12, 9.2, 5.9, 3.15, 1.28, 1.84],
  MSFT: [7.4, 16, 14, 12, 22, 16, 15.5, 7.8, 4.25, 2.65, 1.28, 1.78],
  AMZN: [8.5, 42, 28, 18, 32, 20, 13.5, 5.6, 2.4, 1.9, 1.06, 2.12],
  GOOG: [0, 0, 13, 7.2, 16, 8.1, 7.0, 4.2, 2.28, 1.78, 0.88, 1.48],
  NVDA: [280, 140, 48, 62, 85, 52, 38, 28, 14.5, 19, 3.9, 8.4],
  META: [0, 0, 0, 0, 0, 0, 0, 2.9, 4.1, 2.35, 1.72, 3.35],
  FB: [0, 0, 0, 0, 0, 8.5, 6.2, 2.9, 4.1, 2.35, 1.72, 3.35],
  TSLA: [0, 0, 0, 0, 0, 95, 38, 12, 7.4, 2.4, 0.62, 1.08],
  NFLX: [0, 0, 18, 12, 28, 16, 11, 4.8, 2.15, 1.35, 1.85, 2.55],
  AVGO: [0, 0, 0, 0, 0, 14, 12, 8.5, 4.6, 3.2, 1.55, 2.9],
  AMD: [4.2, 18, 8, 12, 22, 16, 14, 20, 7.5, 4.8, 1.35, 2.4],
  ADBE: [9, 14, 8.5, 6.5, 12, 10, 8.2, 4.4, 2.3, 1.7, 0.95, 1.55],
  CRM: [0, 0, 12, 8, 16, 9, 7.5, 3.8, 2.1, 1.55, 0.92, 1.7],
  ORCL: [6.2, 9.5, 6.8, 5.5, 8.4, 5.2, 4.8, 3.4, 2.35, 1.85, 1.45, 1.7],
  CSCO: [0.85, 2.4, 1.55, 1.35, 2.1, 1.7, 1.55, 1.45, 1.35, 1.22, 1.18, 1.32],
  INTC: [0.62, 1.35, 0.95, 0.85, 1.4, 0.72, 0.85, 0.55, 0.48, 0.38, 0.72, 0.85],
  QCOM: [2.1, 4.8, 2.6, 2.2, 3.4, 2.4, 2.2, 1.8, 1.35, 1.15, 1.05, 1.45],
  IBM: [1.55, 2.3, 1.7, 1.55, 2.4, 1.25, 1.15, 1.35, 1.45, 1.35, 1.55, 1.62],
  DELL: [1.8, 3.2, 1.4, 1.15, 1.9, 1.7, 1.6, 2.8, 2.4, 1.9, 1.45, 1.85],
  HPQ: [0.7, 1.4, 0.85, 0.7, 1.2, 0.95, 0.9, 1.15, 1.25, 1.05, 0.95, 1.2],
  AOL: [0.06, 0.18, 0.12, 0.1, 0.14, 0, 0, 0, 0, 0, 0, 0],
  YHOO: [0.12, 0.55, 0.35, 0.42, 0.7, 0.85, 0.95, 0, 0, 0, 0, 0],
  LU: [0.05, 0.12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  SUNW: [0.04, 0.12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  WCOM: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  LEH: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  WAMU: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  MER: [0.9, 1.4, 0.22, 0.18, 0, 0, 0, 0, 0, 0, 0, 0],
  GE: [0.55, 1.15, 0.85, 0.42, 0.95, 1.05, 1.35, 1.15, 1.45, 1.25, 1.85, 2.15],
  BRK: [6.8, 5.4, 3.6, 2.9, 4.2, 3.1, 2.8, 2.15, 1.85, 1.7, 1.45, 1.55],
  WMT: [4.8, 4.1, 3.2, 3.6, 3.5, 2.9, 2.6, 2.4, 2.15, 1.85, 1.45, 1.55],
  HD: [8.2, 6.5, 3.4, 3.8, 5.1, 4.2, 3.6, 2.8, 2.35, 1.95, 1.25, 1.55],
  COST: [12, 8.5, 5.2, 4.6, 5.8, 4.4, 3.8, 2.9, 2.15, 1.75, 1.35, 1.65],
  KO: [3.4, 3.8, 2.9, 2.4, 3.6, 2.4, 2.2, 1.7, 1.55, 1.35, 1.22, 1.28],
  PEP: [4.1, 3.9, 2.8, 2.4, 3.2, 2.5, 2.3, 1.85, 1.55, 1.35, 1.18, 1.22],
  PG: [3.8, 3.6, 2.6, 2.3, 3.1, 2.2, 2.15, 1.85, 1.65, 1.4, 1.18, 1.2],
  JNJ: [4.2, 3.5, 2.4, 2.2, 2.8, 2.15, 2.05, 1.7, 1.45, 1.28, 1.12, 1.08],
  PFE: [1.35, 1.7, 1.05, 0.95, 1.15, 1.25, 1.35, 1.15, 0.85, 0.78, 0.72, 0.82],
  MRK: [2.4, 2.2, 1.7, 1.45, 1.85, 1.9, 1.85, 1.75, 1.55, 1.35, 1.25, 1.32],
  LLY: [9.5, 7.2, 5.4, 4.8, 6.2, 5.8, 5.5, 5.2, 4.6, 3.8, 2.4, 1.85],
  XOM: [2.6, 2.9, 1.55, 1.35, 1.7, 1.25, 1.35, 1.55, 1.45, 1.15, 1.55, 1.12],
  CVX: [3.1, 3.4, 1.85, 1.5, 1.95, 1.4, 1.45, 1.7, 1.45, 1.12, 1.48, 1.05],
  T: [1.15, 1.25, 0.85, 0.72, 1.05, 0.95, 0.92, 0.85, 0.78, 0.72, 0.85, 0.88],
  VZ: [1.45, 1.4, 1.05, 0.92, 1.2, 1.05, 1.0, 0.95, 0.88, 0.82, 0.92, 0.95],
  C: [0.32, 0.85, 0.28, 0.42, 0.95, 1.15, 1.25, 1.45, 1.55, 1.15, 0.95, 1.25],
  BAC: [1.15, 1.85, 0.55, 0.35, 1.45, 1.65, 1.75, 1.85, 1.95, 1.35, 1.05, 1.45],
  JPM: [3.4, 4.2, 1.85, 1.55, 2.9, 2.6, 2.45, 2.15, 1.95, 1.55, 1.25, 1.55],
  WFC: [2.1, 2.6, 1.05, 0.85, 1.75, 1.85, 2.05, 1.45, 1.25, 1.05, 0.95, 1.25],
  AIG: [0.45, 1.15, 0.22, 0.08, 0.55, 0.85, 0.95, 0.9, 1.15, 1.05, 1.25, 1.35],
  GS: [2.8, 3.4, 1.55, 1.25, 2.4, 2.15, 2.05, 1.85, 1.75, 1.45, 1.15, 1.45],
  V: [0, 0, 0, 0, 8.5, 5.4, 4.6, 3.4, 2.45, 1.85, 1.35, 1.55],
  MA: [0, 0, 0, 0, 12, 6.2, 5.2, 3.8, 2.65, 1.95, 1.32, 1.62],
  DIS: [2.8, 3.2, 2.15, 1.65, 2.6, 2.4, 2.55, 1.55, 1.15, 1.05, 0.85, 1.25],
  UNH: [18, 12, 7.5, 6.2, 8.4, 5.6, 4.8, 3.4, 2.35, 1.95, 1.35, 1.22],
};

const ZERO = new Set(["LEH", "WAMU", "WCOM"]);

for (const [ticker, row] of Object.entries(SERIES)) {
  if (row.length !== HOLD_YEARS.length) {
    throw new Error(`Hold series ${ticker} has ${row.length} years`);
  }
}

const SECTOR_CAGR: Record<SectorKey, number> = {
  technology: 0.11,
  financials: 0.075,
  energy: 0.06,
  healthCare: 0.09,
  consumer: 0.08,
  industrials: 0.08,
  communications: 0.06,
  utilities: 0.06,
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

export function yearsHeld(year: number): number {
  return 2026 + 253 / 365 - year;
}

export function yearsHeldLabel(year: number): string {
  const years = yearsHeld(year);
  if (years < 4.5) return `${years.toFixed(1)} years`;
  return `${Math.round(years)} years`;
}

function seriesMultiple(ticker: string, year: number): number | null {
  const row = SERIES[ticker];
  if (!row) return null;
  const index = HOLD_YEARS.indexOf(year as (typeof HOLD_YEARS)[number]);
  if (index < 0) return null;
  const value = row[index];
  if (!value) return null;
  return value;
}

function generatedMultiple(year: number, ticker: string): number {
  if (ZERO.has(ticker)) return 0;
  const years = yearsHeld(year);
  const u = unit(`${year}:${ticker}:hold`);
  const v = unit(`${ticker}:${year}:tail`);
  const sector = sectorOf(ticker);
  let cagr = SECTOR_CAGR[sector];
  cagr += (u - 0.5) * 0.1;
  if (year === 2000) cagr -= 0.025;
  if (year === 2009) cagr += 0.03;
  if (year === 2008 && sector === "financials") cagr -= 0.05;
  if (year === 2022) cagr -= 0.02;
  if (sector === "technology" && year <= 2013 && v > 0.97) cagr += 0.1;
  if (u < 0.03 && year <= 2008) return 0;
  const multiple = (1 + cagr) ** years;
  return clamp(multiple, 0.05, 35);
}

export function holdMultiple(year: number, ticker: string): number {
  const key = ticker.replace(/2$/, "");
  if (ZERO.has(key)) return 0;
  return seriesMultiple(key, year) ?? generatedMultiple(year, key);
}

export function holdReturn(year: number, ticker: string): number {
  return holdMultiple(year, ticker) - 1;
}

export function holdOutcomeNote(year: number, ticker: string): string | null {
  const multiple = holdMultiple(year, ticker);
  if (multiple <= 0) {
    return "The gameplay model assigns no remaining value; it does not specify the corporate-action path.";
  }
  if (multiple < 0.2) {
    return "The gameplay estimate leaves less than $0.20 for each $1 invested.";
  }
  return null;
}
