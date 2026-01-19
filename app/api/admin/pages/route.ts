import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { pageUpsertSchema, pageTypeSchema } from "@/lib/validations/pages";

export async function GET(req: NextRequest) {
  await requireAdmin();

  const { searchParams } = new URL(req.url);
  const typeParam = searchParams.get("type");
  const type = typeParam ? pageTypeSchema.parse(typeParam) : undefined;

  const pages = await prisma.page.findMany({
    where: type ? { type } : undefined,
    orderBy: [{ type: "asc" }, { slug: "asc" }],
  });

  return NextResponse.json(pages);
}

export async function POST(req: NextRequest) {
  await requireAdmin();

  try {
    const body = await req.json();
    const input = pageUpsertSchema.parse(body);

    const created = await prisma.page.create({
      data: input,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error?.message || "Failed to create page" },
      { status: 500 }
    );
  }
}
