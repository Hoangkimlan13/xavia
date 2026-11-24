
import type { Metadata } from "next";
import {
  Playfair_Display,
  Be_Vietnam_Pro,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";

const headingFont = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const ampersandFont = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-ampersand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "XAVIA SPA | Chăm sóc da khoa học",
  description:
    "Hiểu làn da hôm nay - Gìn giữ thanh xuân ngày mai. Chăm sóc da khoa học, cá nhân hóa và bền vững.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${ampersandFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
