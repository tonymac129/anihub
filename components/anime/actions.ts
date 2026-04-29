"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function likeComment(commentID: string, animeID: number) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const liked = await prisma.comment.count({
      where: { id: commentID, likedBy: { some: { id: session?.user.id } } },
    });
    await prisma.comment.update({
      where: { id: commentID },
      data: {
        likedBy: liked
          ? { disconnect: { id: session?.user.id } }
          : { connect: { id: session?.user.id } },
      },
    });
    revalidatePath("/anime/" + animeID);
  } catch (err) {
    console.error("Error: " + err);
  }
}

export async function trackEpisodes(
  episodes: number,
  id: string,
  animeID: number,
  total: number,
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    await prisma.animeList.updateMany({
      where: { AND: [{ id: id }, { userId: session?.user.id }] },
      data: {
        watched: episodes,
        status: episodes == total ? "Finished" : "Watching",
      },
    });
    revalidatePath(`/anime/${animeID}`);
  } catch (err) {
    console.error("Error: " + err);
  }
}
