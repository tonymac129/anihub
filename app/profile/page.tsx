import type { Metadata } from "next";
import type { TmdbResponseType } from "@/types/Anime";
import { editProfile } from "./actions";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FaUserCircle, FaGlobe } from "react-icons/fa";
import { getRatings, tmdbOptions } from "@/lib/tmdb";
import prisma from "@/lib/db";
import EditProfile from "./EditProfile";
import Image from "next/image";
import Link from "next/link";
import Followers from "./Followers";
import AnimeCard from "@/components/ui/AnimeCard";

export const metadata: Metadata = {
  title: "My Profile | AniHub",
  description: "View your anime lists, showcase your favorites, and customize your own profile on AniHub!",
};

async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) redirect("/signin");
  const watchingAnime = await prisma.animeList.findMany({ where: { userId: session.user.id, status: "Watching" } });
  const watchingResponses: TmdbResponseType[] = await Promise.all(
    watchingAnime.map(async (anime) => {
      const result = (await fetch("https://api.themoviedb.org/3/tv/" + anime.animeId, tmdbOptions as RequestInit).then((res) =>
        res.json(),
      )) as TmdbResponseType;
      return result;
    }),
  );
  const watchingRatings = await getRatings(watchingResponses);
  const finishedAnime = await prisma.animeList.findMany({ where: { userId: session.user.id, status: "Finished" } });
  const finishedResponses: TmdbResponseType[] = await Promise.all(
    finishedAnime.map(async (anime) => {
      const result = (await fetch("https://api.themoviedb.org/3/tv/" + anime.animeId, tmdbOptions as RequestInit).then((res) =>
        res.json(),
      )) as TmdbResponseType;
      return result;
    }),
  );
  const finishedRatings = await getRatings(finishedResponses);
  const plannedAnime = await prisma.animeList.findMany({ where: { userId: session.user.id, status: "Planned to watch" } });
  const plannedResponses: TmdbResponseType[] = await Promise.all(
    plannedAnime.map(async (anime) => {
      const result = (await fetch("https://api.themoviedb.org/3/tv/" + anime.animeId, tmdbOptions as RequestInit).then((res) =>
        res.json(),
      )) as TmdbResponseType;
      return result;
    }),
  );
  const plannedRatings = await getRatings(plannedResponses);

  return (
    <div className="px-50 flex gap-x-10 py-5 pb-10">
      <div className="flex-1 flex flex-col gap-y-5 text-zinc-300">
        {user.image ? (
          <Image src={user.image} alt="Avatar" width={550} height={550} className="w-full rounded-lg border-2 border-zinc-800" />
        ) : (
          <FaUserCircle size={200} className="w-full" />
        )}
        <div className="flex flex-col gap-y-1">
          <h2 className="font-bold text-2xl text-white">{user.name}</h2>
          <div className="flex gap-x-3">
            <Followers name={user.name} count={0} type="followers" />•
            <Followers name={user.name} count={0} type="following" />
          </div>
        </div>
        <EditProfile user={{ name: user.name, about: user.about || "", link: user.link || "" }} editProfile={editProfile} />
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
        {user.about && (
          <div className="flex flex-col gap-y-5">
            <h2 className="white font-bold text-lg">{user.name}&apos;s Bio</h2>
            <div>{user.about}</div>
          </div>
        )}
        <div className="flex flex-col gap-y-5">
          <h2 className="white font-bold text-lg">Currently watching</h2>
          <div className="flex flex-wrap gap-5">
            {watchingResponses.length > 0 ? (
              watchingResponses.map((anime, i) => <AnimeCard key={anime.id} anime={anime} rating={watchingRatings[i]} small />)
            ) : (
              <div className="text-zinc-400 text-sm">
                You aren&apos;t currently watching any anime series. Click on the top or browse tab to find one and enjoy!
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <h2 className="white font-bold text-lg">Finished watching</h2>
          <div className="flex flex-wrap gap-5">
            {finishedResponses.length > 0 ? (
              finishedResponses.map((anime, i) => <AnimeCard key={anime.id} anime={anime} rating={finishedRatings[i]} small />)
            ) : (
              <div className="text-zinc-400 text-sm">
                You haven&apos;t finished watching any anime series (yet). Click on the top or browse tab to find one and track!
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <h2 className="white font-bold text-lg">Planned to watch</h2>
          <div className="flex flex-wrap gap-5">
            {plannedResponses.length > 0 ? (
              plannedResponses.map((anime, i) => <AnimeCard key={anime.id} anime={anime} rating={plannedRatings[i]} small />)
            ) : (
              <div className="text-zinc-400 text-sm">
                You aren&apos;t planning to watch any anime series. Click on the top or browse tab to find one you like!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
