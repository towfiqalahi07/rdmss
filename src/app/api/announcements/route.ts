import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, content, authorId } = await req.json();

    // Check if user is Admin
    const user = await prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Only admins can post announcements." }, { status: 403 });
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return NextResponse.json({ message: "Announcement posted successfully", announcement }, { status: 201 });
  } catch (err) {
    console.error("Announcement Create Error:", err);
    return NextResponse.json({ error: "Failed to post announcement." }, { status: 500 });
  }
}
