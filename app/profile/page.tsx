import type { Metadata } from "next";
import type { TmdbResponseType } from "@/types/Anime";
import { editProfile } from "./actions";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FaUserCircle, FaGlobe } from "react-icons/fa";
import { tmdbOptions } from "@/lib/tmdb";
import prisma from "@/lib/db";
import EditProfile from "./EditProfile";
import Image from "next/image";
import Link from "next/link";
import Followers from "./Followers";
import AnimeCard from "@/components/ui/AnimeCard";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "My Profile | AniHub",
  description:
    "View your anime lists, showcase your favorites, and customize your own profile on AniHub!",
  openGraph: {
    title: "My Profile | AniHub",
    description:
      "View your anime lists, showcase your favorites, and customize your own profile on AniHub!",
    url: `https://anihub-app.vercel.app/profile`,
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
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: { followers: true, following: true },
  });
  if (!user) redirect("/signin");
  const favoriteAnime = await prisma.favorites.findMany({
    where: { userId: session.user.id },
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
  const watchingAnime = await prisma.animeList.findMany({
    where: { userId: session.user.id, status: "Watching" },
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
  const finishedAnime = await prisma.animeList.findMany({
    where: { userId: session.user.id, status: "Finished" },
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
  const plannedAnime = await prisma.animeList.findMany({
    where: { userId: session.user.id, status: "Planned to watch" },
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

  return (
    <div className="flex gap-x-10 py-5 pb-10">
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
        <EditProfile
          user={{
            name: user.name,
            about: user.about || "",
            link: user.link || "",
          }}
          editProfile={editProfile}
        />
        <Button
          text="View public profile"
          link={"/profile/" + session.user.id}
        />
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
              You haven&apos;t added a bio about yourself (yet). Click on edit
              profile to add it and customize your profile!
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-5">
          <h2 className="white font-bold text-lg">
            {user.name}&apos;s favorites ({favoriteResponses.length})
          </h2>
          <div className="flex flex-wrap gap-5">
            {favoriteResponses.length > 0 ? (
              favoriteResponses.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} small />
              ))
            ) : (
              <div className="text-zinc-400 text-sm">
                Show what you love to the rest of the world by clicking on the
                heart icon on the anime page!
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
                  small
                  percent={watchingAnime[i].watched as number}
                />
              ))
            ) : (
              <div className="text-zinc-400 text-sm">
                You aren&apos;t currently watching any anime series. Click on
                the top or explore tab to find one and enjoy!
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
              finishedResponses.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} small />
              ))
            ) : (
              <div className="text-zinc-400 text-sm">
                You haven&apos;t finished watching any anime series (yet). Click
                on the top or explore tab to find one and track!
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
              plannedResponses.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} small />
              ))
            ) : (
              <div className="text-zinc-400 text-sm">
                You aren&apos;t planning to watch any anime series. Click on the
                top or explore tab to find one you like!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
