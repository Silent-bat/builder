import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createTeamSchema = z.object({
  name: z.string().min(1, "Name is required"),
  organizationId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await req.json();
    const validated = createTeamSchema.parse(body);

    // Check if user is member of organization
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
        { error: "Unauthorized to create teams in this organization" },
        { status: 403 }
      );
    }

    // Create team
    const team = await prisma.team.create({
      data: {
        name: validated.name,
        organizationId: validated.organizationId,
      },
    });

    // Add creator as team owner
    await prisma.teamMember.create({
      data: {
        teamId: team.id,
        userId: session.user.id,
        role: "OWNER",
        status: "ACTIVE",
      },
    });

    return NextResponse.json({
      success: true,
      team,
    });
  } catch (error) {
    console.error("Error creating team:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 }
    );
  }
}
