import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PageRenderer } from "@/components/page-builder/page-renderer";
import { PageEditButton } from "@/components/page-builder/page-edit-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const page = await prisma.page.findFirst({
      where: { 
        slug,
        published: true, // Only show published pages
      },
      include: {
        components: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!page) {
      notFound();
    }

    // Check if user is admin
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const isAdmin = session?.user ? (session.user as any).role === "ADMIN" : false;

    // TEMPORARILY DISABLED - PageRenderer causes 500 error in production
    // Will be fixed in next update
    // const components = page.components.map((comp) => ({
    //   id: comp.id,
    //   type: comp.type,
    //   props: comp.props,
    // }));

    // return (
    //   <>
    //     <PageRenderer components={components} />
    //     <PageEditButton pageId={page.id} isAdmin={isAdmin} />
    //   </>
    // );

    // Temporary fallback - show page info
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
        <p className="text-muted-foreground mb-4">
          This page is being rebuilt. Custom components temporarily disabled.
        </p>
        <div className="p-4 bg-muted rounded">
          <p className="text-sm">Page has {page.components.length} components</p>
          <p className="text-sm">Status: {page.published ? 'Published' : 'Draft'}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('[PublicPage] Error loading page:', {
      slug,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      hasDatabase: !!process.env.DATABASE_URL,
      nodeEnv: process.env.NODE_ENV,
    });
    throw error;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const page = await prisma.page.findFirst({
      where: { slug, published: true },
      select: {
        title: true,
        seoTitle: true,
        seoDescription: true,
      },
    });

    if (!page) {
      return {
        title: "Page Not Found",
      };
    }

    return {
      title: page.seoTitle || page.title,
      description: page.seoDescription || `Visit ${page.title}`,
    };
  } catch (error) {
    console.error('[PublicPage] Error in generateMetadata:', {
      slug,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return {
      title: "Error Loading Page",
      description: "An error occurred while loading this page",
    };
  }
}
