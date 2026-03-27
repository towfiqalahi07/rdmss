export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Bell, User, Calendar } from "lucide-react";

export default async function AnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Announcement Panel</h1>
        <p className="text-gray-600">Important notices, events, and updates from RDMSS Admins.</p>
      </div>

      <div className="mx-auto max-w-3xl space-y-8">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="overflow-hidden border-l-4 border-l-blue-600">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  <Bell size={12} />
                  <span>Important Notice</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <Calendar size={12} />
                  <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">{announcement.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">{announcement.content}</p>
              <div className="flex items-center space-x-3 border-t pt-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <User size={16} />
                </div>
                <div className="text-xs font-medium">
                  <p className="text-gray-900">{announcement.author.name}</p>
                  <p className="text-gray-400 font-bold uppercase tracking-wider">{announcement.author.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {announcements.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500 italic">No announcements yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
