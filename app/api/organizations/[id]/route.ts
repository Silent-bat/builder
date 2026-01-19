import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateOrgSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const body = await req.json();
    const validated = updateOrgSchema.parse(body);

    // Check if user is owner or admin
    const member = await prisma.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId: id,
          userId: session.user.id,
        },
      },
    });

    if (!member || !["OWNER", "ADMIN"].includes(member.role)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const organization = await prisma.organization.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json({
      success: true,
      organization,
    });
  } catch (error) {
    console.error("Error updating organization:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update organization" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;

    // Check if user is owner
    const organization = await prisma.organization.findUnique({
      where: { id },
    });

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    if (organization.ownerId !== session.user.id) {
      return NextResponse.json(
        { error: "Only the owner can delete the organization" },
        { status: 403 }
      );
    }

    await prisma.organization.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting organization:", error);
    return NextResponse.json(
      { error: "Failed to delete organization" },
      { status: 500 }
    );
  }
}
