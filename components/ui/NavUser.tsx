"use client";

import type { User } from "better-auth";
import { createAuthClient } from "better-auth/client";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const menuItemStyles = "px-3 py-2 block rounded-lg cursor-pointer hover:bg-zinc-900 flex items-center gap-x-3";

function NavUser({ user }: { user: User }) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const authClient = createAuthClient();

  useEffect(() => {
    const clickListener = (e: Event) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, []);

  async function handleSignOut() {
    await authClient.signOut();
    window.location.reload();
  }

  return (
    <div onClick={() => setMenuOpen(true)} className="relative  text-zinc-300" ref={menuRef}>
      <div className="hover:bg-zinc-900 flex gap-x-2 cursor-pointer items-center border-zinc-800 rounded-lg px-2 py-1">
        {user.image ? (
          <Image
            src={user.image as string}
            alt="Avatar"
            width={35}
            height={35}
            className="rounded-full border-2 border-zinc-800"
          />
        ) : (
          <FaUserCircle size={35} className="rounded-full border-2 border-zinc-800" />
        )}
        {user.name}
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-[115%] right-0 bg-zinc-950 border-2 border-zinc-800 rounded-lg p-2 w-[120%] min-w-40"
          >
            <Link href="/profile" className={menuItemStyles}>
              <FaUserCircle size={20} /> Profile
            </Link>
            <div onClick={handleSignOut} className={menuItemStyles}>
              <MdLogout size={20} />
              Sign out
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavUser;
