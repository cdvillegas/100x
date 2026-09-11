"use client";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  createGame,
  fetchLeaderboard,
  loadGame,
  pickGame,
  renameLeaderboard,
  respinGame,
  revealGame,
  spinGame,
  submitLeaderboard,
} from "@/lib/api";
import { buySharesLabel, formatMultiplier } from "@/lib/format";
import { GUEST_NAME, isGuestName } from "@/lib/names";
import { parseChallengeMultiplier, parseSharePath } from "@/lib/share";
import { thenHeadlinesUrl } from "@/lib/then-news";
import {
  PICK_STAKE,
  TARGET_BANKROLL,
  type LeaderboardBoard,
  type LeaderboardPlacement,
  type PublicCandidate,
  type PublicSession,
  type RevealPayload,
  type EraNote,
} from "@/lib/types";
import CompanyList from "./CompanyList";
import EraChips from "./EraChips";
import Leaderboard from "./Leaderboard";
import Reels from "./Reels";
import Reveal from "./Reveal";
import Sheets from "./Sheets";
import Vault from "./Vault";
import { DiceIcon, ExternalIcon, NewsIcon, TrendUpIcon } from "./icons";

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

function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden
    >
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v6a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4.8A2.8 2.8 0 0 0 7.7 11" />
      <path d="M17 6h2.2A2.8 2.8 0 0 1 16.3 11" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.6 2.3c-.7.4-1.2 1-1.2 1.8V14" />
      <path d="M12 17.2v.2" />
    </svg>
  );
}

