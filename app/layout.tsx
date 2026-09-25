import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-body",
  display: "swap",
});

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-display",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-serif",
  display: "swap",
});

const dancingScript = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kỷ Niệm Ngày Cưới (27/11/2022 — 27/11/2026) — Our Wedding Story",
  description: "Thước phim kỷ niệm 4 năm ngày cưới 27/11/2022 — 27/11/2026 đong đầy yêu thương.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${lora.variable} ${playfair.variable} ${dancingScript.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
