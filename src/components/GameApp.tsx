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
  submitLeaderboard,
} from "@/lib/api";
import { formatHoldReturn } from "@/lib/format";
import {
  PICK_STAKE,
  STARTING_BANKROLL,
  TARGET_BANKROLL,
  type LeaderboardPlacement,
  type PublicCandidate,
  type PublicSession,
  type RevealPayload,
} from "@/lib/types";
import CompanyList from "./CompanyList";
import Leaderboard from "./Leaderboard";
import Reels from "./Reels";
import Reveal from "./Reveal";
import Sheets from "./Sheets";
import Vault from "./Vault";

const GAME_KEY = "tenx-game-id";
const INTRO_KEY = "100x-intro-seen-v2";
const NAME_KEY = "100x-display-name";
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
  const [sheet, setSheet] = useState<"how" | "details" | "intro" | null>(
    null,
  );
  const [showBoard, setShowBoard] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [reveal, setReveal] = useState<RevealPayload | null>(null);
  const [revealIndex, setRevealIndex] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bootError, setBootError] = useState<string | null>(null);
  const [approvedName, setApprovedName] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [placements, setPlacements] = useState<LeaderboardPlacement[]>([]);
  const [submittingBoard, setSubmittingBoard] = useState(false);
  const [boardError, setBoardError] = useState<string | null>(null);
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
    setReveal(null);
    setRevealIndex(0);
    setSkipped(false);
    setPlacements([]);
    setBoardError(null);
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
            const saved = localStorage.getItem(NAME_KEY);
            if (alreadyRevealed && saved) {
              void submitLeaderboard(viewed.id, saved)
                .then((result) => {
                  localStorage.setItem(NAME_KEY, result.displayName);
                  setApprovedName(result.displayName);
                  setPlacements(result.placements);
                })
                .catch((err) => {
                  setBoardError(
                    err instanceof Error ? err.message : "Board unavailable",
                  );
                });
            }
          } else {
            setPhase(applySession(loaded));
          }
        } else {
          await startFresh();
        }
        const savedName = localStorage.getItem(NAME_KEY);
        if (savedName) {
          setApprovedName(savedName);
          setDraftName(savedName);
        }
        if (!localStorage.getItem(INTRO_KEY)) setSheet("intro");
      } catch (err) {
        if (!cancelled) {
          try {
            await startFresh();
          } catch (next) {
            setBootError(
              next instanceof Error
                ? next.message
                : err instanceof Error
                  ? err.message
                  : "Game storage is unavailable.",
            );
          }
        }
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

  const beginSpinAnimation = (next: PublicSession) => {
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
  };

  const spin = async () => {
    if (!session || busy || phase !== "ready") return;
    setBusy(true);
    setError(null);
    try {
      const next = await spinGame(session.id);
      beginSpinAnimation(next);
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
    setError(null);
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
        setBusy(false);
      } else {
        const spun = await spinGame(next.id);
        beginSpinAnimation(spun);
      }
    } catch (err) {
      setBusy(false);
      setError(err instanceof Error ? err.message : "Lock failed");
    }
  };

  const postToBoard = useCallback(
    async (name: string) => {
      if (!session || submittingBoard) return;
      setSubmittingBoard(true);
      setBoardError(null);
      try {
        const result = await submitLeaderboard(session.id, name);
        localStorage.setItem(NAME_KEY, result.displayName);
        setApprovedName(result.displayName);
        setDraftName(result.displayName);
        setPlacements(result.placements);
      } catch (err) {
        setBoardError(err instanceof Error ? err.message : "Board unavailable");
      } finally {
        setSubmittingBoard(false);
      }
    },
    [session, submittingBoard],
  );

  const finishToResults = (name = approvedName) => {
    setSkipped(true);
    setPhase("results");
    if (name) void postToBoard(name);
  };

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
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 px-6 text-center text-muted">
        <div>{bootError ?? "Loading the vault…"}</div>
        {bootError ? (
          <button
            type="button"
            className="rounded-full border border-white/10 px-4 py-2 text-xs tracking-[0.14em] text-ink"
            onClick={() => {
              setBootError(null);
              void startFresh();
            }}
          >
            TRY AGAIN
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div id="root-game" className="mx-auto min-h-dvh max-w-[1280px] overflow-x-clip px-3 pb-8 pt-2 sm:px-4 sm:pt-3">
      <header className="sticky top-0 z-20 -mx-3 mb-3 flex items-center justify-between bg-[#07110d]/88 px-3 py-3 backdrop-blur-md sm:-mx-4 sm:px-4 lg:mx-0 lg:rounded-2xl lg:border lg:border-white/[0.06]">
        <div className="display text-2xl font-semibold tracking-tight">
          100<span className="text-lime">X</span>
        </div>
        <button
          type="button"
          className="rounded-full border border-white/10 px-3 py-2 text-[10px] tracking-[0.14em] text-muted sm:text-xs"
          onClick={() => setShowBoard(true)}
        >
          LEADERBOARD
        </button>
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
              <div className="mb-3 grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <div className="rounded-xl border border-lime/40 px-3 py-2 sm:rounded-2xl sm:px-4">
                    <div className="text-[10px] tracking-[0.18em] text-lime">YEAR</div>
                    <div className="display text-xl sm:text-2xl">{board.year}</div>
                  </div>
                  <button
                    type="button"
                    disabled={session.yearRespinUsed || busy}
                    onClick={() => respin("year")}
                    className="rounded-xl border border-lime/30 bg-lime/[0.045] px-3 py-2 text-[10px] font-semibold tracking-[0.12em] text-lime disabled:opacity-35 sm:rounded-2xl sm:text-[11px]"
                  >
                    {session.yearRespinUsed ? "YEAR RESPIN USED" : "RESPIN YEAR"}
                  </button>
                </div>
                <div className="grid gap-2">
                  <div className="rounded-xl border border-amber/40 px-3 py-2 sm:rounded-2xl sm:px-4">
                    <div className="text-[10px] tracking-[0.18em] text-amber">
                      MARKET CAP
                    </div>
                    <div className="display text-xl sm:text-2xl">{board.bandLabel}</div>
                  </div>
                  <button
                    type="button"
                    disabled={session.rankRespinUsed || busy}
                    onClick={() => respin("rank")}
                    className="rounded-xl border border-amber/30 bg-amber/[0.045] px-3 py-2 text-[10px] font-semibold tracking-[0.12em] text-amber disabled:opacity-35 sm:rounded-2xl sm:text-[11px]"
                  >
                    {session.rankRespinUsed ? "RANK RESPIN USED" : "RESPIN RANK"}
                  </button>
                </div>
              </div>
              <p className="mb-4 hidden text-sm text-muted sm:block">{prompt}</p>
              {board.climate && (
                <>
                  <details className="group mb-3 rounded-xl border border-white/10 px-4 py-3 lg:hidden">
                    <summary className="cursor-pointer list-none">
                      <span className="block text-[11px] tracking-[0.16em] text-amber">
                        {board.year} · WORLD THEN
                      </span>
                      <span className="display mt-1 block text-lg text-ink">
                        {board.climate.kicker}
                      </span>
                      <span className="mt-2 block text-[10px] tracking-[0.14em] text-muted">
                        <span className="group-open:hidden">READ CONTEXT +</span>
                        <span className="hidden group-open:inline">CLOSE −</span>
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
                onSelect={setSelectedId}
                onDetails={(id) => {
                  setDetailId(id);
                  setSheet("details");
                }}
              />
            </div>
          )}

        </main>

        <aside className="hidden lg:block lg:sticky lg:top-20">
          <Vault picks={session.picks} />
        </aside>
      </div>

      {phase === "choosing" && selected && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#07110d]/92 backdrop-blur-md">
          <div className="mx-auto grid max-w-[1280px] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-4 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
            <button
              type="button"
              disabled={busy}
              onClick={lock}
              className="pressable w-full rounded-2xl bg-lime py-3.5 text-sm font-bold tracking-[0.16em] text-[#10210f] disabled:opacity-40"
            >
              LOCK IN {selected.name.toUpperCase()}
            </button>
          </div>
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
          placements={placements}
          approvedName={approvedName}
          draftName={draftName}
          submitting={submittingBoard}
          submitError={boardError}
          onAdvance={() => {
            setRevealIndex((current) => {
              const next = current + 1;
              if (reveal && next >= reveal.picks.length) {
                finishToResults();
              }
              return next;
            });
          }}
          onSkip={() => {
            finishToResults();
          }}
          onAgain={() => {
            void startFresh();
          }}
          onShare={() => {
            void share();
          }}
          onDraftName={setDraftName}
          onSubmitName={() => {
            void postToBoard(draftName);
          }}
          onRetry={() => {
            if (approvedName) void postToBoard(approvedName);
            else void postToBoard(draftName);
          }}
          onOpenBoard={() => setShowBoard(true)}
        />
      )}

      <Sheets
        kind={sheet}
        candidate={detailCandidate}
        onClose={sheet === "intro" ? closeIntro : () => setSheet(null)}
      />

      {showBoard ? (
        <Leaderboard
          gameId={session.picks.length >= 5 ? session.id : undefined}
          approvedName={approvedName}
          onClose={() => setShowBoard(false)}
          onRenamed={(name) => {
            setApprovedName(name);
            setDraftName(name);
            localStorage.setItem(NAME_KEY, name);
          }}
        />
      ) : null}

      <p className="sr-only">
        Target {TARGET_BANKROLL}. Entertainment only.
      </p>
    </div>
  );
}
