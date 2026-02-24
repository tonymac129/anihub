"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/Modal";

type FollowersProps = {
  name: string;
  count: number;
  type: "followers" | "following";
};

function Followers({ name, count, type }: FollowersProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <span className="cursor-pointer hover:underline" onClick={() => setModalOpen(true)}>
        {count} {type}
      </span>
      <AnimatePresence>
        {modalOpen && (
          <Modal close={() => setModalOpen(false)}>
            <div className="p-5 flex flex-col gap-y-5">
              <h2 className="text-white text-xl text-center font-bold">
                {name}&apos;s {type[0].toUpperCase() + type.slice(1)}
              </h2>
              <div className="text-center">
                {count} {type}
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default Followers;