function ThenNewsLink({
  entryDate,
  year,
}: {
  entryDate: string;
  year: number;
}) {
  return (
    <a
      href={thenHeadlinesUrl(entryDate)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-1.5 text-muted hover:text-ink"
    >
      <span className="eyebrow lg:hidden">VIEW HEADLINES</span>
      <span className="eyebrow hidden lg:inline">HEADLINES FROM {year}</span>
      <ExternalIcon />
    </a>
  );
}

function WorldThen({
  year,
  entryDate,
  climate,
}: {
  year: number;
  entryDate: string;
  climate: EraNote;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="company-row mb-3 rounded-2xl px-3.5 py-3 sm:px-5 sm:py-4 lg:mb-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <NewsIcon className="size-4 text-amber sm:size-5" />
          <div className="eyebrow text-amber">
            <span className="lg:hidden">{year} NEWS</span>
            <span className="hidden lg:inline">{year} · THE WORLD THEN</span>
          </div>
        </div>
        <ThenNewsLink entryDate={entryDate} year={year} />
      </div>
      <EraChips chips={climate.chips ?? []} />
      <div className="display mt-2 text-xl sm:mt-3 sm:text-2xl">{climate.kicker}</div>
      <div className="relative mt-2">
        <p
          className={`text-[15px] leading-7 text-ink/80 ${
            open ? "" : "max-h-[3.6rem] overflow-hidden sm:max-h-[5.4rem]"
          }`}
        >
          {climate.body}
        </p>
        {open ? null : (
          <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-card via-card/85 to-transparent pt-8 sm:pt-11">
            <button
              type="button"
              className="eyebrow text-muted hover:text-ink"
              onClick={() => setOpen(true)}
            >
              READ ON
            </button>
          </div>
        )}
      </div>
      {open ? (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            className="eyebrow text-muted hover:text-ink"
            onClick={() => setOpen(false)}
          >
            SHOW LESS
          </button>
        </div>
      ) : null}
    </div>
  );
}

function HeaderAction({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="pressable inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/14 bg-white/[0.05] px-3 text-xs font-bold tracking-[0.12em] text-ink hover:border-white/20 hover:bg-white/[0.09] sm:h-12 sm:px-4"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
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
  const [boardPreview, setBoardPreview] = useState<LeaderboardBoard | null>(null);
  const [personalBest, setPersonalBest] = useState(false);
  const [submittingBoard, setSubmittingBoard] = useState(false);
  const [boardError, setBoardError] = useState<string | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    () => false,
  );
  const [challengeDismissed, setChallengeDismissed] = useState(false);
  const [spinTarget, setSpinTarget] = useState<SpinTarget>("both");
  const challengeX = useSyncExternalStore(
    () => () => {},
    () =>
      parseSharePath(window.location.pathname) ??
      parseChallengeMultiplier(window.location.search),
    () => null,
  );

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
    setBoardPreview(null);
    setPersonalBest(false);
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
            if (alreadyRevealed) {
              void submitLeaderboard(
                viewed.id,
                saved && !isGuestName(saved) ? saved : GUEST_NAME,
              )
                .then((result) => {
                  if (!isGuestName(result.displayName)) {
                    localStorage.setItem(NAME_KEY, result.displayName);
                    setApprovedName(result.displayName);
                    setDraftName(result.displayName);
                  }
                  setPlacements(result.placements);
                  setBoardPreview(result.boards.daily);
                  setPersonalBest(result.personalBest);
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
        if (savedName && !isGuestName(savedName)) {
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

  const spinAgain = async () => {
    setBusy(true);
    setError(null);
    setSelectedId(null);
    setReveal(null);
    setRevealIndex(0);
    setSkipped(false);
    setPlacements([]);
    setBoardPreview(null);
    setPersonalBest(false);
    setBoardError(null);
    try {
      const next = await createGame();
      localStorage.setItem(GAME_KEY, next.id);
      setSession(next);
      const spun = await spinGame(next.id);
      beginSpinAnimation(spun);
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
        if (!isGuestName(result.displayName)) {
          localStorage.setItem(NAME_KEY, result.displayName);
          setApprovedName(result.displayName);
          setDraftName(result.displayName);
        }
        setPlacements(result.placements);
        setBoardPreview(result.boards.daily);
        setPersonalBest(result.personalBest);
      } catch (err) {
        setBoardError(err instanceof Error ? err.message : "Board unavailable");
      } finally {
        setSubmittingBoard(false);
      }
    },
    [session, submittingBoard],
  );

  const claimName = useCallback(async () => {
    const name = draftName.trim();
    if (name.length < 2 || !session) return;
    if (placements.length === 0) {
      await postToBoard(name);
      return;
    }
    setSubmittingBoard(true);
    setBoardError(null);
    try {
      const result = await renameLeaderboard(name);
      localStorage.setItem(NAME_KEY, result.displayName);
      setApprovedName(result.displayName);
      setDraftName(result.displayName);
      const next = await fetchLeaderboard("daily", session.id);
      setBoardPreview(next.board);
      setPlacements(next.placements);
    } catch (err) {
      setBoardError(err instanceof Error ? err.message : "Could not update name");
    } finally {
      setSubmittingBoard(false);
    }
  }, [draftName, placements.length, postToBoard, session]);

  const finishToResults = () => {
    setSkipped(true);
    setPhase("results");
    void postToBoard(approvedName && !isGuestName(approvedName) ? approvedName : GUEST_NAME);
  };

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
      <header className="sticky top-0 z-20 -mx-3 mb-3 flex items-center justify-between gap-3 bg-bg/88 px-3 py-3 backdrop-blur-md sm:-mx-4 sm:px-4 lg:mx-0 lg:rounded-2xl lg:border lg:border-white/[0.06]">
        <div className="display shrink-0 text-3xl tracking-tight">
          100<span className="text-lime glow-text">X</span>
        </div>
        <nav className="flex items-center gap-2">
          <HeaderAction
            label="LEADERBOARD"
            icon={<TrophyIcon />}
            onClick={() => setShowBoard(true)}
          />
          <HeaderAction
            label="HOW IT WORKS"
            icon={<HelpIcon />}
            onClick={() => setSheet("how")}
          />
        </nav>
      </header>

      {challengeX &&
      !challengeDismissed &&
      phase !== "revealing" &&
      phase !== "results" ? (
        <div className="mx-auto mb-3 flex w-full max-w-3xl items-center justify-between gap-3 rounded-2xl border border-lime/25 bg-lime/[0.07] px-4 py-3 lg:max-w-none">
          <p className="min-w-0 text-sm font-semibold text-ink">
            A friend just hit{" "}
            <span className="text-lime">{formatMultiplier(challengeX)}</span>, see if you can
            top that!
          </p>
          <button
            type="button"
            className="eyebrow shrink-0 text-muted"
            onClick={() => setChallengeDismissed(true)}
          >
            DISMISS
          </button>
        </div>
      ) : null}

      <div className="mx-auto mb-3 w-full max-w-3xl lg:hidden">
        <Vault picks={session.picks} compact />
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_440px] xl:grid-cols-[minmax(0,1fr)_460px]">
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
              {phase === "ready" ? (
              <button
                type="button"
                disabled={busy}
                onClick={spin}
                className="pressable btn-lime mt-8 flex min-h-14 items-center justify-center gap-2 rounded-2xl px-20 py-4 text-base disabled:opacity-60"
              >
                <DiceIcon />
                SPIN
              </button>
              ) : null}
            </div>
          )}

          {phase === "choosing" && board && (
            <div className="rise-in">
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <div className="company-row rounded-2xl border-lime/50 px-4 py-3.5 sm:px-5">
                    <div className="eyebrow text-lime">YEAR</div>
                    <div className="display mt-1 text-3xl sm:text-4xl">{board.year}</div>
                  </div>
                  <button
                    type="button"
                    disabled={session.yearRespinUsed || busy}
                    onClick={() => respin("year")}
                    className="rounded-2xl border border-lime/30 bg-lime/[0.045] px-3 py-2.5 text-xs font-bold tracking-[0.12em] text-lime disabled:opacity-35"
                  >
                    {session.yearRespinUsed ? "YEAR RESPIN USED" : "RESPIN YEAR"}
                  </button>
                </div>
                <div className="grid gap-2">
                  <div className="company-row rounded-2xl border-amber/50 px-4 py-3.5 sm:px-5">
                    <div className="eyebrow text-amber">MARKET CAP</div>
                    <div className="display mt-1 text-3xl sm:text-4xl">{board.bandLabel}</div>
                  </div>
                  <button
                    type="button"
                    disabled={session.rankRespinUsed || busy}
                    onClick={() => respin("rank")}
                    className="rounded-2xl border border-amber/30 bg-amber/[0.045] px-3 py-2.5 text-xs font-bold tracking-[0.12em] text-amber disabled:opacity-35"
                  >
                    {session.rankRespinUsed ? "RANK RESPIN USED" : "RESPIN RANK"}
                  </button>
                </div>
              </div>
              {board.climate && (
                <WorldThen
                  key={board.id}
                  year={board.year}
                  entryDate={board.entryDate}
                  climate={board.climate}
                />
              )}
              <div className="mb-4 flex items-center gap-2">
                <TrendUpIcon className="size-4 shrink-0 text-muted" />
                <h2 className="text-sm font-medium leading-none text-muted">
                  <span className="lg:hidden">
                    {`Invest $${PICK_STAKE.toLocaleString()} in ${board.year}`}
                  </span>
                  <span className="hidden lg:inline">
                    {`Select a Stock Below to Invest $${PICK_STAKE.toLocaleString()} In ${board.year}`}
                  </span>
                </h2>
              </div>
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

      {phase === "choosing" && selected && board && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-bg/92 backdrop-blur-md">
          <div className="mx-auto grid max-w-[1280px] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-4 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_460px]">
            <button
              type="button"
              disabled={busy}
              onClick={lock}
              className="pressable btn-lime w-full rounded-2xl py-4 text-base disabled:opacity-40"
            >
              {buySharesLabel(selected.ticker, board.year, selected.marketCapRank)}
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
          preview={boardPreview}
          personalBest={personalBest}
          hasChosenName={Boolean(approvedName && !isGuestName(approvedName))}
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
            void spinAgain();
          }}
          onDraftName={setDraftName}
          onSubmitName={() => {
            void claimName();
          }}
          onRetry={() => {
            void postToBoard(
              approvedName && !isGuestName(approvedName) ? approvedName : GUEST_NAME,
            );
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
