"use client";

import { STARTING_BANKROLL, TARGET_BANKROLL, type LockedPick } from "@/lib/types";
import { formatMoney } from "@/lib/format";

function Slot({
  index,
  pick,
}: {
  index: number;
  pick: LockedPick | undefined;
}) {
  return (
    <div
      className={`slot flex items-center gap-3 px-3 ${pick ? "filled sealed" : ""}`}
    >
      <div className="mono-tile w-7 text-sm text-muted">{String(index).padStart(2, "0")}</div>
      {pick ? (
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-semibold">
            {pick.ticker} · {pick.year}
          </div>
          <div className="text-[11px] tracking-[0.16em] text-amber">SEALED</div>
        </div>
      ) : (
        <div className="text-sm text-muted">Empty</div>
      )}
    </div>
  );
}

export default function Vault({
  picks,
  compact = false,
}: {
  picks: LockedPick[];
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }, (_, i) => {
          const pick = picks[i];
          return (
            <div
              key={i}
              className={`flex h-12 min-w-0 flex-1 flex-col items-center justify-center rounded-xl border leading-tight ${
                pick
                  ? "border-lime/40 bg-[#163225] text-ink"
                  : "border-white/10 text-muted"
              }`}
              aria-label={pick ? `${pick.ticker} ${pick.year}` : `Pick ${i + 1} empty`}
            >
              {pick ? (
                <>
                  <span className="text-[11px] font-semibold tracking-wide">
                    {pick.ticker}
                  </span>
                  <span className="tabular text-[10px] text-muted">{pick.year}</span>
                </>
              ) : (
                <span className="text-[11px] font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="vault p-5 sm:p-6">
      <svg className="vault-mark" viewBox="0 0 200 200" aria-hidden>
        <circle cx="100" cy="100" r="78" fill="none" stroke="#B7FF45" strokeWidth="2" />
        <text
          x="100"
          y="96"
          textAnchor="middle"
          fill="#B7FF45"
          fontSize="36"
          fontWeight="700"
          fontFamily="var(--font-display)"
        >
          100X
        </text>
        <text
          x="100"
          y="122"
          textAnchor="middle"
          fill="#B7FF45"
          fontSize="11"
          letterSpacing="3"
        >
          EST. 2026
        </text>
      </svg>
      <div className="relative z-10 grid gap-3">
        {Array.from({ length: 5 }, (_, i) => (
          <Slot key={i} index={i + 1} pick={picks[i]} />
        ))}
      </div>
      <div className="relative z-10 mt-5 flex items-end justify-between border-t border-white/10 pt-4">
        <div>
          <div className="text-[11px] tracking-[0.18em] text-muted">BANKROLL</div>
          <div className="display text-2xl font-semibold tabular">
            {formatMoney(STARTING_BANKROLL)}
          </div>
          <div className="text-[11px] text-muted">$2,000 × 5, modeled to today</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] tracking-[0.18em] text-muted">TARGET</div>
          <div className="display text-xl font-semibold text-lime tabular">
            {formatMoney(TARGET_BANKROLL)}
          </div>
        </div>
      </div>
    </div>
  );
}
