import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "CuraBotics AI — Healthcare Technology & AI Solutions";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #020617, #0f172a)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "32px",
            background: "rgba(255, 255, 255, 0.03)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <h1
            style={{
              fontSize: 84,
              fontWeight: "bold",
              background: "linear-gradient(to right, #38bdf8, #818cf8)",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
              padding: 0,
            }}
          >
            CuraBotics AI
          </h1>
          <p
            style={{
              fontSize: 36,
              color: "#94a3b8",
              textAlign: "center",
              marginTop: 20,
              maxWidth: 800,
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            Pioneering Global Healthcare Technology, AI Automation & Robotics Integration
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
