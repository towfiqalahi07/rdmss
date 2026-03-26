import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Heart, Search, User, Calendar, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default async function HelpPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const { type } = searchParams;

  const requests = await prisma.helpRequest.findMany({
    where: type ? { type } : {},
    include: { author: true, contributions: { include: { contributor: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col justify-between items-start md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600">Financial, Medical, or Academic help requests for students.</p>
        </div>
        <Button className="mt-4 md:mt-0">Post a Request</Button>
      </div>

      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-5">
        {["Financial", "Medical", "Academic", "Other"].map((t) => (
          <a
            key={t}
            href={`/help?type=${t}`}
            className={`rounded-xl border-2 px-4 py-2 text-center text-sm font-semibold transition-all ${
              type === t ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-100 hover:border-blue-200"
            }`}
          >
            {t}
          </a>
        ))}
        <a
          href="/help"
          className={`rounded-xl border-2 px-4 py-2 text-center text-sm font-semibold transition-all ${
            !type ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-100 hover:border-blue-200"
          }`}
        >
          All
        </a>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {requests.map((request) => (
          <Card key={request.id} className="h-full overflow-hidden border-t-4 border-t-red-500">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 uppercase tracking-wide">{request.type}</span>
                <span className="text-xs text-gray-400 font-medium">{new Date(request.createdAt).toLocaleDateString()}</span>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">{request.title}</CardTitle>
              <CardDescription className="flex items-center space-x-2 text-blue-600">
                <User size={12} />
                <span className="font-bold">{request.author.name}</span>
                <span className="text-gray-300">•</span>
                <span>{request.author.college}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-6 line-clamp-4">{request.content}</p>
              <div className="flex items-center space-x-2 text-xs font-bold text-gray-400">
                <MessageSquare size={14} />
                <span>{request.contributions.length} Contributions</span>
              </div>
            </CardContent>
            <CardFooter className="flex space-x-4 border-t pt-6 bg-gray-50/50">
              <Button size="sm" className="bg-red-500 hover:bg-red-600">I can help</Button>
              <Button size="sm" variant="outline">View Full Request</Button>
            </CardFooter>
          </Card>
        ))}
        {requests.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-200" />
            <p className="text-gray-500 italic">No help requests found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
