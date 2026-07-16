import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Body / UI — DM Sans (variable), the brand's self-hosted body face.
const dmSans = localFont({
  src: "../fonts/DMSans-Variable.ttf",
  variable: "--font-sans",
  weight: "100 1000",
  display: "swap",
});

// Headings — Nordt Slim, the brand's proprietary display face.
const nordtSlim = localFont({
  src: [
    { path: "../fonts/NordtSlim-Light.otf", weight: "400", style: "normal" },
    { path: "../fonts/NordtSlim-SemiLight.otf", weight: "600", style: "normal" },
    { path: "../fonts/NordtSlim-Regular.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Galvanite — Components",
  description: "Galvanite design system — shadcn/ui components themed to the brand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${dmSans.variable} ${nordtSlim.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
