"use client";

import type { TmdbResponseType } from "@/types/Anime";
import { useMemo, useState } from "react";
import AnimeCard from "@/components/ui/AnimeCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";

interface AnimesProps {
  animes: TmdbResponseType[];
  genre: string;
}

function Animes({ animes, genre }: AnimesProps) {
  const [displaying, setDisplaying] = useState<number>(50);
  const [search, setSearch] = useState<string>("");
  const results = useMemo(() => {
    return animes.filter((anime) =>
      anime.name
        .toLocaleLowerCase()
        .includes(search.trim().toLocaleLowerCase()),
    );
  }, [search, animes]);

  return (
    <div className="flex flex-col items-center gap-y-10 pb-15">
      <div className="w-100">
        <Input
          value={search}
          setValue={setSearch}
          placeholder={`Search ${genre} anime (${animes.length} entries)`}
        />
      </div>
      <div className="flex flex-wrap gap-5 justify-center px-50">
        {results.length > 0 ? (
          results
            .slice(0, displaying)
            .map((anime) => <AnimeCard key={anime.id} anime={anime} small />)
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
