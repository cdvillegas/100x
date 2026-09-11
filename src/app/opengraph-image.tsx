import { ImageResponse } from "next/og";

export const alt = "100X — Pick five stocks from the past. Turn $10K into $1M.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 72,
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
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Pick five stocks from the past.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 40,
              color: "#b7ff45",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Turn $10K into $1M.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
