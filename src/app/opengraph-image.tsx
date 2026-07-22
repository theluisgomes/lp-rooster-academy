import { ImageResponse } from "next/og";
import { landingContent } from "@/content/landing-content";

export const alt = landingContent.seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const { brand, hero, seo } = landingContent;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #E8490D 0%, #B5160C 55%, #101010 100%)",
          color: "#FBEFDD",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          {brand.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 960,
          }}
        >
          {hero.headline}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            fontWeight: 600,
            maxWidth: 900,
            opacity: 0.95,
          }}
        >
          {hero.subtitle}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 22,
            opacity: 0.75,
            maxWidth: 900,
          }}
        >
          {seo.description}
        </div>
      </div>
    ),
    { ...size },
  );
}
