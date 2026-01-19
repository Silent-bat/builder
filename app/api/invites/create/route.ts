import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/db";
import { z } from "zod";
import crypto from "crypto";

const createInviteSchema = z.object({
  email: z.string().email("Invalid email address"),
  organizationId: z.string().optional(),
  teamId: z.string().optional(),
  role: z.string().default("MEMBER"),
});

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await req.json();
    const validated = createInviteSchema.parse(body);

    if (!validated.organizationId && !validated.teamId) {
      return NextResponse.json(
        { error: "Either organizationId or teamId is required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    // If inviting to organization, check permissions
    if (validated.organizationId) {
      const member = await prisma.organizationMember.findUnique({
        where: {
          organizationId_userId: {
            organizationId: validated.organizationId,
            userId: session.user.id,
          },
        },
      });

      if (!member || !["OWNER", "ADMIN"].includes(member.role)) {
        return NextResponse.json(
          { error: "Unauthorized to invite to this organization" },
          { status: 403 }
        );
      }
    }

    // If inviting to team, check permissions
    if (validated.teamId) {
      const teamMember = await prisma.teamMember.findUnique({
        where: {
          teamId_userId: {
            teamId: validated.teamId,
            userId: session.user.id,
          },
        },
      });

      if (!teamMember || !["OWNER", "ADMIN"].includes(teamMember.role)) {
        return NextResponse.json(
          { error: "Unauthorized to invite to this team" },
          { status: 403 }
        );
      }
    }

    // Generate unique token
    const token = crypto.randomBytes(32).toString("hex");

    // Create invite (expires in 7 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const invite = await prisma.invite.create({
      data: {
        email: validated.email,
        token,
        organizationId: validated.organizationId,
        teamId: validated.teamId,
        role: validated.role,
        invitedById: session.user.id,
        expiresAt,
        status: "PENDING",
      },
      include: {
        organization: true,
        team: true,
        invitedBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Generate invite URL
    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/invite/${token}`;

    return NextResponse.json({
      success: true,
      invite,
      inviteUrl,
      existingUser: !!existingUser,
    });
  } catch (error) {
    console.error("Error creating invite:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create invite" },
      { status: 500 }
    );
  }
}
