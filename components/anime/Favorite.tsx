"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";

type FavoriteProps = {
  animeId: number;
  favoritedBefore: boolean;
  addFavorite: (animeId: number, favoriting: boolean) => Promise<void>;
};

function Favorite({ animeId, favoritedBefore, addFavorite }: FavoriteProps) {
  const [favorited, setFavorited] = useState<boolean>(favoritedBefore);

  useEffect(() => {
    addFavorite(animeId, favorited);
  }, [animeId, addFavorite, favorited]);

  return (
    <div
      className="cursor-pointer hover:bg-zinc-900 border-2 border-zinc-800 rounded-lg p-2 group"
      title={`${favorited ? "Remove from" : "Add to"} favorites`}
      onClick={() => setFavorited(!favorited)}
    >
      <div className="text-red-500 group group-hover:scale-125 group-active:scale-95 transition-transform!">
        {favorited ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
      </div>
    </div>
  );
}

export default Favorite;
