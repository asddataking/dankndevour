import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { getBaseUrl } from "@/lib/site";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Dank N Devour | Food. Smoke. No Filter.",
    template: "%s | Dank N Devour",
  },
  description: "Restaurant reviews and dispo pairings. No filter.",
  icons: {
    icon: "/DankNDevourlogo.png",
    apple: "/DankNDevourlogo.png",
  },
  openGraph: {
    title: "Dank N Devour | Food. Smoke. No Filter.",
    description: "Restaurant reviews and dispo pairings. No filter.",
    siteName: "Dank N Devour",
    type: "website",
    url: "/",
    images: [
      {
        url: "/DankNDevourlogo.png",
        width: 1200,
        height: 630,
        alt: "Dank N Devour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dank N Devour | Food. Smoke. No Filter.",
    description: "Restaurant reviews and dispo pairings. No filter.",
    images: ["/DankNDevourlogo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Suspense fallback={<header className="h-[120px] shrink-0 bg-background" />}>
          <SiteHeader />
        </Suspense>
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
