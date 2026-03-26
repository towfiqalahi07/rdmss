export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, username, password, college, session, district } = await req.json();

    // Session validation
    if (session !== "2025-26") {
      return NextResponse.json({ error: "Only 2025-26 session students can join." }, { status: 400 });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (userExists) {
      return NextResponse.json({ error: "User already exists." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        college,
        session,
        district,
        role: "STUDENT",
        profile: {
          create: {
            isPublic: true,
          },
        },
      },
    });

    return NextResponse.json({ message: "Registration successful", user: { id: user.id, username: user.username } }, { status: 201 });
  } catch (err) {
    console.error("Register Error:", err);
    return NextResponse.json({ error: "Failed to create account." }, { status: 500 });
  }
}
