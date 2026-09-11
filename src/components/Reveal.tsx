"use client";

import { useEffect, useMemo, useState } from "react";
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
import { TARGET_BANKROLL } from "@/lib/types";

function CountUp({
  value,
  reducedMotion,
}: {
  value: number;
  reducedMotion: boolean;
}) {
  const [shown, setShown] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (reducedMotion) {
      setShown(value);
      return;
    }
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 700);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(from + (value - from) * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [value, reducedMotion]);

  return <span className="tabular">{formatMoney(shown)}</span>;
}

function PickCard({
  pick,
  active,
}: {
  pick: RevealedPick;
  active: boolean;
}) {
  const tone = signedClass(pick.forwardTotalReturn);
  return (
    <div
      className={`rounded-2xl border px-4 py-4 ${
        active ? "border-lime/50 bg-[#163225]" : "border-white/10 bg-[#12211b]"
      }`}
    >
      <div className="text-xs tracking-[0.16em] text-muted">
        {pick.year} · {pick.bandLabel} · held {Math.round(pick.yearsHeld * 10) / 10} years
      </div>
      <div className="mt-1 flex items-end justify-between gap-3">
        <div>
          <div className="display text-2xl">{pick.name}</div>
          <div className="text-sm text-muted">
            {pick.ticker} · {formatMoney(pick.entryBankroll)} then
          </div>
        </div>
        <div
          className={`display text-3xl ${
            tone === "up" ? "text-lime" : tone === "down" ? "text-coral" : "text-ink"
          }`}
        >
          {formatHoldReturn(pick.forwardTotalReturn)}
        </div>
      </div>
      <div className="mt-3 text-sm text-muted">
        {formatMoney(pick.todayValue)} modeled value · #{pick.forwardRank} of 10 ·{" "}
        {pick.beatBoard ? "Beat the board" : "Trailed the board"}
      </div>
      {pick.outcomeNotes ? (
        <div className="mt-3">
          <div className="text-[10px] tracking-[0.18em] text-lime/80">
            WHAT HAPPENED NEXT
          </div>
          <p className="mt-1.5 text-sm leading-6 text-ink/90">
            {pick.outcomeNotes}
          </p>
        </div>
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
  const current = payload.picks[Math.min(index, payload.picks.length - 1)];
  const summary = useMemo(
    () =>
      payload.picks
        .map((pick) => `${pick.ticker} ${pick.year} ${formatHoldReturn(pick.forwardTotalReturn)}`)
        .join(" · "),
    [payload.picks],
  );

  useEffect(() => {
    if (done || reducedMotion) return;
    const timer = window.setTimeout(onAdvance, 950);
    return () => window.clearTimeout(timer);
  }, [done, index, reducedMotion, onAdvance]);

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-[#07110d]/96 px-4 py-6">
      <div className="mx-auto flex min-h-full max-w-xl flex-col justify-center">
        {!done ? (
          <>
            <div className="mb-4 flex items-center justify-between text-xs tracking-[0.16em] text-muted">
              <span>
                REVEAL {index + 1} OF {payload.picks.length}
              </span>
              <button type="button" onClick={onSkip} className="text-ink">
                Skip reveal
              </button>
            </div>
            <PickCard pick={current} active />
            <div className="mt-5 rounded-2xl border border-white/10 p-4">
              <div className="text-[11px] tracking-[0.16em] text-muted">MODELED PORTFOLIO</div>
              <div className="display text-4xl text-lime">
                <CountUp
                  value={current.exitBankroll}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
            <button
              type="button"
              className="pressable mt-5 rounded-2xl bg-lime py-3.5 text-sm font-bold tracking-[0.16em] text-[#10210f]"
              onClick={onAdvance}
            >
              CONTINUE
            </button>
          </>
        ) : (
          <div className="rise-in">
            <div className="text-xs tracking-[0.18em] text-muted">MODELED FINAL BANKROLL</div>
            <div className="display text-5xl font-semibold">
              {formatMoney(payload.endingBankroll)}
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <div className="display text-3xl text-lime">
                {formatMultiplier(payload.multiplier)}
              </div>
              <div className="text-muted">{tierLabel(payload.tier)}</div>
            </div>
            <div className="mt-1 text-sm text-muted">
              Target {formatMoney(TARGET_BANKROLL)}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-white/10 p-3">
                Beat the Board
                <div className="display text-2xl">{payload.beatTheBoard}/5</div>
              </div>
              <div className="rounded-2xl border border-white/10 p-3">
                Hindsight ceiling
                <div className="display text-2xl">
                  {formatMoney(payload.oracleBankroll)}
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              {payload.picks.map((pick) => (
                <PickCard key={pick.candidateId} pick={pick} active={false} />
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-amber/45 bg-amber/[0.045] p-4">
              <div className="text-[11px] tracking-[0.18em] text-amber">
                BEST PORTFOLIO YOU COULD&apos;VE BUILT
              </div>
              <p className="mt-1 text-xs leading-5 text-muted">
                The highest modeled-value company available on each of the five
                boards you spun—not a perfect pick from the entire market.
              </p>
              <div className="mt-2">
                {payload.bestPossiblePicks.map((pick) => (
                  <BestPossibleRow key={pick.boardId} pick={pick} />
                ))}
              </div>
              <div className="mt-3 flex items-end justify-between gap-4 border-t border-amber/25 pt-3">
                <div>
                  <div className="text-xs text-muted">Hindsight bankroll</div>
                  <div className="display text-3xl text-amber">
                    {formatMoney(payload.oracleBankroll)}
                  </div>
                </div>
                <div className="text-right text-xs leading-5 text-muted">
                  {formatMoney(
                    Math.max(0, payload.oracleBankroll - payload.endingBankroll),
                  )}{" "}
                  beyond your picks
                </div>
              </div>
            </div>
            <p className="mt-4 hidden text-xs text-muted">{summary}</p>
            <div className="mt-5 grid gap-3">
              <button
                type="button"
                className="pressable rounded-2xl bg-lime py-3.5 text-sm font-bold tracking-[0.16em] text-[#10210f]"
                onClick={onAgain}
              >
                PLAY AGAIN
              </button>
              <button
                type="button"
                className="pressable rounded-2xl border border-white/15 py-3.5 text-sm font-semibold tracking-[0.16em]"
                onClick={onShare}
              >
                SHARE RESULT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
