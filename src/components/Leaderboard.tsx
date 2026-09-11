"use client";

import { useEffect, useState } from "react";
import { fetchLeaderboard, renameLeaderboard } from "@/lib/api";
import { formatMoney, formatMultiplier } from "@/lib/format";
import type {
  LeaderboardBoard,
  LeaderboardPeriod,
  LeaderboardRow,
} from "@/lib/types";

const TABS: { id: LeaderboardPeriod; label: string }[] = [
  { id: "daily", label: "DAILY" },
  { id: "weekly", label: "WEEKLY" },
  { id: "all", label: "ALL TIME" },
];

function Row({ row }: { row: LeaderboardRow }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 border-b border-white/10 py-3 last:border-0 ${
        row.isYou ? "text-lime" : ""
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="display w-8 text-lg">#{row.rank}</span>
          <span className="truncate font-semibold">{row.name}</span>
          {row.isYou ? (
            <span className="rounded-full border border-lime/30 bg-lime/10 px-2 py-0.5 text-[9px] tracking-[0.14em] text-lime">
              YOU
            </span>
          ) : null}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="display text-lg">{formatMoney(row.bankroll)}</div>
        <div className="text-xs text-muted">{formatMultiplier(row.multiplier)}</div>
      </div>
    </div>
  );
}

export default function Leaderboard({
  gameId,
  approvedName,
  onClose,
  onRenamed,
}: {
  gameId?: string;
  approvedName: string | null;
  onClose: () => void;
  onRenamed: (name: string) => void;
}) {
  const [period, setPeriod] = useState<LeaderboardPeriod>("daily");
  const [board, setBoard] = useState<LeaderboardBoard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(approvedName ?? "");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchLeaderboard(period, gameId)
      .then((result) => {
        if (!cancelled) {
          setError(null);
          setBoard(result.board);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setBoard(null);
          setError(err instanceof Error ? err.message : "Board unavailable");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [period, gameId]);

  const rename = async () => {
    setBusy(true);
    setError(null);
    try {
      const result = await renameLeaderboard(draft);
      onRenamed(result.displayName);
      setEditing(false);
      const next = await fetchLeaderboard(period, gameId);
      setBoard(next.board);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update name");
    } finally {
      setBusy(false);
    }
  };

  const pinned =
    board?.you && !board.rows.some((row) => row.isYou) ? board.you : null;

  return (
    <div className="sheet-scrim fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#07110d] px-4 py-4 sm:py-8">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 my-auto w-full max-w-2xl shrink-0 rounded-[32px] border border-white/10 bg-[#0d1813] p-6 shadow-[0_0_80px_rgb(183_255_69/0.08)] sm:p-9">
        <div className="text-center">
          <div className="text-[11px] tracking-[0.22em] text-amber">THE BOARD</div>
          <h2 className="display mt-2 text-4xl">Leaderboard</h2>
          <p className="mt-2 text-sm text-muted">
            Highest modeled bankroll. Picks stay sealed.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPeriod(tab.id)}
              className={`rounded-full py-2 text-[11px] font-semibold tracking-[0.14em] ${
                period === tab.id
                  ? "bg-lime text-[#10210f]"
                  : "border border-white/10 text-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 px-4">
          {error ? (
            <p className="py-8 text-center text-sm text-muted">{error}</p>
          ) : !board ? (
            <p className="py-8 text-center text-sm text-muted">Loading the board…</p>
          ) : board.rows.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">
              No runs posted for this window yet.
            </p>
          ) : (
            board.rows.map((row) => (
              <Row key={`${row.rank}-${row.name}-${row.completedAt}`} row={row} />
            ))
          )}
        </div>

        {pinned ? (
          <div className="mt-4 rounded-2xl border border-lime/30 bg-lime/[0.04] px-4">
            <div className="pt-3 text-[10px] tracking-[0.16em] text-lime">
              YOUR RUN
            </div>
            <Row row={pinned} />
          </div>
        ) : null}

        {approvedName ? (
          <div className="mt-5 text-sm">
            {editing ? (
              <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  maxLength={20}
                  className="rounded-2xl border border-white/10 bg-[#07110d] px-4 py-3 text-ink outline-none"
                  placeholder="Display name"
                />
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void rename()}
                  className="rounded-2xl bg-lime px-5 py-3 text-sm font-bold tracking-[0.14em] text-[#10210f] disabled:opacity-50"
                >
                  SAVE
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="text-xs tracking-[0.14em] text-muted"
                onClick={() => {
                  setDraft(approvedName);
                  setEditing(true);
                }}
              >
                EDIT NAME · {approvedName}
              </button>
            )}
          </div>
        ) : null}

        <button
          type="button"
          className="pressable mt-6 w-full rounded-2xl border border-white/10 py-3 text-sm font-semibold"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
