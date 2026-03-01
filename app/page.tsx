import type { TmdbResponseType } from "@/types/Anime";
import { tmdbOptions, getRatings } from "@/lib/tmdb";
import Hero from "@/components/layout/Hero";
import Button from "@/components/ui/Button";
import AnimeCard from "@/components/ui/AnimeCard";

export default async function Home() {
  const results = await fetch("https://api.themoviedb.org/3/discover/tv?with_keywords=210024", tmdbOptions as RequestInit).then(
    (res) => res.json(),
  );
  const popularAnime: TmdbResponseType[] = results.results
    .filter((result: TmdbResponseType) => result.vote_count > 100)
    .slice(0, 10);
  const ratings = await getRatings(popularAnime);

  return (
    <div>
      <Hero
        title="Welcome to AniHub!"
        description="The best app for you to keep track of the anime series & movies you've watched and discuss them with other people!"
      >
        <div className="flex gap-x-5">
          <Button text="Sign in" link="/signin" primary />
          <Button text="Learn more" link="/about" />
        </div>
      </Hero>
      <div className="flex flex-wrap gap-5 justify-center px-50 pb-30">
        {popularAnime.map((anime, i) => (
          <AnimeCard key={anime.id} anime={anime} rating={ratings[i]} />
        ))}
      </div>
    </div>
  );
}
