/** Headlines an investor could have read on or before the board's entry date. */
const LOOKBACK_DAYS = 45;

function parts(entryDate: string): { y: number; m: number; d: number } {
  const [y, m, d] = entryDate.split("-").map(Number);
  return { y, m, d };
}

function shift(date: { y: number; m: number; d: number }, days: number) {
  const next = new Date(date.y, date.m - 1, date.d + days);
  return {
    y: next.getFullYear(),
    m: next.getMonth() + 1,
    d: next.getDate(),
  };
}

function mdY(date: { y: number; m: number; d: number }) {
  return `${date.m}/${date.d}/${date.y}`;
}

function iso(date: { y: number; m: number; d: number }) {
  return `${date.y}-${String(date.m).padStart(2, "0")}-${String(date.d).padStart(2, "0")}`;
}

export function thenHeadlinesUrl(entryDate: string): string {
  const end = parts(entryDate);
  const start = shift(end, -LOOKBACK_DAYS);
  const after = shift(start, -1);
  const before = shift(end, 1);
  const url = new URL("https://www.google.com/search");
  url.searchParams.set(
    "q",
    `US stock market outlook after:${iso(after)} before:${iso(before)}`,
  );
  url.searchParams.set("tbm", "nws");
  url.searchParams.set("hl", "en");
  url.searchParams.set("gl", "us");
  url.searchParams.set(
    "tbs",
    `sbd:1,cdr:1,cd_min:${mdY(start)},cd_max:${mdY(end)}`,
  );
  return url.toString();
}
