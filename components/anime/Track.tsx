"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

const statuses: string[] = ["Watching", "Finished", "Planned to watch"];

type TrackProps = {
  status: string | undefined;
  animeId: number;
  addList: (animeId: number, status: string) => Promise<void>;
};

function Track({ status, animeId, addList }: TrackProps) {
  const [open, setOpen] = useState<boolean>(false);
  const listMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickListener = (e: Event) => {
      if (!listMenuRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, []);

  function handleList(status: string) {
    addList(animeId, status);
    setOpen(false);
  }

  return (
    <div ref={listMenuRef} className="flex flex-col relative">
      <Button text={status || "Add to list"} onclick={() => setOpen(!open)} primary={status ? false : true} />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            className="absolute top-[110%] left-0 w-full bg-zinc-950 border-2 border-zinc-800 rounded-lg flex
            flex-col p-2 origin-top"
          >
            {statuses.map((status, i) => (
              <div
                key={i}
                className="text-center cursor-pointer hover:bg-zinc-900 rounded-lg py-1.5 font-bold"
                onClick={() => handleList(status)}
              >
                {status}
              </div>
            ))}
            <div
              className="text-center cursor-pointer hover:bg-zinc-900 rounded-lg text-red-400 py-1.5 font-bold"
              onClick={() => handleList("remove")}
            >
              Remove from list
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Track;
