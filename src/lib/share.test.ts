import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildShareContent,
  CANONICAL_ORIGIN,
  buildShareUrl,
  compactDollars,
  formatChallengeValue,
  nativeShareData,
  parseChallengeMultiplier,
  parseSharePath,
} from "./share";
import { STARTING_BANKROLL, type RevealPayload } from "./types";

function payload(overrides: Partial<RevealPayload> = {}): RevealPayload {
  return {
    picks: [
      {
        boardId: "a",
        candidateId: "a1",
        name: "NVIDIA",
        ticker: "NVDA",
        year: 2016,
        bandLabel: "#11–20",
        marketCapRank: 12,
        entrySharePrice: 32.37,
        entryBankroll: 2000,
        todayValue: 168000,
        exitBankroll: 168000,
        forwardTotalReturn: 83,
        forwardRank: 1,
        boardAverage: 4,
        beatBoard: true,
        outcomeNotes: null,
        yearsHeld: 9,
      },
    ],
    bestPossiblePicks: [
      {
        boardId: "a",
        candidateId: "a1",
        name: "NVIDIA",
        ticker: "NVDA",
        year: 2016,
        bandLabel: "#11–20",
        marketCapRank: 12,
        entrySharePrice: 32.37,
        entryBankroll: 2000,
        todayValue: 168000,
        forwardTotalReturn: 83,
        wasSelected: true,
      },
    ],
    endingBankroll: 114166,
    multiplier: 11.42,
    tier: "tenX",
    beatTheBoard: 1,
    oracleBankroll: 400000,
    ...overrides,
  };
}

test("share payload is a short challenge plus a play link", () => {
  const share = buildShareContent(payload(), "https://100x.example");
  assert.equal(
    share.text,
    "I just scored 11.4X on 100X.\nThink you can turn $10K into $1M?",
  );
  assert.equal(share.url, "https://100x.example/share/11.42");
  assert.equal(share.title, "100X");
  assert.ok(!share.text.includes("NVDA"));
  assert.ok(!share.text.includes(share.url));
});

test("challenge URLs round-trip the multiplier", () => {
  const url = buildShareUrl("https://100x.example", 12.4);
  assert.equal(url, "https://100x.example/share/12.4");
  assert.equal(parseSharePath(new URL(url).pathname), 12.4);
  assert.equal(parseSharePath("/share/12.4"), 12.4);
  assert.equal(parseChallengeMultiplier("?x=12.4"), 12.4);
  assert.equal(formatChallengeValue(100.4), "100");
  assert.equal(parseSharePath("/share/nope"), null);
  assert.equal(parseChallengeMultiplier(""), null);
});

test("share URLs use the public domain from local and Vercel hosts", () => {
  assert.equal(
    buildShareUrl("http://127.0.0.1:3010", 2.65),
    `${CANONICAL_ORIGIN}/share/2.65`,
  );
  assert.equal(
    buildShareUrl("https://100x-brown.vercel.app", 2.65),
    `${CANONICAL_ORIGIN}/share/2.65`,
  );
  assert.equal(
    buildShareUrl(CANONICAL_ORIGIN, 2.65),
    `${CANONICAL_ORIGIN}/share/2.65`,
  );
  assert.equal(
    buildShareUrl("https://100x.example", 21.4),
    "https://100x.example/share/21.4",
  );
});

test("Apple share is one text payload so iMessage keeps the copy and the link", () => {
  const share = buildShareContent(payload(), "https://100x.example");
  const apple = nativeShareData(share, true);
  const other = nativeShareData(share, false);
  assert.equal(
    apple.text,
    "I just scored 11.4X on 100X.\nThink you can turn $10K into $1M?\nhttps://100x.example/share/11.42",
  );
  assert.equal(apple.url, undefined);
  assert.equal(other.text, share.text);
  assert.equal(other.url, share.url);
});

test("compact dollars stay readable in CTAs", () => {
  assert.equal(compactDollars(STARTING_BANKROLL), "$10K");
  assert.equal(compactDollars(1_000_000), "$1M");
  assert.equal(compactDollars(168400), "$168K");
});
