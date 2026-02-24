import type { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import prisma from "@/lib/db";
import EditProfile from "./EditProfile";
import Image from "next/image";
import Followers from "./Followers";

export const metadata: Metadata = {
  title: "My Profile | AniHub",
  description: "View your anime lists, showcase your favorites, and customize your own profile on AniHub!",
};

async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) redirect("/signin");

  return (
    <div className="px-50 flex gap-x-10 py-5">
      <div className="flex-1 flex flex-col gap-y-5 text-zinc-300">
        {user.image ? (
          <Image src={user.image} alt="Avatar" width={550} height={550} className="w-full rounded-lg border-2 border-zinc-800" />
        ) : (
          <FaUserCircle size={200} className="w-full" />
        )}
        <div className="flex flex-col gap-y-1">
          <h2 className="font-bold text-2xl text-white">{user.name}</h2>
          <div className="flex gap-x-3">
            <Followers name={user.name} count={0} type="followers" />•
            <Followers name={user.name} count={0} type="following" />
          </div>
        </div>
        <EditProfile />
        <p>
          Email:{" "}
          <a href={`mailto:${user.email}`} className="hover:underline">
            {user.email}
          </a>
        </p>
        <p>Joined: {user.createdAt.toLocaleDateString()}</p>
      </div>
      <div className="flex-3 text-zinc-300"> Your anime lists, collections, and favorties will show up here!</div>
    </div>
  );
}

export default Page;
