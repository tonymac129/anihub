"use client";

import type { User } from "better-auth";
import { createAuthClient } from "better-auth/client";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

function NavUser({ user }: { user: User }) {
  const authClient = createAuthClient();

  async function handleSignOut() {
    await authClient.signOut();
    window.location.reload();
  }

  return (
    <div
      onClick={handleSignOut}
      className=" border-zinc-800 hover:bg-zinc-900 rounded-lg px-2 py-1 text-zinc-300 flex gap-x-2 cursor-pointer items-center"
    >
      {user.image ? (
        <Image src={user.image as string} alt="Avatar" width={35} height={35} className="rounded-full border-2 border-zinc-800" />
      ) : (
        <FaUserCircle size={35} className="rounded-full border-2 border-zinc-800" />
      )}
      {user.name}
    </div>
  );
}

export default NavUser;
