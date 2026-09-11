import {
  englishDataset,
  englishRecommendedTransformers,
  RegExpMatcher,
} from "obscenity";

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

const RESERVED = new Set([
  "admin",
  "administrator",
  "mod",
  "moderator",
  "official",
  "100x",
  "100xofficial",
  "100x official",
  "tenx",
  "support",
  "staff",
  "system",
]);

const NAME_PATTERN = /^[\p{L}\p{N} .'_-]{2,20}$/u;

export type NameValidation =
  | { ok: true; name: string }
  | { ok: false; error: string };

function foldReserved(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function foldForFilter(value: string) {
  return foldReserved(value)
    .replace(/[@4]/g, "a")
    .replace(/[1!|]/g, "i")
    .replace(/3/g, "e")
    .replace(/[$5]/g, "s")
    .replace(/0/g, "o")
    .replace(/7/g, "t")
    .replace(/fvck/g, "fuck")
    .replace(/\s+/g, "");
}

export function validateDisplayName(input: unknown): NameValidation {
  if (typeof input !== "string") {
    return { ok: false, error: "Choose a display name." };
  }

  const name = input.normalize("NFC").replace(/\s+/g, " ").trim();
  if (name.length < 2 || name.length > 20 || !NAME_PATTERN.test(name)) {
    return { ok: false, error: "Use 2–20 letters, numbers, or spaces." };
  }

  const reserved = foldReserved(name);
  if (!reserved || RESERVED.has(reserved) || reserved.startsWith("100x ")) {
    return { ok: false, error: "That name is reserved." };
  }

  const folded = foldForFilter(name);
  if (
    matcher.hasMatch(name) ||
    matcher.hasMatch(reserved) ||
    matcher.hasMatch(folded)
  ) {
    return { ok: false, error: "Choose a different name." };
  }

  return { ok: true, name };
}
