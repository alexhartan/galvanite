import type { Metadata } from "next";
import { dmSans, nordtSlim } from "@/lib/fonts";
import "./globals.css";

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
