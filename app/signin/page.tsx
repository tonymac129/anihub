import type { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Hero from "@/components/layout/Hero";
import SignIn from "./SignIn";

export const metadata: Metadata = {
  title: "Sign In | AniHub",
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
