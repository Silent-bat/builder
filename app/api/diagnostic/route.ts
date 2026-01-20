import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    checks: {} as Record<string, any>,
  };

  // Check environment variables (without exposing values)
  diagnostics.checks.envVars = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: !!process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: !!process.env.BETTER_AUTH_URL,
    NEXT_PUBLIC_BETTER_AUTH_URL: !!process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    BETTER_AUTH_URL_value: process.env.BETTER_AUTH_URL?.includes('localhost') 
      ? 'CONTAINS_LOCALHOST' 
      : process.env.BETTER_AUTH_URL ? 'OK' : 'MISSING',
    NEXT_PUBLIC_BETTER_AUTH_URL_value: process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.includes('localhost')
      ? 'CONTAINS_LOCALHOST'
      : process.env.NEXT_PUBLIC_BETTER_AUTH_URL ? 'OK' : 'MISSING',
  };

  // Check database connection
  try {
    await prisma.$connect();
    diagnostics.checks.database = {
      status: "connected",
      error: null,
    };

    // Check if tables exist
    try {
      const userCount = await prisma.user.count();
      const pageCount = await prisma.page.count();
      const publishedPages = await prisma.page.count({ where: { published: true } });

      diagnostics.checks.database.tables = {
        users: userCount,
        pages: pageCount,
        publishedPages: publishedPages,
      };

      // Get published page slugs
      const pages = await prisma.page.findMany({
        where: { published: true },
        select: { slug: true, title: true },
      });
      diagnostics.checks.database.publishedPagesList = pages;

    } catch (error) {
      diagnostics.checks.database.tablesError = error instanceof Error ? error.message : "Unknown error";
    }

  } catch (error) {
    diagnostics.checks.database = {
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
      code: (error as any)?.code,
    };
  } finally {
    await prisma.$disconnect();
  }

  // Check auth configuration
  diagnostics.checks.auth = {
    betterAuthConfigured: true,
    baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "NOT_SET",
  };

  return NextResponse.json(diagnostics, { status: 200 });
}
