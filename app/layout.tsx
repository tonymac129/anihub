import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Animate from "@/components/layout/Animate";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Home | AniHub",
  description:
    "Better MyAnimeList alternative for tracking anime series and movies.",
  openGraph: {
    title: "Home | AniHub",
    description:
      "Better MyAnimeList alternative for tracking anime series and movies",
    url: `https://anihub-app.vercel.app`,
    siteName: "AniHub",
    images: [
      {
        url: "/logo.png",
        width: 50,
        height: 50,
      },
    ],
    type: "website",
  },
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
        <Animate>{children}</Animate>
        <Footer />
      </body>
    </html>
  );
}
