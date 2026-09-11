"use client";

import type { ReactNode } from "react";
import { formatCompact, formatPct, formatPe } from "@/lib/format";
import type { PublicCandidate } from "@/lib/types";

function Row({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-white/10 py-2.5">
      <div>
        <div className="text-sm text-muted">{label}</div>
        <div className="text-xs text-muted/80">{hint}</div>
      </div>
      <div className="tabular text-base font-semibold">{value}</div>
    </div>
  );
}

function TutorialStep({
  number,
  children,
}: {
  number: number;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="display flex size-7 shrink-0 items-center justify-center rounded-full bg-lime text-sm font-bold text-[#10210f]">
        {number}
      </span>
      <span className="pt-0.5 text-sm leading-6 text-ink/90">{children}</span>
    </li>
  );
}

export default function Sheets({
  kind,
  candidate,
  onClose,
}: {
  kind: "how" | "details" | "intro" | null;
  candidate: PublicCandidate | null;
  onClose: () => void;
}) {
  if (!kind) return null;
  const isIntro = kind === "intro";

  return (
    <div
      className={`sheet-scrim fixed inset-0 z-50 flex justify-center ${
        isIntro
          ? "items-center overflow-y-auto bg-[#07110d] px-4 py-8"
          : "items-end p-3 sm:items-center"
      }`}
    >
      {!isIntro ? (
        <button
          type="button"
          className="absolute inset-0"
          aria-label="Close"
          onClick={onClose}
        />
      ) : null}
      <div
        className={`relative z-10 w-full overflow-y-auto overscroll-contain border border-white/10 shadow-2xl ${
          isIntro
            ? "max-w-2xl rounded-[32px] bg-[#0d1813] shadow-[0_0_80px_rgb(183_255_69/0.08)]"
            : "max-h-[min(90dvh,40rem)] max-w-lg rounded-[28px] bg-[#101c17]"
        }`}
      >
        <div className={isIntro ? "p-6 sm:p-9" : "p-5"}>
        {kind === "intro" && (
          <div>
            <div className="text-center">
              <div className="display text-5xl font-semibold tracking-tight sm:text-6xl">
                100<span className="text-lime">X</span>
              </div>
              <p className="mt-2 text-xs tracking-[0.24em] text-muted">
                PICK FIVE STOCKS FROM THE PAST
              </p>
              <div className="mt-7 text-[11px] tracking-[0.2em] text-lime">
                YOUR BANKROLL
              </div>
              <div className="display mt-1 text-4xl">$10,000</div>
            </div>
            <ol className="mt-7 space-y-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
              <TutorialStep number={1}>
                <strong className="text-ink">Spin once</strong> to draw a year
                and one market-cap band from the historical Top 100.
              </TutorialStep>
              <TutorialStep number={2}>
                Pick <strong className="text-ink">one of ten companies</strong>.
                You only see what an investor could have known then.
              </TutorialStep>
              <TutorialStep number={3}>
                Make five picks at <strong className="text-ink">$2,000 each</strong>.
                You get one Year Respin and one Rank Respin for the whole run.
              </TutorialStep>
              <TutorialStep number={4}>
                Every position is held until today. Returns stay sealed until
                all five choices are locked.
              </TutorialStep>
              <TutorialStep number={5}>
                Reach <strong className="text-amber">$1,000,000</strong> to hit
                100X—then see the best portfolio your five boards allowed.
              </TutorialStep>
            </ol>
            <button
              type="button"
              className="pressable mt-7 w-full rounded-2xl bg-lime py-4 text-sm font-bold tracking-[0.2em] text-[#10210f] shadow-[0_0_32px_rgb(183_255_69/0.28)]"
              onClick={onClose}
            >
              START THE RUN
            </button>
          </div>
        )}

        {kind === "how" && (
          <div className="space-y-3 text-sm leading-6">
            <h2 className="display text-2xl">How it works</h2>
            <p>Each run is five rounds. Every SPIN locks a year and an estimated market-cap band, then you pick one of ten companies from that modeled historical snapshot.</p>
            <p>Read the fact-checked world, sector, and company context. The gameplay model&apos;s estimated long-term value stays sealed until the end.</p>
            <p>You get one Year Respin and one Rank Respin for the whole run.</p>
            <p>Your $10,000 splits into five $2,000 positions. Their modeled values are added together. Hit $1,000,000 to go 100X.</p>
            <div className="border-t border-white/10 pt-3">
              <h3 className="display text-lg">About the estimates</h3>
              <p className="mt-2 text-muted">
                Historical context is anchored to each entry date using
                contemporaneous reporting and documented company history.
                Market-cap ranks, financials, and long-term values include
                deterministic gameplay estimates—not licensed quotes or
                audited total-return data.
              </p>
              <p className="mt-2 text-muted">
                Historical simulation for entertainment only. Not investment
                advice. No real money or trading.
              </p>
            </div>
          </div>
        )}

        {kind === "details" && candidate && (
          <div>
            <div className="mb-1 text-xs tracking-[0.16em] text-muted">
              {candidate.ticker} · #{candidate.marketCapRank} · {candidate.sectorLabel}
            </div>
            <h2 className="display text-3xl">{candidate.name}</h2>
            <div className="mt-4">
              <div className="text-[11px] tracking-[0.18em] text-muted">OVERVIEW</div>
              <p className="mt-2 text-sm leading-6 text-muted">{candidate.description}</p>
            </div>
            <div className="mt-4 rounded-2xl border border-amber/25 bg-[#1a2414] p-4">
              <div className="text-[11px] tracking-[0.18em] text-amber">
                AT THE TIME · {candidate.year}
              </div>
              <p className="mt-2 text-sm leading-6">{candidate.thenStory}</p>
            </div>
            <div className="mt-3 rounded-2xl border border-lime/20 bg-lime/[0.035] p-4">
              <div className="text-[11px] tracking-[0.18em] text-lime">
                {candidate.sectorLabel.toUpperCase()} · {candidate.year}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">
                {candidate.sectorContext}
              </p>
            </div>
            <div className="mt-4">
              <p className="mb-1 text-xs leading-5 text-muted">
                Financial figures below are gameplay estimates, not a licensed
                point-in-time data feed.
              </p>
              <Row label="Market cap" value={formatCompact(candidate.marketCap)} hint="Estimated size at the entry date" />
              <Row label="Revenue" value={formatCompact(candidate.revenue)} hint="Estimated trailing-twelve-month revenue" />
              <Row label="Revenue growth" value={formatPct(candidate.revenueGrowth)} hint="Estimated year-over-year TTM change" />
              <Row label="Net margin" value={formatPct(candidate.netMargin)} hint="Estimated net income divided by revenue" />
              <Row label="P/E" value={formatPe(candidate.peRatio)} hint="Estimated price to earnings; N/M if not meaningful" />
              <Row label="Previous twelve months" value={formatPct(candidate.trailingReturn)} hint="Estimated return before the entry date" />
            </div>
          </div>
        )}
        </div>

        {kind !== "intro" && (
          <div className="sticky bottom-0 border-t border-white/10 bg-[#101c17] p-4">
            <button
              type="button"
              className="pressable w-full rounded-2xl border border-white/10 py-3 text-sm font-semibold"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
