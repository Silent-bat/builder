import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail, emailTemplates } from "@/lib/email";
import { auth } from "@/lib/auth";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if already verified
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (user?.emailVerified) {
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 }
      );
    }

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create verification record
    await prisma.verification.create({
      data: {
        id: crypto.randomUUID(),
        identifier: "email-verification",
        value: token,
        expiresAt,
        userId: session.user.id,
      },
    });

    // Send verification email
    const verificationLink = `${process.env.BETTER_AUTH_URL}/auth/verify-email?token=${token}`;
    
    await sendEmail({
      to: session.user.email!,
      ...emailTemplates.emailVerification(verificationLink),
    });

    return NextResponse.json({
      success: true,
      message: "Verification email sent",
    });
  } catch (error: any) {
    console.error("Send verification error:", error);
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 }
    );
  }
}
