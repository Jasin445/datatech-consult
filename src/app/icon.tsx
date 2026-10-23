import { ImageResponse } from "next/og";

// PLACEHOLDER favicon (typographic monogram), not an official brand asset. Replace with an official
// favicon derived from the Datatechhub logo when the business supplies one (see RELEASE_CHECKLIST.md).
// Hex values mirror the charcoal and gold-soft tokens in globals.css.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#172b3a", borderRadius: 12 }}>
        <span style={{ fontSize: 46, fontStyle: "italic", fontFamily: "serif", color: "#c4b08c", lineHeight: 1 }}>D</span>
      </div>
    ),
    size,
  );
}
