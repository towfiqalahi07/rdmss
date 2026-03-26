export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { eventId, userId } = await req.json();

    const rsvp = await prisma.eventRSVP.create({
      data: {
        eventId,
        userId,
      },
    });

    return NextResponse.json({ message: "RSVP successful", rsvp }, { status: 201 });
  } catch (err) {
    console.error("RSVP Error:", err);
    return NextResponse.json({ error: "Failed to RSVP." }, { status: 500 });
  }
}
