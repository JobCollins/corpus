import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import { Inter } from 'next/font/google'
import NavBar from "@/components/NavBar";
import Providers from "@/components/Providers";

import "react-loading-skeleton/dist/skeleton.css"

import { Toaster } from "@/components/ui/toaster";
import "simplebar-react/dist/simplebar.min.css"

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const inter = Inter({
  subsets: []
})

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      <body
        className={cn('min-h-screen font-sans antialiased grainy', inter.className)}>
          <Toaster />
        <NavBar/>
        {children}
      </body>
      </Providers>
    </html>
  );
}
