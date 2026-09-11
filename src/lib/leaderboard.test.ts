import assert from "node:assert/strict";
import { test } from "node:test";
import { BOARDS } from "./data/boards";
import type { SessionRecord } from "./engine";
import {
  assignRanks,
  bestPerPlayer,
  buildBoard,
  hasPrivateFields,
  inPeriod,
  isPersonalBest,
  periodBounds,
  sanitizeLeaderboardPayload,
  scoreCompletedRun,
  type LeaderboardEntry,
} from "./leaderboard";

function entry(
  gameId: string,
  playerId: string,
  bankroll: number,
  completedAt: string,
  displayName = "Ada",
): LeaderboardEntry {
  return {
    gameId,
    playerId,
    displayName,
    bankroll,
    multiplier: bankroll / 10_000,
    completedAt: new Date(completedAt),
  };
}

function blankSession(id: string): SessionRecord {
  return {
    id,
    seed: "seed",
    rng: 1,
    round: 5,
    yearRespinUsed: false,
    rankRespinUsed: false,
    usedBoardIds: [],
    currentBoardId: null,
    picks: [],
    revealed: false,
    spinRequests: new Set(),
    respinRequests: new Set(),
    pickRequests: new Map(),
  };
}

test("daily and weekly windows use UTC Monday-Sunday", () => {
  const wednesday = new Date("2026-09-09T15:00:00.000Z");
  const daily = periodBounds("daily", wednesday);
  assert.equal(daily.start?.toISOString(), "2026-09-09T00:00:00.000Z");
  assert.equal(daily.end?.toISOString(), "2026-09-10T00:00:00.000Z");

  const weekly = periodBounds("weekly", wednesday);
  assert.equal(weekly.start?.toISOString(), "2026-09-07T00:00:00.000Z");
  assert.equal(weekly.end?.toISOString(), "2026-09-14T00:00:00.000Z");

  const sunday = new Date("2026-09-13T23:59:59.000Z");
  const sundayWeek = periodBounds("weekly", sunday);
  assert.equal(sundayWeek.start?.toISOString(), "2026-09-07T00:00:00.000Z");

  assert.equal(inPeriod(new Date("2026-09-09T01:00:00.000Z"), "daily", wednesday), true);
  assert.equal(inPeriod(new Date("2026-09-10T00:00:00.000Z"), "daily", wednesday), false);
});

test("equal scores share a rank while earlier finishes sort first", () => {
  const entries = [
    entry("a", "p1", 40_000, "2026-09-10T12:00:00.000Z"),
    entry("b", "p2", 40_000, "2026-09-10T11:00:00.000Z"),
    entry("c", "p3", 20_000, "2026-09-10T10:00:00.000Z"),
  ];
  const { ordered, ranks } = assignRanks(entries);
  assert.deepEqual(ordered.map((item) => item.gameId), ["b", "a", "c"]);
  assert.equal(ranks.get("a"), 1);
  assert.equal(ranks.get("b"), 1);
  assert.equal(ranks.get("c"), 3);
});

test("one row per player keeps the best run", () => {
  const entries = [
    entry("worse", "p1", 40_000, "2026-09-10T12:00:00.000Z", "Ada"),
    entry("best", "p1", 80_000, "2026-09-10T11:00:00.000Z", "Ada"),
    entry("other", "p2", 50_000, "2026-09-10T10:00:00.000Z", "Bea"),
  ];
  assert.equal(bestPerPlayer(entries).length, 2);

  const board = buildBoard(entries, "all", "p1", "worse");
  assert.equal(board.rows.length, 2);
  assert.equal(board.rows.filter((row) => row.isYou).length, 1);
  assert.equal(board.rows[0].isYou, true);
  assert.equal(board.rows[0].bankroll, 80_000);
  assert.equal(board.you?.bankroll, 80_000);
  assert.equal(board.you?.rank, 1);
  assert.equal(board.placement?.total, 2);
});

test("personal best is the player's best run, not every finish", () => {
  const entries = [
    entry("first", "p1", 40_000, "2026-09-10T10:00:00.000Z"),
    entry("best", "p1", 90_000, "2026-09-10T12:00:00.000Z"),
    entry("other", "p2", 120_000, "2026-09-10T11:00:00.000Z"),
  ];
  assert.equal(isPersonalBest(entries, "p1", "best"), true);
  assert.equal(isPersonalBest(entries, "p1", "first"), false);
  assert.equal(isPersonalBest(entries, "p2", "other"), true);
});

test("duplicate display names are allowed and your run stays pinned", () => {
  const entries = [
    entry("a", "p1", 90_000, "2026-09-10T10:00:00.000Z", "Ada"),
    entry("b", "p2", 12_000, "2026-09-10T11:00:00.000Z", "Ada"),
  ];
  const board = buildBoard(entries, "all", "p2", "b");
  assert.equal(board.rows[0].name, "Ada");
  assert.equal(board.rows[1].name, "Ada");
  assert.equal(board.you?.rank, 2);
  assert.equal(board.you?.isYou, true);
});

test("public leaderboard payloads never include picks", () => {
  const board = buildBoard(
    [entry("a", "p1", 50_000, "2026-09-10T10:00:00.000Z")],
    "all",
    "p1",
    "a",
  );
  const payload = sanitizeLeaderboardPayload(board);
  assert.equal(hasPrivateFields(payload), false);
  assert.equal("picks" in payload, false);
  assert.equal("candidateId" in (payload.you ?? {}), false);
});

test("score is recomputed from the sealed run, not a client number", () => {
  const session = blankSession("run-1");
  session.picks = BOARDS.slice(0, 5).map((board) => ({
    boardId: board.id,
    candidateId: board.candidates[0].id,
  }));
  const first = scoreCompletedRun(session);
  const second = scoreCompletedRun({ ...session, revealed: false });
  assert.equal(first.bankroll, second.bankroll);
  assert.ok(first.bankroll > 0);
});

test("one entry per run is idempotent and ownership-checked", () => {
  const rows = new Map<string, LeaderboardEntry>();
  const submit = (gameId: string, playerId: string, name: string) => {
    const existing = rows.get(gameId);
    if (existing) {
      if (existing.playerId !== playerId) throw new Error("Game not found");
      return existing;
    }
    const created = entry(gameId, playerId, 33_000, "2026-09-10T10:00:00.000Z", name);
    rows.set(gameId, created);
    return created;
  };

  const first = submit("run-1", "player-a", "Ada");
  const second = submit("run-1", "player-a", "Bea");
  assert.equal(first.gameId, second.gameId);
  assert.equal(second.displayName, "Ada");
  assert.equal(rows.size, 1);
  assert.throws(() => submit("run-1", "player-b", "Bea"));
});
