import Hero from "@/components/layout/Hero";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div>
      <Hero
        title="Welcome to AniHub!"
        description="The best app for you to keep track of the anime series & movies you've watched and discuss them with other people!"
      >
        <div className="flex gap-x-5">
          <Button text="Sign in" link="/signin" primary />
          <Button text="Learn more" link="/about" />
        </div>
      </Hero>
    </div>
  );
}
