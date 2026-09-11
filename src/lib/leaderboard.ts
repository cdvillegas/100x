import { reveal } from "./engine";
import type { SessionRecord } from "./engine";
import { validateDisplayName } from "./names";
import { PICKS_PER_RUN } from "./types";

export type LeaderboardPeriod = "daily" | "weekly" | "all";

export interface LeaderboardEntry {
  gameId: string;
  playerId: string;
  displayName: string;
  bankroll: number;
  multiplier: number;
  completedAt: Date;
}

export interface PublicLeaderboardRow {
  rank: number;
  name: string;
  bankroll: number;
  multiplier: number;
  completedAt: string;
  isYou: boolean;
}

export interface PeriodPlacement {
  period: LeaderboardPeriod;
  rank: number;
  total: number;
  topTen: boolean;
  first: boolean;
}

export interface LeaderboardBoard {
  period: LeaderboardPeriod;
  rows: PublicLeaderboardRow[];
  you: PublicLeaderboardRow | null;
  placement: PeriodPlacement | null;
}

export const LEADERBOARD_LIMIT = 25;

export function periodBounds(period: LeaderboardPeriod, now = new Date()) {
  if (period === "all") return { start: null, end: null };

  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );

  if (period === "daily") {
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);
    return { start, end };
  }

  const weekday = start.getUTCDay();
  const mondayOffset = weekday === 0 ? -6 : 1 - weekday;
  start.setUTCDate(start.getUTCDate() + mondayOffset);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 7);
  return { start, end };
}

export function inPeriod(
  completedAt: Date,
  period: LeaderboardPeriod,
  now = new Date(),
) {
  const { start, end } = periodBounds(period, now);
  if (!start || !end) return true;
  return completedAt >= start && completedAt < end;
}

function byScoreThenTime(a: LeaderboardEntry, b: LeaderboardEntry) {
  if (b.bankroll !== a.bankroll) return b.bankroll - a.bankroll;
  return a.completedAt.getTime() - b.completedAt.getTime();
}

export function bestPerPlayer(entries: LeaderboardEntry[]) {
  const best = new Map<string, LeaderboardEntry>();
  for (const entry of entries) {
    const current = best.get(entry.playerId);
    if (!current || byScoreThenTime(entry, current) < 0) {
      best.set(entry.playerId, entry);
    }
  }
  return [...best.values()];
}

export function isPersonalBest(
  entries: LeaderboardEntry[],
  playerId: string,
  gameId: string,
) {
  const mine = entries.filter((entry) => entry.playerId === playerId);
  if (mine.length === 0) return false;
  const [best] = bestPerPlayer(mine);
  return best?.gameId === gameId;
}

export function assignRanks(entries: LeaderboardEntry[]) {
  const ordered = [...entries].sort(byScoreThenTime);

  const ranks = new Map<string, number>();
  let lastScore: number | null = null;
  let lastRank = 0;
  ordered.forEach((entry, index) => {
    if (lastScore === null || entry.bankroll !== lastScore) {
      lastRank = index + 1;
      lastScore = entry.bankroll;
    }
    ranks.set(entry.gameId, lastRank);
  });
  return { ordered, ranks };
}

export function publicRow(
  entry: LeaderboardEntry,
  rank: number,
  playerId: string | null,
): PublicLeaderboardRow {
  return {
    rank,
    name: entry.displayName,
    bankroll: entry.bankroll,
    multiplier: entry.multiplier,
    completedAt: entry.completedAt.toISOString(),
    isYou: playerId !== null && entry.playerId === playerId,
  };
}

export function buildBoard(
  entries: LeaderboardEntry[],
  period: LeaderboardPeriod,
  playerId: string | null,
  gameId?: string,
): LeaderboardBoard {
  const scoped = bestPerPlayer(
    entries.filter((entry) => inPeriod(entry.completedAt, period)),
  );
  const { ordered, ranks } = assignRanks(scoped);
  const rows = ordered
    .slice(0, LEADERBOARD_LIMIT)
    .map((entry) => publicRow(entry, ranks.get(entry.gameId) ?? 0, playerId));

  const yours = playerId
    ? ordered.find((entry) => entry.playerId === playerId)
    : gameId
      ? ordered.find((entry) => entry.gameId === gameId)
      : undefined;

  const you = yours
    ? publicRow(yours, ranks.get(yours.gameId) ?? 0, playerId)
    : null;

  return {
    period,
    rows,
    you,
    placement: you
      ? {
          period,
          rank: you.rank,
          total: scoped.length,
          topTen: you.rank <= 10,
          first: you.rank === 1,
        }
      : null,
  };
}

export function scoreCompletedRun(session: SessionRecord) {
  if (session.picks.length < PICKS_PER_RUN) {
    throw new Error("Finish the run first");
  }
  const payload = reveal(session);
  return {
    bankroll: payload.endingBankroll,
    multiplier: payload.multiplier,
  };
}

export function approvedName(input: unknown) {
  const result = validateDisplayName(input);
  if (!result.ok) {
    const error = new Error(result.error);
    error.name = "NameValidationError";
    throw error;
  }
  return result.name;
}

export function sanitizeLeaderboardPayload(board: LeaderboardBoard) {
  return {
    period: board.period,
    rows: board.rows.map(({ rank, name, bankroll, multiplier, completedAt, isYou }) => ({
      rank,
      name,
      bankroll,
      multiplier,
      completedAt,
      isYou,
    })),
    you: board.you
      ? {
          rank: board.you.rank,
          name: board.you.name,
          bankroll: board.you.bankroll,
          multiplier: board.you.multiplier,
          completedAt: board.you.completedAt,
          isYou: true,
        }
      : null,
    placement: board.placement,
  };
}

export function hasPrivateFields(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const blob = JSON.stringify(value);
  return /candidateId|ticker|boardId|picks|outcomeNotes/.test(blob);
}
