import type { OutcomeTier } from "./types";
import { TARGET_BANKROLL } from "./types";

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

export function tierLabel(tier: OutcomeTier): string {
  switch (tier) {
    case "hundredX":
      return "100X";
    case "fiftyX":
      return "50X Club";
    case "twentyFiveX":
      return "25X Club";
    case "tenX":
      return "10X";
    case "twoX":
      return "2X Club";
    case "green":
      return "In the Green";
    case "lost":
      return "Lost Money";
  }
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
