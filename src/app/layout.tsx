import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
});

import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Your trusted partner in modern construction`,
  description: `${siteConfig.name} delivers exceptional residential, commercial and industrial construction projects with precision and craftsmanship.`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://trics.com"),
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — Your trusted partner in modern construction`,
    description: `${siteConfig.name} delivers exceptional residential, commercial and industrial construction projects with precision and craftsmanship.`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Your trusted partner in modern construction`,
    description: `${siteConfig.name} delivers exceptional residential, commercial and industrial construction projects with precision and craftsmanship.`,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${interTight.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
