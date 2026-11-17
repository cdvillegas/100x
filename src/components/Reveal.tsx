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
  RevealPayload,
  RevealedPick,
} from "@/lib/types";
import { STARTING_BANKROLL } from "@/lib/types";
import { shareResults } from "@/lib/share";
import { DiceIcon, PartyPopperIcon, ShareIcon } from "./icons";
import { LeaderboardPanel } from "./Leaderboard";
import { SheetHeading } from "./Sheets";
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
  return (
    <div
      className={`personal-best ${reducedMotion ? "" : "personal-best-live"}`}
      aria-label="Personal best"
    >
      <PartyPopperIcon className="size-3.5" />
      <span className="personal-best-text">PERSONAL BEST</span>
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

export default function Reveal({
  payload,
  index,
  skipped,
  reducedMotion,
  personalBest,
  gameId,
  approvedName,
  submitting,
  onAdvance,
  onSkip,
  onAgain,
  onRenamed,
}: {
  payload: RevealPayload;
  index: number;
  skipped: boolean;
  reducedMotion: boolean;
  personalBest: boolean;
  gameId: string;
  approvedName: string | null;
  submitting: boolean;
  onAdvance: () => void;
  onSkip: () => void;
  onAgain: () => void;
  onRenamed: (name: string) => void;
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
        <div className="relative mb-6 flex items-baseline justify-between gap-3">
          <SheetHeading title="RESULTS" />
          <button
            type="button"
            onClick={onSkip}
            disabled={done}
            aria-hidden={done}
            className={`eyebrow shrink-0 text-muted ${
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
            <div className="company-row mt-6 rounded-2xl px-4 py-4 sm:px-5">
              <LeaderboardPanel
                gameId={gameId}
                approvedName={approvedName}
                onRenamed={onRenamed}
                showRank
                hold={submitting}
              />
            </div>
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
                  <div className="eyebrow text-muted">BEST POSSIBLE</div>
                  <div
                    className={`hero-money mt-1 ${
                      bestPickCount === 5 ? "text-lime" : ""
                    }`}
                  >
                    {formatMultiplier(
                      payload.oracleBankroll / STARTING_BANKROLL,
                    )}
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
