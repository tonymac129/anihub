"use client";

import { FaList } from "react-icons/fa";

const dropdownStyles =
  "border-2 border-zinc-800 hover:bg-zinc-900 rounded-lg cursor-pointer appearance-none font-bold text-center w-35 py-2";

interface SortProps {
  sortMethod: string;
  setSortMethod: React.Dispatch<React.SetStateAction<string>>;
  ascending: boolean;
  setAscending: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sort({
  sortMethod,
  setSortMethod,
  ascending,
  setAscending,
}: SortProps) {
  return (
    <div className="flex gap-x-3 items-center text-zinc-300 justify-center mt-5">
      <FaList size={18} />
      Sort by
      <select
        value={sortMethod}
        onChange={(e) => setSortMethod(e.target.value)}
        className={dropdownStyles}
      >
        <option value="popularity">Popularity</option>
        <option value="rating">Rating</option>
        <option value="name">Name</option>
        <option value="release">Release date</option>
      </select>
      <select
        value={ascending ? "a" : "d"}
        onChange={(e) => setAscending(e.target.value === "a")}
        className={dropdownStyles}
      >
        <option value="d">Descending</option>
        <option value="a">Ascending</option>
      </select>
    </div>
  );
}

export default Sort;
