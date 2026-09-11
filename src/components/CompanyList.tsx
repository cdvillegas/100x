"use client";

import { formatCompact, formatPct, formatSharePrice, modeledSharePrice } from "@/lib/format";
import type { PublicCandidate } from "@/lib/types";
import { InfoIcon } from "./icons";

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
      <div className={`stat-value ${compact ? "compact" : ""}`}>
        {value}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function CompanyList({
  candidates,
  selectedId,
  onSelect,
  onDetails,
}: {
  candidates: PublicCandidate[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDetails: (id: string) => void;
}) {
  const sorted = [...candidates].sort(
    (a, b) => a.marketCapRank - b.marketCapRank,
  );

  return (
    <div>
      <div
        className="flex flex-col gap-2 pb-36 lg:pb-32"
        role="listbox"
        aria-label="Companies"
      >
        {sorted.map((company) => (
          <div
            key={company.id}
            role="option"
            aria-selected={selectedId === company.id}
            tabIndex={0}
            className="company-row w-full cursor-pointer rounded-2xl px-4 py-3.5 text-left sm:px-5 sm:py-4"
            onClick={() => onSelect(company.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(company.id);
              }
            }}
          >
            <div className="flex items-center gap-4">
              <div className="min-w-0 flex-1">
                <div className="row-name truncate">{company.name}</div>
                <div className="row-meta mt-0.5 text-muted">
                  <span className="text-lime">{company.ticker}</span>
                  {" · "}#{company.marketCapRank}
                </div>
              </div>
              <div className="flex shrink-0 gap-4 sm:hidden">
                <Stat
                  compact
                  label="PRICE"
                  value={formatSharePrice(
                    modeledSharePrice(
                      company.ticker,
                      company.year,
                      company.marketCapRank,
                    ),
                  )}
                />
                <Stat
                  compact
                  label="PRIOR"
                  value={formatPct(company.trailingReturn, 0)}
                />
              </div>
              <div className="hidden gap-5 sm:flex">
                <Stat
                  label="PRICE"
                  value={formatSharePrice(
                    modeledSharePrice(
                      company.ticker,
                      company.year,
                      company.marketCapRank,
                    ),
                  )}
                />
                <Stat label="MCAP" value={formatCompact(company.marketCap)} />
                <Stat label="YOY" value={formatPct(company.revenueGrowth, 0)} />
                <Stat label="PRIOR" value={formatPct(company.trailingReturn, 0)} />
              </div>
              <button
                type="button"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-bg text-muted hover:text-lime"
                aria-label={`Details for ${company.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onDetails(company.id);
                }}
              >
                <InfoIcon className="size-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
