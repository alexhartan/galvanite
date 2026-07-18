import localFont from "next/font/local";

// Body / UI — DM Sans is loaded from Google Fonts via a plain CSS @import
// in globals.css (see the note there), not next/font: that keeps it working
// identically in Storybook's Vite build, which doesn't run next/font's
// Next.js-only build transform.

// Headings — Nordt Slim, the brand's proprietary display face (not on
// Google Fonts, so it stays self-hosted via next/font/local).
export const nordtSlim = localFont({
  src: [
    { path: "../fonts/NordtSlim-Light.otf", weight: "400", style: "normal" },
    { path: "../fonts/NordtSlim-SemiLight.otf", weight: "600", style: "normal" },
    { path: "../fonts/NordtSlim-Regular.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

/** Font-variable class names — apply to a root element. */
export const fontVariables = nordtSlim.variable;
