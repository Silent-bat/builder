import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@example.com" }
    });

    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message: "Admin already exists!",
        credentials: {
          email: "admin@example.com",
          password: "Use your existing password (Admin123! if you used our setup)",
          note: "Admin user already registered",
        },
      });
    }

    // Return instructions to create admin manually
    return NextResponse.json({
      success: false,
      message: "Please sign up manually to create admin account",
      instructions: {
        step1: "Go to http://localhost:3000/auth/sign-up",
        step2: "Use email: admin@example.com",
        step3: "Choose a secure password (e.g., Admin123!)",
        step4: "The account will be created with user permissions",
        step5: "Update role to ADMIN in database if needed",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to check admin", details: error.message },
      { status: 500 }
    );
  }
}
