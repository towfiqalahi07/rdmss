import { prisma } from "@/lib/prisma";
import { User, Users, Compass, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default async function SmartMatchingPage({
  searchParams,
}: {
  searchParams: { userId?: string };
}) {
  const { userId } = searchParams;

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Find Similar Students</h1>
        <p className="mb-8 text-gray-600">Please login to see students with similar interests and goals.</p>
        <Link href="/login" className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-all">Login to Explore</Link>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">User not found</h1>
        <p className="mb-8 text-gray-600">Please login with a valid account.</p>
        <Link href="/login" className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-all">Login</Link>
      </div>
    );
  }

  const interests = user.interests ? user.interests.split(",").map(i => i.trim()) : [];
  const skills = user.skills ? user.skills.split(",").map(s => s.trim()) : [];

  // Simple matching: Users from same college, or same district, or sharing interests
  const matches = await prisma.user.findMany({
    where: {
      AND: [
        { id: { not: user.id } },
        {
          OR: [
            { college: user.college },
            { district: user.district },
            interests.length > 0 ? {
              OR: interests.map(interest => ({
                interests: { contains: interest }
              }))
            } : {},
            skills.length > 0 ? {
              OR: skills.map(skill => ({
                skills: { contains: skill }
              }))
            } : {}
          ],
        },
      ],
    },
    take: 6,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Smart Matching</h1>
        <p className="text-gray-600">People you might want to connect with based on your profile.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Current User Card */}
        <div className="lg:col-span-1">
          <Card className="border-blue-200 bg-blue-50/30">
            <CardHeader>
              <CardTitle className="text-xl">Your Profile Context</CardTitle>
              <CardDescription>We're matching based on these factors:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Compass className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">College: {user.college}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">District: {user.district}</span>
              </div>
              {interests.length > 0 && (
                <div className="pt-2">
                  <p className="mb-2 text-xs font-bold uppercase text-gray-400">Your Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((int, i) => (
                      <span key={i} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">{int}</span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Suggestions Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {matches.map((match) => (
              <Link key={match.id} href={`/u/${match.username}`}>
                <Card className="h-full hover:border-blue-300 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <User size={24} />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="truncate font-bold text-gray-900">{match.name}</h3>
                        <p className="truncate text-xs text-blue-600">{match.college}</p>
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-2">{match.bio || "No bio available."}</p>
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-gray-400">
                      <span>{match.district}</span>
                      <span className="text-blue-600">View Profile</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {matches.length === 0 && (
              <div className="col-span-full py-12 text-center bg-gray-50 rounded-2xl border border-dashed">
                <Users className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                <p className="text-gray-500 italic">No similar students found yet. Try updating your profile interests!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
