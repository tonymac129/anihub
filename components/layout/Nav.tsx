import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Button from "../ui/Button";
import Link from "next/link";
import Search from "./Search";
import NavUser from "../ui/NavUser";
import Image from "next/image";

const navLinkStyles = "text-zinc-300 px-4 py-2 rounded-lg hover:bg-zinc-900";

async function Nav() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="border-b-2 border-zinc-800 sticky top-0 z-10 w-full">
      <div className="bg-zinc-950 flex items-center justify-between gap-x-10 py-3 max-w-350 mx-auto px-5 md:px-15 xl:px-50">
        <Link
          href="/"
          className="font-bold text-xl text-white flex gap-x-3 items-center"
        >
          <Image
            src="/logo.png"
            alt="AniHub Logo"
            width={35}
            height={35}
            className="border-2 border-zinc-800 rounded-lg"
          />
          <span className="hidden sm:inline">AniHub</span>
        </Link>
        <Search />
        <div className="gap-x-3 items-center flex">
          <div className="gap-x-3 items-center hidden md:flex">
            <Link href="/top" className={navLinkStyles}>
              Top
            </Link>
            <Link href="/new" className={navLinkStyles}>
              New
            </Link>
            <Link href="/explore" className={navLinkStyles}>
              Explore
            </Link>
            <Link href="/about" className={navLinkStyles}>
              About
            </Link>
          </div>
          {session ? (
            <NavUser user={session.user} />
          ) : (
            <Button text="Sign in" link="/signin" primary />
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
