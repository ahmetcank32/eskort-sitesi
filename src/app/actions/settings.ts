"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSetting(key: string, value: string) {
  try {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (err: any) {
    console.error("Failed to update setting:", err);
    return { error: "Database error while updating setting." };
  }
}
