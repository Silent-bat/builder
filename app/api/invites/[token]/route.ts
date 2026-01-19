import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const invite = await prisma.invite.findUnique({
      where: { token },
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

    return NextResponse.json({ invite });
  } catch (error) {
    console.error("Error fetching invite:", error);
    return NextResponse.json(
      { error: "Failed to fetch invite" },
      { status: 500 }
    );
  }
}
