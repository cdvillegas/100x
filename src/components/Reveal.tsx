"use client";

import { useEffect, useState } from "react";
import {
  formatHoldReturn,
  formatMoney,
  formatMultiplier,
  signedClass,
} from "@/lib/format";
import type {
  BestPossiblePick,
  LeaderboardBoard,
  LeaderboardPlacement,
  LeaderboardRow,
  RevealPayload,
  RevealedPick,
} from "@/lib/types";
import { STARTING_BANKROLL } from "@/lib/types";
import { shareResults } from "@/lib/share";
import { DiceIcon, ShareIcon } from "./icons";
import Confetti from "./Confetti";

function CountUp({
  from = 0,
  value,
  reducedMotion,
  formatter = formatMoney,
}: {
  from?: number;
  value: number;
  reducedMotion: boolean;
  formatter?: (value: number) => string;
}) {
  const [shown, setShown] = useState(reducedMotion ? value : from);

  useEffect(() => {
    if (reducedMotion) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 700);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(from + (value - from) * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [from, value, reducedMotion]);

  return (
    <span className="tabular">
      {formatter(reducedMotion ? value : shown)}
    </span>
  );
}

function PersonalBestLabel({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) {
    return <div className="eyebrow text-lime">PERSONAL BEST</div>;
  }

  return (
    <div className="eyebrow personal-best" aria-label="Personal best">
      {Array.from("PERSONAL BEST").map((letter, index) => (
        <span key={`${letter}-${index}`} style={{ animationDelay: `${index * 38}ms` }}>
          {letter === " " ? "\u00a0" : letter}
        </span>
      ))}
    </div>
  );
}

function RevealSlot({
  pick,
  slot,
  active,
  reducedMotion,
}: {
  pick: RevealedPick | null;
  slot: number;
  active: boolean;
  reducedMotion: boolean;
}) {
  const tone = pick ? signedClass(pick.forwardTotalReturn) : "flat";
  const valueClass =
    tone === "up" ? "text-lime" : tone === "down" ? "text-coral" : "text-ink";

  return (
    <div
      className={`rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 ${
        pick ? "company-row rise-in" : "company-row"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <div className={`row-name truncate ${pick ? "" : "text-muted"}`}>
            {pick ? pick.name : "Sealed"}
          </div>
          <div className="row-meta mt-0.5 text-muted">
            {pick ? (
              <>
                <span className="text-lime">{pick.ticker}</span>
                {" · "}
                {pick.year} · {pick.bandLabel}
              </>
            ) : (
              "Held until today"
            )}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className={`display text-3xl ${pick ? valueClass : "text-muted/40"}`}>
            {pick ? (
              active ? (
                <CountUp
                  key={pick.candidateId}
                  value={pick.todayValue}
                  reducedMotion={reducedMotion}
                />
              ) : (
                formatMoney(pick.todayValue)
              )
            ) : (
              "—"
            )}
          </div>
          <div className="stat-label">
            {pick ? formatHoldReturn(pick.forwardTotalReturn) : "—"}
          </div>
        </div>
      </div>
      {pick?.outcomeNotes ? (
        <details className="group mt-2 border-t border-white/[0.07] pt-2">
          <summary className="eyebrow cursor-pointer list-none text-muted transition-colors hover:text-ink">
            <span className="group-open:hidden">WHAT HAPPENED?</span>
            <span className="hidden group-open:inline">HIDE STORY</span>
          </summary>
          <p className="mt-2 text-sm leading-6 text-ink/85">{pick.outcomeNotes}</p>
        </details>
      ) : (
        <div
          className="mt-2 border-t border-white/[0.07] pt-2 eyebrow text-muted/50"
          aria-hidden={Boolean(pick)}
        >
          {pick ? "\u00a0" : "SEALED"}
        </div>
      )}
    </div>
  );
}

function BestPossibleRow({ pick }: { pick: BestPossiblePick }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 py-3.5 last:border-0">
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <div className="row-name truncate">{pick.name}</div>
          {pick.wasSelected ? (
            <span className="shrink-0 rounded-full border border-lime/30 bg-lime/10 px-2 py-0.5 text-[10px] font-bold tracking-[0.14em] text-lime">
              PICKED
            </span>
          ) : null}
        </div>
        <div className="row-meta mt-0.5 text-muted">
          <span className="text-lime">{pick.ticker}</span>
          {" · "}
          {pick.year} · {pick.bandLabel}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="display text-2xl text-lime">
          {formatHoldReturn(pick.forwardTotalReturn)}
        </div>
        <div className="stat-label">
          {formatMoney(pick.todayValue)}
        </div>
      </div>
    </div>
  );
}

function periodLabel(period: LeaderboardPlacement["period"]) {
  if (period === "daily") return "Daily";
  if (period === "weekly") return "Weekly";
  return "All Time";
}

function MiniRow({ row }: { row: LeaderboardRow }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 border-b border-white/10 py-3.5 last:border-0 ${
        row.isYou ? "text-lime" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`display w-10 shrink-0 text-lg leading-none ${
            row.isYou ? "" : "text-muted"
          }`}
        >
          #{row.rank}
        </span>
        <span className="row-name truncate">{row.name}</span>
      </div>
      <div className="shrink-0 text-right">
        <div className="display text-xl tracking-tight">
          {formatMultiplier(row.multiplier)}
        </div>
        <div className="stat-label mt-0.5">{formatMoney(row.bankroll)}</div>
      </div>
    </div>
  );
}

function PlacementCard({
  placements,
  preview,
  hasChosenName,
  draftName,
  submitting,
  error,
  onDraftName,
  onSubmitName,
  onRetry,
  onOpenBoard,
}: {
  placements: LeaderboardPlacement[];
  preview: LeaderboardBoard | null;
  hasChosenName: boolean;
  draftName: string;
  submitting: boolean;
  error: string | null;
  onDraftName: (value: string) => void;
  onSubmitName: () => void;
  onRetry: () => void;
  onOpenBoard: () => void;
}) {
  const highlight =
    placements.find((item) => item.first) ??
    placements.find((item) => item.topTen) ??
    placements[0] ??
    preview?.placement ??
    null;
  const you = preview?.you;
  const rank = you?.rank ?? highlight?.rank;
  const rows = preview?.rows.slice(0, 8) ?? [];

  return (
    <div className="company-row mt-6 rounded-2xl px-4 py-4 sm:px-5">
      <div className="eyebrow text-muted">LEADERBOARD</div>
      {rank ? (
        <div className="mt-4 grid grid-cols-2 items-start">
          <div>
            <div className="eyebrow text-muted">RANK</div>
            <div className="display mt-1 text-4xl text-lime">
              #{rank}
            </div>
          </div>
          <div className="text-right">
            <div className="eyebrow text-muted">
              {highlight ? periodLabel(highlight.period).toUpperCase() : "DAILY"}
            </div>
            <div className="display mt-1 text-3xl tabular">
              {highlight ? highlight.total : "—"}
            </div>
            <div className="stat-label mt-1">runs</div>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted">
          {submitting ? "Saving…" : (error ?? "Loading…")}
        </p>
      )}

      {placements.length > 1 ? (
        <p className="mt-3 text-xs text-muted">
          {placements
            .map((item) => `#${item.rank} ${periodLabel(item.period)}`)
            .join(" · ")}
        </p>
      ) : null}

      {rows.length > 0 ? (
        <div className="mt-4 border-t border-white/10">
          {rows.map((row) => (
            <MiniRow
              key={`${row.rank}-${row.name}-${row.completedAt}`}
              row={row}
            />
          ))}
        </div>
      ) : null}

      {error && !rank ? (
        <button
          type="button"
          className="eyebrow mt-3 text-lime"
          onClick={onRetry}
        >
          RETRY
        </button>
      ) : null}

      {!hasChosenName && rank ? (
        <form
          className="mt-5 border-t border-white/10 pt-5"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmitName();
          }}
        >
          <div className="eyebrow text-muted">NAME</div>
          <div className="mt-2 flex gap-2">
            <input
              value={draftName}
              onChange={(event) => onDraftName(event.target.value)}
              maxLength={20}
              autoComplete="nickname"
              placeholder="Name"
              className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-bg px-4 py-3 text-ink outline-none"
            />
            <button
              type="submit"
              disabled={submitting || draftName.trim().length < 2}
              className="pressable shrink-0 rounded-2xl border border-white/10 px-4 py-3 text-xs font-bold tracking-[0.14em] text-ink disabled:opacity-40"
            >
              {submitting ? "SAVING" : "SAVE"}
            </button>
          </div>
          {error ? <p className="mt-2 text-sm text-coral">{error}</p> : null}
        </form>
      ) : null}

      <button
        type="button"
        className="pressable btn-quiet mt-5 w-full rounded-2xl py-4 text-base"
        onClick={onOpenBoard}
      >
        LEADERBOARD
      </button>
    </div>
  );
}

