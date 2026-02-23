"use client";

import Link from "next/link";

type ButtonProps = {
  text: string;
  link?: string;
  onclick?: () => void;
  primary?: boolean;
  submit?: boolean;
};

function Button({ text, link, onclick, primary, submit }: ButtonProps) {
  const buttonStyles = `${primary ? "bg-zinc-200 text-black border-zinc-200 hover:bg-zinc-300 hover:border-zinc-300" : "bg-transparent hover:bg-zinc-900 text-zinc-300 border-zinc-800"}
      border-2 rounded-lg px-4 py-1.5 cursor-pointer font-bold`;

  return link ? (
    <Link href={link} className={buttonStyles}>
      {text}
    </Link>
  ) : (
    <button type={submit ? "submit" : "button"} onClick={onclick} className={buttonStyles}>
      {text}
    </button>
  );
}

export default Button;
