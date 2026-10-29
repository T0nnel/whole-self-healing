import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whole Self Healing — Evidence-Based Psychology & Somatics | Bibi Beck",
  description:
    "Explore self-compassion, learn to rest without guilt, and find a gentler way of living with Bibi Beck, Qualified PWP and Clinical Forensic Psychologist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
