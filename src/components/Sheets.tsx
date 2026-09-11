"use client";

import type { ReactNode } from "react";
import { formatCompact, formatMoney, formatPct, formatPe } from "@/lib/format";
import { STARTING_BANKROLL, TARGET_BANKROLL, type PublicCandidate } from "@/lib/types";
import { ClockIcon, GridIcon, RocketIcon } from "./icons";

function Row({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-white/10 py-3">
      <div>
        <div className="text-[15px] font-bold">{label}</div>
        <div className="mt-0.5 text-sm text-muted">{hint}</div>
      </div>
      <div className="stat-value">{value}</div>
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
    <li className="flex gap-4">
      <span className="display mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/14 text-base leading-none text-muted">
        {number}
      </span>
      <span className="text-xl font-normal leading-7 text-ink/80">
        {children}
      </span>
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
  const isGuide = isIntro || kind === "how";

  return (
    <div
      className={`sheet-scrim fixed inset-0 z-50 flex justify-center ${
        isGuide
          ? "items-start overflow-y-auto bg-bg px-4 py-4 sm:py-8"
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
          isGuide
            ? "my-auto max-w-xl shrink-0 rounded-[32px] bg-surface"
            : "max-h-[min(90dvh,40rem)] max-w-lg rounded-[28px] bg-surface"
        }`}
      >
        <div className={isGuide ? "p-6 sm:p-9" : "p-5"}>
        {isGuide && (
          <div>
            <div className="text-center">
              <div className="display text-5xl tracking-tight">
                100<span className="text-lime glow-text">X</span>
              </div>
              <p className="eyebrow mt-3 text-muted">
                PICK FIVE STOCKS FROM THE PAST
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 items-start border-y border-white/10 py-5">
              <div>
                <div className="eyebrow text-muted">BANKROLL</div>
                <div className="hero-money mt-1">
                  {formatMoney(STARTING_BANKROLL)}
                </div>
              </div>
              <div className="text-right">
                <div className="eyebrow text-muted">TARGET</div>
                <div className="hero-money mt-1 text-lime">
                  {formatMoney(TARGET_BANKROLL)}
                </div>
              </div>
            </div>
            <ol className="mt-8 space-y-5">
              <TutorialStep number={1}>
                <strong className="font-semibold text-ink">Spin</strong> to land a year
                and a market-cap rank from that year&apos;s top 100 stocks.
              </TutorialStep>
              <TutorialStep number={2}>
                Pick <strong className="font-semibold text-ink">one of ten companies</strong>.
                You only see what an investor could have known then.
              </TutorialStep>
              <TutorialStep number={3}>
                Do this <strong className="font-semibold text-ink">five times</strong> at{" "}
                <strong className="font-semibold text-ink">$2,000</strong> a pick. For the
                whole run you get one Year Respin and one Rank Respin.
              </TutorialStep>
              <TutorialStep number={4}>
                Every pick is held until today. Returns stay hidden until all
                five are locked.
              </TutorialStep>
              <TutorialStep number={5}>
                Reach <strong className="font-semibold text-lime">$1,000,000</strong> to hit
                100X. After the reveal, see the best pick from each board you faced.
              </TutorialStep>
            </ol>
            <p className="mt-8 text-center text-xs leading-5 text-muted">
              Market-cap ranks, financials, and long-term values include
              gameplay estimates. Historical simulation for entertainment
              only. Not investment advice.
            </p>
            <button
              type="button"
              className={`pressable mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base ${
                isIntro ? "btn-lime" : "btn-quiet"
              }`}
              onClick={onClose}
            >
              {isIntro ? <RocketIcon /> : null}
              {isIntro ? "LET'S PLAY" : "BACK TO GAME"}
            </button>
          </div>
        )}

        {kind === "details" && candidate && (
          <div>
            <div className="mb-1 eyebrow text-muted">
              {candidate.ticker} · #{candidate.marketCapRank} · {candidate.sectorLabel}
            </div>
            <h2 className="display text-3xl">{candidate.name}</h2>
            <div className="mt-4">
              <div className="eyebrow text-muted">OVERVIEW</div>
              <p className="mt-2 text-[15px] leading-7 text-ink/80">{candidate.description}</p>
            </div>
            <div className="company-row mt-4 rounded-2xl px-4 py-4">
              <div className="flex items-center gap-2">
                <ClockIcon className="size-4 text-amber" />
                <div className="eyebrow text-amber">
                  AT THE TIME · {candidate.year}
                </div>
              </div>
              <p className="mt-2 text-[15px] leading-7 text-ink/80">{candidate.thenStory}</p>
            </div>
            <div className="company-row mt-3 rounded-2xl px-4 py-4">
              <div className="flex items-center gap-2">
                <GridIcon className="size-4 text-lime" />
                <div className="eyebrow text-lime">
                  {candidate.sectorLabel.toUpperCase()} · {candidate.year}
                </div>
              </div>
              <p className="mt-2 text-[15px] leading-7 text-ink/80">
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

        {kind === "details" && (
          <div className="sticky bottom-0 border-t border-white/10 bg-surface p-4">
            <button
              type="button"
              className="pressable btn-quiet w-full rounded-2xl py-4 text-base"
              onClick={onClose}
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
