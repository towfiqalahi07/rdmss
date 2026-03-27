export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { BookOpen, User, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Medical Blog & Articles</h1>
        <p className="text-gray-600">মেডিকেল টিপস, অভিজ্ঞতা, and Career Guidance for medical students.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col h-full overflow-hidden transition-all hover:-translate-y-1 hover:border-blue-200">
            <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-300">
              <BookOpen size={48} />
            </div>
            <CardHeader className="flex-grow">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{post.category}</span>
                <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <CardTitle className="text-xl font-bold leading-snug line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">{post.content}</p>
              <div className="flex items-center space-x-2 border-t pt-4">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <User size={12} />
                </div>
                <span className="text-xs font-medium text-gray-900">{post.author.name}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/blog/${post.id}`} className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 group transition-all">
                Read Full Article
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardFooter>
          </Card>
        ))}
        {posts.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-500 italic">No articles published yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
