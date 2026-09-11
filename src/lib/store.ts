import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { isDatabaseConfigured, query } from "./db";
import type { SessionRecord } from "./engine";

const PLAYER_COOKIE = "x100_player";
const COOKIE_PREFIX = "x100_";
const YEAR = 60 * 60 * 24 * 365;
const WEEK = 60 * 60 * 24 * 7;

type StoredSession = Omit<
  SessionRecord,
  "spinRequests" | "respinRequests" | "pickRequests"
> & {
  spinRequests: string[];
  respinRequests: string[];
  pickRequests: [string, string][];
};

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.VERCEL === "1",
    path: "/",
    maxAge,
  };
}

function cookieName(id: string) {
  return `${COOKIE_PREFIX}${id}`;
}

function serialize(session: SessionRecord) {
  const stored: StoredSession = {
    id: session.id,
    seed: session.seed,
    rng: session.rng,
    round: session.round,
    yearRespinUsed: session.yearRespinUsed,
    rankRespinUsed: session.rankRespinUsed,
    usedBoardIds: session.usedBoardIds,
    currentBoardId: session.currentBoardId,
    picks: session.picks,
    revealed: session.revealed,
    spinRequests: [...session.spinRequests],
    respinRequests: [...session.respinRequests],
    pickRequests: [...session.pickRequests],
  };
  return stored;
}

function deserialize(raw: unknown): SessionRecord | undefined {
  try {
    const stored = raw as StoredSession;
    if (!stored?.id || typeof stored.seed !== "string") return undefined;
    return {
      ...stored,
      spinRequests: new Set(stored.spinRequests ?? []),
      respinRequests: new Set(stored.respinRequests ?? []),
      pickRequests: new Map(stored.pickRequests ?? []),
    };
  } catch {
    return undefined;
  }
}

export async function getOrCreatePlayerId() {
  const jar = await cookies();
  const existing = jar.get(PLAYER_COOKIE)?.value;
  if (existing && /^[0-9a-f-]{36}$/i.test(existing)) return existing;
  const playerId = randomUUID();
  jar.set(PLAYER_COOKIE, playerId, cookieOptions(YEAR));
  return playerId;
}

export async function saveSession(session: SessionRecord) {
  const payload = JSON.stringify(serialize(session));
  if (!isDatabaseConfigured()) {
    const jar = await cookies();
    jar.set(cookieName(session.id), payload, cookieOptions(WEEK));
    return;
  }

  const playerId = await getOrCreatePlayerId();
  const expires = new Date(Date.now() + WEEK * 1000);
  await query(
    `INSERT INTO game_sessions (id, player_id, payload, expires_at, updated_at)
     VALUES ($1, $2, $3::jsonb, $4, NOW())
     ON CONFLICT (id) DO UPDATE
     SET payload = EXCLUDED.payload,
         expires_at = EXCLUDED.expires_at,
         updated_at = NOW()
     WHERE game_sessions.player_id = EXCLUDED.player_id`,
    [session.id, playerId, payload, expires.toISOString()],
  );
}

export async function getSession(id: string): Promise<SessionRecord | undefined> {
  if (!isDatabaseConfigured()) {
    const jar = await cookies();
    const raw = jar.get(cookieName(id))?.value;
    if (!raw) return undefined;
    try {
      const session = deserialize(JSON.parse(raw));
      if (!session || session.id !== id) return undefined;
      return session;
    } catch {
      return undefined;
    }
  }

  const playerId = await getOrCreatePlayerId();
  const result = await query<{ payload: StoredSession }>(
    `SELECT payload
     FROM game_sessions
     WHERE id = $1 AND player_id = $2 AND expires_at > NOW()`,
    [id, playerId],
  );
  const session = deserialize(result.rows[0]?.payload);
  if (!session || session.id !== id) return undefined;
  return session;
}

export async function getOwnedSession(id: string, playerId: string) {
  if (!isDatabaseConfigured()) {
    const session = await getSession(id);
    return session;
  }
  const result = await query<{ payload: StoredSession }>(
    `SELECT payload
     FROM game_sessions
     WHERE id = $1 AND player_id = $2`,
    [id, playerId],
  );
  const session = deserialize(result.rows[0]?.payload);
  if (!session || session.id !== id) return undefined;
  return session;
}
