"use client";

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
  return (
    <input
      className={
        "bg-zinc-950 border-2 border-zinc-800 rounded-lg text-white px-4 py-2 outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none " +
        className
      }
      type={type || "text"}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default Input;
