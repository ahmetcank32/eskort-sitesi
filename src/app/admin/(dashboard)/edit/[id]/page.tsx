import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditForm from "@/app/admin/(dashboard)/edit/[id]/EditForm";
import { checkAuth } from "@/lib/auth-check";

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  await checkAuth();

  const { id } = await params;

  const profile = await prisma.profile.findUnique({
    where: { id }
  });

  if (!profile) {
    notFound();
  }

  return <EditForm profile={profile} />;
}
