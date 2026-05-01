"use client";

import type { TmdbResponseType } from "@/types/Anime";
import { useMemo, useState } from "react";
import AnimeCard from "@/components/ui/AnimeCard";
import Sort from "@/components/explore/Sort";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";

interface AnimesProps {
  animes: TmdbResponseType[];
  genre: string;
}

function Animes({ animes, genre }: AnimesProps) {
  const [displaying, setDisplaying] = useState<number>(50);
  const [sortMethod, setSortMethod] = useState<string>("popularity");
  const [search, setSearch] = useState<string>("");
  const [ascending, setAscending] = useState<boolean>(false);
  const results = useMemo(() => {
    return animes
      .sort((a, b) => {
        let comparison;
        switch (sortMethod) {
          case "rating":
            comparison = a.vote_average - b.vote_average;
            break;
          case "name":
            comparison = a.name.localeCompare(b.name);
            break;
          case "release":
            comparison =
              new Date(a.first_air_date).getTime() -
              new Date(b.first_air_date).getTime();
            break;
          default:
            comparison = a.vote_count - b.vote_count;
            break;
        }
        return comparison * (ascending ? 1 : -1);
      })
      .filter((anime) =>
        anime.name
          .toLocaleLowerCase()
          .includes(search.trim().toLocaleLowerCase()),
      );
  }, [search, animes, sortMethod, ascending]);

  return (
    <div className="flex flex-col items-center gap-y-10 pb-15">
      <div className="w-100">
        <Input
          value={search}
          setValue={setSearch}
          placeholder={`Search ${genre} anime (${animes.length} entries)`}
        />
        <Sort
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
          ascending={ascending}
          setAscending={setAscending}
        />
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {results.length > 0 ? (
          results.slice(0, displaying).map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              rating={{
                rating: Math.round(anime.vote_average * 10) / 10,
                count: anime.vote_count,
              }}
            />
          ))
        ) : (
          <div className="text-zinc-300 w-[60%] text-center">
            Oops, no results found! Check out a different genre on the{" "}
            <Link href="/explore">explore</Link> page or use the search bar on
            the nav bar for advanced search!
          </div>
        )}
      </div>
      {displaying < animes.length && results.length > 50 && (
        <Button
          text="Load more"
          onclick={() =>
            setDisplaying((prev) => Math.min(prev + 50, animes.length))
          }
        />
      )}
    </div>
  );
}

export default Animes;
