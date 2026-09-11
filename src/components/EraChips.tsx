"use client";

import { ERA_CHIPS } from "@/lib/era";
import type { EraMood } from "@/lib/types";
import { TrendUpIcon } from "./icons";

function ChipGlyph({ mood }: { mood: EraMood }) {
  const className = "size-3 shrink-0";
  if (mood === "bull" || mood === "recovery" || mood === "tech-wave") {
    return <TrendUpIcon className={className} />;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {mood === "recession" ? (
        <>
          <path d="M3 7 9 13l4-4 8 8" />
          <path d="M14 17h7v-7" />
        </>
      ) : mood === "crisis" || mood === "war-risk" || mood === "trade-war" ? (
        <>
          <path d="M12 8v5" />
          <path d="M12 16h.01" />
          <path d="M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" />
        </>
      ) : mood === "oil-shock" ? (
        <path d="M12 3.2S7 9.2 7 13.2a5 5 0 0 0 10 0C17 9.2 12 3.2 12 3.2Z" />
      ) : mood === "inflation" ||
        mood === "tightening" ||
        mood === "easy-money" ? (
        <>
          <path d="M19 5 5 19" />
          <path d="M6.5 9A2.5 2.5 0 0 0 9 6.5c1.4 0 2.2.6 3.2 1.5S14.4 9.5 16 9.5A2.5 2.5 0 0 0 18.5 7" />
          <path d="M5.5 17A2.5 2.5 0 0 0 8 14.5c1.4 0 2.2.6 3.2 1.5s2.2 1.5 3.8 1.5a2.5 2.5 0 0 0 2.5-2.5" />
        </>
      ) : (
        <path d="M5 12h14" />
      )}
    </svg>
  );
}

export default function EraChips({ chips }: { chips: EraMood[] }) {
  if (chips.length === 0) return null;

  return (
    <div className="mt-2 flex gap-1.5 overflow-x-auto lg:mt-3 lg:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {chips.map((mood, index) => {
        const chip = ERA_CHIPS[mood];
        return (
          <span
            key={mood}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/14 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-muted ${
              index >= 2 ? "hidden lg:inline-flex" : ""
            }`}
          >
            <ChipGlyph mood={mood} />
            {chip.label}
          </span>
        );
      })}
    </div>
  );
}
