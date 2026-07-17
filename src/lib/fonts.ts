import localFont from "next/font/local";

// Body / UI — DM Sans (variable), the brand's self-hosted body face.
export const dmSans = localFont({
  src: "../fonts/DMSans-Variable.ttf",
  variable: "--font-sans",
  weight: "100 1000",
  display: "swap",
});

// Headings — Nordt Slim, the brand's proprietary display face.
export const nordtSlim = localFont({
  src: [
    { path: "../fonts/NordtSlim-Light.otf", weight: "400", style: "normal" },
    { path: "../fonts/NordtSlim-SemiLight.otf", weight: "600", style: "normal" },
    { path: "../fonts/NordtSlim-Regular.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

/** Combined font-variable class names — apply to a root element. */
export const fontVariables = `${dmSans.variable} ${nordtSlim.variable}`;
