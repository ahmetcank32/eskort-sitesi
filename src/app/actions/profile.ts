"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addProfile(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const age = parseInt(formData.get("age") as string);
    const location = formData.get("location") as string;
    const bio = formData.get("bio") as string;
    const coverImage = formData.get("coverImage") as string;
    const image2 = formData.get("image2") as string;
    const image3 = formData.get("image3") as string;
    const image4 = formData.get("image4") as string;
    const image5 = formData.get("image5") as string;
    const phone = formData.get("phone") as string;
    const vip = formData.get("vip") === "on";
    const featuresRaw = formData.get("features") as string;
    const availability = formData.get("availability") as string;
    const hairColor = formData.get("hairColor") as string;
    const height = formData.get("height") as string;
    const weight = formData.get("weight") as string;

    // Convert comma-separated string to array
    const features = featuresRaw ? featuresRaw.split(",").map(f => f.trim()) : [];

    if (!name || !age || !location || !bio || !coverImage) {
      return { error: "Please fill out all required fields." };
    }

    const newProfile = await prisma.profile.create({
      data: {
        name,
        age,
        location,
        bio,
        coverImage,
        image2: image2 || null,
        image3: image3 || null,
        image4: image4 || null,
        image5: image5 || null,
        phone,
        vip,
        features,
        availability,
        hairColor,
        height,
        weight,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, profileId: newProfile.id };
  } catch (err: any) {
    console.error("Failed to add profile:", err);
    return { error: "Database error. Please make sure PostgreSQL is correctly configured." };
  }
}

export async function updateProfile(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const age = parseInt(formData.get("age") as string);
    const location = formData.get("location") as string;
    const bio = formData.get("bio") as string;
    const coverImage = formData.get("coverImage") as string;
    const image2 = formData.get("image2") as string;
    const image3 = formData.get("image3") as string;
    const image4 = formData.get("image4") as string;
    const image5 = formData.get("image5") as string;
    const phone = formData.get("phone") as string;
    const vip = formData.get("vip") === "on";
    const featuresRaw = formData.get("features") as string;
    const availability = formData.get("availability") as string;
    const hairColor = formData.get("hairColor") as string;
    const height = formData.get("height") as string;
    const weight = formData.get("weight") as string;

    const features = featuresRaw ? featuresRaw.split(",").map(f => f.trim()) : [];

    if (!name || !age || !location || !bio || !coverImage) {
      return { error: "Please fill out all required fields." };
    }

    await prisma.profile.update({
      where: { id },
      data: {
        name,
        age,
        location,
        bio,
        coverImage,
        image2: image2 || null,
        image3: image3 || null,
        image4: image4 || null,
        image5: image5 || null,
        phone,
        vip,
        features,
        availability,
        hairColor,
        height,
        weight,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath(`/profile/${id}`);

    return { success: true };
  } catch (err: any) {
    console.error("Failed to update profile:", err);
    return { error: "Database error while updating profile." };
  }
}

export async function deleteProfile(id: string) {
  try {
    await prisma.profile.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (err: any) {
    console.error("Failed to delete profile:", err);
    return { error: "Failed to delete profile." };
  }
}
