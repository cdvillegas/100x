export interface CompanyStoryMoment {
  /**
   * First game year where this information was already known on January 1.
   * Copy must not reveal events later in that year.
   */
  year: number;
  then: string;
  /** Past-tense account of the event, safe to use after the final reveal. */
  after: string;
}

export interface CompanyStoryProfile {
  /**
   * Company-specific tension visible at every entry date. This should frame
   * uncertainty without hinting at the modeled return.
   */
  stakes: string;
  /** Chronological, fact-based snapshots of the company as it evolved. */
  moments: readonly CompanyStoryMoment[];
  /**
   * A documented long-run arc used when no later moment exists in the game's
   * timeline (most often for a 2023 entry).
   */
  recentArc: string;
}
