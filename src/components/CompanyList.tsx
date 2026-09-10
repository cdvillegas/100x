"use client";

import { formatCompact, formatPct } from "@/lib/format";
import type { PublicCandidate, SortKey } from "@/lib/types";

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="text-right">
      <div className="tabular text-sm font-semibold">{value}</div>
      <div className="text-[10px] tracking-[0.12em] text-muted">{label}</div>
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
    <div className="flex flex-col gap-3">
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
            className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.12em] ${
              sort === key
                ? "bg-lime text-[#10210f]"
                : "border border-white/10 text-muted"
            }`}
          >
            {label}
          </button>
        ))}
        <div className="ml-auto text-xs text-muted">
          {candidates.length} companies
        </div>
      </div>
      <div
        className="flex flex-col gap-2 pb-28 lg:pb-4"
        role="listbox"
        aria-label="Companies"
      >
        {sorted.map((company) => (
          <div
            key={company.id}
            role="option"
            aria-selected={selectedId === company.id}
            tabIndex={0}
            className="company-row pressable w-full cursor-pointer rounded-2xl px-3 py-3 text-left"
            onClick={() => onSelect(company.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(company.id);
              }
            }}
          >
            <div className="flex items-center gap-3">
              <div className="mono-tile flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0d1c16] text-lime">
                {company.ticker.slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-semibold">
                  {company.name}
                </div>
                <div className="text-xs text-muted">
                  <span className="text-lime">{company.ticker}</span>
                  {" · "}#{company.marketCapRank}
                </div>
              </div>
              <div className="hidden gap-4 sm:flex">
                <Stat label="MCAP" value={formatCompact(company.marketCap)} />
                <Stat label="REV" value={formatCompact(company.revenue)} />
                <Stat label="YOY" value={formatPct(company.revenueGrowth, 0)} />
                <Stat label="PRIOR" value={formatPct(company.trailingReturn, 0)} />
              </div>
              <button
                type="button"
                className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted"
                aria-label={`Details for ${company.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onDetails(company.id);
                }}
              >
                i
              </button>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:hidden">
              <Stat label="MCAP" value={formatCompact(company.marketCap)} />
              <Stat label="REV" value={formatCompact(company.revenue)} />
              <Stat label="YOY" value={formatPct(company.revenueGrowth, 0)} />
              <Stat label="PRIOR" value={formatPct(company.trailingReturn, 0)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
