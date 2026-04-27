import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import BackBtn from "./BackBtn";

export const metadata: Metadata = {
  title: "404 Not Found | AniHub",
  description:
    "Oops, that page does not exist on AniHub. Go home, go back, or submit a GitHub issue here if you think it's a bug!",
  openGraph: {
    title: "404 Not Found | AniHub",
    description:
      "Oops, that page does not exist on AniHub. Go home, go back, or submit a GitHub issue here if you think it's a bug!",
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

function NotFound() {
  return (
    <div className="flex flex-col items-center gap-y-10 py-30">
      <h1 className="text-7xl text-white font-extrabold text-center">
        404 NOT FOUND
      </h1>
      <p className="text-zinc-300 w-[30%] text-center">
        Oops, that page does not exist on AniHub. Go home, go back, or submit a
        GitHub issue{" "}
        <a
          href="https://github.com/tonymac129/anihub/issues"
          target="_blank"
          className="underline"
        >
          here
        </a>{" "}
        if you think it&apos;s a bug!
      </p>
      <div className="flex gap-x-5">
        <Button text="Home" link="/" primary />
        <BackBtn />
      </div>
    </div>
  );
}

export default NotFound;
