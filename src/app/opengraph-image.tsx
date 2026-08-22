import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#FFFFFF",
          border: "16px solid #FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#2F4CD1",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 28, color: "#4B505A", letterSpacing: 2 }}>
            KETAN GOYAL
          </div>
        </div>
        <div
          style={{
            fontSize: 96,
            color: "#14161B",
            marginTop: 32,
            fontFamily: "serif",
          }}
        >
          I learn by building.
        </div>
        <div style={{ fontSize: 30, color: "#868C97", marginTop: 24 }}>
          Technology, businesses, systems and experiments.
        </div>
      </div>
    ),
    { ...size },
  );
}
