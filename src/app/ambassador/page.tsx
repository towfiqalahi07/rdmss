import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Star, ShieldCheck, Activity, Users, Map, Bell, PlusCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function AmbassadorDashboard() {
  const [totalCampusMembers, pendingCampusRequests] = await Promise.all([
    prisma.user.count({ where: { college: "Rajshahi Medical College" } }), // Mock campus
    2, // Mock pending
  ]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col justify-between items-start md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 flex items-center">
            Ambassador Dashboard <ShieldCheck className="ml-2 text-blue-600" size={24} />
          </h1>
          <p className="text-gray-600">Managing campus objectives + forum for Rajshahi Medical College.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-600 font-bold uppercase tracking-wider text-[10px]">Campus Members</CardDescription>
            <CardTitle className="text-4xl text-blue-900">{totalCampusMembers}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-1 text-xs text-blue-600 font-bold">
              <Users size={12} />
              <span>Registered Students</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-yellow-600 font-bold uppercase tracking-wider text-[10px]">Pending Approvals</CardDescription>
            <CardTitle className="text-4xl text-yellow-900">{pendingCampusRequests}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-1 text-xs text-yellow-600 font-bold">
              <PlusCircle size={12} />
              <span>Awaiting Review</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-green-600 font-bold uppercase tracking-wider text-[10px]">Campus Score</CardDescription>
            <CardTitle className="text-4xl text-green-900">1250</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-1 text-xs text-green-600 font-bold">
              <Star size={12} />
              <span>Campus Points</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campus Forum Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-start space-x-4 border-b pb-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Bell size={16} />
                </div>
                <div>
                   <p className="text-sm font-bold text-gray-900">New Exam Schedule Posted</p>
                   <p className="text-xs text-gray-500 italic">2 hours ago</p>
                </div>
             </div>
             <div className="flex items-start space-x-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <CheckCircle size={16} />
                </div>
                <div>
                   <p className="text-sm font-bold text-gray-900">Study Group Meeting Today at 4 PM</p>
                   <p className="text-xs text-gray-500 italic">5 hours ago</p>
                </div>
             </div>
             <Button className="w-full mt-4" variant="outline">Post to Campus Forum</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Member Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between border-b pb-4">
                <div>
                   <p className="text-sm font-bold text-gray-900">Towfiqul Islam</p>
                   <p className="text-xs text-gray-500">Session 2025-26</p>
                </div>
                <div className="flex space-x-2">
                   <Button size="sm" className="h-8 rounded-lg">Approve</Button>
                   <Button size="sm" variant="outline" className="h-8 rounded-lg text-red-500 border-red-200">Reject</Button>
                </div>
             </div>
             <Button className="w-full mt-4" variant="ghost">View All Requests</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
