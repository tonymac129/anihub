"use client";

import type { User } from "../generated/prisma/client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

type FollowersProps = {
  users: User[];
  name: string;
  count: number;
  type: "followers" | "following";
};

function Followers({ users, name, count, type }: FollowersProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <span
        className="cursor-pointer hover:underline"
        onClick={() => setModalOpen(true)}
      >
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
              <div className="flex flex-col gap-y-3 max-h-100 overflow-auto">
                {users.map((user) => {
                  return (
                    <Link
                      key={user.id}
                      href={"/profile/" + user.id}
                      className="flex items-center gap-x-5 text-lg font-bold hover:bg-zinc-900 rounded-lg px-5 py-2"
                    >
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name + "'s avatar"}
                          width={50}
                          height={50}
                        />
                      ) : (
                        <FaUserCircle size={50} />
                      )}
                      {user.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default Followers;
