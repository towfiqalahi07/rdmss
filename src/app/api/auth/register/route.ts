import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { login } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      email,
      password,
      name,
      college,
      session,
      district,
      skills,
      interests,
      goals,
      contact
    } = data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a simple username from email if not provided
    const username = email.split('@')[0] + Math.floor(Math.random() * 1000);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name,
        college,
        session,
        district,
        skills: Array.isArray(skills) ? skills.join(", ") : (skills || ""),
        interests: Array.isArray(interests) ? interests.join(", ") : (interests || ""),
        goals: Array.isArray(goals) ? goals.join(", ") : (goals || ""),
        contact: contact || "",
        status: "PENDING", // All new members are pending approval
        role: "STUDENT",
      },
    });

    // Automatically log the user in after registration
    await login({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
    });

    return NextResponse.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
