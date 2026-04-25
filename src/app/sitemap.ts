import { prisma } from "@/lib/prisma";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://eskort-sitesi.vercel.app";

  const profiles = await prisma.profile.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  const profileUrls = profiles.map((profile) => ({
    url: `${baseUrl}/profile/${profile.id}`,
    lastModified: profile.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticUrls, ...profileUrls];
}