export default function Reveal({
  payload,
  index,
  skipped,
  reducedMotion,
  placements,
  preview,
  personalBest,
  hasChosenName,
  draftName,
  submitting,
  submitError,
  onAdvance,
  onSkip,
  onAgain,
  onDraftName,
  onSubmitName,
  onRetry,
  onOpenBoard,
}: {
  payload: RevealPayload;
  index: number;
  skipped: boolean;
  reducedMotion: boolean;
  placements: LeaderboardPlacement[];
  preview: LeaderboardBoard | null;
  personalBest: boolean;
  hasChosenName: boolean;
  draftName: string;
  submitting: boolean;
  submitError: string | null;
  onAdvance: () => void;
  onSkip: () => void;
  onAgain: () => void;
  onDraftName: (value: string) => void;
  onSubmitName: () => void;
  onRetry: () => void;
  onOpenBoard: () => void;
}) {
  const done = skipped || index >= payload.picks.length;
  const runningTotal =
    index < 0
      ? 0
      : index >= payload.picks.length
      ? payload.endingBankroll
      : payload.picks[index].exitBankroll;
  const previousTotal = index > 0 ? payload.picks[index - 1].exitBankroll : 0;
  const runningMultiplier = runningTotal / STARTING_BANKROLL;
  const previousMultiplier = previousTotal / STARTING_BANKROLL;
  const bestPickCount = payload.bestPossiblePicks.filter(
    (pick) => pick.wasSelected,
  ).length;

  useEffect(() => {
    if (done) return;
    const delay = reducedMotion ? 180 : index < 0 ? 450 : 1050;
    const timer = window.setTimeout(onAdvance, delay);
    return () => window.clearTimeout(timer);
  }, [done, index, reducedMotion, onAdvance]);

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-bg/96 px-4 py-6">
      <Confetti active={done && personalBest && !reducedMotion} />
      <div className={`mx-auto min-h-full max-w-xl ${done ? "pb-28 sm:pb-24" : ""}`}>
        <div className="relative mb-6 text-center">
          <div className="display text-5xl tracking-tight">
            100<span className="text-lime glow-text">X</span>
          </div>
          <p className="eyebrow mt-3 text-muted">RESULTS</p>
          <button
            type="button"
            onClick={onSkip}
            disabled={done}
            aria-hidden={done}
            className={`eyebrow absolute right-0 top-2 text-muted ${
              done ? "invisible pointer-events-none" : ""
            }`}
          >
            SKIP
          </button>
        </div>

        <div className="company-row mb-4 rounded-2xl px-4 py-4 sm:px-5">
          <div className="grid grid-cols-2 items-start">
            <div>
              {done && personalBest ? (
                <PersonalBestLabel reducedMotion={reducedMotion} />
              ) : (
                <div className="eyebrow text-muted">
                  {done ? "BANKROLL" : "PORTFOLIO"}
                </div>
              )}
              <div className="display mt-1 text-4xl">
                <CountUp
                  key={`total-${index}-${done}`}
                  from={done ? payload.endingBankroll : previousTotal}
                  value={runningTotal}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
            <div className="text-right">
              <div className="eyebrow text-muted">RETURN</div>
              <div className="display mt-1 text-4xl text-lime">
                <CountUp
                  key={`multiplier-${index}-${done}`}
                  from={done ? payload.multiplier : previousMultiplier}
                  value={runningMultiplier}
                  reducedMotion={reducedMotion}
                  formatter={formatMultiplier}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          {payload.picks.map((pick, slot) => (
            <RevealSlot
              key={pick.candidateId}
              pick={done || slot <= index ? pick : null}
              slot={slot}
              active={!done && slot === index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {done ? (
          <div className="rise-in">
            <PlacementCard
              placements={placements}
              preview={preview}
              hasChosenName={hasChosenName}
              draftName={draftName}
              submitting={submitting}
              error={submitError}
              onDraftName={onDraftName}
              onSubmitName={onSubmitName}
              onRetry={onRetry}
              onOpenBoard={onOpenBoard}
            />
            <div className="company-row mt-6 rounded-2xl px-4 py-4 sm:px-5">
              <div
                className={`eyebrow ${
                  bestPickCount === 5 ? "text-lime" : "text-muted"
                }`}
              >
                {bestPickCount === 5 ? "PERFECT BOARD" : "BEST AVAILABLE"}
              </div>
              <p className="mt-1 text-sm text-muted">{bestPickCount} of 5</p>
              <div className="mt-2">
                {payload.bestPossiblePicks.map((pick) => (
                  <BestPossibleRow key={pick.boardId} pick={pick} />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 items-start border-t border-white/10 pt-5">
                <div>
                  <div className="eyebrow text-muted">BEST TOTAL</div>
                  <div
                    className={`hero-money mt-1 ${
                      bestPickCount === 5 ? "text-lime" : ""
                    }`}
                  >
                    {formatMoney(payload.oracleBankroll)}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`eyebrow ${
                      bestPickCount === 5 ? "text-lime" : "text-amber"
                    }`}
                  >
                    {bestPickCount === 5 ? "MATCHED" : "MISSED GAINS"}
                  </div>
                  <div
                    className={`hero-money mt-1 ${
                      bestPickCount === 5 ? "text-lime" : "text-amber"
                    }`}
                  >
                    {bestPickCount === 5
                      ? formatMoney(0)
                      : formatMoney(
                          Math.max(
                            0,
                            payload.oracleBankroll - payload.endingBankroll,
                          ),
                        )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {done ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-bg/92 backdrop-blur-md">
          <div className="mx-auto flex max-w-xl gap-2 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:gap-3">
            <button
              type="button"
              className="pressable btn-quiet flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3 text-sm sm:min-h-14 sm:py-4 sm:text-base"
              onClick={onAgain}
            >
              <DiceIcon />
              SPIN AGAIN
            </button>
            <button
              type="button"
              className="pressable btn-lime share-pulse flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3 text-sm sm:min-h-14 sm:py-4 sm:text-base"
              onClick={() => {
                void shareResults(payload, window.location.origin);
              }}
            >
              <ShareIcon />
              SHARE
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
