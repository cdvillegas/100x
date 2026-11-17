import { formatMultiplier } from "./format";
import { STARTING_BANKROLL, TARGET_BANKROLL, type RevealPayload } from "./types";

export type ShareContent = {
  title: string;
  text: string;
  url: string;
};

export function compactDollars(value: number): string {
  const abs = Math.abs(Math.round(value));
  const sign = value < 0 ? "−" : "";
  if (abs >= 1_000_000_000) {
    return `${sign}$${trimFloat(abs / 1_000_000_000)}B`;
  }
  if (abs >= 1_000_000) {
    return `${sign}$${trimFloat(abs / 1_000_000)}M`;
  }
  if (abs >= 10_000) {
    return `${sign}$${Math.round(abs / 1000)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatChallengeValue(multiplier: number): string {
  if (!Number.isFinite(multiplier) || multiplier <= 0) return "0";
  if (multiplier >= 100) return String(Math.round(multiplier));
  return trimFloat(Math.round(multiplier * 100) / 100);
}

export function parseMultiplierValue(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0 || value > 10_000) return null;
  return value;
}

export function parseChallengeMultiplier(search: string): number | null {
  const raw = search.startsWith("?") ? search.slice(1) : search;
  return parseMultiplierValue(new URLSearchParams(raw).get("x"));
}

export function parseSharePath(pathname: string): number | null {
  const match = pathname.match(/^\/share\/([^/]+)\/?$/);
  return match ? parseMultiplierValue(decodeURIComponent(match[1])) : null;
}

export const CANONICAL_ORIGIN = "https://100x.chrisvillegas.com";

export function resolveShareOrigin(origin: string): string {
  try {
    const { hostname } = new URL(origin);
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]" ||
      hostname.endsWith(".vercel.app")
    ) {
      return CANONICAL_ORIGIN;
    }
  } catch {
    return CANONICAL_ORIGIN;
  }
  return origin;
}

export function buildShareUrl(origin: string, multiplier: number): string {
  return new URL(
    `/share/${formatChallengeValue(multiplier)}`,
    resolveShareOrigin(origin),
  ).toString();
}

export function buildShareContent(
  payload: RevealPayload,
  origin: string,
): ShareContent {
  const url = buildShareUrl(origin, payload.multiplier);
  const result = formatMultiplier(payload.multiplier);
  return {
    title: "100X",
    text: `I just scored ${result} on 100X.\nThink you can turn ${compactDollars(STARTING_BANKROLL)} into ${compactDollars(TARGET_BANKROLL)}?`,
    url,
  };
}

export function nativeShareData(
  content: ShareContent,
  appleTarget = isAppleShareTarget(),
): ShareData {
  const message = `${content.text}\n${content.url}`;
  if (appleTarget) return { text: message };
  return { text: content.text, url: content.url };
}

export async function shareResults(payload: RevealPayload, origin: string) {
  const content = buildShareContent(payload, origin);
  const message = `${content.text}\n${content.url}`;
  if (typeof navigator.share === "function") {
    const data = nativeShareData(content);
    try {
      if (navigator.canShare && !navigator.canShare(data)) {
        await navigator.share({ text: message });
      } else {
        await navigator.share(data);
      }
      return;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
    }
  }
  await writeClipboard(message);
}

function isAppleShareTarget() {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
}

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    field.remove();
  }
}

function trimFloat(value: number): string {
  return String(value).replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0+$/, "");
}
