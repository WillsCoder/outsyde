import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  DM_Sans,
  Plus_Jakarta_Sans,
  Mulish,
} from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mulish",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://outsyde.org";

const SITE_DESCRIPTION =
  "Discover the best spots, vibes, and events in Lagos — curated bars, restaurants, lounges, beaches, concerts, food fairs and more. Outsyde is the lifestyle discovery platform for urban Africa.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Outsyde — We outside, you coming?",
    template: "%s · Outsyde", // child pages: "What's on · Outsyde"
  },

  description: SITE_DESCRIPTION,

  keywords: [
    "things to do in Lagos",
    "Lagos events",
    "Lagos nightlife",
    "Lagos restaurants",
    "Lagos bars",
    "Lagos lounges",
    "concerts in Lagos",
    "Lagos beaches",
    "food fairs Lagos",
  ],

  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: "Outsyde",
    title: "Outsyde — We outside, you coming?",
    description: SITE_DESCRIPTION,
    // images: drop a 1200×630 file at app/opengraph-image.png and Next wires it automatically
  },

  twitter: {
    card: "summary_large_image",
    title: "Outsyde — We outside, you coming?",
    description: SITE_DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Outsyde",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en-NG",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${plusJakarta.variable} ${mulish.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
