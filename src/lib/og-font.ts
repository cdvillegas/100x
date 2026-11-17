const FONT_CSS =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap";

let cached: ArrayBuffer | null = null;

export async function spaceGroteskBold() {
  if (cached) return cached;
  const css = await fetch(FONT_CSS, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
  }).then((response) => {
    if (!response.ok) throw new Error("Could not load Space Grotesk CSS");
    return response.text();
  });
  const file = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!file) throw new Error("Space Grotesk file missing");
  const font = await fetch(file).then((response) => {
    if (!response.ok) throw new Error("Could not load Space Grotesk");
    return response.arrayBuffer();
  });
  cached = font;
  return font;
}

export const displayFont = {
  name: "Space Grotesk",
  style: "normal" as const,
  weight: 700 as const,
};
