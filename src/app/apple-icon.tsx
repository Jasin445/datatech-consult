import { ImageResponse } from "next/og";

// PLACEHOLDER touch icon (the readout mark), not an official brand asset. See src/app/icon.tsx.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#172b3a" }}>
        {/* The readout mark (see src/components/ui/Mark.tsx). */}
        <svg width="116" height="116" viewBox="0 0 24 24" fill="none" stroke="#c4b08c">
          <path d="M4 3.5V20h16.5" strokeWidth="2.4" strokeLinecap="square" />
          <path d="M4 9.5h10.5M14.5 9.5V20" strokeWidth="1.2" strokeDasharray="1.6 2.2" opacity="0.7" />
          <circle cx="14.5" cy="9.5" r="3.4" fill="#c4b08c" stroke="none" />
        </svg>
      </div>
    ),
    size,
  );
}
