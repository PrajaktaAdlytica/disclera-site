import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import "./icon-system.css";
import "./product-pages.css";
import "./access-pages.css";
import "./styles/fonts.css";
import "./entry-hero.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], style: ["normal", "italic"] });
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument-serif", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const entryInter = Inter({ variable: "--font-entry-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Disclera | Make every disclosure defensible",
  description: "The evidence layer for audit-ready CSRD and sustainability reporting.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${instrumentSerif.variable} ${entryInter.variable}`}>{children}</body></html>;
}
