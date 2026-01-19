import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { z } from "zod";

const componentSchema = z.object({
  type: z.string(),
  props: z.record(z.string(), z.any()),
});

const updateComponentsSchema = z.object({
  components: z.array(componentSchema),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const validated = updateComponentsSchema.parse(body);

    // Delete existing components
    await prisma.pageComponent.deleteMany({
      where: { pageId: id },
    });

    // Create new components
    const components = await Promise.all(
      validated.components.map((comp, index) =>
        prisma.pageComponent.create({
          data: {
            pageId: id,
            type: comp.type,
            order: index,
            props: comp.props,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      components,
    });
  } catch (error) {
    console.error("Error updating components:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update components" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const components = await prisma.pageComponent.findMany({
      where: { pageId: id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ components });
  } catch (error) {
    console.error("Error fetching components:", error);
    return NextResponse.json(
      { error: "Failed to fetch components" },
      { status: 500 }
    );
  }
}
