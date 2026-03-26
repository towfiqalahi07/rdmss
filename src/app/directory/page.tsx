import { prisma } from "@/lib/prisma";
import DirectoryClient from "@/components/DirectoryClient";

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: { college?: string; district?: string; q?: string };
}) {
  const params = await searchParams; // In Next.js 15+, searchParams is a promise
  const { college, district, q } = params;

  const users = await prisma.user.findMany({
    where: {
      AND: [
        college ? { college } : {},
        district ? { district } : {},
        q ? {
          OR: [
            { name: { contains: q } },
            { username: { contains: q } },
            { skills: { contains: q } },
            { interests: { contains: q } },
          ],
        } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  // Prepare serializable user data for Client Component
  const serializedUsers = users.map(u => ({
    id: u.id,
    name: u.name,
    username: u.username,
    college: u.college,
    district: u.district,
    interests: u.interests,
  }));

  return <DirectoryClient users={serializedUsers} />;
}
