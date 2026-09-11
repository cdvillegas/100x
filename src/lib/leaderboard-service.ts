import { getOwnedSession } from "./store";
import {
  approvedName,
  buildBoard,
  scoreCompletedRun,
  type LeaderboardBoard,
  type LeaderboardEntry,
  type LeaderboardPeriod,
  type PeriodPlacement,
} from "./leaderboard";
import {
  getEntry,
  insertEntry,
  listEntries,
  renamePlayerEntries,
} from "./leaderboard-store";

export async function submitRun(
  gameId: string,
  playerId: string,
  displayName: unknown,
) {
  const name = approvedName(displayName);
  const existing = await getEntry(gameId);
  if (existing) {
    if (existing.playerId !== playerId) {
      throw new Error("Game not found");
    }
    return existing;
  }

  const session = await getOwnedSession(gameId, playerId);
  if (!session) throw new Error("Game not found");
  const score = scoreCompletedRun(session);
  return insertEntry({
    gameId,
    playerId,
    displayName: name,
    bankroll: score.bankroll,
    multiplier: score.multiplier,
    completedAt: new Date(),
  });
}

export async function renamePlayer(playerId: string, displayName: unknown) {
  const name = approvedName(displayName);
  await renamePlayerEntries(playerId, name);
  return name;
}

export async function loadBoards(
  playerId: string | null,
  gameId?: string,
  now = new Date(),
) {
  const entries = await listEntries();
  const periods: LeaderboardPeriod[] = ["daily", "weekly", "all"];
  const boards = Object.fromEntries(
    periods.map((period) => [
      period,
      buildBoard(
        entries.filter((entry) =>
          period === "all" ? true : entry.completedAt <= now,
        ),
        period,
        playerId,
        gameId,
      ),
    ]),
  ) as Record<LeaderboardPeriod, LeaderboardBoard>;
  return boards;
}

export function placementsFromBoards(
  boards: Record<LeaderboardPeriod, LeaderboardBoard>,
): PeriodPlacement[] {
  return (["daily", "weekly", "all"] as LeaderboardPeriod[])
    .map((period) => boards[period].placement)
    .filter((placement): placement is PeriodPlacement => Boolean(placement));
}

export function toPublicEntry(entry: LeaderboardEntry) {
  return {
    gameId: entry.gameId,
    name: entry.displayName,
    bankroll: entry.bankroll,
    multiplier: entry.multiplier,
    completedAt: entry.completedAt.toISOString(),
  };
}
