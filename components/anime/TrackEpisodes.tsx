"use client";

import { useState } from "react";
import { MdEdit } from "react-icons/md";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface TrackEpisodesProps {
  watched: number;
  total: number;
  listID: string;
  animeID: number;
  trackEpisodes: (
    episodes: number,
    id: string,
    animeID: number,
    total: number,
  ) => Promise<void>;
}

function TrackEpisodes({
  watched,
  total,
  listID,
  animeID,
  trackEpisodes,
}: TrackEpisodesProps) {
  const [number, setNumber] = useState<number>(watched || 1);
  const [editing, setEditing] = useState<boolean>(false);

  function handleSave() {
    trackEpisodes(Math.max(Math.min(number, total), 0), listID, animeID, total);
    setEditing(false);
  }

  return (
    <div className="flex gap-x-5 items-end">
      {editing && (
        <>
          <label className="text-sm flex flex-col gap-y-1">
            Episodes watched
            <Input
              type="number"
              placeholder="Number"
              value={number}
              setValue={(num: string) => setNumber(Number(num))}
            />
          </label>
          <Button text="Save" onclick={handleSave} primary />
        </>
      )}
      {!editing && (
        <div className="flex flex-col gap-y-1 w-full text-sm">
          <div className="flex gap-x-3 items-center justify-between">
            <span>
              {watched} episode{watched == 1 ? "" : "s"} watched
            </span>
            <MdEdit
              onClick={() => setEditing(true)}
              size={30}
              className="cursor-pointer rounded-lg border-2 border-zinc-800 p-1 hover:bg-zinc-900"
              title="Edit tracking progress"
            />
          </div>
          <div className="w-full flex items-center gap-x-5">
            <div
              style={
                {
                  "--progress-width": `${Math.floor((watched / total) * 100)}%`,
                } as React.CSSProperties
              }
              className={`h-2 before:w-(--progress-width)  bg-zinc-900 before:bg-white before:content-[''] before:h-full before:absolute rounded-full overflow-hidden relative w-full `}
            />
            {Math.floor((watched / total) * 100)}%
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackEpisodes;
