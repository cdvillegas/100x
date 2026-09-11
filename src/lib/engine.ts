import { randomUUID } from "crypto";
import {
  BOARDS,
  getBoard,
  getSealed,
  oracleCandidate,
  oracleReturn,
  toPublicBoard,
} from "./data/boards";
import { outcomeTier } from "./format";
import {
  PICKS_PER_RUN,
  PICK_STAKE,
  STARTING_BANKROLL,
  type BestPossiblePick,
  type GameView,
  type LockedPick,
  type PublicSession,
  type RevealedPick,
  type RevealPayload,
} from "./types";

export interface SessionRecord {
  id: string;
  seed: string;
  rng: number;
  round: number;
  yearRespinUsed: boolean;
  rankRespinUsed: boolean;
  usedBoardIds: string[];
  currentBoardId: string | null;
  picks: { boardId: string; candidateId: string }[];
  revealed: boolean;
  spinRequests: Set<string>;
  respinRequests: Set<string>;
  pickRequests: Map<string, string>;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFrom(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function nextRandom(session: SessionRecord): number {
  const draw = mulberry32(session.rng)();
  session.rng = (Math.floor(draw * 0xffffffff) ^ session.rng) >>> 0;
  if (session.rng === 0) session.rng = 1;
  return draw;
}

function pickBoard(
  session: SessionRecord,
  filter: (board: (typeof BOARDS)[number]) => boolean,
) {
  const pool = BOARDS.filter(
    (board) => !session.usedBoardIds.includes(board.id) && filter(board),
  );
  const fallback = BOARDS.filter(
    (board) => !session.usedBoardIds.includes(board.id),
  );
  const options = pool.length > 0 ? pool : fallback;
  if (options.length === 0) {
    throw new Error("No remaining boards");
  }
  const index = Math.floor(nextRandom(session) * options.length);
  return options[index];
}

function lockedPicks(session: SessionRecord): LockedPick[] {
  return session.picks.map((pick) => {
    const board = getBoard(pick.boardId);
    const candidate = board.candidates.find((c) => c.id === pick.candidateId);
    if (!candidate) throw new Error("Pick missing candidate");
    return {
      boardId: board.id,
      candidateId: candidate.id,
      name: candidate.name,
      ticker: candidate.ticker,
      year: board.year,
      bandLabel: board.bandLabel,
      marketCapRank: candidate.marketCapRank,
    };
  });
}

export function toPublic(session: SessionRecord): PublicSession {
  const status = session.revealed
    ? "revealed"
    : session.picks.length >= PICKS_PER_RUN
      ? "awaitingReveal"
      : "playing";
  return {
    id: session.id,
    round: Math.min(session.round, PICKS_PER_RUN),
    yearRespinUsed: session.yearRespinUsed,
    rankRespinUsed: session.rankRespinUsed,
    currentBoard: session.currentBoardId
      ? toPublicBoard(getBoard(session.currentBoardId))
      : null,
    picks: lockedPicks(session),
    status,
  };
}

export function createSession(): SessionRecord {
  const seed = randomUUID();
  return {
    id: randomUUID(),
    seed,
    rng: seedFrom(seed) || 1,
    round: 1,
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

export function spin(
  session: SessionRecord,
  requestId?: string,
): PublicSession {
  if (session.picks.length >= PICKS_PER_RUN) return toPublic(session);
  if (requestId && session.spinRequests.has(requestId) && session.currentBoardId) {
    return toPublic(session);
  }
  if (session.currentBoardId) return toPublic(session);
  const board = pickBoard(session, () => true);
  session.currentBoardId = board.id;
  session.usedBoardIds.push(board.id);
  if (requestId) session.spinRequests.add(requestId);
  return toPublic(session);
}

export function respin(
  session: SessionRecord,
  type: "year" | "rank",
  requestId?: string,
): PublicSession {
  if (!session.currentBoardId) throw new Error("Nothing to respin");
  if (session.picks.length >= PICKS_PER_RUN) return toPublic(session);
  if (requestId && session.respinRequests.has(requestId)) {
    return toPublic(session);
  }
  if (type === "year" && session.yearRespinUsed) {
    throw new Error("Year respin already used");
  }
  if (type === "rank" && session.rankRespinUsed) {
    throw new Error("Rank respin already used");
  }

  const current = getBoard(session.currentBoardId);
  session.usedBoardIds = session.usedBoardIds.filter(
    (id) => id !== current.id,
  );

  const next = pickBoard(session, (board) =>
    type === "year"
      ? board.rankStart === current.rankStart && board.year !== current.year
      : board.year === current.year && board.rankStart !== current.rankStart,
  );

  session.currentBoardId = next.id;
  session.usedBoardIds.push(next.id);
  if (type === "year") session.yearRespinUsed = true;
  else session.rankRespinUsed = true;
  if (requestId) session.respinRequests.add(requestId);
  return toPublic(session);
}

export function lockPick(
  session: SessionRecord,
  candidateId: string,
  requestId?: string,
): PublicSession {
  if (requestId && session.pickRequests.has(requestId)) {
    return toPublic(session);
  }
  if (!session.currentBoardId) throw new Error("Spin first");
  if (session.picks.length >= PICKS_PER_RUN) return toPublic(session);

  const board = getBoard(session.currentBoardId);
  const candidate = board.candidates.find((c) => c.id === candidateId);
  if (!candidate) throw new Error("Candidate is not on this board");

  session.picks.push({ boardId: board.id, candidateId });
  session.currentBoardId = null;
  session.round = Math.min(session.picks.length + 1, PICKS_PER_RUN);
  if (requestId) session.pickRequests.set(requestId, candidateId);
  return toPublic(session);
}

export function positionToday(totalReturn: number): number {
  if (totalReturn <= -1) return 0;
  return PICK_STAKE * (1 + totalReturn);
}

export function portfolioToday(returns: number[]): number {
  return returns.reduce((sum, value) => sum + positionToday(value), 0);
}

export function reveal(session: SessionRecord): RevealPayload {
  if (session.picks.length < PICKS_PER_RUN) {
    throw new Error("Lock five picks first");
  }
  session.revealed = true;

  const revealed: RevealedPick[] = [];
  const bestPossiblePicks: BestPossiblePick[] = [];
  let bankroll = 0;
  const oracleReturns: number[] = [];

  for (const pick of session.picks) {
    const sealed = getSealed(pick.candidateId);
    if (!sealed) throw new Error("Missing sealed outcome");
    const { board, candidate, forwardRank } = sealed;
    const todayValue = positionToday(candidate.forwardTotalReturn);
    const bestCandidate = oracleCandidate(board);
    bankroll += todayValue;
    oracleReturns.push(oracleReturn(board));
    bestPossiblePicks.push({
      boardId: board.id,
      candidateId: bestCandidate.id,
      name: bestCandidate.name,
      ticker: bestCandidate.ticker,
      year: board.year,
      bandLabel: board.bandLabel,
      marketCapRank: bestCandidate.marketCapRank,
      entryBankroll: PICK_STAKE,
      todayValue: positionToday(bestCandidate.forwardTotalReturn),
      forwardTotalReturn: bestCandidate.forwardTotalReturn,
      wasSelected: bestCandidate.id === candidate.id,
    });
    revealed.push({
      boardId: board.id,
      candidateId: candidate.id,
      name: candidate.name,
      ticker: candidate.ticker,
      year: board.year,
      bandLabel: board.bandLabel,
      marketCapRank: candidate.marketCapRank,
      entryBankroll: PICK_STAKE,
      todayValue,
      exitBankroll: bankroll,
      forwardTotalReturn: candidate.forwardTotalReturn,
      forwardRank,
      boardAverage: board.boardAverage,
      beatBoard: candidate.forwardTotalReturn > board.boardAverage,
      outcomeNotes: candidate.outcomeNotes,
      yearsHeld: board.yearsHeld,
    });
  }

  const endingBankroll = bankroll;
  const multiplier = endingBankroll / STARTING_BANKROLL;

  return {
    picks: revealed,
    bestPossiblePicks,
    endingBankroll,
    multiplier,
    tier: outcomeTier(multiplier),
    beatTheBoard: revealed.filter((pick) => pick.beatBoard).length,
    oracleBankroll: portfolioToday(oracleReturns),
  };
}

export function view(session: SessionRecord, withReveal: boolean): GameView {
  return {
    ...toPublic(session),
    reveal: withReveal && session.picks.length >= PICKS_PER_RUN ? reveal(session) : null,
  };
}
