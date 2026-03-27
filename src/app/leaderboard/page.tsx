export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Award, Users, TrendingUp, Heart, Star, User } from "lucide-react";

export default async function LeaderboardPage() {
  const topContributors = await prisma.user.findMany({
    orderBy: { points: "desc" },
    take: 10,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
          <Award size={32} />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Contribution Leaderboard</h1>
        <p className="text-gray-600">Helping others → earn points. Celebrating our most helpful members.</p>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">
          {topContributors.slice(0, 3).map((user, i) => (
            <Card key={user.id} className={`relative overflow-hidden ${i === 0 ? "border-yellow-400 bg-yellow-50/30 scale-105 shadow-xl" : ""}`}>
              {i === 0 && (
                <div className="absolute top-0 right-0 bg-yellow-400 p-2 text-white">
                  <Star size={16} fill="white" />
                </div>
              )}
              <CardHeader className="text-center">
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full font-bold text-2xl ${
                  i === 0 ? "bg-yellow-400 text-white" : "bg-gray-100 text-gray-600"
                }`}>
                  {i + 1}
                </div>
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <CardDescription className="text-xs font-bold uppercase">{user.college}</CardDescription>
              </CardHeader>
              <CardContent className="text-center border-t pt-6 bg-white/50">
                <p className="text-2xl font-black text-blue-600">{user.points}</p>
                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Points Earned</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b bg-gray-50/50 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Member</th>
                    <th className="px-6 py-4">College</th>
                    <th className="px-6 py-4 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {topContributors.map((user, i) => (
                    <tr key={user.id} className="group hover:bg-gray-50 transition-all">
                      <td className="px-6 py-4 text-sm font-bold text-gray-400">{i + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold">
                            {user.name[0]}
                          </div>
                          <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.college}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">{user.points} pts</span>
                      </td>
                    </tr>
                  ))}
                  {topContributors.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">No points earned yet. Start helping your peers!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
