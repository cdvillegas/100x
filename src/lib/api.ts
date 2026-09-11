import type {
  GameView,
  LeaderboardBoard,
  LeaderboardPeriod,
  LeaderboardPlacement,
  LeaderboardSubmitResult,
  PublicSession,
} from "./types";

function requestId() {
  return crypto.randomUUID();
}

async function fetchJson(input: string, init?: RequestInit, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, {
      credentials: "same-origin",
      ...init,
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timer);
  }
}

async function readJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export async function createGame() {
  return readJson<PublicSession>(
    await fetchJson("/api/games", { method: "POST" }),
  );
}

export async function loadGame(id: string) {
  const res = await fetchJson(`/api/games/${id}`);
  if (res.status === 404) return null;
  return readJson<PublicSession>(res);
}

export async function spinGame(id: string) {
  return readJson<PublicSession>(
    await fetchJson(`/api/games/${id}/spin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: requestId() }),
    }),
  );
}

export async function respinGame(id: string, type: "year" | "rank") {
  return readJson<PublicSession>(
    await fetchJson(`/api/games/${id}/respin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, requestId: requestId() }),
    }),
  );
}

export async function pickGame(id: string, candidateId: string) {
  return readJson<PublicSession>(
    await fetchJson(`/api/games/${id}/picks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidateId, requestId: requestId() }),
    }),
  );
}

export async function revealGame(id: string) {
  return readJson<GameView>(
    await fetchJson(`/api/games/${id}/reveal`, { method: "POST" }),
  );
}

export async function fetchLeaderboard(
  period: LeaderboardPeriod,
  gameId?: string,
) {
  const params = new URLSearchParams({ period });
  if (gameId) params.set("gameId", gameId);
  return readJson<{
    board: LeaderboardBoard;
    placements: LeaderboardPlacement[];
  }>(await fetchJson(`/api/leaderboard?${params.toString()}`));
}

export async function submitLeaderboard(gameId: string, displayName: string) {
  return readJson<LeaderboardSubmitResult>(
    await fetchJson("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, displayName }),
    }),
  );
}

export async function renameLeaderboard(displayName: string) {
  return readJson<{ displayName: string }>(
    await fetchJson("/api/leaderboard", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName }),
    }),
  );
}
