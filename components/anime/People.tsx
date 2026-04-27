import type { TmdbResponseType } from "@/types/Anime";
import prisma from "@/lib/db";
import Person from "./Person";

interface PeopleProps {
  id: number;
  anime: TmdbResponseType;
}

async function People({ id, anime }: PeopleProps) {
  const favoriteData = await prisma.favorites.findMany({
    where: { animeId: id },
  });
  const favorites: string[] = favoriteData.map((entry) => entry.userId);
  const favoriteUsers = await prisma.user.findMany({
    where: { id: { in: favorites } },
  });
  const currentData = await prisma.animeList.findMany({
    where: { animeId: id, status: "Watching" },
  });
  const currentlyWatching: string[] = currentData.map((entry) => entry.userId);
  const currentUsers = await prisma.user.findMany({
    where: { id: { in: currentlyWatching } },
  });
  const finishedData = await prisma.animeList.findMany({
    where: { animeId: id, status: "Finished" },
  });
  const finishedWatching: string[] = finishedData.map((entry) => entry.userId);
  const finishedUsers = await prisma.user.findMany({
    where: { id: { in: finishedWatching } },
  });
  const wantData = await prisma.animeList.findMany({
    where: { animeId: id, status: "Planned to watch" },
  });
  const wantToWatch: string[] = wantData.map((entry) => entry.userId);
  const wantToWatchUsers = await prisma.user.findMany({
    where: { id: { in: wantToWatch } },
  });

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-5">
        <h2 className="white font-bold text-lg">
          People who favorited {anime.name} ({favoriteUsers.length})
        </h2>
        {favoriteUsers.length > 0 ? (
          <div className="flex gap-3 flex-wrap">
            {favoriteUsers.map((user) => (
              <Person key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-zinc-400 text-sm">
            No one favorited this series yet :(
            <br /> Express your love of this anime series by clicking on the
            heart icon on the sidebar!
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-5">
        <h2 className="white font-bold text-lg">
          People currently watching {anime.name} ({currentUsers.length})
        </h2>
        {currentUsers.length > 0 ? (
          <div className="flex gap-3 flex-wrap">
            {currentUsers.map((user) => (
              <Person key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-zinc-400 text-sm">
            No one is currently watching this series :(
            <br /> Be the first one to start watching it by clicking on the
            &quot;add to list&quot; button!
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-5">
        <h2 className="white font-bold text-lg">
          People who finished {anime.name} ({finishedUsers.length})
        </h2>
        {finishedUsers.length > 0 ? (
          <div className="flex gap-3 flex-wrap">
            {finishedUsers.map((user) => (
              <Person key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-zinc-400 text-sm">
            No one finished watching this series :(
            <br /> Be the first one to start finish it by clicking on the
            &quot;add to list&quot; button!
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-5">
        <h2 className="white font-bold text-lg">
          People who want to watch {anime.name} ({wantToWatchUsers.length})
        </h2>
        {wantToWatchUsers.length > 0 ? (
          <div className="flex gap-3 flex-wrap">
            {wantToWatchUsers.map((user) => (
              <Person key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-zinc-400 text-sm">
            No one wants to watch this series :(
            <br /> Introduce someone to this new series now!
          </div>
        )}
      </div>
    </div>
  );
}

export default People;
