"use client";

import { useEffect, useState } from "react";
import {
  formatHoldReturn,
  formatMoney,
  formatMultiplier,
  signedClass,
  tierLabel,
} from "@/lib/format";
import type {
  BestPossiblePick,
  RevealPayload,
  RevealedPick,
} from "@/lib/types";
import { STARTING_BANKROLL, TARGET_BANKROLL } from "@/lib/types";

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
  if (!pick) {
    return (
      <div className="flex h-28 items-center rounded-2xl border border-white/[0.07] bg-white/[0.015] px-4">
        <span className="text-[10px] tracking-[0.2em] text-muted/40">
          {String(slot + 1).padStart(2, "0")}
        </span>
      </div>
    );
  }

  const tone = signedClass(pick.forwardTotalReturn);
  return (
    <div
      className={`rise-in h-28 rounded-2xl border px-4 py-3 has-[details[open]]:h-auto ${
        active
          ? "border-lime/60 bg-[#163225] shadow-[0_0_32px_rgb(176_255_72_/_0.1)]"
          : "border-white/10 bg-[#12211b]"
      }`}
    >
      <div className="flex min-h-14 items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[10px] tracking-[0.14em] text-muted">
            {pick.year} · {pick.bandLabel} · #{pick.forwardRank} of 10
          </div>
          <div className="mt-0.5 truncate text-lg font-semibold">{pick.name}</div>
          <div className="text-xs text-muted">{pick.ticker} · $2,000</div>
        </div>
        <div className="shrink-0 text-right">
          <div
            className={`display text-2xl ${
              tone === "up"
                ? "text-lime"
                : tone === "down"
                  ? "text-coral"
                  : "text-ink"
            }`}
          >
            {active ? (
              <CountUp
                key={pick.candidateId}
                value={pick.todayValue}
                reducedMotion={reducedMotion}
              />
            ) : (
              formatMoney(pick.todayValue)
            )}
          </div>
          <div className="text-xs text-muted">
            {formatHoldReturn(pick.forwardTotalReturn)}
          </div>
        </div>
      </div>
      {pick.outcomeNotes ? (
        <details className="group mt-2 border-t border-white/[0.07] pt-2">
          <summary className="cursor-pointer list-none text-[10px] tracking-[0.16em] text-muted transition-colors hover:text-ink">
            <span className="group-open:hidden">WHAT HAPPENED?</span>
            <span className="hidden group-open:inline">HIDE STORY</span>
          </summary>
          <p className="mt-2 text-sm leading-6 text-ink/85">{pick.outcomeNotes}</p>
        </details>
      ) : null}
    </div>
  );
}

function BestPossibleRow({ pick }: { pick: BestPossiblePick }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-amber/15 py-3 last:border-0">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="display text-lg">{pick.name}</span>
          {pick.wasSelected ? (
            <span className="rounded-full border border-lime/30 bg-lime/10 px-2 py-0.5 text-[9px] tracking-[0.14em] text-lime">
              YOU PICKED IT
            </span>
          ) : null}
        </div>
        <div className="text-xs text-muted">
          {pick.ticker} · {pick.year} · {pick.bandLabel}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="display text-xl text-amber">
          {formatHoldReturn(pick.forwardTotalReturn)}
        </div>
        <div className="text-xs text-muted">{formatMoney(pick.todayValue)}</div>
      </div>
    </div>
  );
}

export default function Reveal({
  payload,
  index,
  skipped,
  reducedMotion,
  onAdvance,
  onSkip,
  onAgain,
  onShare,
}: {
  payload: RevealPayload;
  index: number;
  skipped: boolean;
  reducedMotion: boolean;
  onAdvance: () => void;
  onSkip: () => void;
  onAgain: () => void;
  onShare: () => void;
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
    <div className="fixed inset-0 z-40 overflow-y-auto bg-[#07110d]/96 px-4 py-6">
      <div className={`mx-auto min-h-full max-w-2xl ${done ? "pb-24" : ""}`}>
        <div className="mb-4 flex items-center justify-between text-xs tracking-[0.16em] text-muted">
          <span>YOUR RESULTS</span>
          <button
            type="button"
            onClick={onSkip}
            disabled={done}
            aria-hidden={done}
            className={`text-ink ${done ? "invisible pointer-events-none" : ""}`}
          >
            Skip reveal
          </button>
        </div>

        <div className="mb-4 rounded-2xl border border-lime/20 bg-lime/[0.025] px-4 py-3 sm:px-5 sm:py-4">
          <div className="text-[10px] tracking-[0.18em] text-muted">
            {done ? "FINAL PORTFOLIO" : "PORTFOLIO VALUE"}
          </div>
          <div className="mt-1 flex items-end justify-between gap-4">
            <div className="display text-4xl font-semibold sm:text-5xl">
              <CountUp
                key={`total-${index}-${done}`}
                from={done ? payload.endingBankroll : previousTotal}
                value={runningTotal}
                reducedMotion={reducedMotion}
              />
            </div>
            <div className="text-right">
              <div className="display text-2xl text-lime sm:text-3xl">
                <CountUp
                  key={`multiplier-${index}-${done}`}
                  from={done ? payload.multiplier : previousMultiplier}
                  value={runningMultiplier}
                  reducedMotion={reducedMotion}
                  formatter={formatMultiplier}
                />
              </div>
              {done ? (
                <div className="text-xs text-muted">{tierLabel(payload.tier)}</div>
              ) : null}
            </div>
          </div>
          <div className="mt-1 text-xs text-muted">
            Target {formatMoney(TARGET_BANKROLL)}
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
            <div className="mt-6 rounded-2xl border border-amber/45 bg-amber/[0.045] p-4">
              <div className="text-[11px] tracking-[0.18em] text-amber">
                BEST PORTFOLIO AVAILABLE
              </div>
              <p className="mt-1 text-xs leading-5 text-muted">
                The best-performing company from each of your five boards.
                You found {bestPickCount} of 5.
              </p>
              <div className="mt-2">
                {payload.bestPossiblePicks.map((pick) => (
                  <BestPossibleRow key={pick.boardId} pick={pick} />
                ))}
              </div>
              <div className="mt-3 flex items-end justify-between gap-4 border-t border-amber/25 pt-3">
                <div>
                  <div className="text-xs text-muted">Best possible total</div>
                  <div className="display text-3xl text-amber">
                    {formatMoney(payload.oracleBankroll)}
                  </div>
                </div>
                <div className="text-right text-xs leading-5 text-muted">
                  {formatMoney(
                    Math.max(0, payload.oracleBankroll - payload.endingBankroll),
                  )}{" "}
                  more than your picks
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {done ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#07110d]/92 backdrop-blur-md">
          <div className="mx-auto flex max-w-2xl gap-3 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
            <button
              type="button"
              className="pressable min-w-0 flex-1 rounded-2xl bg-lime py-3.5 text-sm font-bold tracking-[0.16em] text-[#10210f]"
              onClick={onAgain}
            >
              PLAY AGAIN
            </button>
            <button
              type="button"
              className="pressable shrink-0 rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-semibold tracking-[0.12em]"
              onClick={onShare}
            >
              SHARE
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
