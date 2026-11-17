import { ImageResponse } from "next/og";
import { formatMultiplier } from "@/lib/format";
import { displayFont, spaceGroteskBold } from "@/lib/og-font";
import { parseMultiplierValue } from "@/lib/share";

export const alt = "I scored this on 100X";
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
  const value = result.replace(/X$/, "");
  const font = await spaceGroteskBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0e1210",
          backgroundImage:
            "radial-gradient(ellipse 70% 80% at 50% 48%, rgba(183, 255, 69, 0.16) 0%, #0e1210 62%)",
          color: "#f7f4ec",
          fontFamily: "Space Grotesk",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 1110,
            height: 540,
            borderRadius: 36,
            border: "1px solid rgba(183, 255, 69, 0.28)",
            backgroundColor: "rgba(16, 22, 18, 0.72)",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#c5c8bf",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            I scored
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              color: "#b7ff45",
              fontSize: 210,
              fontWeight: 700,
              letterSpacing: "-0.07em",
              lineHeight: 0.9,
              textShadow:
                "0 0 36px rgba(183, 255, 69, 0.55), 0 0 90px rgba(183, 255, 69, 0.28)",
            }}
          >
            <span>{value}</span>
            <span>X</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "#c5c8bf" }}>on 100</span>
            <span
              style={{
                color: "#b7ff45",
                textShadow: "0 0 22px rgba(183, 255, 69, 0.55)",
              }}
            >
              X
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ ...displayFont, data: font }],
    },
  );
}
