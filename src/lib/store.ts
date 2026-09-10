import { cookies } from "next/headers";
import type { SessionRecord } from "./engine";

const COOKIE_PREFIX = "x100_";
const WEEK = 60 * 60 * 24 * 7;

type StoredSession = Omit<
  SessionRecord,
  "spinRequests" | "respinRequests" | "pickRequests"
> & {
  spinRequests: string[];
  respinRequests: string[];
  pickRequests: [string, string][];
};

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
  return JSON.stringify(stored);
}

function deserialize(raw: string): SessionRecord | undefined {
  try {
    const stored = JSON.parse(raw) as StoredSession;
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

export async function saveSession(session: SessionRecord) {
  const jar = await cookies();
  jar.set(cookieName(session.id), serialize(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.VERCEL === "1",
    path: "/",
    maxAge: WEEK,
  });
}

export async function getSession(id: string): Promise<SessionRecord | undefined> {
  const jar = await cookies();
  const raw = jar.get(cookieName(id))?.value;
  if (!raw) return undefined;
  const session = deserialize(raw);
  if (!session || session.id !== id) return undefined;
  return session;
}
