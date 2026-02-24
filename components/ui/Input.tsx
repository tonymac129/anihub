"use client";

type InputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  type?: string;
};

function Input({ value, setValue, placeholder, type }: InputProps) {
  return (
    <input
      className="bg-zinc-950 border-2 border-zinc-800 rounded-lg text-white px-4 py-2 outline-none"
      type={type || "text"}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default Input;
