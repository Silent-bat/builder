import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();
    
    const { newType } = await request.json();
    const pageId = params.id;

    if (!["LANDING", "NORMAL", "DASHBOARD"].includes(newType)) {
      return NextResponse.json(
        { error: "Invalid page type" },
        { status: 400 }
      );
    }

    // If setting to LANDING, first convert current LANDING page to NORMAL
    if (newType === "LANDING") {
      const currentLandingPage = await prisma.page.findFirst({
        where: { type: "LANDING" },
        select: { id: true, title: true, slug: true }
      });

      if (currentLandingPage && currentLandingPage.id !== pageId) {
        await prisma.page.update({
          where: { id: currentLandingPage.id },
          data: { type: "NORMAL" }
        });
        console.log(`Converted previous LANDING page "${currentLandingPage.title}" to NORMAL`);
      }
    }

    // Update the target page type
    const updatedPage = await prisma.page.update({
      where: { id: pageId },
      data: { type: newType }
    });

    return NextResponse.json({
      success: true,
      page: updatedPage,
      message: newType === "LANDING" 
        ? `"${updatedPage.title}" is now the homepage (LANDING page)`
        : `Page type updated to ${newType}`
    });

  } catch (error) {
    console.error("[Change Page Type] Error:", error);
    return NextResponse.json(
      { error: "Failed to change page type" },
      { status: 500 }
    );
  }
}