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

export function buildShareUrl(origin: string, multiplier: number): string {
  return new URL(`/share/${formatChallengeValue(multiplier)}`, origin).toString();
}

export function buildShareContent(
  payload: RevealPayload,
  origin: string,
): ShareContent {
  const url = buildShareUrl(origin, payload.multiplier);
  const result = formatMultiplier(payload.multiplier);
  const cta = `Could you turn ${compactDollars(STARTING_BANKROLL)} into ${compactDollars(TARGET_BANKROLL)}?`;
  return {
    title: "100X",
    text: `I got ${result} on my 100X portfolio.\n\n${cta}\n${url}`,
    url,
  };
}

export async function shareResults(payload: RevealPayload, origin: string) {
  const content = buildShareContent(payload, origin);
  if (typeof navigator.share === "function") {
    try {
      await navigator.share({ text: content.text });
      return;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
    }
  }
  await writeClipboard(content.text);
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
