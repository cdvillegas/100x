import { ImageResponse } from "next/og";
import { formatMultiplier } from "@/lib/format";
import { parseMultiplierValue } from "@/lib/share";

export const alt = "100X result";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ x: string }>;
}) {
  const { x } = await params;
  const multiplier = parseMultiplierValue(x);
  const result = multiplier ? formatMultiplier(multiplier) : "100X";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0e1210",
          color: "#f7f4ec",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
        >
          <span>100</span>
          <span style={{ color: "#b7ff45" }}>X</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#b7ff45",
              fontSize: 160,
              fontWeight: 700,
              letterSpacing: "-0.06em",
              lineHeight: 0.9,
            }}
          >
            {result}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 36,
              fontWeight: 600,
              color: "#b4b7ae",
            }}
          >
            Could you turn $10K into $1M?
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
