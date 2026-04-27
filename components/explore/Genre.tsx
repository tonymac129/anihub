import type { GenreType } from "@/types/Explore";
import Link from "next/link";

function Genre({ genre }: { genre: GenreType }) {
  return (
    <Link
      href={"/genre/" + genre.id}
      className="relative rounded-lg hover:bg-zinc-900 cursor-pointer flex flex-col p-5 border-2 border-zinc-700 gap-y-3 w-100"
    >
      <h2 className="text-white text-2xl font-bold">{genre.name}</h2>
      <p className="text-zinc-300 text-sm">{genre.description}</p>
      <div className="absolute right-5 top-5 text-zinc-300">{genre.icon}</div>
    </Link>
  );
}

export default Genre;
