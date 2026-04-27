import type { TmdbResponseType } from "@/types/Anime";
import { redirect } from "next/navigation";
import { FaUserCircle, FaGlobe } from "react-icons/fa";
import { getRatings, tmdbOptions } from "@/lib/tmdb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { followUser } from "./actions";
import prisma from "@/lib/db";
import AnimeCard from "@/components/ui/AnimeCard";
import Followers from "../Followers";
import Image from "next/image";
import Link from "next/link";
import Follow from "./Follow";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: { followers: true, following: true },
  });
  if (!user) redirect("/profile");
  const title = user.name + "'s Profile | AniHub";
  const description =
    "Check out " +
    user.name +
    "'s public profile on AniHub here and see their favorite, currently watching, finished watching, and planned to watch anime series, as well as their profile and additional information!";
  return {
    title,
    description,
    authors: [{ name: "TonyMac129", url: "https://tonymac.net" }],
    openGraph: {
      title,
      description,
      url: `https://anihub-app.vercel.app/profile/${id}`,
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
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: userID } = await params;
  const user = await prisma.user.findUnique({
    where: { id: userID },
    include: { followers: true, following: true },
  });
  if (!user) redirect("/profile");
  const session = await auth.api.getSession({ headers: await headers() });
  const following = await prisma.user.count({
    where: { id: session?.user.id, following: { some: { id: userID } } },
  });
  const favoriteAnime = await prisma.favorites.findMany({
    where: { userId: user.id },
  });
  const favoriteResponses: TmdbResponseType[] = await Promise.all(
    favoriteAnime.map(async (anime) => {
      const result = (await fetch(
        "https://api.themoviedb.org/3/tv/" + anime.animeId,
        tmdbOptions as RequestInit,
      ).then((res) => res.json())) as TmdbResponseType;
      return result;
    }),
  );
  const favoriteRatings = await getRatings(favoriteResponses);
  const watchingAnime = await prisma.animeList.findMany({
    where: { userId: user.id, status: "Watching" },
  });
  const watchingResponses: TmdbResponseType[] = await Promise.all(
    watchingAnime.map(async (anime) => {
      const result = (await fetch(
        "https://api.themoviedb.org/3/tv/" + anime.animeId,
        tmdbOptions as RequestInit,
      ).then((res) => res.json())) as TmdbResponseType;
      return result;
    }),
  );
  const watchingRatings = await getRatings(watchingResponses);
  const finishedAnime = await prisma.animeList.findMany({
    where: { userId: user.id, status: "Finished" },
  });
  const finishedResponses: TmdbResponseType[] = await Promise.all(
    finishedAnime.map(async (anime) => {
      const result = (await fetch(
        "https://api.themoviedb.org/3/tv/" + anime.animeId,
        tmdbOptions as RequestInit,
      ).then((res) => res.json())) as TmdbResponseType;
      return result;
    }),
  );
  const finishedRatings = await getRatings(finishedResponses);
  const plannedAnime = await prisma.animeList.findMany({
    where: { userId: user.id, status: "Planned to watch" },
  });
  const plannedResponses: TmdbResponseType[] = await Promise.all(
    plannedAnime.map(async (anime) => {
      const result = (await fetch(
        "https://api.themoviedb.org/3/tv/" + anime.animeId,
        tmdbOptions as RequestInit,
      ).then((res) => res.json())) as TmdbResponseType;
      return result;
    }),
  );
  const plannedRatings = await getRatings(plannedResponses);

  return (
    <div className="px-50 flex gap-x-10 py-5 pb-10">
      <div className="flex-1 flex flex-col gap-y-5 text-zinc-300">
        {user.image ? (
          <Image
            src={user.image}
            alt="Avatar"
            width={550}
            height={550}
            className="w-full rounded-lg border-2 border-zinc-800"
          />
        ) : (
          <FaUserCircle size={200} className="w-full" />
        )}
        <div className="flex flex-col gap-y-1">
          <h2 className="font-bold text-2xl text-white">{user.name}</h2>
          <div className="flex gap-x-3">
            <Followers
              name={user.name}
              count={user.followers.length}
              users={user.followers}
              type="followers"
            />
            •
            <Followers
              name={user.name}
              count={user.following.length}
              users={user.following}
              type="following"
            />
          </div>
        </div>
        {session?.user.id !== user.id && (
          <Follow
            isFollowing={following ? true : false}
            userID={userID}
            followUser={followUser}
          />
        )}
        <p>
          Email:{" "}
          <a href={`mailto:${user.email}`} className="hover:underline">
            {user.email}
          </a>
        </p>
        <p>Joined: {user.createdAt.toLocaleDateString()}</p>
        {user.link && (
          <Link
            href={user.link}
            target="_blank"
            className="w-fit text-sm hover:underline text-zinc-300 flex items-center gap-x-2"
          >
            <FaGlobe size={20} /> Website
          </Link>
        )}
      </div>
      <div className="flex-3 text-zinc-300 flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-5">
          <h2 className="white font-bold text-lg">{user.name}&apos;s Bio</h2>
          {user.about ? (
            <div>{user.about}</div>
          ) : (
            <div className="text-zinc-400 text-sm">
              {user.name} has&apos;t updated their bio yet.
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-5">
          <h2 className="white font-bold text-lg">
            {user.name}&apos;s favorites ({favoriteResponses.length})
          </h2>
          <div className="flex flex-wrap gap-5">
            {favoriteResponses.length > 0 ? (
              favoriteResponses.map((anime, i) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  rating={favoriteRatings[i]}
                  small
                />
              ))
            ) : (
              <div className="text-zinc-400 text-sm">
                {user.name} doesn&apos;t have any favorites yet.
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <h2 className="white font-bold text-lg">
            Currently watching ({watchingResponses.length})
          </h2>
          <div className="flex flex-wrap gap-5">
            {watchingResponses.length > 0 ? (
              watchingResponses.map((anime, i) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  rating={watchingRatings[i]}
                  small
                />
              ))
            ) : (
              <div className="text-zinc-400 text-sm">
                {user.name} isn&apos;t currently watching anything.
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <h2 className="white font-bold text-lg">
            Finished watching ({finishedResponses.length})
          </h2>
          <div className="flex flex-wrap gap-5">
            {finishedResponses.length > 0 ? (
              finishedResponses.map((anime, i) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  rating={finishedRatings[i]}
                  small
                />
              ))
            ) : (
              <div className="text-zinc-400 text-sm">
                {" "}
                {user.name} hasn&apos;t finished watching anything yet.
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <h2 className="white font-bold text-lg">
            Planned to watch ({plannedResponses.length})
          </h2>
          <div className="flex flex-wrap gap-5">
            {plannedResponses.length > 0 ? (
              plannedResponses.map((anime, i) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  rating={plannedRatings[i]}
                  small
                />
              ))
            ) : (
              <div className="text-zinc-400 text-sm">
                {" "}
                {user.name} isn&apos;t planning to watch anything.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
