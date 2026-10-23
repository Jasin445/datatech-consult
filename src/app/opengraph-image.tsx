import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// Default social-sharing image for every route. Rendered at build time (no network fonts).
// Hex values mirror the @theme tokens in globals.css (ImageResponse cannot read CSS variables).
export const alt = `${siteConfig.name}: ${siteConfig.parentTagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/logos/datatechhub-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#ffffff", padding: 80 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* Official logo, unchanged (849x294). */}
          <img src={logoSrc} width={347} height={120} alt="" />
          <div style={{ display: "flex", borderLeft: "4px solid #15a8ea", paddingLeft: 24, fontSize: 44, fontWeight: 600, color: "#172b3a" }}>
            Consulting
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 60, fontWeight: 700, lineHeight: 1.1, color: "#172b3a", maxWidth: 980 }}>
          Make your data and technology work for your business.
        </div>
        <div style={{ display: "flex", marginTop: 36, height: 12, width: 220, background: "#1e64ab", borderRadius: 6 }} />
      </div>
    ),
    size,
  );
}
