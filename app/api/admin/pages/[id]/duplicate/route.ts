import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id: pageId } = await params;

    // Get the original page with all its components
    const originalPage = await prisma.page.findUnique({
      where: { id: pageId },
      include: {
        components: true,
      },
    });

    if (!originalPage) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    // Create a new slug by appending "-copy" and a timestamp
    const newSlug = `${originalPage.slug}-copy-${Date.now()}`;

    // Create the duplicated page
    const newPage = await prisma.page.create({
      data: {
        title: `${originalPage.title} (Copy)`,
        slug: newSlug,
        type: originalPage.type,
        published: false, // Always start as draft
        components: {
          create: originalPage.components.map((component) => ({
            type: component.type,
            props: component.props as any,
            order: component.order,
          })),
        },
      },
      include: {
        components: true,
      },
    });

    return NextResponse.json(newPage);
  } catch (error: any) {
    console.error("Error duplicating page:", error);
    return NextResponse.json(
      { error: "Failed to duplicate page", details: error.message },
      { status: 500 }
    );
  }
}
