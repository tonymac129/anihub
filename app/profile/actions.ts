"use server";

import type { ProfileType } from "@/types/User";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export async function editProfile(userId: string, profile: ProfileType) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (session?.user.id === userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { name: profile.name.trim(), about: profile.about?.trim(), link: profile.link?.trim() },
      });
      revalidatePath("/profile");
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}
