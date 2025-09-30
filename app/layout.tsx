import type { Metadata, Viewport } from "next";
import { Inter, Rampart_One, Urbanist } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { AuthProvider } from "@/lib/auth/authContext";
import { Toaster } from "sonner";

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
  description: "AIFSM 2025 - All India Forest Sports Meet 2025",
  authors: [
    { name: "Nitya Naman", url: "https://ciderboi.xyz" },
    { name: "Amritanshu Rawat" },
    { name: "UPES", url: "https://www.upes.ac.in/" },
  ],
  creator: "Nitya Naman",
  abstract: "All India Forest Sports Meet 2025",
  category: "Sports",
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
          <main className="">{children}</main>
        </AuthProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
