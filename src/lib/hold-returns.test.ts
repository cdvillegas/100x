import assert from "node:assert/strict";
import { test } from "node:test";
import { YEAR_UNIVERSE } from "./data/universe";
import {
  AS_OF_DATE,
  entrySharePrice,
  holdMultiple,
  holdQuote,
} from "./data/hold-returns";
import { modeledShareCount } from "./format";
import { PICK_STAKE } from "./types";

test("Apple 2003 uses the tape price and split-adjusted multiple", () => {
  const quote = holdQuote(2003, "AAPL");
  assert.equal(quote.sessionDate, "2003-01-02");
  assert.ok(Math.abs(quote.rawClose - 14.8) < 0.05);
  assert.equal(quote.splitFactorAfter, 56);
  assert.ok(quote.multiple > 1200 && quote.multiple < 1400);
  assert.ok(
    Math.abs(quote.asOfClose / quote.splitAdjClose - quote.multiple) < 0.05,
  );
  // 7-for-1 (2014) × 4-for-1 (2020) × 2-for-1 (2005) = 56. Tape = adj × 56.
  assert.ok(Math.abs(quote.splitAdjClose * 56 - quote.rawClose) < 0.05);
});

test("Apple 2000 bought the bubble, so the multiple is far below 2003", () => {
  assert.ok(holdMultiple(2000, "AAPL") < holdMultiple(2003, "AAPL"));
  assert.ok(holdMultiple(2000, "AAPL") > 200);
});

test("share lots use the tape price, not a hash", () => {
  const price = entrySharePrice(2003, "AAPL");
  const shares = modeledShareCount(price);
  assert.ok(Math.abs(shares * price - PICK_STAKE) < 20);
});

test("every board ticker has a quote for its year", () => {
  for (const [year, rows] of Object.entries(YEAR_UNIVERSE)) {
    for (const row of rows) {
      const ticker = row[0];
      const quote = holdQuote(Number(year), ticker);
      assert.ok(quote.rawClose >= 0, `${ticker} ${year} tape`);
      assert.ok(quote.multiple >= 0, `${ticker} ${year} multiple`);
    }
  }
});

test("as-of date is a cached session, not live per request", () => {
  assert.match(AS_OF_DATE, /^\d{4}-\d{2}-\d{2}$/);
});

test("cancelled listings finish at zero", () => {
  assert.equal(holdMultiple(2000, "LEH"), 0);
  assert.equal(holdQuote(2000, "LEH").rawClose > 0, true);
});

test("a missing ticker-year throws instead of inventing a return", () => {
  assert.throws(() => holdQuote(2000, "NOPE"));
});

test("2000 and 2003 do not seat later winners that were still mid-caps", () => {
  const tickers = (year: number) => YEAR_UNIVERSE[year].map((row) => row[0]);
  for (const ticker of ["AAPL", "AMZN", "NVDA", "ISRG", "BKNG"]) {
    assert.equal(tickers(2000).includes(ticker), false, ticker);
  }
  for (const ticker of ["AAPL", "AMZN", "ISRG", "BKNG"]) {
    assert.equal(tickers(2003).includes(ticker), false, ticker);
  }
});

test("2000 is not an easy 100X year once megacaps are honest", () => {
  const best = Math.max(
    ...YEAR_UNIVERSE[2000].map((row) => holdMultiple(2000, row[0])),
  );
  assert.ok(best < 100, `best 2000 multiple is ${best}`);
});
