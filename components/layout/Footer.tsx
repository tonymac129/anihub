import Link from "next/link";

function Footer() {
  return (
    <div className="flex items-center flex-col gap-y-5 text-sm text-zinc-400 py-10 border-t-2 border-zinc-800">
      <div className="flex gap-x-3">
        <div className="w-38 text-right">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="/" className="hover:underline">
            AniHub
          </Link>
        </div>
        •<div className="w-38 text-left">All rights reserved</div>
      </div>
      <div className="flex gap-x-3">
        <div className="w-38 text-right">
          Made by{" "}
          <a
            href="https://github.com/tonymac129"
            target="_blank"
            className="text-left hover:underline"
          >
            TonyMac129
          </a>
        </div>
        •
        <a
          href="https://github.com/tonymac129/anihub"
          target="_blank"
          className="w-38 text-left hover:underline"
        >
          GitHub source code
        </a>
      </div>
      <div className="flex gap-x-3">
        <Link href="/" className="hover:underline w-10 text-center">
          Home
        </Link>
        •
        <Link href="/top" className="hover:underline w-10 text-center">
          Top
        </Link>
        •
        <Link href="/new" className="hover:underline w-10 text-center">
          New
        </Link>
        •
        <Link href="/explore" className="hover:underline w-13 text-center">
          Explore
        </Link>
        •
        <Link href="/about" className="hover:underline w-10 text-center">
          About
        </Link>
      </div>
    </div>
  );
}

export default Footer;
