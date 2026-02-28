import type { TmdbResponseType, KeywordsType, ImdbResponseType, EpisodeType } from "@/types/Anime";
import { tmdbOptions } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import { FaGlobe, FaStar } from "react-icons/fa";
import Tag from "@/components/ui/Tag";
import Link from "next/link";
import Image from "next/image";
import Episode from "@/components/anime/Episode";
import Discussion from "./Discussion";

type GroupedType = Record<string, EpisodeType[]>;

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const result = (await fetch("https://api.themoviedb.org/3/tv/" + id, tmdbOptions as RequestInit).then((res) =>
    res.json(),
  )) as TmdbResponseType;
  if ("success" in result && result.success === false) notFound();
  const keywords: KeywordsType = await fetch(`https://api.themoviedb.org/3/tv/${id}/keywords`, tmdbOptions as RequestInit).then(
    (res) => res.json(),
  );
  if (!keywords.results.find((result) => result.id === 210024)) notFound();
  const externalIDs = await fetch(`https://api.themoviedb.org/3/tv/${id}/external_ids`, tmdbOptions as RequestInit).then((res) =>
    res.json(),
  );
  const imdbData: ImdbResponseType = await fetch("https://api.imdbapi.dev/titles/" + externalIDs.imdb_id).then((res) =>
    res.json(),
  );
  const imdbEpisodes: EpisodeType[] = [];
  let pageToken = null;
  for (let i = 0; i < Math.ceil(result.number_of_episodes / 50); i++) {
    const episodeBatch: { episodes: EpisodeType[]; nextPageToken: string } = await fetch(
      `https://api.imdbapi.dev/titles/${externalIDs.imdb_id}/episodes?pageSize=50${pageToken ? "&pageToken=" + pageToken : ""}`,
    ).then((res) => res.json());
    imdbEpisodes.push(...episodeBatch.episodes);
    if (episodeBatch.nextPageToken) pageToken = episodeBatch.nextPageToken;
  }
  const grouped: GroupedType = imdbEpisodes.reduce((acc, episode) => {
    if (acc[episode.season as keyof GroupedType]) {
      acc[episode.season].push(episode);
    } else {
      acc[episode.season] = [episode];
    }
    return acc;
  }, {} as GroupedType);

  return (
    <div className="px-50">
      <div className="h-50 overflow-hidden w-full flex items-center rounded-b-lg border-2 border-zinc-800 border-t-0">
        <Image
          src={"https://image.tmdb.org/t/p/original/" + result.backdrop_path}
          alt="Backdrop image"
          width={1500}
          height={1500}
          className="brightness-70"
        />
      </div>
      <div className="flex gap-x-10 py-5 mb-10">
        <div className="flex-1 flex flex-col gap-y-5 text-zinc-300">
          <Image
            src={"https://image.tmdb.org/t/p/w300/" + result.poster_path}
            alt="Avatar"
            width={550}
            height={550}
            className="w-full rounded-lg border-2 border-zinc-800"
          />
          <div className="flex flex-col gap-y-1">
            <h2 className="font-bold text-2xl text-white">{result.name}</h2>
            <h4 className="text-sm">{result.original_name}</h4>
            <h4 className="text-sm">
              {new Date(result.first_air_date).getFullYear()} —{" "}
              {result.status === "Ended" ? new Date(result.last_air_date).getFullYear() : "Now"}
            </h4>
            <div className="flex gap-x-2 items-center">
              <FaStar size={20} />
              <span className="text-lg font-bold">{imdbData.rating.aggregateRating}</span>
              <span className="text-sm">({imdbData.rating.voteCount})</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-1 text-sm">
            <p>Type: TV Series</p>
            <p>Episodes: {result.number_of_episodes}</p>
            <p>Status: {result.status}</p>
            <p>Episode length: {result.episode_run_time}m</p>
            <p>First aired: {new Date(result.first_air_date).toLocaleDateString()}</p>
            <p>Last aired: {new Date(result.last_air_date).toLocaleDateString()}</p>
            {result.created_by.length > 0 && (
              <p>
                Created by:{" "}
                {result.created_by.map((credit, i) => (
                  <span key={credit.id}>
                    {credit.name}
                    {i !== result.created_by.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
          </div>
          <Link
            href={result.homepage!}
            target="_blank"
            className="w-fit text-sm hover:underline text-zinc-300 flex items-center gap-x-2"
          >
            <FaGlobe size={20} /> Official website
          </Link>
          <Image
            src={"https://image.tmdb.org/t/p/w300/" + result.production_companies![0].logo_path}
            alt={result.production_companies![0].name + " Logo"}
            title={result.production_companies![0].name}
            width={100}
            height={50}
            className="border-2 border-zinc-800 hover:bg-zinc-900 cursor-pointer rounded-lg p-2"
          />
          <div className="flex gap-1.5 flex-wrap">
            {result.genres
              ?.filter((genre) => genre.name !== "Animation")
              .slice(0, 3)
              .map((genre) => (
                <Tag key={genre.id} genre={genre} />
              ))}
          </div>
        </div>
        <div className="flex-3 text-zinc-300 flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-2">
            {Object.values(grouped).map((season, i) => {
              return (
                <div key={i} className="flex flex-col gap-y-2">
                  <h2 className="white font-bold text-lg">Season {i + 1}</h2>
                  <div className="flex flex-wrap gap-2">
                    {season.map((episode, i) => (
                      <Episode key={i} episode={episode} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <h2 className="white font-bold text-lg mb-3">Overview: {result.tagline}</h2>
            {result.overview}
          </div>
          <Discussion id={Number(id)} />
        </div>
      </div>
    </div>
  );
}

export default Page;
