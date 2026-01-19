import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail, emailTemplates } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find user (don't reveal if user exists or not for security)
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // Generate reset token
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Delete any existing password reset tokens for this user
      // Note: userId is optional in schema, so we filter by identifier only
      const existingTokens = await prisma.verification.findMany({
        where: {
          identifier: "password-reset",
        },
      });
      
      // Delete tokens that match this user
      for (const token of existingTokens) {
        if (token.userId === user.id) {
          await prisma.verification.delete({
            where: { id: token.id },
          });
        }
      }

      // Create verification record
      await prisma.verification.create({
        data: {
          id: crypto.randomUUID(),
          identifier: "password-reset",
          value: token,
          expiresAt,
          userId: user.id,
        },
      });

      // Send reset email
      const resetLink = `${process.env.BETTER_AUTH_URL}/auth/reset-password?token=${token}`;
      
      await sendEmail({
        to: user.email,
        ...emailTemplates.passwordReset(resetLink),
      });
    }

    // Always return success (don't reveal if user exists)
    return NextResponse.json({
      success: true,
      message: "If an account exists, a reset link has been sent",
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
