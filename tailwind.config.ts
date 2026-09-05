import type { Config } from "tailwindcss";

/**
 * Module 3 / Day 4 tokens. A neutral corporate base — charcoal, white and
 * grey — with a single reserved accent (deep corporate green) used ONLY for
 * interactive/actionable surfaces: buttons, active drag state, chart bars,
 * progress fills. Nothing decorative uses the accent.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral base
        ink: "#16191D", // charcoal — primary text, dark surfaces' text
        slate: "#1E232A", // dark charcoal — top bar / footer ground
        slateHi: "#2A313A", // raised dark surface
        ash: "#5E6670", // muted grey — secondary text
        paper: "#FFFFFF", // cards / raised light surfaces
        canvas: "#F5F6F7", // page ground
        mist: "#EEF1F3", // subtle grey fill (inbox, table stripes)
        line: "#E2E5E9", // hairline borders

        // The one accent — interactive only
        accent: "#0E7A5A",
        accentHi: "#0A5E45",
        accentSoft: "#E7F2EC",

        // Reserved semantics
        danger: "#B23B3B",
        warn: "#B87514",
      },
      fontFamily: {
        sans: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
      },
      fontSize: {
        display: ["40px", { lineHeight: "48px", fontWeight: "600", letterSpacing: "-0.01em" }],
        h1: ["32px", { lineHeight: "40px", fontWeight: "600", letterSpacing: "-0.01em" }],
        h2: ["24px", { lineHeight: "32px", fontWeight: "600" }],
        h3: ["18px", { lineHeight: "26px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "25px" }],
        caption: ["13px", { lineHeight: "18px" }],
        micro: ["11px", { lineHeight: "15px", letterSpacing: "0.04em" }],
        readout: ["18px", { lineHeight: "24px", fontWeight: "600" }],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(22,25,29,0.06)",
        md: "0 4px 14px rgba(22,25,29,0.08)",
        lg: "0 16px 40px rgba(22,25,29,0.16)",
        lift: "0 12px 28px rgba(14,122,90,0.22)", // drag pick-up
      },
      maxWidth: {
        prose: "48rem",
      },
    },
  },
  plugins: [],
};

export default config;
