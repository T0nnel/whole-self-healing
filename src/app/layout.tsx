import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whole Self Healing — Evidence-Based Psychology, Mindfulness & Somatics | Bibi Beck",
  description:
    "Explore self-compassion, learn to rest without guilt, and find a gentler way of living with Bibi Beck, MSc Clinical Psychology, Qualified PWP and Mindfulness Practitioner.",
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
