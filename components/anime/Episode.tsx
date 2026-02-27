import type { EpisodeType } from "@/types/Anime";
import Link from "next/link";

type ColorType = {
  bg?: string;
  text?: string;
};

function Episode({ episode }: { episode: EpisodeType }) {
  const rating = episode.rating?.aggregateRating;
  let color: ColorType = {};
  if (rating < 8) {
    color = { bg: "bg-yellow-500", text: "text-zinc-800" };
  } else if (rating < 9) {
    color = { bg: "bg-green-500", text: "text-zinc-800" };
  } else if (rating < 9.6) {
    color = { bg: "bg-green-900" };
  } else if (rating >= 9.6) {
    color = { bg: "bg-blue-500" };
  } else {
    color = { bg: "bg-zinc-500" };
  }
  return (
    <Link
      href={"https://imdb.com/title/" + episode.id}
      target="_blank"
      title={episode.title}
      className={color.bg + " " + color.text + " text-lg w-15 rounded-lg text-center py-1 font-bold"}
    >
      {rating || "?"}
    </Link>
  );
}

export default Episode;
