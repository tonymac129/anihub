import type { Metadata } from "next";
import { tmdbOptions, getRatings } from "@/lib/tmdb";
import { TmdbResponseType } from "@/types/Anime";
import Hero from "@/components/layout/Hero";
import AnimeCard from "@/components/ui/AnimeCard";

export const metadata: Metadata = {
  title: "New Series | AniHub",
  description:
    "Check out 15 of the best new anime series that are currently airing on this page, maybe you'll discover your new favorite here!",
  openGraph: {
    title: "New Series | AniHub",
    description:
      "Check out 15 of the best new anime series that are currently airing on this page, maybe you'll discover your new favorite here!",
    url: `https://anihub-app.vercel.app/new`,
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
  const fetchURL = "https://api.themoviedb.org/3/tv/on_the_air";
  const results = await fetch(fetchURL, tmdbOptions as RequestInit).then(
    (res) => res.json(),
  );
  const resultAnime: TmdbResponseType[] = results.results;
  const pageCount = results.total_pages;
  for (let i = 2; i <= pageCount; i++) {
    const newResults = await fetch(
      fetchURL + `?page=${i}`,
      tmdbOptions as RequestInit,
    ).then((res) => res.json());
    resultAnime.push(...newResults.results);
  }
  const airingAnime = resultAnime
    .filter(
      (result: TmdbResponseType) =>
        result.genre_ids!.includes(16) && result.original_language === "ja",
    )
    .sort((a, b) => b.vote_count - a.vote_count)
    .slice(0, 15);
  const ratings = await getRatings(airingAnime);
  console.log(airingAnime);

  return (
    <div>
      <Hero
        title="New Series"
        description="Check out 15 of the best new anime series that are currently airing on this page, maybe you'll discover your new favorite here!"
      />
      <div className="flex flex-wrap gap-5 justify-center pb-15">
        {airingAnime.map((anime, i) => (
          <AnimeCard key={anime.id} anime={anime} rating={ratings[i]} />
        ))}
      </div>
    </div>
  );
}

export default Page;
