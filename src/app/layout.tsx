import type { Metadata } from "next";
import { Inter, Lobster, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

// Configure your fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lobster',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: "Tourlity",
  description: "A touring app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lobster.variable} ${plusJakarta.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}