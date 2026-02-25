import type { ImdbResponseType, TmdbResponseType, RatingType } from "@/types/Anime";
import { tmdbOptions } from "@/lib/tmdb";
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
  const allIDs = await Promise.all(
    popularAnime.map(async (anime) => {
      const externalIDs = await fetch(
        `https://api.themoviedb.org/3/tv/${anime.id}/external_ids`,
        tmdbOptions as RequestInit,
      ).then((res) => res.json());
      return externalIDs.imdb_id;
    }),
  );
  const batchIDs: string[][] = [];
  for (let i = 0; i < allIDs.length; i += 5) {
    batchIDs.push(allIDs.slice(i, i + 5));
  }
  const ratings: RatingType[] = [];
  for (const batch of batchIDs) {
    let endpoint = "https://api.imdbapi.dev/titles:batchGet?";
    for (let i = 0; i < 5; i++) {
      endpoint += "titleIds=" + batch[i];
      if (i != 4) endpoint += "&";
    }
    const imdbData = await fetch(endpoint).then((res) => res.json());
    const imdbTitles: ImdbResponseType[] = imdbData.titles;
    const sortedTitles = [];
    for (const title of imdbTitles) {
      sortedTitles[batch.indexOf(title.id)!] = title;
    }
    for (const title of sortedTitles) {
      ratings.push({ rating: title.rating.aggregateRating, count: title.rating.voteCount });
    }
  }

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
