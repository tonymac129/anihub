import { genres } from "@/lib/constants";
import Hero from "@/components/layout/Hero";
import Genre from "@/components/explore/Genre";

function Page() {
  return (
    <div>
      <Hero
        title="Explore Anime Series"
        description="Browse and explore a wide selection of different anime series by clicking on the different genres below!"
      />
      <div className="flex flex-wrap justify-center gap-5 pb-15 px-50">
        {genres.map((genre) => (
          <Genre key={genre.id} genre={genre} />
        ))}
      </div>
    </div>
  );
}

export default Page;
