import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { requestId, contributorId, content } = await req.json();

    const contribution = await prisma.contribution.create({
      data: {
        requestId,
        contributorId,
        content,
      },
    });

    // Award points to contributor
    await prisma.user.update({
      where: { id: contributorId },
      data: {
        points: { increment: 50 }, // 50 points for contributing
      },
    });

    return NextResponse.json({ message: "Contribution recorded successfully", contribution }, { status: 201 });
  } catch (err) {
    console.error("Contribution Create Error:", err);
    return NextResponse.json({ error: "Failed to record contribution." }, { status: 500 });
  }
}
