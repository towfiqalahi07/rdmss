import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProfileClient from "@/components/ProfileClient";

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const p = await params;
  const user = await prisma.user.findUnique({
    where: { username: p.username },
    include: { profile: true },
  });

  if (!user) {
    notFound();
  }

  const serializedUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    college: user.college,
    session: user.session,
    district: user.district,
    role: user.role,
    bio: user.bio,
    skills: user.skills,
    interests: user.interests,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  };

  return <ProfileClient user={serializedUser} />;
}
