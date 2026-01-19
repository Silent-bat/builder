import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { hash } from "bcryptjs";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const validated = createUserSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Generate user ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Hash password
    const hashedPassword = await hash(validated.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        id: userId,
        name: validated.name,
        email: validated.email,
        emailVerified: true,
        role: validated.role,
      },
    });

    // Create account with password
    await prisma.account.create({
      data: {
        id: `account_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        userId: user.id,
        accountId: user.id,
        providerId: "credential",
        accessToken: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
