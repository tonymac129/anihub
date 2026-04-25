"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export async function followUser(userID: string): Promise<number> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const isFollowing = await prisma.user.count({
      where: { id: session?.user.id, following: { some: { id: userID } } },
    });
    if (isFollowing) {
      await prisma.user.update({
        where: { id: session?.user.id },
        data: { following: { disconnect: { id: userID } } },
      });
      revalidatePath("/profile/" + userID);
      return 0;
    } else {
      await prisma.user.update({
        where: { id: session?.user.id },
        data: { following: { connect: { id: userID } } },
      });
      revalidatePath("/profile/" + userID);
      return 1;
    }
  } catch (err) {
    console.error("Error: " + err);
    return -1;
  }
}
