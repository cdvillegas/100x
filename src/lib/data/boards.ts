import { BANDS } from "../types";
import type { EraNote, PublicBoard, PublicCandidate } from "../types";
import { ENTRY_DATES, resolveFirm, type RawRow } from "./fixtures";
import {
  AS_OF_DATE,
  holdReturn,
  yearsHeld,
} from "./hold-returns";
import { sectorLabel, sectorOf } from "./sectors";
import { afterStory, sectorContext, thenStory, yearClimate } from "./stories";
import { YEAR_UNIVERSE } from "./universe";

export interface FullCandidate extends PublicCandidate {
  forwardTotalReturn: number;
  outcomeNotes: string | null;
}

export interface FullBoard {
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
  candidates: FullCandidate[];
  boardAverage: number;
}

export const METHODOLOGY_VERSION = "hold-to-today-v1";

function pct(value: number | null): number | null {
  return value == null ? null : value / 100;
}

function toCandidate(
  row: RawRow,
  year: number,
  rank: number,
): FullCandidate {
  const [ticker, mcapB, revenueB, growthPct, marginPct, pe, trailPct] = row;
  const firm = resolveFirm(ticker, year);
  const sector = sectorOf(ticker);
  const fwd = holdReturn(year, ticker);
  return {
    id: `${year}-${rank}-${firm.id}`,
    companyId: firm.id,
    year,
    name: firm.name,
    ticker: firm.ticker,
    description: firm.description,
    thenStory: thenStory(year, ticker),
    sector,
    sectorLabel: sectorLabel(sector),
    sectorContext: sectorContext(year, sector),
    marketCapRank: rank,
    marketCap: mcapB * 1e9,
    revenue: revenueB == null ? null : revenueB * 1e9,
    revenueGrowth: pct(growthPct),
    netMargin: pct(marginPct),
    peRatio: pe,
    trailingReturn: pct(trailPct),
    forwardTotalReturn: fwd,
    outcomeNotes: afterStory(year, ticker),
  };
}

function buildYearBoards(year: number): FullBoard[] {
  const rows = YEAR_UNIVERSE[year];
  const dates = ENTRY_DATES[year];
  if (!rows || !dates) throw new Error(`Missing fixture year ${year}`);
  if (rows.length !== 100) throw new Error(`Year ${year} needs 100 companies`);

  return BANDS.map((band, bandIndex) => {
    const slice = rows.slice(bandIndex * 10, bandIndex * 10 + 10);
    const candidates = slice
      .map((row, i) => toCandidate(row, year, band.rankStart + i))
      .sort((a, b) => b.marketCap - a.marketCap)
      .map((candidate, i) => ({
        ...candidate,
        marketCapRank: band.rankStart + i,
        id: `${year}-${band.rankStart + i}-${candidate.companyId}`,
      }));

    const boardAverage =
      candidates.reduce((sum, c) => sum + c.forwardTotalReturn, 0) /
      candidates.length;

    return {
      id: `${year}-${band.key}`,
      year,
      entryDate: dates.entry,
      exitDate: AS_OF_DATE,
      asOfDate: AS_OF_DATE,
      yearsHeld: yearsHeld(year),
      rankStart: band.rankStart,
      rankEnd: band.rankEnd,
      bandLabel: band.label,
      climate: yearClimate(year),
      candidates,
      boardAverage,
    };
  });
}

export const BOARDS: FullBoard[] = Object.keys(YEAR_UNIVERSE)
  .map(Number)
  .sort((a, b) => a - b)
  .flatMap(buildYearBoards);

export const YEARS = [...new Set(BOARDS.map((b) => b.year))];
export const BAND_LABELS = BANDS.map((b) => b.label);

const BOARD_BY_ID = new Map(BOARDS.map((b) => [b.id, b]));

export function getBoard(id: string): FullBoard {
  const board = BOARD_BY_ID.get(id);
  if (!board) throw new Error(`Unknown board ${id}`);
  return board;
}

export function toPublicBoard(board: FullBoard): PublicBoard {
  return {
    id: board.id,
    year: board.year,
    entryDate: board.entryDate,
    exitDate: board.exitDate,
    asOfDate: board.asOfDate,
    yearsHeld: board.yearsHeld,
    rankStart: board.rankStart,
    rankEnd: board.rankEnd,
    bandLabel: board.bandLabel,
    climate: board.climate,
    candidates: board.candidates.map((c) => ({
      id: c.id,
      companyId: c.companyId,
      year: c.year,
      name: c.name,
      ticker: c.ticker,
      description: c.description,
      thenStory: c.thenStory,
      sector: c.sector,
      sectorLabel: c.sectorLabel,
      sectorContext: c.sectorContext,
      marketCapRank: c.marketCapRank,
      marketCap: c.marketCap,
      revenue: c.revenue,
      revenueGrowth: c.revenueGrowth,
      netMargin: c.netMargin,
      peRatio: c.peRatio,
      trailingReturn: c.trailingReturn,
    })),
  };
}

export function getSealed(candidateId: string) {
  for (const board of BOARDS) {
    const candidate = board.candidates.find((c) => c.id === candidateId);
    if (candidate) {
      const ranked = [...board.candidates].sort(
        (a, b) => b.forwardTotalReturn - a.forwardTotalReturn,
      );
      return {
        board,
        candidate,
        forwardRank: ranked.findIndex((c) => c.id === candidateId) + 1,
      };
    }
  }
  return null;
}

export function oracleReturn(board: FullBoard): number {
  return oracleCandidate(board).forwardTotalReturn;
}

export function oracleCandidate(board: FullBoard): FullCandidate {
  return board.candidates.reduce((best, candidate) =>
    candidate.forwardTotalReturn > best.forwardTotalReturn ? candidate : best,
  );
}
