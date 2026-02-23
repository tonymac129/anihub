type HeroProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

function Hero({ title, description, children }: HeroProps) {
  return (
    <div className="flex flex-col gap-y-5 items-center py-10">
      <h1 className="text-white text-4xl font-bold text-center">{title}</h1>
      {description && <div className="text-zinc-300 text-center w-130">{description}</div>}
      {children}
    </div>
  );
}

export default Hero;
