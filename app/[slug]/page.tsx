import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageRenderer } from "@/components/page-builder/page-renderer";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const page = await prisma.page.findFirst({
      where: { 
        slug, 
        published: true,
        type: "NORMAL" // Only show NORMAL pages at /[slug] routes
      },
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
    console.error('[Slug Page] Error in generateMetadata:', {
      slug,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return {
      title: "Error Loading Page",
      description: "An error occurred while loading this page",
    };
  }
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    // Find NORMAL type page with this slug
    const page = await prisma.page.findFirst({
      where: { 
        slug,
        published: true,
        type: "NORMAL" // Only NORMAL pages accessible via /[slug]
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

    // Render public page (no auth check for public pages)
    try {
      const components = page.components.map((comp) => ({
        id: comp.id,
        type: comp.type,
        props: comp.props,
      }));

      return <PageRenderer components={components} />;
    } catch (renderError) {
      console.error(`[Slug Page] PageRenderer error for /${slug}:`, renderError);
      
      // Fallback to simple page display if PageRenderer fails
      return (
        <div className="min-h-screen p-8">
          <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
          <p className="text-muted-foreground mb-4">
            This page encountered a rendering error.
          </p>
          <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
            <p className="text-sm">Error loading page components.</p>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error(`[Slug Page] Error loading /${slug}:`, error);
    throw error;
  }
}

// Generate static params for published NORMAL pages
export async function generateStaticParams() {
  try {
    const pages = await prisma.page.findMany({
      where: {
        published: true,
        type: "NORMAL",
      },
      select: {
        slug: true,
      },
    });

    return pages.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error('[Slug Page] Error generating static params:', error);
    return [];
  }
}