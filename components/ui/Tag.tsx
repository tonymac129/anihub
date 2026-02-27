import type { GenreType } from "@/types/Anime";
import Link from "next/link";

function Tag({ genre }: { genre: GenreType }) {
  return (
    <Link
      href={"/genre/" + genre.id}
      className="text-xs px-3 py-1 text-zinc-300 rounded-full border-2 border-zinc-800 hover:bg-zinc-900"
    >
      {genre.name}
    </Link>
  );
}

export default Tag;
