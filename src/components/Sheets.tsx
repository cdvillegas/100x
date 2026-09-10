"use client";

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

export default function Sheets({
  kind,
  candidate,
  onClose,
}: {
  kind: "how" | "method" | "details" | "intro" | null;
  candidate: PublicCandidate | null;
  onClose: () => void;
}) {
  if (!kind) return null;

  return (
    <div className="sheet-scrim fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg max-h-[min(90dvh,40rem)] overflow-y-auto overscroll-contain rounded-[28px] border border-white/10 bg-[#101c17] shadow-2xl">
        <div className="p-5">
        {kind === "intro" && (
          <div className="space-y-4">
            <div className="display text-3xl font-semibold">100X</div>
            <p className="text-lg leading-7">
              One spin locks a year and a market-cap band.
              <br />
              Pick from a modeled snapshot of large U.S. companies.
              <br />
              One estimated long-term hold. One shot at 100X.
            </p>
            <button
              type="button"
              className="pressable mt-2 w-full rounded-2xl bg-lime py-3.5 text-sm font-bold tracking-[0.16em] text-[#10210f]"
              onClick={onClose}
            >
              START
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
          </div>
        )}

        {kind === "method" && (
          <div className="space-y-3 text-sm leading-6">
            <h2 className="display text-2xl">Methodology</h2>
            <p>Historical prose is anchored to each entry date. Company names and descriptions change when major mergers, renamings, or business shifts would otherwise create hindsight.</p>
            <p>World and sector notes draw on contemporaneous Federal Reserve, IMF, World Bank, and WTO reporting plus documented company history. They are context—not a peek at later returns.</p>
            <p>Market-cap ranks, financials, and long-term values combine manually curated estimates with deterministic modeled data. They are not licensed quotes, audited point-in-time fundamentals, or verified total-return series.</p>
            <p>Historical simulation for entertainment only. Not investment advice. No real money or trading.</p>
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
                {candidate.name.toUpperCase()} · {candidate.year}
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
