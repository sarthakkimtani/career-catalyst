import type { Metadata } from "next";
import localFont from "next/font/local";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const clashGrotesk = localFont({
  src: "./fonts/ClashGrotesk.woff2",
  variable: "--font-clash-grotesk",
});

export const metadata: Metadata = {
  title: "CareerCatalyst - Your Go-To Platform for Tech Internships",
  description: "Internship aggregator platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${clashGrotesk.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
