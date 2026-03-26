import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Users, UserPlus, Bell, FileText, Settings, ShieldCheck, Activity, Map } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [totalMembers, activeUsers, pendingApprovals] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { updatedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } }), // Last 7 days
    0, // Mock: No approval system in place yet
  ]);

  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col justify-between items-start md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 flex items-center">
            Admin Dashboard <ShieldCheck className="ml-2 text-blue-600" size={24} />
          </h1>
          <p className="text-gray-600">Manage members, posts, and platform analytics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <Card className="bg-blue-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-100 font-bold uppercase tracking-wider text-[10px]">Total Members</CardDescription>
            <CardTitle className="text-4xl">{totalMembers}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-1 text-xs text-blue-100 font-medium">
              <Users size={12} />
              <span>Registered Students</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="font-bold uppercase tracking-wider text-[10px]">Active Users</CardDescription>
            <CardTitle className="text-4xl">{activeUsers}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-1 text-xs text-green-500 font-bold">
              <Activity size={12} />
              <span>Last 7 Days</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="font-bold uppercase tracking-wider text-[10px]">Pending Approvals</CardDescription>
            <CardTitle className="text-4xl">{pendingApprovals}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-1 text-xs text-gray-400 font-medium">
              <UserPlus size={12} />
              <span>Needs Review</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="font-bold uppercase tracking-wider text-[10px]">Division Coverage</CardDescription>
            <CardTitle className="text-4xl">100%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-1 text-xs text-blue-600 font-bold">
              <Map size={12} />
              <span>8 Districts</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.college}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/u/${user.username}`} className="text-xs font-bold text-blue-600 hover:underline">View Profile</Link>
                      <button className="text-xs font-bold text-red-500 hover:underline">Ban</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <button className="flex items-center space-x-3 w-full rounded-xl bg-gray-50 p-4 text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Bell size={18} />
                <span>Post Announcement</span>
              </button>
              <button className="flex items-center space-x-3 w-full rounded-xl bg-gray-50 p-4 text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 transition-all">
                <FileText size={18} />
                <span>Publish Blog Post</span>
              </button>
              <button className="flex items-center space-x-3 w-full rounded-xl bg-gray-50 p-4 text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Settings size={18} />
                <span>Global Settings</span>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
