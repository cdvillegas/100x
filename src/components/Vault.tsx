"use client";

import {
  PICK_STAKE,
  STARTING_BANKROLL,
  TARGET_BANKROLL,
  type LockedPick,
} from "@/lib/types";
import { formatMoney, formatSharePrice, modeledShareCount, modeledSharePrice } from "@/lib/format";

function Stat({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="text-right">
      <div className={`stat-value ${muted ? "text-muted" : ""}`}>
        {value}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function Slot({
  index,
  pick,
}: {
  index: number;
  pick: LockedPick | undefined;
}) {
  const shares = pick
    ? modeledShareCount(pick.ticker, pick.year, pick.marketCapRank)
    : null;
  const price = pick
    ? modeledSharePrice(pick.ticker, pick.year, pick.marketCapRank)
    : null;

  if (pick && shares !== null) {
    return (
      <div className="company-row flex items-center gap-3 rounded-2xl px-4 py-3.5">
        <div className="min-w-0 flex-1">
          <div className="row-name truncate">{pick.name}</div>
          <div className="row-meta mt-0.5 text-muted">
            <span className="text-lime">{pick.ticker}</span>
            {" · "}Purchased {pick.year}
          </div>
        </div>
        <div className="flex shrink-0 gap-5">
          <Stat label="SH" value={shares.toLocaleString()} />
          <Stat label="PRICE" value={formatSharePrice(price ?? 0)} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-white/18 px-4 py-3.5">
      <div className="min-w-0 flex-1">
        <div className="row-name truncate text-muted">Open lot</div>
        <div className="row-meta mt-0.5 text-muted">
          Lot {String(index).padStart(2, "0")}
        </div>
      </div>
      <Stat muted label="CASH" value={formatMoney(PICK_STAKE)} />
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
          const shares = pick
            ? modeledShareCount(pick.ticker, pick.year, pick.marketCapRank)
            : null;
          return (
            <div
              key={i}
              className={`flex h-14 min-w-0 flex-1 flex-col items-center justify-center rounded-2xl leading-tight ${
                pick
                  ? "company-row"
                  : "border border-dashed border-white/18 text-muted"
              }`}
              aria-label={
                pick && shares !== null
                  ? `${shares} shares of ${pick.ticker}`
                  : `Lot ${i + 1} open`
              }
            >
              {pick && shares !== null ? (
                <>
                  <span className="text-sm font-bold text-lime">{pick.ticker}</span>
                  <span className="stat-label mt-0.5">
                    {shares.toLocaleString()} SH
                  </span>
                </>
              ) : (
                <span className="text-sm font-bold">
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
      <div className="relative z-10 mb-4 flex items-end justify-between">
        <div className="eyebrow text-muted">PORTFOLIO</div>
        <div className="eyebrow text-muted">{picks.length}/5 LOTS</div>
      </div>
      <div className="relative z-10 grid gap-2">
        {Array.from({ length: 5 }, (_, i) => (
          <Slot key={i} index={i + 1} pick={picks[i]} />
        ))}
      </div>
      <div className="relative z-10 mt-5 grid grid-cols-2 items-start border-t border-white/10 pt-5">
        <div>
          <div className="eyebrow text-muted">COST BASIS</div>
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
    </div>
  );
}
