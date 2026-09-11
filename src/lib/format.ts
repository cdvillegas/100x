import type { OutcomeTier } from "./types";
import { PICK_STAKE, TARGET_BANKROLL } from "./types";

export function formatMoney(value: number): string {
  const abs = Math.abs(value);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(abs));
  return value < 0 ? `−${formatted.slice(1)}` : formatted;
}

export function formatCompact(value: number | null): string {
  if (value == null) return "Not reported";
  const abs = Math.abs(value);
  const sign = value < 0 ? "−" : "";
  if (abs >= 1e12) return `${sign}$${(abs / 1e12).toFixed(1)}T`;
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}M`;
  return `${sign}${formatMoney(abs)}`;
}

export function formatPct(value: number | null, digits = 1): string {
  if (value == null) return "Not reported";
  const pct = value * 100;
  const abs = Math.abs(pct).toFixed(digits);
  if (pct > 0) return `+${abs}%`;
  if (pct < 0) return `−${abs}%`;
  return `${Number(abs).toFixed(digits)}%`;
}

export function formatMultiplier(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "0X";
  if (value < 10) {
    return `${value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}X`;
  }
  if (value < 100) return `${value.toFixed(1).replace(/\.0$/, "")}X`;
  return `${Math.round(value)}X`;
}

export function formatHoldReturn(totalReturn: number): string {
  const multiple = 1 + totalReturn;
  if (multiple <= 0) return "0X";
  return formatMultiplier(multiple);
}

export function modeledSharePrice(
  ticker: string,
  year: number,
  marketCapRank: number,
) {
  let hash = 2166136261;
  const key = `${ticker.toUpperCase()}:${year}`;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const jitter = 10 + (hash % 80);
  const sizeBias = Math.max(6, 90 - marketCapRank);
  return Math.max(8, Math.round(((jitter + sizeBias) / 2) * 100) / 100);
}

export function modeledShareCount(
  ticker: string,
  year: number,
  marketCapRank: number,
) {
  return Math.max(
    1,
    Math.round(PICK_STAKE / modeledSharePrice(ticker, year, marketCapRank)),
  );
}

export function formatSharePrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function buySharesLabel(
  ticker: string,
  year: number,
  marketCapRank: number,
) {
  const count = modeledShareCount(ticker, year, marketCapRank);
  return `BUY ${count.toLocaleString()} SHARES OF ${ticker}`;
}

export function formatPe(value: number | null): string {
  if (value == null) return "N/M";
  return value.toFixed(1);
}

export function outcomeTier(multiplier: number): OutcomeTier {
  if (multiplier >= 100) return "hundredX";
  if (multiplier >= 50) return "fiftyX";
  if (multiplier >= 25) return "twentyFiveX";
  if (multiplier >= 10) return "tenX";
  if (multiplier >= 2) return "twoX";
  if (multiplier >= 1) return "green";
  return "lost";
}

export function bandCopy(rankStart: number, rankEnd: number): string {
  if (rankStart === 1) return "the ten largest U.S. companies";
  return `companies ranked #${rankStart}–${rankEnd} by market cap`;
}

export function targetCopy(): string {
  return formatMoney(TARGET_BANKROLL);
}

export function signedClass(value: number): "up" | "down" | "flat" {
  if (value > 0.0005) return "up";
  if (value < -0.0005) return "down";
  return "flat";
}
