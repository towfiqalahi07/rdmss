export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, content, category, authorId } = await req.json();

    // Check if user is Admin or Ambassador
    const user = await prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!user || (user.role !== "ADMIN" && user.role !== "AMBASSADOR")) {
      return NextResponse.json({ error: "Unauthorized. Only admins and ambassadors can post to the blog." }, { status: 403 });
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        content,
        category,
        authorId,
      },
    });

    return NextResponse.json({ message: "Blog post published successfully", post }, { status: 201 });
  } catch (err) {
    console.error("Blog Post Create Error:", err);
    return NextResponse.json({ error: "Failed to publish blog post." }, { status: 500 });
  }
}
