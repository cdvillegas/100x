import { isDatabaseConfigured } from "@/lib/db";
import {
  loadBoards,
  placementsFromBoards,
  renamePlayer,
  submitRun,
  toPublicEntry,
} from "@/lib/leaderboard-service";
import {
  hasPrivateFields,
  sanitizeLeaderboardPayload,
  type LeaderboardPeriod,
} from "@/lib/leaderboard";
import { getOrCreatePlayerId } from "@/lib/store";

const PERIODS = new Set<LeaderboardPeriod>(["daily", "weekly", "all"]);

function unavailable() {
  return Response.json(
    { error: "The board is temporarily unavailable." },
    { status: 503 },
  );
}

function periodFrom(value: string | null): LeaderboardPeriod {
  if (value && PERIODS.has(value as LeaderboardPeriod)) {
    return value as LeaderboardPeriod;
  }
  return "all";
}

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) return unavailable();
  try {
    const url = new URL(request.url);
    const period = periodFrom(url.searchParams.get("period"));
    const gameId = url.searchParams.get("gameId") ?? undefined;
    const playerId = await getOrCreatePlayerId();
    const boards = await loadBoards(playerId, gameId);
    const payload = {
      board: sanitizeLeaderboardPayload(boards[period]),
      placements: placementsFromBoards(boards),
    };
    if (hasPrivateFields(payload)) {
      throw new Error("Refusing to leak private fields");
    }
    return Response.json(payload);
  } catch {
    return unavailable();
  }
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) return unavailable();
  try {
    const body = (await request.json().catch(() => ({}))) as {
      gameId?: string;
      displayName?: string;
    };
    if (!body.gameId) {
      return Response.json({ error: "Game not found" }, { status: 404 });
    }
    const playerId = await getOrCreatePlayerId();
    const entry = await submitRun(body.gameId, playerId, body.displayName);
    const boards = await loadBoards(playerId, body.gameId);
    const payload = {
      entry: toPublicEntry(entry),
      displayName: entry.displayName,
      placements: placementsFromBoards(boards),
      boards: {
        daily: sanitizeLeaderboardPayload(boards.daily),
        weekly: sanitizeLeaderboardPayload(boards.weekly),
        all: sanitizeLeaderboardPayload(boards.all),
      },
    };
    if (hasPrivateFields(payload)) {
      throw new Error("Refusing to leak private fields");
    }
    return Response.json(payload);
  } catch (error) {
    if (error instanceof Error && error.name === "NameValidationError") {
      return Response.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof Error && error.message === "Game not found") {
      return Response.json({ error: "Game not found" }, { status: 404 });
    }
    if (error instanceof Error && error.message === "Finish the run first") {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return unavailable();
  }
}

export async function PATCH(request: Request) {
  if (!isDatabaseConfigured()) return unavailable();
  try {
    const body = (await request.json().catch(() => ({}))) as {
      displayName?: string;
    };
    const playerId = await getOrCreatePlayerId();
    const displayName = await renamePlayer(playerId, body.displayName);
    return Response.json({ displayName });
  } catch (error) {
    if (error instanceof Error && error.name === "NameValidationError") {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return unavailable();
  }
}
