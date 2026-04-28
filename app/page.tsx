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
      <div className="flex flex-wrap gap-5 justify-center px-50 pb-15">
        {popularAnime.map((anime, i) => (
          <AnimeCard key={anime.id} anime={anime} rating={ratings[i]} />
        ))}
      </div>
      <div className="flex flex-col gap-y-10 px-50 items-center pb-15">
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
      <div className="flex flex-col gap-y-10 px-50 items-center pb-15">
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
