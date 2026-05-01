import type { Metadata } from "next";
import Hero from "@/components/layout/Hero";

export const metadata: Metadata = {
  title: "About | AniHub",
  description:
    "Learn more about what AniHub is, how to use it, its features, and more information about the anime tracking platform here!",
  openGraph: {
    title: "About | AniHub",
    description:
      "Learn more about what AniHub is, how to use it, its features, and more information about the anime tracking platform here!",
    url: `https://anihub-app.vercel.app/about`,
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

function Page() {
  return (
    <div>
      <Hero
        title="About AniHub"
        description="Learn more about what AniHub is, how to use it, its features, and more information about the anime tracking platform here!"
      />
      <div className="flex flex-col gap-y-5 items-center pb-15">
        <h2 className="text-2xl font-bold text-center text-white">
          What is AniHub?
        </h2>
        <p className="text-zinc-300 w-[70%] text-center">
          AniHub is an online anime tracking platform, a better alternative of
          MyAnimeList, where you can explore and learn more about a ton of
          different anime series, track your watching status (currently
          watching, finished watching, or want to watch), view and visualize
          ratings by episode, discuss different anime series with other people,
          showcase your favorites, and so much more! Sign up for an account now
          and explore everything the anime tracking platform has to offer!
        </p>
      </div>
      <div className="flex flex-col gap-y-5 items-center pb-15">
        <h2 className="text-2xl font-bold text-center text-white">
          What&apos;s Different About It?
        </h2>
        <p className="text-zinc-300 w-[70%] text-center">
          AniHub is different froim MyAnimeList, AniList, and other anime series
          tracking services because it doesn&apos;t just focus on tracking anime
          series. There&apos;s engaging comment sections, customized profiles,
          follows, and other social features that makes it easier and more fun
          to discuss your favorite anime series with other people! There are
          also a ton of other features like episode rating breakdown, detailed
          stats, and more for each anime page so you can really take in all the
          information there is.
        </p>
      </div>
    </div>
  );
}

export default Page;
