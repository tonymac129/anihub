import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Button from "../ui/Button";
import Link from "next/link";
import Search from "./Search";
import NavUser from "../ui/NavUser";

const navLinkStyles = "text-zinc-300 px-4 py-2 rounded-lg hover:bg-zinc-900";

async function Nav() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="bg-zinc-950 flex px-50 border-b-2 border-zinc-800 items-center justify-between gap-x-10 py-3 sticky top-0 z-10">
      <Link href="/" className="font-bold text-xl text-white">
        AniHub
      </Link>
      <Search />
      <div className="flex gap-x-3 items-center">
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
        {session ? (
          <NavUser user={session.user} />
        ) : (
          <Button text="Sign in" link="/signin" primary />
        )}
      </div>
    </div>
  );
}

export default Nav;
