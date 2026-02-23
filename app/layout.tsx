import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/layout/Nav";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Home | AniHub",
  description: "Better MyAnimeList alternative for tracking anime series and movies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
