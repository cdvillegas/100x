"use client";

import { formatCompact, formatPct } from "@/lib/format";
import type { PublicCandidate, SortKey } from "@/lib/types";

function Stat({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div className="text-right">
      <div className={`tabular font-semibold ${compact ? "text-xs" : "text-sm"}`}>
        {value}
      </div>
      <div
        className={`tracking-[0.1em] text-muted ${
          compact ? "text-[8px]" : "text-[10px]"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

export default function CompanyList({
  candidates,
  selectedId,
  sort,
  onSelect,
  onDetails,
  onSort,
}: {
  candidates: PublicCandidate[];
  selectedId: string | null;
  sort: SortKey;
  onSelect: (id: string) => void;
  onDetails: (id: string) => void;
  onSort: (sort: SortKey) => void;
}) {
  const sorted = [...candidates].sort((a, b) => {
    if (sort === "growth") {
      return (b.revenueGrowth ?? -999) - (a.revenueGrowth ?? -999);
    }
    if (sort === "trail") {
      return (b.trailingReturn ?? -999) - (a.trailingReturn ?? -999);
    }
    return a.marketCapRank - b.marketCapRank;
  });

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        {([
          ["mcap", "MCAP"],
          ["growth", "GROWTH"],
          ["trail", "PRIOR"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => onSort(key)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] ${
              sort === key
                ? "bg-lime text-[#10210f]"
                : "border border-white/10 text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        className="flex flex-col gap-1.5 pb-24 lg:gap-2 lg:pb-4"
        role="listbox"
        aria-label="Companies"
      >
        {sorted.map((company) => (
          <div
            key={company.id}
            role="option"
            aria-selected={selectedId === company.id}
            tabIndex={0}
            className="company-row pressable w-full cursor-pointer rounded-xl px-2.5 py-2 text-left sm:rounded-2xl sm:px-3 sm:py-3"
            onClick={() => onSelect(company.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(company.id);
              }
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="mono-tile flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#0d1c16] text-sm text-lime sm:size-11 sm:rounded-xl sm:text-base">
                {company.ticker.slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold sm:text-[15px]">
                  {company.name}
                </div>
                <div className="text-[11px] text-muted sm:text-xs">
                  <span className="text-lime">{company.ticker}</span>
                  {" · "}#{company.marketCapRank}
                </div>
              </div>
              <div className="flex shrink-0 gap-3 sm:hidden">
                <Stat
                  compact
                  label="MCAP"
                  value={formatCompact(company.marketCap)}
                />
                <Stat
                  compact
                  label="PRIOR"
                  value={formatPct(company.trailingReturn, 0)}
                />
              </div>
              <div className="hidden gap-4 sm:flex">
                <Stat label="MCAP" value={formatCompact(company.marketCap)} />
                <Stat label="REV" value={formatCompact(company.revenue)} />
                <Stat label="YOY" value={formatPct(company.revenueGrowth, 0)} />
                <Stat label="PRIOR" value={formatPct(company.trailingReturn, 0)} />
              </div>
              <button
                type="button"
                className="ml-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-xs text-muted sm:ml-1 sm:size-9 sm:text-sm"
                aria-label={`Details for ${company.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onDetails(company.id);
                }}
              >
                i
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
