import fundamentalsFile from "./fundamentals.json";

export interface FundamentalSnapshot {
  fmp: string;
  entryDate: string;
  marketCap: number | null;
  marketCapDate: string | null;
  revenue: number | null;
  revenueGrowth: number | null;
  netMargin: number | null;
  peRatio: number | null;
  trailingReturn: number | null;
  fiscalDate: string | null;
  filingDate: string | null;
  netIncome: number | null;
}

interface FundamentalsFile {
  source: string;
  fetchedAt: string;
  methodology: string;
  symbolMap: Record<string, string>;
  blocked: string[];
  missing: { ticker: string; year: string; reason: string }[];
  entries: Record<string, Record<string, FundamentalSnapshot>>;
}

const FILE = fundamentalsFile as FundamentalsFile;

export const FUNDAMENTALS_SOURCE = FILE.source;
export const FUNDAMENTALS_METHODOLOGY = FILE.methodology;

export function fundamentalsFor(
  year: number,
  ticker: string,
): FundamentalSnapshot | null {
  return FILE.entries[ticker]?.[String(year)] ?? null;
}
