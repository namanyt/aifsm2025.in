import type { Metadata, Viewport } from "next";
import { Inter, Rampart_One, Urbanist } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { AuthProvider } from "@/lib/auth/authContext";
import { Toaster } from "sonner";
import { EVENT_TITLE, ORGANIZING_DEPT, ORGANIZING_GOVT, TARGET_DATE } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const rampart = Rampart_One({
  variable: "--font-rampart-one",
  subsets: ["latin"],
  weight: "400",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AIFSM 2025",
    template: "%s | AIFSM 2025",
  },
  description: "Official AIFSM 2025 - All India Forest Sports Meet 2025",
  authors: [
    { name: "Nitya Naman", url: "https://ciderboi.xyz" },
    { name: "Amritanshu Rawat" },
    { name: "UPES", url: "https://www.upes.ac.in/" },
  ],
  creator: "Nitya Naman",
  abstract: "All India Forest Sports Meet 2025",
  category: "sports",
  classification: "Sports Event",
  referrer: "origin-when-cross-origin",
  keywords: [
    "AIFSM",
    "AIFSM 2025",
    "All India Forest Sports Meet",
    "All India Forest Sports Meet 2025",
    "Forest Sports Meet",
    "Sports Meet",
    "UPES",
    "Dehradun",
    "Uttarakhand",
    "India",
    "Sports",
    "Forestry",
  ],
  icons: {
    icon: "/logo.ico",
  },
  alternates: {
    canonical: "https://aifsm2025.in",
  },
  openGraph: {
    title: "AIFSM 2025",
    description: "All details about AIFSM 2025 — Schedule, Events, Results.",
    url: "https://aifsm2025.in",
    siteName: "AIFSM 2025",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://aifsm2025.in/logo.svg",
        width: 1200,
        height: 630,
        alt: "AIFSM 2025 Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aifsm2025", // if you have a Twitter handle
    creator: "@aifsm2025",
    title: "AIFSM 2025",
    description: "Official website for AIFSM 2025",
    images: ["https://aifsm2025.in/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // add other metadata: open graph metadata and twitter card metadata
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${rampart.variable} ${urbanist.variable} antialiased`}>
        <Header />
        <AuthProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SportsEvent",
                name: EVENT_TITLE,
                startDate: TARGET_DATE.toISOString(),
                location: {
                  "@type": "Place",
                  name: "Dehradun, Uttarakhand, India",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Dehradun",
                    addressRegion: "Uttarakhand",
                    addressCountry: "India",
                  },
                },
                organizer: {
                  "@type": "Organization",
                  name: ORGANIZING_DEPT,
                  legalName: ORGANIZING_GOVT,
                  url: "https://aifsm2025.in",
                },
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                image: ["https://aifsm2025.in/logo.svg"],
                description:
                  "The 28th All India Forest Sports Meet 2025 organized by the Uttarakhand Forest Department.",
                url: "https://aifsm2025.in",
              }),
            }}
          />
          <main className="">{children}</main>
        </AuthProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
