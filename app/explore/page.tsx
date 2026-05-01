import type { Metadata } from "next";
import { genres } from "@/lib/constants";
import Hero from "@/components/layout/Hero";
import Genre from "@/components/explore/Genre";
import Search from "@/components/layout/Search";

export const metadata: Metadata = {
  title: "Explore | AniHub",
  description:
    "Browse and explore a wide selection of different anime series by clicking on the different genres below!",
  openGraph: {
    title: "Explore | AniHub",
    description:
      "Browse and explore a wide selection of different anime series by clicking on the different genres below!",
    url: `https://anihub-app.vercel.app/explore`,
    siteName: "AniHub",
    images: [
      {
        url: "/logo.png",
        width: 50,
        height: 50,
      },
    ],
    type: "website",
  },
};

function Page() {
  return (
    <div>
      <Hero
        title="Explore Anime Series"
        description="Browse and explore a wide selection of different anime series by clicking on the different genres below!"
      />
      <div className="flex w-150 mx-auto mb-10">
        <Search />
      </div>
      <div className="flex flex-wrap justify-center gap-5 pb-15">
        {genres.map((genre) => (
          <Genre key={genre.id} genre={genre} />
        ))}
      </div>
    </div>
  );
}

export default Page;
