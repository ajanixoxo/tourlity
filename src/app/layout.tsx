import type { Metadata } from "next";
import { Inter, Lobster, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AuthSyncProvider from "@/components/providers/auth-sync-provider";
  import { ToastContainer } from 'react-toastify';
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
        <ToastContainer
          
          className={"bg-white text-[#F26457] rounded-lg shadow-lg p-3"}
          progressClassName="bg-yellow-400"
        />

        {/* Sync Zustand store with localStorage user on load */}
        <AuthSyncProvider>
          {children}
        </AuthSyncProvider>

      </body>
    </html>
  );
}