import type { Metadata } from "next";
import type { TmdbResponseType } from "@/types/Anime";
import { tmdbOptions, getRatings } from "@/lib/tmdb";
import Hero from "@/components/layout/Hero";
import Place from "./Place";

export const metadata: Metadata = {
  title: "Top Anime | AniHub",
  description:
    "Check out and browse the top 10 anime series of all time, ranked by their IMDb ratings.",
  openGraph: {
    title: "Top Anime | AniHub",
    description:
      "Check out and browse the top 10 anime series of all time, ranked by their IMDb ratings.",
    url: `https://anihub-app.vercel.app/top`,
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
  const url =
    "https://api.themoviedb.org/3/discover/tv?with_keywords=207826&sort_by=vote_average.desc&vote_count.gte=100";
  const results = await fetch(url, tmdbOptions as RequestInit).then((res) =>
    res.json(),
  );
  const popularAnime: TmdbResponseType[] = results.results.slice(0, 10);
  const ratings = await getRatings(popularAnime);

  return (
    <div>
      <Hero
        title="Top Animes"
        description="Browse the top 10 anime series of all time, ranked by their TMDb ratings."
      />
      <div className="flex flex-col gap-y-5 pb-30 items-center">
        {popularAnime.map((anime, i) => (
          <Place key={anime.id} index={i} anime={anime} rating={ratings[i]} />
        ))}
      </div>
    </div>
  );
}

export default Page;
