import type { TmdbResponseType, RatingType } from "@/types/Anime";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

type AnimeCardProps = {
  anime: TmdbResponseType;
  rating: RatingType;
};

function AnimeCard({ anime, rating }: AnimeCardProps) {
  return (
    <Link
      href={"/anime/" + anime.id}
      className="border-2 border-zinc-800 hover:bg-zinc-900 rounded-lg flex flex-col items-center px-3
      py-5 gap-y-3 text-zinc-300 w-45"
    >
      <Image
        src={"https://image.tmdb.org/t/p/w300/" + anime.poster_path}
        alt="Backdrop"
        width={200}
        height={200}
        className="h-38 w-[70%] rounded-lg"
      />
      <h2 className="text-white font-bold text-center">{anime.name.slice(0, 30) + (anime.name.length > 30 ? "..." : "")}</h2>
      <div className="flex items-center gap-x-1 font-bold text-sm">
        <FaStar size={15} />
        <span>{rating.rating}</span>
        <span>({rating.count})</span>
      </div>
    </Link>
  );
}

export default AnimeCard;
