import type { RatingType, TmdbResponseType } from "@/types/Anime";
import AnimeCard from "@/components/ui/AnimeCard";

type PlaceProps = {
  index: number;
  anime: TmdbResponseType;
  rating: RatingType;
};

function Place({ index, anime, rating }: PlaceProps) {
  return (
    <div className="flex items-center relative">
      <h1 className="text-zinc-300 font-bold text-6xl absolute right-[120%]">
        #{index + 1}
      </h1>
      <AnimeCard anime={anime} rating={rating} />
    </div>
  );
}

export default Place;
