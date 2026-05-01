import type { CommentType, TmdbResponseType } from "@/types/Anime";
import { tmdbOptions, getRatings } from "@/lib/tmdb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/db";
import Hero from "@/components/layout/Hero";
import Button from "@/components/ui/Button";
import AnimeCard from "@/components/ui/AnimeCard";
import Comment from "@/components/anime/Comment";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  const results = await fetch(
    "https://api.themoviedb.org/3/discover/tv?with_keywords=210024&sort_by=vote_count.desc",
    tmdbOptions as RequestInit,
  ).then((res) => res.json());
  const popularAnime: TmdbResponseType[] = results.results.slice(0, 10);
  const ratings = await getRatings(popularAnime);
  const newestComments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { user: true },
  });
  let currentlyWatching: TmdbResponseType[] = [];
  if (session?.user) {
    const watchingAnime = await prisma.animeList.findMany({
      where: { status: "Watching", userId: session.user.id },
    });
    currentlyWatching = await Promise.all(
      watchingAnime.map(async (anime) => {
        const result = (await fetch(
          "https://api.themoviedb.org/3/tv/" + anime.animeId,
          tmdbOptions as RequestInit,
        ).then((res) => res.json())) as TmdbResponseType;
        return result;
      }),
    );
  }
  let watchlist: TmdbResponseType[] = [];
  if (session?.user) {
    const watchlistAnime = await prisma.animeList.findMany({
      where: { status: "Planned to watch", userId: session.user.id },
    });
    watchlist = await Promise.all(
      watchlistAnime.map(async (anime) => {
        const result = (await fetch(
          "https://api.themoviedb.org/3/tv/" + anime.animeId,
          tmdbOptions as RequestInit,
        ).then((res) => res.json())) as TmdbResponseType;
        return result;
      }),
    );
  }

  return (
    <div>
      <Hero
        title="Welcome to AniHub!"
        description="The best app for you to keep track of the anime series & movies you've watched and discuss them with other people!"
      >
        {session?.user ? (
          <div className="flex gap-x-5">
            <Button text="View my profile" link="/profile" primary />
            <Button text="Learn more" link="/about" />
          </div>
        ) : (
          <div className="flex gap-x-5">
            <Button text="Sign in" link="/signin" primary />
            <Button text="Learn more" link="/about" />
          </div>
        )}
      </Hero>
      {currentlyWatching.length > 0 && (
        <div className="flex flex-col gap-y-10 items-center pb-15">
          <div className="flex flex-col gap-y-3">
            <h2 className="text-2xl font-bold text-center text-white">
              Pick up Where you Left Off
            </h2>
            <p className="text-zinc-300">
              You are currently watching these shows, click to see more info or
              join the discussion!
            </p>
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            {currentlyWatching.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} small />
            ))}
          </div>
        </div>
      )}
      {watchlist.length > 0 && (
        <div className="flex flex-col gap-y-10 items-center pb-15">
          <div className="flex flex-col gap-y-3">
            <h2 className="text-2xl font-bold text-center text-white">
              Want to Give These a Try?
            </h2>
            <p className="text-zinc-300">
              These shows are currently on your watchlist. Click to see their
              episode ratings and more!
            </p>
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            {watchlist.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} small />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-y-10 items-center pb-15">
        <h2 className="text-2xl font-bold text-center text-white">
          These Anime Series are Currently Trending
        </h2>
        <div className="flex flex-wrap gap-5 justify-center">
          {popularAnime.map((anime, i) => (
            <AnimeCard key={anime.id} anime={anime} rating={ratings[i]} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-10 items-center pb-15">
        <div className="flex flex-col gap-y-3">
          <h2 className="text-3xl font-bold text-center text-white">
            Join the Discussion Now!
          </h2>
          <p className="text-zinc-300">
            Check out the latest comments on the platform and join the
            discussion yourself!
          </p>
        </div>
        <div className="flex flex-col gap-y-3 text-zinc-300 w-full">
          {newestComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment as CommentType}
              showAnime
            />
          ))}
        </div>
        <Button text="Explore anime" link="/explore" fit />
      </div>
      <div className="flex flex-col gap-y-10 items-center pb-15">
        <div className="flex flex-col gap-y-3">
          <h2 className="text-3xl font-bold text-center text-white">
            Explore new Anime Series
          </h2>
          <p className="text-zinc-300">
            There are a ton of different options on AniHub for you to browse and
            learn more about!
          </p>
        </div>
        <div className="flex gap-x-5">
          <Button text="Top 10 series" link="/top" primary />
          <Button text="New airing series" link="/new" primary />
          <Button text="Explore all" link="/explore" />
        </div>
      </div>
    </div>
  );
}
