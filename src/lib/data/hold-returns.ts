import holdQuotes from "./hold-quotes.json";
import { ENTRY_DATES } from "./fixtures";

export interface HoldEntryQuote {
  entryDate: string;
  sessionDate: string;
  splitAdjClose: number;
  rawClose: number;
  splitFactorAfter: number;
  asOfClose: number;
  asOfDate: string;
  multiple: number;
  terminal: string | null;
}

interface HoldQuotesFile {
  source: string;
  asOfDate: string;
  fetchedAt: string;
  methodology: string;
  missing: string[];
  quotes: Record<
    string,
    {
      yahoo: string;
      asOfClose: number;
      asOfDate: string;
      entries: Record<string, HoldEntryQuote>;
    }
  >;
}

const QUOTES = holdQuotes as unknown as HoldQuotesFile;

export const AS_OF_DATE = QUOTES.asOfDate;
export const QUOTE_METHODOLOGY = QUOTES.methodology;

function tickerKey(ticker: string): string {
  return ticker.replace(/2$/, "");
}

export function holdQuote(year: number, ticker: string): HoldEntryQuote {
  const row = QUOTES.quotes[tickerKey(ticker)]?.entries[String(year)];
  if (!row) {
    throw new Error(`Missing split-adjusted hold quote for ${ticker} ${year}`);
  }
  return row;
}

export function holdMultiple(year: number, ticker: string): number {
  return holdQuote(year, ticker).multiple;
}

export function entrySharePrice(year: number, ticker: string): number {
  return holdQuote(year, ticker).rawClose;
}

export function holdReturn(year: number, ticker: string): number {
  return holdMultiple(year, ticker) - 1;
}

export function yearsHeld(year: number): number {
  const dates = ENTRY_DATES[year];
  if (!dates) throw new Error(`No entry date for ${year}`);
  const start = Date.parse(`${dates.entry}T21:00:00Z`);
  const end = Date.parse(`${AS_OF_DATE}T21:00:00Z`);
  return (end - start) / (365.25 * 24 * 60 * 60 * 1000);
}

export function yearsHeldLabel(year: number): string {
  const years = yearsHeld(year);
  if (years < 4.5) return `${years.toFixed(1)} years`;
  return `${Math.round(years)} years`;
}

export function holdOutcomeNote(year: number, ticker: string): string | null {
  const quote = holdQuote(year, ticker);
  if (quote.terminal) return quote.terminal;
  if (quote.multiple <= 0) {
    return "The listing ended with no remaining common-share value.";
  }
  if (quote.multiple < 0.2) {
    return "Each $1 invested finishes below $0.20 on split-adjusted price, excluding dividends.";
  }
  return null;
}
