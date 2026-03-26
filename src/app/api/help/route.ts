export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, content, type, authorId } = await req.json();

    const helpRequest = await prisma.helpRequest.create({
      data: {
        title,
        content,
        type,
        authorId,
        status: "OPEN",
      },
    });

    return NextResponse.json({ message: "Help request posted successfully", helpRequest }, { status: 201 });
  } catch (err) {
    console.error("Help Request Create Error:", err);
    return NextResponse.json({ error: "Failed to post help request." }, { status: 500 });
  }
}
