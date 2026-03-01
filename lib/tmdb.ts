import type { RatingType, TmdbResponseType, ImdbResponseType } from "@/types/Anime";

export const tmdbOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDB_API_KEY,
  },
};

export async function getRatings(animes: TmdbResponseType[]): Promise<RatingType[]> {
  const allIDs = await Promise.all(
    animes.map(async (anime) => {
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
    const limit = Math.min(5, batch.length);
    for (let i = 0; i < limit; i++) {
      endpoint += "titleIds=" + batch[i];
      if (i != limit - 1) endpoint += "&";
    }
    const imdbData = await fetch(endpoint).then((res) => res.json());
    const imdbTitles: ImdbResponseType[] = imdbData.titles;
    const sortedTitles = [];
    console.log(endpoint);
    for (const title of imdbTitles) {
      sortedTitles[batch.indexOf(title.id)!] = title;
    }
    for (const title of sortedTitles) {
      ratings.push({ rating: title.rating.aggregateRating, count: title.rating.voteCount });
    }
  }
  return ratings;
}
