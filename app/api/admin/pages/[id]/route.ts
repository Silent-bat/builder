import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { pageUpdateSchema } from "@/lib/validations/pages";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const params = await context.params;
  const page = await prisma.page.findUnique({ where: { id: params.id } });
  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(page);
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const params = await context.params;

  try {
    const body = await req.json();
    const input = pageUpdateSchema.parse(body);

    const updated = await prisma.page.update({
      where: { id: params.id },
      data: input,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (error?.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error?.message || "Failed to update page" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const params = await context.params;

  try {
    await prisma.page.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: error?.message || "Failed to delete page" },
      { status: 500 }
    );
  }
}
