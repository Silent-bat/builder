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

    // Render custom page with error handling
    try {
      const components = page.components.map((comp) => ({
        id: comp.id,
        type: comp.type,
        props: comp.props,
      }));

      return (
        <>
          <PageRenderer components={components} />
          <PageEditButton pageId={page.id} isAdmin={isAdmin} />
        </>
      );
    } catch (renderError) {
      console.error(`[PublicPage] PageRenderer error for page ${page.slug}:`, renderError);
      
      // Fallback to simple page display if PageRenderer fails
      return (
        <div className="min-h-screen p-8">
          <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
          <p className="text-muted-foreground mb-4">
            This page encountered a rendering error. Showing fallback content.
          </p>
          <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
            <p className="text-sm font-medium">Technical Details:</p>
            <p className="text-sm">Page has {page.components.length} components</p>
            <p className="text-sm">Status: {page.published ? 'Published' : 'Draft'}</p>
            <p className="text-sm">Error: Component rendering failed</p>
          </div>
          {isAdmin && (
            <div className="mt-4">
              <PageEditButton pageId={page.id} isAdmin={true} />
            </div>
          )}
        </div>
      );
    }
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
