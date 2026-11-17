import assert from "node:assert/strict";
import { test } from "node:test";
import { fundamentalsFor } from "./data/fundamentals";
import { YEAR_UNIVERSE } from "./data/universe";

test("Microsoft 2000 market cap is a real January print, not a hash", () => {
  const snap = fundamentalsFor(2000, "MSFT");
  assert.ok(snap, "missing MSFT 2000 fundamentals");
  assert.ok(snap.marketCap != null && snap.marketCap > 4e11 && snap.marketCap < 8e11);
  assert.ok(snap.revenue != null && snap.revenue > 1e10);
  assert.equal(snap.filingDate != null && snap.filingDate <= "2000-01-03", true);
});

test("Apple 2003 market cap is mid-cap, which is why it stays off the board", () => {
  const snap = fundamentalsFor(2003, "AAPL");
  assert.ok(snap, "missing AAPL 2003 fundamentals");
  assert.ok(snap.marketCap != null && snap.marketCap < 2e10);
  assert.equal(
    YEAR_UNIVERSE[2003].some((row) => row[0] === "AAPL"),
    false,
  );
});

test("every seated name has a complete card, not a blank delisted row", () => {
  const dead = ["YHOO", "AOL", "LEH", "WCOM", "SUNW", "LU", "MER", "WAMU", "CPQ", "EMC"];
  for (const [year, rows] of Object.entries(YEAR_UNIVERSE)) {
    const tickers = rows.map((row) => row[0]);
    for (const ticker of dead) {
      assert.equal(tickers.includes(ticker), false, `${ticker} ${year}`);
    }
    for (const row of rows) {
      assert.ok(row[1] != null, `${row[0]} ${year} mcap`);
      assert.ok(row[2] != null, `${row[0]} ${year} revenue`);
      assert.ok(row[6] != null, `${row[0]} ${year} prior`);
    }
  }
});

test("NVIDIA 2016 remains a seated complete card", () => {
  assert.equal(
    YEAR_UNIVERSE[2016].some((row) => row[0] === "NVDA"),
    true,
  );
});

test("universe financials are FMP overlays, not hashed filler P/Es", () => {
  const msft = YEAR_UNIVERSE[2000].find((row) => row[0] === "MSFT");
  assert.ok(msft);
  assert.ok(msft[1] != null && msft[1] > 400);
  assert.equal(YEAR_UNIVERSE[2000][0][0], "MSFT");
});
