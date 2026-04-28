import type { TmdbResponseType } from "@/types/Anime";
import { tmdbOptions } from "@/lib/tmdb";
import { redirect } from "next/navigation";
import { genres } from "@/lib/constants";
import Hero from "@/components/layout/Hero";
import Animes from "./Animes";

async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  if (id < 0 || id > 7 || id % 1 !== 0) redirect("/explore");
  const genre = genres.find((genre) => genre.id == id)!;
  const fetchURL = `https://api.themoviedb.org/3/discover/tv?with_keywords=${genre.keyword},210024&vote_count.gte=100&sort_by=vote_count.desc`;
  const results = await fetch(fetchURL, tmdbOptions as RequestInit).then(
    (res) => res.json(),
  );
  const genreAnime: TmdbResponseType[] = results.results;
  const pageCount = results.total_pages;
  for (let i = 2; i <= pageCount; i++) {
    const newResults = await fetch(
      fetchURL + `&page=${i}`,
      tmdbOptions as RequestInit,
    ).then((res) => res.json());
    genreAnime.push(...newResults.results);
  }

  return (
    <div>
      <Hero title={genre.name + " Anime"} description={genre.description} />
      <Animes animes={genreAnime} genre={genre.name} />
    </div>
  );
}

export default Page;
