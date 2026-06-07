import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deep Question Companion",
  description: "รู้จักเข้าใจสิ่งต่างๆให้ลึกขึ้น",
  keywords: ["deep questions", "insight", "mindfulness", "productivity", "CEO", "leadership"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
