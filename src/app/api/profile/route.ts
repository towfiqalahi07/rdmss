import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const { userId, bio, skills, interests } = await req.json();

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        bio,
        skills,
        interests,
      },
    });

    return NextResponse.json({ message: "Profile updated successfully", user }, { status: 200 });
  } catch (err) {
    console.error("Profile Update Error:", err);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}
