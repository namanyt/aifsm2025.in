import type { Metadata, Viewport } from "next";
import { Inter, Monofett } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
