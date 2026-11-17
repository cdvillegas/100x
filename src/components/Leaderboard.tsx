"use client";

import { useEffect, useState } from "react";
import { fetchLeaderboard, renameLeaderboard } from "@/lib/api";
import { formatMultiplier } from "@/lib/format";
import type {
  LeaderboardBoard,
  LeaderboardPeriod,
  LeaderboardRow,
} from "@/lib/types";
import { SheetHeading } from "./Sheets";

const TABS: { id: LeaderboardPeriod; label: string }[] = [
  { id: "daily", label: "DAILY" },
  { id: "weekly", label: "WEEKLY" },
  { id: "all", label: "ALL TIME" },
];

const RANK_LABEL: Record<LeaderboardPeriod, string> = {
  daily: "DAILY RANK",
  weekly: "WEEKLY RANK",
  all: "ALL TIME RANK",
};

function Row({ row }: { row: LeaderboardRow }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 border-b border-white/10 py-3 last:border-0 ${
        row.isYou ? "text-lime" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`display w-10 shrink-0 text-lg leading-none ${
            row.isYou ? "" : "text-muted"
          }`}
        >
          #{row.rank}
        </span>
        <span className="row-name truncate">{row.name}</span>
        {row.isYou ? (
          <span className="shrink-0 rounded-full border border-lime/30 bg-lime/10 px-2 py-0.5 text-[10px] font-bold tracking-[0.14em] text-lime">
            YOU
          </span>
        ) : null}
      </div>
      <div className="display shrink-0 text-xl tracking-tight">
        {formatMultiplier(row.multiplier)}
      </div>
    </div>
  );
}

export function LeaderboardPanel({
  gameId,
  approvedName,
  onRenamed,
  showRank = false,
  hold = false,
}: {
  gameId?: string;
  approvedName: string | null;
  onRenamed: (name: string) => void;
  showRank?: boolean;
  hold?: boolean;
}) {
  const [period, setPeriod] = useState<LeaderboardPeriod>("daily");
  const [board, setBoard] = useState<LeaderboardBoard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(approvedName ?? "");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (approvedName && !editing) setDraft(approvedName);
  }, [approvedName, editing]);

  useEffect(() => {
    if (hold) return;
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
  }, [period, gameId, hold]);

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
  const rank = board?.you?.rank ?? board?.placement?.rank;

  return (
    <>
      {showRank ? (
        rank ? (
          <div>
            <div className="eyebrow text-muted">{RANK_LABEL[period]}</div>
            <div className="display mt-1 text-4xl text-lime">#{rank}</div>
          </div>
        ) : (
          <p className="text-sm text-muted">
            {hold ? "Saving…" : error ?? "Loading…"}
          </p>
        )
      ) : null}

      <div className="mt-4 grid grid-cols-3 gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setPeriod(tab.id)}
            className={`rounded-2xl px-3 py-2.5 text-xs font-bold tracking-[0.12em] outline-none ${
              period === tab.id
                ? "border border-lime/30 bg-lime/[0.045] text-lime"
                : "border border-white/14 text-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
        <div className="px-4">
          {error && !board ? (
            <p className="py-8 text-center text-sm text-muted">{error}</p>
          ) : !board ? (
            <p className="py-8 text-center text-sm text-muted">Loading…</p>
          ) : board.rows.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">No runs yet.</p>
          ) : (
            board.rows.map((row) => (
              <Row key={`${row.rank}-${row.name}-${row.completedAt}`} row={row} />
            ))
          )}
        </div>
        {period !== "all" ? (
          <p className="border-t border-white/10 px-4 py-3 text-xs text-muted">
            {period === "weekly"
              ? "Resets Monday at midnight Pacific."
              : "Resets at midnight Pacific."}
          </p>
        ) : null}
      </div>

      {pinned ? (
        <div className="mt-4 rounded-2xl border border-lime/30 bg-lime/[0.04] px-4">
          <div className="eyebrow pt-3 text-lime">YOUR RUN</div>
          <Row row={pinned} />
        </div>
      ) : null}

      <form
        className="mt-6 border-t border-white/10 pt-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (!approvedName || editing) void rename();
        }}
      >
        <div className="eyebrow text-muted">NAME</div>
        {approvedName && !editing ? (
          <button
            type="button"
            className="mt-2 flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 px-4 py-3 text-left"
            onClick={() => {
              setDraft(approvedName);
              setEditing(true);
            }}
          >
            <span className="display truncate text-xl">{approvedName}</span>
            <span className="eyebrow shrink-0 text-muted">EDIT</span>
          </button>
        ) : (
          <div className="mt-2 flex gap-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={20}
              autoComplete="nickname"
              autoFocus={editing}
              className="display min-w-0 flex-1 rounded-2xl border border-white/10 bg-bg px-4 py-3 text-xl text-ink outline-none"
              placeholder="Name"
            />
            <button
              type="submit"
              disabled={busy || draft.trim().length < 2}
              className="pressable shrink-0 rounded-2xl border border-white/10 px-4 py-3 text-xs font-bold tracking-[0.14em] text-ink disabled:opacity-40"
            >
              {busy ? "SAVING" : "SAVE"}
            </button>
          </div>
        )}
        {error && board ? (
          <p className="mt-2 text-sm text-coral">{error}</p>
        ) : null}
      </form>
    </>
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
  return (
    <div className="sheet-scrim fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-bg px-4 py-4 sm:py-8">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 my-auto w-full max-w-xl shrink-0 rounded-[28px] border border-white/10 bg-surface p-5 sm:p-6">
        <SheetHeading title="LEADERBOARD" />
        <LeaderboardPanel
          gameId={gameId}
          approvedName={approvedName}
          onRenamed={onRenamed}
        />
        <button
          type="button"
          className="pressable btn-quiet mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base"
          onClick={onClose}
        >
          BACK TO GAME
        </button>
      </div>
    </div>
  );
}
