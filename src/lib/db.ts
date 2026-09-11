import { Pool, type QueryResultRow } from "pg";

const SCHEMA = `
CREATE TABLE IF NOT EXISTS game_sessions (
  id TEXT PRIMARY KEY,
  player_id TEXT NOT NULL,
  payload JSONB NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS game_sessions_player_idx ON game_sessions (player_id);
CREATE INDEX IF NOT EXISTS game_sessions_expires_idx ON game_sessions (expires_at);
CREATE TABLE IF NOT EXISTS leaderboard_entries (
  game_id TEXT PRIMARY KEY,
  player_id TEXT NOT NULL,
  display_name TEXT NOT NULL,
  bankroll DOUBLE PRECISION NOT NULL,
  multiplier DOUBLE PRECISION NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS leaderboard_rank_idx ON leaderboard_entries (bankroll DESC, completed_at ASC);
CREATE INDEX IF NOT EXISTS leaderboard_completed_idx ON leaderboard_entries (completed_at DESC);
CREATE INDEX IF NOT EXISTS leaderboard_player_idx ON leaderboard_entries (player_id);
`;

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

export function databaseUrl() {
  return process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? null;
}

export function getPool() {
  const url = databaseUrl();
  if (!url) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: url,
      max: 4,
      ssl: url.includes("localhost") ? undefined : { rejectUnauthorized: false },
    });
  }
  return pool;
}

export async function ensureSchema() {
  const client = getPool();
  if (!client) throw new Error("Leaderboard storage is unavailable");
  if (!schemaReady) {
    schemaReady = client.query(SCHEMA).then(() => undefined);
  }
  await schemaReady;
}

export async function query<T extends QueryResultRow>(
  text: string,
  values: unknown[] = [],
) {
  const client = getPool();
  if (!client) throw new Error("Leaderboard storage is unavailable");
  await ensureSchema();
  return client.query<T>(text, values);
}

export function isDatabaseConfigured() {
  return Boolean(databaseUrl());
}
