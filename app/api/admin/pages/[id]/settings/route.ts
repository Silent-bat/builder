import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    
    const { id: pageId } = await params;
    
    const page = await prisma.page.findUnique({
      where: { id: pageId },
      select: {
        id: true,
        title: true,
        slug: true,
        type: true,
        published: true,
        seoTitle: true,
        seoDescription: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            components: true
          }
        }
      }
    });

    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    // Get current LANDING page info
    const currentLandingPage = await prisma.page.findFirst({
      where: { type: "LANDING" },
      select: { id: true, title: true, slug: true }
    });

    return NextResponse.json({
      page,
      currentLandingPage,
      canBeLanding: page.published, // Only published pages can be LANDING
      isCurrentLanding: page.type === "LANDING"
    });

  } catch (error) {
    console.error("[Page Settings] Error:", error);
    return NextResponse.json(
      { error: "Failed to get page settings" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    
    const { id: pageId } = await params;
    const { seoTitle, seoDescription, published } = await request.json();

    const updatedPage = await prisma.page.update({
      where: { id: pageId },
      data: {
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        published: published
      }
    });

    return NextResponse.json({
      success: true,
      page: updatedPage
    });

  } catch (error) {
    console.error("[Page Settings Update] Error:", error);
    return NextResponse.json(
      { error: "Failed to update page settings" },
      { status: 500 }
    );
  }
}