import type { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Hero from "@/components/layout/Hero";
import SignIn from "./SignIn";

export const metadata: Metadata = {
  title: "Sign In | AniHub",
  description:
    "Sign in to your AniHub account here via credentials or social providers to access your lists, join the discussion, and explore all of AniHub, or create an account if you don't already have one.",
  openGraph: {
    title: "Sign In | AniHub",
    description:
      "Sign in to your AniHub account here via credentials or social providers to access your lists, join the discussion, and explore all of AniHub, or create an account if you don't already have one.",
    url: `https://anihub-app.vercel.app/signin`,
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

async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/profile");

  return (
    <div>
      <Hero title="Sign In" />
      <SignIn />
    </div>
  );
}

export default Page;
