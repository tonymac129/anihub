import type { User } from "@/app/generated/prisma/client";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

function Person({ user }: { user: User }) {
  return (
    <Link
      href={"/profile/" + user.id}
      title={"Check out " + user.name + "'s profile"}
      className="rounded-full overflow-hidden border-2 border-zinc-700"
    >
      {user.image ? (
        <Image
          src={user.image}
          alt={user.name + " avatar"}
          width={70}
          height={70}
        />
      ) : (
        <FaUserCircle size={70} />
      )}
    </Link>
  );
}

export default Person;
