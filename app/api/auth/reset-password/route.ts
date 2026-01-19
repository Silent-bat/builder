import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Find verification record
    const verification = await prisma.verification.findFirst({
      where: {
        value: token,
        identifier: "password-reset",
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!verification || !verification.userId) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password in account table
    await prisma.account.updateMany({
      where: {
        userId: verification.userId,
        providerId: "credential",
      },
      data: {
        password: hashedPassword,
      },
    });

    // Delete used reset token
    await prisma.verification.delete({
      where: { id: verification.id },
    });

    // Delete all other sessions for this user (force re-login)
    await prisma.session.deleteMany({
      where: { userId: verification.userId },
    });

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
