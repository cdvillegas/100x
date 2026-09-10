"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createGame,
  loadGame,
  pickGame,
  respinGame,
  revealGame,
  spinGame,
} from "@/lib/api";
import { bandCopy, formatHoldReturn } from "@/lib/format";
import {
  PICK_STAKE,
  STARTING_BANKROLL,
  TARGET_BANKROLL,
  type PublicCandidate,
  type PublicSession,
  type RevealPayload,
  type SortKey,
} from "@/lib/types";
import CompanyList from "./CompanyList";
import Reels from "./Reels";
import Reveal from "./Reveal";
import Sheets from "./Sheets";
import Vault from "./Vault";

const GAME_KEY = "tenx-game-id";
const INTRO_KEY = "tenx-intro-seen";

type UiPhase =
  | "boot"
  | "ready"
  | "spinning"
  | "choosing"
  | "awaitingReveal"
  | "revealing"
  | "results";

type SpinTarget = "both" | "year" | "rank";

function applySession(session: PublicSession): UiPhase {
  if (session.status === "revealed") return "results";
  if (session.status === "awaitingReveal" || session.picks.length >= 5) {
    return "awaitingReveal";
  }
  if (session.currentBoard) return "choosing";
  return "ready";
}

export default function GameApp() {
  const [session, setSession] = useState<PublicSession | null>(null);
  const [phase, setPhase] = useState<UiPhase>("boot");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("mcap");
  const [sheet, setSheet] = useState<"how" | "method" | "details" | "intro" | null>(
    null,
  );
  const [detailId, setDetailId] = useState<string | null>(null);
  const [reveal, setReveal] = useState<RevealPayload | null>(null);
  const [revealIndex, setRevealIndex] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [spinTarget, setSpinTarget] = useState<SpinTarget>("both");

  const board = session?.currentBoard ?? null;
  const selected = board?.candidates.find((c) => c.id === selectedId) ?? null;
  const detailCandidate: PublicCandidate | null =
    board?.candidates.find((c) => c.id === detailId) ?? null;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = () => setReducedMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const startFresh = useCallback(async () => {
    const next = await createGame();
    localStorage.setItem(GAME_KEY, next.id);
    setSession(next);
    setSelectedId(null);
    setSort("mcap");
    setReveal(null);
    setRevealIndex(0);
    setSkipped(false);
    setPhase("ready");
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const existing = localStorage.getItem(GAME_KEY);
        const loaded = existing ? await loadGame(existing) : null;
        if (cancelled) return;
        if (loaded) {
          setSession(loaded);
          if (loaded.status === "revealed") {
            const viewed = await revealGame(loaded.id);
            if (cancelled) return;
            setSession(viewed);
            setReveal(viewed.reveal);
            setSkipped(true);
            setPhase("results");
          } else {
            setPhase(applySession(loaded));
          }
        } else {
          await startFresh();
        }
        if (!localStorage.getItem(INTRO_KEY)) setSheet("intro");
      } catch {
        if (!cancelled) await startFresh();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [startFresh]);

  const closeIntro = () => {
    localStorage.setItem(INTRO_KEY, "1");
    setSheet(null);
  };

  const spin = async () => {
    if (!session || busy || phase !== "ready") return;
    setBusy(true);
    setError(null);
    try {
      const next = await spinGame(session.id);
      setSession(next);
      setSpinTarget("both");
      setPhase("spinning");
      const wait = reducedMotion ? 180 : 1380;
      window.setTimeout(() => {
        setPhase("choosing");
        setBusy(false);
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate?.(12);
        }
      }, wait);
    } catch (err) {
      setBusy(false);
      setError(err instanceof Error ? err.message : "Spin failed");
    }
  };

  const respin = async (type: "year" | "rank") => {
    if (!session || busy || phase !== "choosing") return;
    setBusy(true);
    setError(null);
    try {
      const next = await respinGame(session.id, type);
      setSession(next);
      setSelectedId(null);
      setSpinTarget(type);
      setPhase("spinning");
      const wait = reducedMotion ? 180 : 1380;
      window.setTimeout(() => {
        setPhase("choosing");
        setBusy(false);
      }, wait);
    } catch (err) {
      setBusy(false);
      setError(err instanceof Error ? err.message : "Respin failed");
    }
  };

  const lock = async () => {
    if (!session || !selectedId || busy) return;
    setBusy(true);
    try {
      const next = await pickGame(session.id, selectedId);
      setSession(next);
      setSelectedId(null);
      if (next.status === "awaitingReveal") setPhase("awaitingReveal");
      else setPhase("ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lock failed");
    } finally {
      setBusy(false);
    }
  };

  const startReveal = async () => {
    if (!session) return;
    setBusy(true);
    try {
      const next = await revealGame(session.id);
      setSession(next);
      setReveal(next.reveal);
      setRevealIndex(0);
      setSkipped(false);
      setPhase("revealing");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reveal failed");
    } finally {
      setBusy(false);
    }
  };

  const advanceReveal = useCallback(() => {
    setRevealIndex((current) => current + 1);
  }, []);

  const share = async () => {
    if (!reveal) return;
    const text = [
      `100X`,
      `$${STARTING_BANKROLL.toLocaleString()} → ${Math.round(reveal.endingBankroll).toLocaleString()}`,
      `${reveal.multiplier.toFixed(2)}X · Beat the Board ${reveal.beatTheBoard}/5`,
      ...reveal.picks.map(
        (pick) => `${pick.ticker} ${pick.year}  ${formatHoldReturn(pick.forwardTotalReturn)}`,
      ),
      "Gameplay estimates, not investment results.",
    ].join("\n");
    if (navigator.share) {
      await navigator.share({ title: "100X", text }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(text);
  };

  const prompt = useMemo(() => {
    if (!board) return "One spin locks a year and a market-cap band.";
    return `Model a hold from ${board.entryDate.replace(/-/g, ".")} to today. Choose from the estimated ${bandCopy(board.rankStart, board.rankEnd)} in ${board.year}.`;
  }, [board]);

  if (!session || phase === "boot") {
    return (
      <div className="flex min-h-dvh items-center justify-center text-muted">
        Loading the vault…
      </div>
    );
  }

  return (
    <div id="root-game" className="mx-auto min-h-dvh max-w-[1180px] px-4 pb-8 pt-3">
      <header className="sticky top-0 z-20 -mx-4 mb-3 flex items-center justify-between bg-[#07110d]/88 px-4 py-3 backdrop-blur-md">
        <div className="display text-2xl font-semibold tracking-tight">
          100<span className="text-lime">X</span>
        </div>
        <div className="text-xs tracking-[0.18em] text-muted">
          ROUND {session.round} OF 5
        </div>
        <button
          type="button"
          className="rounded-full border border-white/10 px-3 py-2 text-xs tracking-[0.14em] text-muted"
          onClick={() => setSheet("how")}
        >
          RULES
        </button>
      </header>

      <div className="mb-4 lg:hidden">
        <Vault picks={session.picks} compact />
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <main>
          <p className="mb-5 max-w-md text-sm text-muted">
            Pick five stocks from the past. Model the long hold. Turn $10K into $1M.
          </p>

          {(phase === "ready" || phase === "spinning") && (
            <div className="flex min-h-[58vh] flex-col items-center justify-center pt-2">
              {session.picks.length > 0 && (
                <p className="mb-8 text-center text-sm text-muted">
                  {session.picks[session.picks.length - 1].name} ·{" "}
                  {session.picks[session.picks.length - 1].year} is sealed.
                  <br />
                  {5 - session.picks.length} pick{5 - session.picks.length === 1 ? "" : "s"} left.
                </p>
              )}
              <Reels
                year={board?.year ?? null}
                band={board?.bandLabel ?? null}
                yearSpinning={phase === "spinning" && spinTarget !== "rank"}
                bandSpinning={phase === "spinning" && spinTarget !== "year"}
                reducedMotion={reducedMotion}
              />
              <button
                type="button"
                disabled={busy || phase === "spinning"}
                onClick={spin}
                className="pressable mt-8 min-h-14 rounded-2xl bg-lime px-20 py-4 text-sm font-bold tracking-[0.22em] text-[#10210f] shadow-[0_0_32px_rgb(183_255_69/0.32)] disabled:opacity-60"
              >
                {phase === "spinning" ? "SPINNING" : "SPIN"}
              </button>
              <div className="mt-6 flex gap-4 text-xs text-muted">
                <button type="button" onClick={() => setSheet("how")}>
                  How it works
                </button>
                <button type="button" onClick={() => setSheet("method")}>
                  Methodology
                </button>
              </div>
            </div>
          )}

          {phase === "choosing" && board && (
            <div className="rise-in">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="rounded-2xl border border-lime/40 px-4 py-2">
                  <div className="text-[10px] tracking-[0.18em] text-lime">YEAR</div>
                  <div className="display text-2xl">{board.year}</div>
                </div>
                <div className="rounded-2xl border border-amber/40 px-4 py-2">
                  <div className="text-[10px] tracking-[0.18em] text-amber">
                    EST. MARKET CAP
                  </div>
                  <div className="display text-2xl">{board.bandLabel}</div>
                </div>
                <div className="ml-auto flex gap-2">
                  <button
                    type="button"
                    disabled={session.yearRespinUsed || busy}
                    onClick={() => respin("year")}
                    className="rounded-full border border-white/10 px-3 py-2 text-[11px] tracking-[0.12em] disabled:opacity-40"
                  >
                    {session.yearRespinUsed ? "YEAR USED" : "YEAR RESPIN"}
                  </button>
                  <button
                    type="button"
                    disabled={session.rankRespinUsed || busy}
                    onClick={() => respin("rank")}
                    className="rounded-full border border-white/10 px-3 py-2 text-[11px] tracking-[0.12em] disabled:opacity-40"
                  >
                    {session.rankRespinUsed ? "RANK USED" : "RANK RESPIN"}
                  </button>
                </div>
              </div>
              <p className="mb-4 text-sm text-muted">{prompt}</p>
              {board.climate && (
                <div className="mb-4 rounded-2xl border border-white/10 p-4">
                  <div className="text-[11px] tracking-[0.18em] text-amber">
                      {board.year} · THE WORLD THEN
                  </div>
                  <div className="display mt-1 text-xl">{board.climate.kicker}</div>
                  <p className="mt-2 text-sm leading-6 text-muted">{board.climate.body}</p>
                </div>
              )}
              <div className="mb-2 text-[11px] tracking-[0.18em] text-amber">
                MODELED VALUE · SEALED
              </div>
              <p className="mb-3 text-xs leading-5 text-muted">
                Ranks and financials are gameplay estimates.
              </p>
              <CompanyList
                candidates={board.candidates}
                selectedId={selectedId}
                sort={sort}
                onSelect={setSelectedId}
                onDetails={(id) => {
                  setDetailId(id);
                  setSheet("details");
                }}
                onSort={setSort}
              />
            </div>
          )}

          {phase === "awaitingReveal" && (
            <div className="rise-in flex flex-col items-center py-10 text-center">
              <div className="display text-4xl">Five sealed modeled holds.</div>
              <p className="mt-3 max-w-sm text-muted">
                Five modeled positions of ${PICK_STAKE.toLocaleString()} each.
                Their estimated values are still hidden.
              </p>
              <button
                type="button"
                className="pressable mt-8 rounded-2xl bg-lime px-10 py-3.5 text-sm font-bold tracking-[0.18em] text-[#10210f]"
                onClick={startReveal}
              >
                REVEAL MODELED VALUES
              </button>
            </div>
          )}
        </main>

        <aside className="hidden lg:block lg:sticky lg:top-20">
          <Vault picks={session.picks} />
        </aside>
      </div>

      {phase === "choosing" && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#07110d]/92 px-4 py-3 backdrop-blur-md lg:static lg:mt-4 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-0">
          <button
            type="button"
            disabled={!selected || busy}
            onClick={lock}
            className="pressable w-full rounded-2xl bg-lime py-3.5 text-sm font-bold tracking-[0.16em] text-[#10210f] disabled:opacity-40"
          >
            {selected ? `LOCK IN ${selected.name.toUpperCase()}` : "SELECT A COMPANY"}
          </button>
        </div>
      )}

      {error && (
        <div className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-full bg-coral/15 px-4 py-2 text-sm text-coral">
          {error}
        </div>
      )}

      {(phase === "revealing" || phase === "results") && reveal && (
        <Reveal
          payload={reveal}
          index={revealIndex}
          skipped={skipped || phase === "results"}
          reducedMotion={reducedMotion}
          onAdvance={advanceReveal}
          onSkip={() => {
            setSkipped(true);
            setPhase("results");
          }}
          onAgain={() => {
            void startFresh();
          }}
          onShare={() => {
            void share();
          }}
        />
      )}

      <Sheets
        kind={sheet}
        candidate={detailCandidate}
        onClose={sheet === "intro" ? closeIntro : () => setSheet(null)}
      />

      <p className="sr-only">
        Target {TARGET_BANKROLL}. Entertainment only.
      </p>
    </div>
  );
}
