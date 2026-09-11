import { query } from "./db";
import type { LeaderboardEntry } from "./leaderboard";

type EntryRow = {
  game_id: string;
  player_id: string;
  display_name: string;
  bankroll: number;
  multiplier: number;
  completed_at: Date | string;
};

function toEntry(row: EntryRow): LeaderboardEntry {
  return {
    gameId: row.game_id,
    playerId: row.player_id,
    displayName: row.display_name,
    bankroll: Number(row.bankroll),
    multiplier: Number(row.multiplier),
    completedAt: new Date(row.completed_at),
  };
}

export async function listEntries() {
  const result = await query<EntryRow>(
    `SELECT game_id, player_id, display_name, bankroll, multiplier, completed_at
     FROM leaderboard_entries`,
  );
  return result.rows.map(toEntry);
}

export async function getEntry(gameId: string) {
  const result = await query<EntryRow>(
    `SELECT game_id, player_id, display_name, bankroll, multiplier, completed_at
     FROM leaderboard_entries
     WHERE game_id = $1`,
    [gameId],
  );
  return result.rows[0] ? toEntry(result.rows[0]) : null;
}

export async function insertEntry(entry: LeaderboardEntry) {
  const result = await query<EntryRow>(
    `INSERT INTO leaderboard_entries
       (game_id, player_id, display_name, bankroll, multiplier, completed_at)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (game_id) DO UPDATE
       SET display_name = leaderboard_entries.display_name
     RETURNING game_id, player_id, display_name, bankroll, multiplier, completed_at`,
    [
      entry.gameId,
      entry.playerId,
      entry.displayName,
      entry.bankroll,
      entry.multiplier,
      entry.completedAt.toISOString(),
    ],
  );
  return toEntry(result.rows[0]);
}

export async function renamePlayerEntries(playerId: string, displayName: string) {
  await query(
    `UPDATE leaderboard_entries
     SET display_name = $2
     WHERE player_id = $1`,
    [playerId, displayName],
  );
}
