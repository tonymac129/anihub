import type { GenreType } from "@/types/Explore";
import { FaHeart, FaRobot } from "react-icons/fa";
import { FaBasketball, FaGun } from "react-icons/fa6";
import { GiCauldron } from "react-icons/gi";
import { IoCafe } from "react-icons/io5";
import { LuDrama, LuSwords } from "react-icons/lu";

export const genres: GenreType[] = [
  {
    id: 0,
    name: "Shonen",
    description:
      "Shonen is one of the most popular anime genres that generally targets teen boys with intense action, flashy animation, and coming of age adventures.",
    icon: <LuSwords size={25} />,
    keyword: 207826,
  },
  {
    id: 1,
    name: "Isekai",
    description:
      "Isekai is a popular fantasy and adventure genre where the protagonist is transported or reborn into an often magical world as a hero.",
    icon: <GiCauldron size={25} />,
    keyword: 237451,
  },
  {
    id: 2,
    name: "Romance",
    description:
      "Romance anime series are often focused around high school slice-of-life dramas and relationships of two leads with opposite personalities.",
    icon: <FaHeart size={25} />,
    keyword: 9840,
  },
  {
    id: 3,
    name: "Shoujo",
    description:
      "Shoujo is shonen's counterpart, with a target demographic of young girls, and often focuses on emotional relationships and romance.",
    icon: <LuDrama size={25} />,
    keyword: 206437,
  },
  {
    id: 4,
    name: "Seinen",
    description:
      "Seinen anime series mainly target adult man, with mature themes, complex narratives, psychological depth, and often graphic content.",
    icon: <FaGun size={25} />,
    keyword: 195668,
  },
  {
    id: 5,
    name: "Sports",
    description:
      "Sports anime series often feature high-stakes drama, intense physical competition, fast-paced games, teamwork, and personal growth.",
    icon: <FaBasketball size={25} />,
    keyword: 6075,
  },
  {
    id: 6,
    name: "Slice of Life",
    description:
      "Slice of life anime series take a break from everything and just focuses on the relaxing, mundane, and realistic character experiences.",
    icon: <IoCafe size={25} />,
    keyword: 9914,
  },
  {
    id: 7,
    name: "Sci-Fi",
    description:
      "Science fiction anime series that focus on robots, futuristic technology, artificial intelligence, and how they could impact the world.",
    icon: <FaRobot size={25} />,
    keyword: 10046,
  },
];
