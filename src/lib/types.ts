export const STARTING_BANKROLL = 10_000;
export const TARGET_BANKROLL = 1_000_000;
export const PICKS_PER_RUN = 5;
export const PICK_STAKE = STARTING_BANKROLL / PICKS_PER_RUN;

export const BANDS = [
  { key: "top10", label: "TOP 10", rankStart: 1, rankEnd: 10 },
  { key: "11-20", label: "#11–20", rankStart: 11, rankEnd: 20 },
  { key: "21-30", label: "#21–30", rankStart: 21, rankEnd: 30 },
  { key: "31-40", label: "#31–40", rankStart: 31, rankEnd: 40 },
  { key: "41-50", label: "#41–50", rankStart: 41, rankEnd: 50 },
  { key: "51-60", label: "#51–60", rankStart: 51, rankEnd: 60 },
  { key: "61-70", label: "#61–70", rankStart: 61, rankEnd: 70 },
  { key: "71-80", label: "#71–80", rankStart: 71, rankEnd: 80 },
  { key: "81-90", label: "#81–90", rankStart: 81, rankEnd: 90 },
  { key: "91-100", label: "#91–100", rankStart: 91, rankEnd: 100 },
] as const;

export type BandKey = (typeof BANDS)[number]["key"];

export type SortKey = "mcap" | "growth" | "trail";

export type SectorKey =
  | "technology"
  | "financials"
  | "energy"
  | "healthCare"
  | "consumer"
  | "industrials"
  | "communications"
  | "utilities";

export type Phase =
  | "ready"
  | "spinning"
  | "choosing"
  | "locking"
  | "awaitingReveal"
  | "revealing"
  | "results";

export type OutcomeTier =
  | "lost"
  | "green"
  | "twoX"
  | "tenX"
  | "twentyFiveX"
  | "fiftyX"
  | "hundredX";

export interface PublicCandidate {
  id: string;
  companyId: string;
  year: number;
  name: string;
  ticker: string;
  description: string;
  thenStory: string;
  sector: SectorKey;
  sectorLabel: string;
  sectorContext: string;
  marketCapRank: number;
  marketCap: number;
  revenue: number | null;
  revenueGrowth: number | null;
  netMargin: number | null;
  peRatio: number | null;
  trailingReturn: number | null;
}

export type EraMood =
  | "recession"
  | "bull"
  | "mixed"
  | "recovery"
  | "crisis"
  | "inflation"
  | "easy-money"
  | "late-cycle"
  | "war-risk"
  | "tech-wave"
  | "oil-shock"
  | "trade-war"
  | "tightening";

export interface EraNote {
  kicker: string;
  body: string;
  chips: EraMood[];
}

export interface PublicBoard {
  id: string;
  year: number;
  entryDate: string;
  exitDate: string;
  asOfDate: string;
  yearsHeld: number;
  rankStart: number;
  rankEnd: number;
  bandLabel: string;
  climate: EraNote;
  candidates: PublicCandidate[];
}

export interface LockedPick {
  boardId: string;
  candidateId: string;
  name: string;
  ticker: string;
  year: number;
  bandLabel: string;
  marketCapRank: number;
}

export interface RevealedPick extends LockedPick {
  entryBankroll: number;
  todayValue: number;
  exitBankroll: number;
  forwardTotalReturn: number;
  forwardRank: number;
  boardAverage: number;
  beatBoard: boolean;
  outcomeNotes: string | null;
  yearsHeld: number;
}

export interface BestPossiblePick extends LockedPick {
  entryBankroll: number;
  todayValue: number;
  forwardTotalReturn: number;
  wasSelected: boolean;
}

export interface PublicSession {
  id: string;
  round: number;
  yearRespinUsed: boolean;
  rankRespinUsed: boolean;
  currentBoard: PublicBoard | null;
  picks: LockedPick[];
  status: "playing" | "awaitingReveal" | "revealed";
}

export interface RevealPayload {
  picks: RevealedPick[];
  bestPossiblePicks: BestPossiblePick[];
  endingBankroll: number;
  multiplier: number;
  tier: OutcomeTier;
  beatTheBoard: number;
  oracleBankroll: number;
}

export interface GameView extends PublicSession {
  reveal: RevealPayload | null;
}

export type LeaderboardPeriod = "daily" | "weekly" | "all";

export interface LeaderboardRow {
  rank: number;
  name: string;
  bankroll: number;
  multiplier: number;
  completedAt: string;
  isYou: boolean;
}

export interface LeaderboardPlacement {
  period: LeaderboardPeriod;
  rank: number;
  total: number;
  topTen: boolean;
  first: boolean;
}

export interface LeaderboardBoard {
  period: LeaderboardPeriod;
  rows: LeaderboardRow[];
  you: LeaderboardRow | null;
  placement: LeaderboardPlacement | null;
}

export interface LeaderboardSubmitResult {
  displayName: string;
  personalBest: boolean;
  placements: LeaderboardPlacement[];
  boards: Record<LeaderboardPeriod, LeaderboardBoard>;
}
