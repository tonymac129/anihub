import type { TmdbResponseType } from "@/types/Anime";
import Link from "next/link";
import Image from "next/image";

function SearchResult({ entry }: { entry: TmdbResponseType }) {
  return (
    <Link
      href={"/anime/" + entry.id}
      className="px-4 py-2 hover:bg-zinc-900 text-zinc-300 flex gap-x-5 items-center"
    >
      <Image
        src={"https://image.tmdb.org/t/p/w300/" + entry.poster_path}
        alt={entry.name + " poster"}
        width={100}
        height={100}
        className="w-12 rounded-lg"
      />
      <div className="flex flex-col gap-y-1">
        <h2 className="text-lg font-bold text-white">
          {entry.name.slice(0, 35) + (entry.name.length > 35 ? "..." : "")}
        </h2>
        <p className="text-zinc-300 text-xs">
          {entry.overview.slice(0, 50) + "..."}
        </p>
      </div>
    </Link>
  );
}

export default SearchResult;
