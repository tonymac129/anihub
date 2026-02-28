"use server";

import { CommentType } from "@/types/Anime";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export async function addComment(animeId: number, comment: CommentType) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const existingAnime = await prisma.anime.findUnique({ where: { id: animeId } });
    if (!existingAnime) {
      await prisma.anime.create({ data: { id: animeId } });
    }
    await prisma.comment.create({
      data: {
        text: comment.text,
        animeId: comment.animeId,
        userId: session!.user!.id!,
      },
    });
    revalidatePath("/anima/" + animeId);
  } catch (err) {
    console.error("Error: " + err);
  }
}

export async function addList(animeId: number, status: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (status === "remove") {
      await prisma.animeList.delete({ where: { userId_animeId: { userId: session!.user!.id!, animeId: animeId } } });
    } else {
      const existingAnimeList = await prisma.animeList.findUnique({
        where: { userId_animeId: { userId: session!.user!.id!, animeId: animeId } },
      });
      if (existingAnimeList) {
        await prisma.animeList.update({
          where: { userId_animeId: { userId: session!.user!.id!, animeId: animeId } },
          data: { status: status },
        });
      } else {
        await prisma.animeList.create({
          data: {
            animeId: animeId,
            userId: session!.user!.id!,
            status: status,
          },
        });
      }
    }
    revalidatePath("/anime/" + animeId);
  } catch (err) {
    console.error("Error: " + err);
  }
}
