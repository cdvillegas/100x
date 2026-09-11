"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  createGame,
  loadGame,
  pickGame,
  respinGame,
  revealGame,
  spinGame,
} from "@/lib/api";
import { formatHoldReturn } from "@/lib/format";
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
const INTRO_KEY = "100x-intro-seen-v2";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type UiPhase =
  | "boot"
  | "ready"
  | "spinning"
  | "choosing"
  | "revealing"
  | "results";

type SpinTarget = "both" | "year" | "rank";

function applySession(session: PublicSession): UiPhase {
  if (session.status === "revealed") return "results";
  if (session.currentBoard) return "choosing";
  return "ready";
}

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export default function GameApp() {
  const [session, setSession] = useState<PublicSession | null>(null);
  const [phase, setPhase] = useState<UiPhase>("boot");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("mcap");
  const [sheet, setSheet] = useState<"how" | "details" | "intro" | null>(
    null,
  );
  const [detailId, setDetailId] = useState<string | null>(null);
  const [reveal, setReveal] = useState<RevealPayload | null>(null);
  const [revealIndex, setRevealIndex] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    () => false,
  );
  const [spinTarget, setSpinTarget] = useState<SpinTarget>("both");

  const board = session?.currentBoard ?? null;
  const selected = board?.candidates.find((c) => c.id === selectedId) ?? null;
  const detailCandidate: PublicCandidate | null =
    board?.candidates.find((c) => c.id === detailId) ?? null;

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
          if (
            loaded.status === "revealed" ||
            loaded.status === "awaitingReveal"
          ) {
            const viewed = await revealGame(loaded.id);
            if (cancelled) return;
            setSession(viewed);
            setReveal(viewed.reveal);
            const alreadyRevealed = loaded.status === "revealed";
            setRevealIndex(alreadyRevealed ? viewed.reveal?.picks.length ?? 5 : -1);
            setSkipped(alreadyRevealed);
            setPhase(alreadyRevealed ? "results" : "revealing");
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
      if (next.status === "awaitingReveal") {
        const revealed = await revealGame(next.id);
        setSession(revealed);
        setReveal(revealed.reveal);
        setRevealIndex(-1);
        setSkipped(false);
        setPhase("revealing");
      } else {
        setPhase("ready");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lock failed");
    } finally {
      setBusy(false);
    }
  };

  const advanceReveal = useCallback(() => {
    setRevealIndex((current) => current + 1);
  }, []);

  const share = async () => {
    if (!reveal) return;
    const bestPickCount = reveal.bestPossiblePicks.filter(
      (pick) => pick.wasSelected,
    ).length;
    const text = [
      `100X`,
      `$${STARTING_BANKROLL.toLocaleString()} → ${Math.round(reveal.endingBankroll).toLocaleString()}`,
      `${reveal.multiplier.toFixed(2)}X · Found ${bestPickCount} of 5 best available picks`,
      `Best possible from my boards: $${Math.round(reveal.oracleBankroll).toLocaleString()}`,
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
    return `Put $${PICK_STAKE.toLocaleString()} on one company in ${board.year}. Hold until today.`;
  }, [board]);

  if (!session || phase === "boot") {
    return (
      <div className="flex min-h-dvh items-center justify-center text-muted">
        Loading the vault…
      </div>
    );
  }

  return (
    <div id="root-game" className="mx-auto min-h-dvh max-w-[1280px] overflow-x-clip px-3 pb-8 pt-2 sm:px-4 sm:pt-3">
      <header className="sticky top-0 z-20 -mx-3 mb-3 flex items-center justify-between bg-[#07110d]/88 px-3 py-3 backdrop-blur-md sm:-mx-4 sm:px-4 lg:mx-0 lg:rounded-2xl lg:border lg:border-white/[0.06]">
        <div className="display text-2xl font-semibold tracking-tight">
          100<span className="text-lime">X</span>
        </div>
        <div className="text-[10px] tracking-[0.16em] text-muted sm:text-xs sm:tracking-[0.18em]">
          ROUND {session.round} OF 5
        </div>
        <button
          type="button"
          className="whitespace-nowrap rounded-full border border-white/10 px-2.5 py-2 text-[10px] tracking-[0.12em] text-muted sm:px-3 sm:text-xs sm:tracking-[0.14em]"
          onClick={() => setSheet("how")}
        >
          HOW IT WORKS
        </button>
      </header>

      <div className="mx-auto mb-3 w-full max-w-3xl lg:hidden">
        <Vault picks={session.picks} compact />
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_420px]">
        <main className="mx-auto w-full min-w-0 max-w-3xl lg:mx-0 lg:max-w-none">
          {(phase === "ready" || phase === "spinning") && (
            <div className="flex min-h-[58vh] flex-col items-center justify-center pt-2">
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
            </div>
          )}

          {phase === "choosing" && board && (
            <div className="rise-in">
              <div className="mb-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                <div className="rounded-xl border border-lime/40 px-3 py-2 sm:rounded-2xl sm:px-4">
                  <div className="text-[10px] tracking-[0.18em] text-lime">YEAR</div>
                  <div className="display text-xl sm:text-2xl">{board.year}</div>
                </div>
                <div className="rounded-xl border border-amber/40 px-3 py-2 sm:rounded-2xl sm:px-4">
                  <div className="text-[10px] tracking-[0.18em] text-amber">
                    MARKET CAP
                  </div>
                  <div className="display text-xl sm:text-2xl">{board.bandLabel}</div>
                </div>
                <div className="col-span-2 flex justify-end gap-2 sm:ml-auto">
                  <button
                    type="button"
                    disabled={session.yearRespinUsed || busy}
                    onClick={() => respin("year")}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] tracking-[0.1em] disabled:opacity-40 sm:py-2 sm:text-[11px] sm:tracking-[0.12em]"
                  >
                    {session.yearRespinUsed ? "YEAR USED" : "YEAR RESPIN"}
                  </button>
                  <button
                    type="button"
                    disabled={session.rankRespinUsed || busy}
                    onClick={() => respin("rank")}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] tracking-[0.1em] disabled:opacity-40 sm:py-2 sm:text-[11px] sm:tracking-[0.12em]"
                  >
                    {session.rankRespinUsed ? "RANK USED" : "RANK RESPIN"}
                  </button>
                </div>
              </div>
              <p className="mb-4 hidden text-sm text-muted sm:block">{prompt}</p>
              {board.climate && (
                <>
                  <details
                    open
                    className="mb-3 rounded-xl border border-white/10 px-4 py-3 lg:hidden"
                  >
                    <summary className="cursor-pointer list-none">
                      <span className="block text-[11px] tracking-[0.16em] text-amber">
                        {board.year} · WORLD THEN
                      </span>
                      <span className="display mt-1 block text-lg text-ink">
                        {board.climate.kicker}
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {board.climate.body}
                    </p>
                  </details>
                  <div className="mb-4 hidden rounded-2xl border border-white/10 p-4 lg:block">
                  <div className="text-[11px] tracking-[0.18em] text-amber">
                      {board.year} · THE WORLD THEN
                  </div>
                  <div className="display mt-1 text-xl">{board.climate.kicker}</div>
                  <p className="mt-2 text-sm leading-6 text-muted">{board.climate.body}</p>
                  </div>
                </>
              )}
              <p className="mb-3 hidden text-xs leading-5 text-muted sm:block">
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

          {phase === "choosing" && (
            <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center border-t border-white/10 bg-[#07110d]/92 px-4 py-3 backdrop-blur-md lg:static lg:mt-4 lg:block lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-0">
              <button
                type="button"
                disabled={!selected || busy}
                onClick={lock}
                className="pressable w-full max-w-3xl rounded-2xl bg-lime py-3.5 text-sm font-bold tracking-[0.16em] text-[#10210f] disabled:opacity-40 lg:max-w-none"
              >
                {selected
                  ? `LOCK IN ${selected.name.toUpperCase()}`
                  : "SELECT A COMPANY"}
              </button>
            </div>
          )}
        </main>

        <aside className="hidden lg:block lg:sticky lg:top-20">
          <Vault picks={session.picks} />
        </aside>
      </div>

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
