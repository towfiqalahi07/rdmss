export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { User, Users, Compass, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { getSession } from "@/lib/auth";

export default async function SmartMatchingPage() {
  const session = await getSession();

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Find Similar Students</h1>
        <p className="mb-8 text-gray-600">Please login to see students with similar interests and goals.</p>
        <Link href="/login" className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-all">Login to Explore</Link>
      </div>
    );
  }

  const userId = session.user.id;
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

  const interests = user.interests ? user.interests.split(",").map(i => i.trim()).filter(Boolean) : [];
  const skills = user.skills ? user.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
  const goals = user.goals ? user.goals.split(",").map(g => g.trim()).filter(Boolean) : [];

  // Enhanced matching: Users from same college, district, or sharing interests/goals/skills
  const matches = await prisma.user.findMany({
    where: {
      AND: [
        { id: { not: user.id } },
        { status: "APPROVED" },
        {
          OR: [
            { college: user.college },
            { district: user.district },
            ...(interests.length > 0 ? interests.map(interest => ({ interests: { contains: interest } })) : []),
            ...(goals.length > 0 ? goals.map(goal => ({ goals: { contains: goal } })) : []),
            ...(skills.length > 0 ? skills.map(skill => ({ skills: { contains: skill } })) : [])
          ].filter(condition => Object.keys(condition).length > 0),
        },
      ],
    },
    take: 9,
  });

  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Smart Matching</h1>
        <p className="text-gray-600">People you might want to connect with based on your profile.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Current User Card */}
        <div className="lg:col-span-1">
          <div className="bg-blue-50/30 border border-blue-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-2">Your Profile Context</h2>
            <p className="text-sm text-gray-600 mb-6">We're matching based on these factors:</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Compass className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">College: {user.college}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">District: {user.district}</span>
              </div>

              {goals.length > 0 && (
                <div className="pt-2">
                  <p className="mb-2 text-xs font-bold uppercase text-gray-400">Your Goals</p>
                  <div className="flex flex-wrap gap-2">
                    {goals.map((goal, i) => (
                      <span key={i} className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">{goal}</span>
                    ))}
                  </div>
                </div>
              )}

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
            </div>
          </div>
        </div>

        {/* Suggestions Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {matches.map((match) => (
              <Link key={match.id} href={`/u/${match.id}`}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 h-full hover:border-blue-300 hover:shadow-lg transition-all">
                    <div className="mb-4 flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <User size={24} />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="truncate font-bold text-gray-900">{match.name}</h3>
                        <p className="truncate text-xs text-blue-600">{match.college}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-gray-400">
                      <span>{match.district}</span>
                      <span className="text-blue-600">View Profile</span>
                    </div>
                </div>
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
