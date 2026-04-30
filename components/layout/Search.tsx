"use client";

import type { TmdbResponseType } from "@/types/Anime";
import { searchAnime } from "./actions";
import { useState, useEffect, useRef } from "react";
import Input from "../ui/Input";
import Link from "next/link";

function Search() {
  const [search, setSearch] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const [displayed, setDisplayed] = useState<TmdbResponseType[]>([]);
  const searchRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const clickListener = (e: Event) => {
      console.log("hi");
      if (!searchRef.current?.contains(e.target as Node)) {
        setSearching(false);
      }
    };
    document.addEventListener("click", clickListener);

    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, []);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const query = search.trim().toLowerCase();
    if (query.length > 1) {
      setSearching(true);
      const results = await searchAnime(query);
      setDisplayed(results);
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={searchRef} className="relative w-full">
      <Input
        value={search}
        setValue={setSearch}
        placeholder="Search anime"
        className={searching ? "rounded-b-none" : ""}
      />
      {searching && (
        <div className="absolute top-[calc(100%-2px)] border-2 border-zinc-800 rounded-b-lg border-t-0 left-0 w-full bg-zinc-950 flex flex-col overflow-hidden">
          {displayed.length > 0 ? (
            displayed.map((entry) => (
              <Link
                href={"/anime/" + entry.id}
                key={entry.id}
                className="px-4 py-2 hover:bg-zinc-900 text-zinc-300"
              >
                {entry.name}
              </Link>
            ))
          ) : (
            <div className="text-zinc-300 text-sm px-4 py-2">
              Oops, nothing found, maybe try searching for another one?
            </div>
          )}
        </div>
      )}
    </form>
  );
}

export default Search;
