import { CONSUMER_INDUSTRIAL_STORIES } from "./company-stories-consumer-industrials";
import { FINANCE_MEDIA_STORIES } from "./company-stories-finance-media";
import { HEALTH_ENERGY_STORIES } from "./company-stories-health-energy";
import { TECHNOLOGY_STORIES } from "./company-stories-technology";
import type {
  CompanyStoryMoment,
  CompanyStoryProfile,
} from "./company-story-types";

const COMPANY_STORIES: Record<string, CompanyStoryProfile> = {
  ...TECHNOLOGY_STORIES,
  ...FINANCE_MEDIA_STORIES,
  ...CONSUMER_INDUSTRIAL_STORIES,
  ...HEALTH_ENERGY_STORIES,
};

function baseTicker(ticker: string): string {
  return ticker.replace(/2$/, "");
}

function profileFor(ticker: string): CompanyStoryProfile | null {
  return COMPANY_STORIES[baseTicker(ticker)] ?? null;
}

function latestKnownMoment(
  moments: readonly CompanyStoryMoment[],
  year: number,
): CompanyStoryMoment | undefined {
  return [...moments]
    .filter((moment) => moment.year <= year)
    .sort((a, b) => b.year - a.year)[0];
}

function distinct(values: readonly string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

export function companyThenStory(
  year: number,
  ticker: string,
): string | null {
  const profile = profileFor(ticker);
  if (!profile) return null;
  return latestKnownMoment(profile.moments, year)?.then ?? null;
}

export function companyAfterStory(
  year: number,
  ticker: string,
): string | null {
  const profile = profileFor(ticker);
  if (!profile) return null;
  const later = distinct(
    profile.moments
      .filter((moment) => moment.year > year)
      .sort((a, b) => a.year - b.year)
      .map((moment) => moment.after),
  );

  if (later.length === 0) return profile.recentArc;
  const pieces = later.length === 1 ? later : [later[0], later[later.length - 1]];
  return distinct([...pieces, profile.recentArc]).join(" ");
}

export function companyStoryProfileCount(): number {
  return Object.keys(COMPANY_STORIES).length;
}
