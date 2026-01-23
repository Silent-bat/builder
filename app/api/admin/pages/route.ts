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

    // Extract components from input
    const { components, ...pageData } = input;

    // Create page with components in a transaction
    const created = await prisma.$transaction(async (tx) => {
      const page = await tx.page.create({
        data: pageData,
      });

      // Create components if provided
      if (components && components.length > 0) {
        await tx.pageComponent.createMany({
          data: components.map((comp) => ({
            pageId: page.id,
            type: comp.type,
            order: comp.order,
            props: comp.props as any,
          })),
        });
      }

      // Return page with components
      return await tx.page.findUnique({
        where: { id: page.id },
        include: { components: true },
      });
    });

    return NextResponse.json({ page: created }, { status: 201 });
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
