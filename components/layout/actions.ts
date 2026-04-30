"use server";

import type { TmdbResponseType } from "@/types/Anime";
import { tmdbOptions } from "@/lib/tmdb";

export async function searchAnime(query: string) {
  let allSeries: TmdbResponseType[] = [];
  const results = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${query}`,
    tmdbOptions as RequestInit,
  ).then((res) => res.json());
  allSeries = results.results;
  for (let i = 2; i <= results.totalPages; i++) {
    const results = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${query}&page=${i}`,
      tmdbOptions as RequestInit,
    ).then((res) => res.json());
    allSeries.push(...results.results);
  }
  const filtered = allSeries.filter(
    (result: TmdbResponseType) =>
      result.original_language == "ja" && result.vote_count > 50,
  );
  return filtered;
}
