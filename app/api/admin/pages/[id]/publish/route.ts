import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const page = await prisma.page.update({
      where: { id },
      data: { published: true },
    });

    return NextResponse.json({
      success: true,
      page,
    });
  } catch (error) {
    console.error("Error publishing page:", error);
    return NextResponse.json(
      { error: "Failed to publish page" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const page = await prisma.page.update({
      where: { id },
      data: { published: false },
    });

    return NextResponse.json({
      success: true,
      page,
    });
  } catch (error) {
    console.error("Error unpublishing page:", error);
    return NextResponse.json(
      { error: "Failed to unpublish page" },
      { status: 500 }
    );
  }
}
