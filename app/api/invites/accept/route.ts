import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { hash } from "bcryptjs";

const acceptInviteSchema = z.object({
  token: z.string(),
  name: z.string().min(1, "Name is required").optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  userId: z.string().optional(), // For existing users
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = acceptInviteSchema.parse(body);

    // Get invite
    const invite = await prisma.invite.findUnique({
      where: { token: validated.token },
      include: {
        organization: true,
        team: true,
      },
    });

    if (!invite) {
      return NextResponse.json(
        { error: "Invite not found" },
        { status: 404 }
      );
    }

    if (invite.status !== "PENDING") {
      return NextResponse.json(
        { error: "Invite already used or expired" },
        { status: 400 }
      );
    }

    if (new Date() > invite.expiresAt) {
      await prisma.invite.update({
        where: { id: invite.id },
        data: { status: "EXPIRED" },
      });

      return NextResponse.json(
        { error: "Invite has expired" },
        { status: 400 }
      );
    }

    let userId = validated.userId;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: invite.email },
    });

    // If user doesn't exist, create new user
    if (!existingUser) {
      if (!validated.name || !validated.password) {
        return NextResponse.json(
          { error: "Name and password are required for new users" },
          { status: 400 }
        );
      }

      const newUserId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      const hashedPassword = await hash(validated.password, 10);

      const newUser = await prisma.user.create({
        data: {
          id: newUserId,
          name: validated.name,
          email: invite.email,
          emailVerified: true,
          role: "USER",
        },
      });

      // Create account with password
      await prisma.account.create({
        data: {
          id: `account_${Date.now()}_${Math.random().toString(36).substring(7)}`,
          userId: newUser.id,
          accountId: newUser.id,
          providerId: "credential",
          accessToken: hashedPassword,
        },
      });

      userId = newUser.id;
    } else {
      userId = existingUser.id;
    }

    // Add user to organization or team
    if (invite.organizationId) {
      // Check if already a member
      const existingMember = await prisma.organizationMember.findUnique({
        where: {
          organizationId_userId: {
            organizationId: invite.organizationId,
            userId: userId!,
          },
        },
      });

      if (!existingMember) {
        await prisma.organizationMember.create({
          data: {
            organizationId: invite.organizationId,
            userId: userId!,
            role: invite.role as "OWNER" | "ADMIN" | "MEMBER",
            status: "ACTIVE",
          },
        });
      }
    }

    if (invite.teamId) {
      // Check if already a member
      const existingMember = await prisma.teamMember.findUnique({
        where: {
          teamId_userId: {
            teamId: invite.teamId,
            userId: userId!,
          },
        },
      });

      if (!existingMember) {
        await prisma.teamMember.create({
          data: {
            teamId: invite.teamId,
            userId: userId!,
            role: invite.role as "OWNER" | "ADMIN" | "MEMBER",
            status: "ACTIVE",
          },
        });
      }
    }

    // Mark invite as accepted
    await prisma.invite.update({
      where: { id: invite.id },
      data: {
        status: "ACCEPTED",
        acceptedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Invite accepted successfully",
      isNewUser: !existingUser,
      redirectTo: invite.organizationId 
        ? `/dashboard?orgId=${invite.organizationId}` 
        : "/dashboard",
    });
  } catch (error) {
    console.error("Error accepting invite:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to accept invite" },
      { status: 500 }
    );
  }
}
