import { ImageResponse } from "next/og";
import { displayFont, spaceGroteskBold } from "@/lib/og-font";

export const alt = "100X — Pick five stocks from the past. Turn $10K into $1M.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
            Pick five stocks from the past
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              fontSize: 210,
              fontWeight: 700,
              letterSpacing: "-0.07em",
              lineHeight: 0.9,
            }}
          >
            <span>100</span>
            <span
              style={{
                color: "#b7ff45",
                textShadow:
                  "0 0 36px rgba(183, 255, 69, 0.55), 0 0 90px rgba(183, 255, 69, 0.28)",
              }}
            >
              X
            </span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              color: "#b7ff45",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              textShadow: "0 0 22px rgba(183, 255, 69, 0.4)",
            }}
          >
            Turn $10K into $1M
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
