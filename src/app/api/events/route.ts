export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, description, date, location, authorId } = await req.json();

    // Check if user is Admin or Ambassador
    const user = await prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!user || (user.role !== "ADMIN" && user.role !== "AMBASSADOR")) {
      return NextResponse.json({ error: "Unauthorized. Only admins and ambassadors can create events." }, { status: 403 });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        authorId,
      },
    });

    return NextResponse.json({ message: "Event created successfully", event }, { status: 201 });
  } catch (err) {
    console.error("Event Create Error:", err);
    return NextResponse.json({ error: "Failed to create event." }, { status: 500 });
  }
}
