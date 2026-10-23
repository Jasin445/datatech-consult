import { ImageResponse } from "next/og";

// PLACEHOLDER favicon (the readout mark), not an official brand asset. Replace with an official
// favicon derived from the Datatechhub logo when the business supplies one (see RELEASE_CHECKLIST.md).
// Hex values mirror the charcoal and gold-soft tokens in globals.css.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#172b3a", borderRadius: 12 }}>
        {/* The readout mark (see src/components/ui/Mark.tsx). */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c4b08c">
          <path d="M4 3.5V20h16.5" strokeWidth="2.4" strokeLinecap="square" />
          <path d="M4 9.5h10.5M14.5 9.5V20" strokeWidth="1.2" strokeDasharray="1.6 2.2" opacity="0.7" />
          <circle cx="14.5" cy="9.5" r="3.4" fill="#c4b08c" stroke="none" />
        </svg>
      </div>
    ),
    size,
  );
}
