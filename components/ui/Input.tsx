"use client";

import { FaXmark } from "react-icons/fa6";
import { useRef } from "react";

type InputProps = {
  value: string | number;
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((num: string) => void);
  placeholder: string;
  type?: string;
  className?: string;
};

function Input({ value, setValue, placeholder, type, className }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClear() {
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <div className="flex relative items-center">
      <input
        className={
          "bg-zinc-950 border-2 border-zinc-800 rounded-lg text-white px-4 py-2 outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none " +
          className
        }
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={inputRef}
      />
      {value.toString().length > 0 && (
        <FaXmark
          size={30}
          title="Clear input field"
          className="p-1 rounded-lg cursor-pointer hover:bg-zinc-900 text-zinc-300 absolute right-2"
          onClick={handleClear}
        />
      )}
    </div>
  );
}

export default Input;
