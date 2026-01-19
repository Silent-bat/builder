import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createOrgSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await req.json();
    const validated = createOrgSchema.parse(body);

    // Check if slug is already taken
    const existing = await prisma.organization.findUnique({
      where: { slug: validated.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Slug already in use" },
        { status: 400 }
      );
    }

    // Create organization
    const organization = await prisma.organization.create({
      data: {
        name: validated.name,
        slug: validated.slug,
        description: validated.description,
        ownerId: session.user.id,
      },
    });

    // Add creator as owner member
    await prisma.organizationMember.create({
      data: {
        organizationId: organization.id,
        userId: session.user.id,
        role: "OWNER",
        status: "ACTIVE",
      },
    });

    return NextResponse.json({
      success: true,
      organization,
    });
  } catch (error) {
    console.error("Error creating organization:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create organization" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth();

    // Get organizations where user is a member
    const organizations = await prisma.organization.findMany({
      where: {
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        _count: {
          select: {
            members: true,
            teams: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ organizations });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return NextResponse.json(
      { error: "Failed to fetch organizations" },
      { status: 500 }
    );
  }
}
