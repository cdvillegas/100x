import type { EraMood } from "./types";

export const ERA_CHIPS: Record<EraMood, { label: string }> = {
  recession: { label: "Recession" },
  bull: { label: "Bull Market" },
  mixed: { label: "Mixed Sentiment" },
  recovery: { label: "Recovery" },
  crisis: { label: "Credit Crisis" },
  inflation: { label: "Inflation" },
  "easy-money": { label: "Easy Money" },
  "late-cycle": { label: "Late Cycle" },
  "war-risk": { label: "War Risk" },
  "tech-wave": { label: "Tech Wave" },
  "oil-shock": { label: "Oil Shock" },
  "trade-war": { label: "Trade War" },
  tightening: { label: "Tightening" },
};
