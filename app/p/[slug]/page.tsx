import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PageRenderer } from "@/components/page-builder/page-renderer";
import { PageEditButton } from "@/components/page-builder/page-edit-button";

export const dynamic = 'force-dynamic';

interface PreviewPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  // Require admin authentication
  const session = await requireAdmin();
  
  const { slug } = await params;

  // Find the page by slug (including unpublished pages)
  const page = await prisma.page.findFirst({
    where: {
      slug: slug,
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

  const components = page.components.map((comp) => ({
    id: comp.id,
    type: comp.type,
    props: comp.props,
  }));

  return (
    <>
      {/* Preview Banner */}
      <div className="sticky top-0 z-50 bg-yellow-500 text-black px-4 py-2 text-center font-medium shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span>
            🔒 PREVIEW MODE - Admin Only
          </span>
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Status: {page.published ? "✅ Published" : "⚠️ Draft"}
            </span>
            <a 
              href={`/admin/pages/${page.id}`}
              className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition-colors"
            >
              Edit Page
            </a>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <PageRenderer components={components} />
      
      {/* Edit Button */}
      <PageEditButton pageId={page.id} isAdmin={true} />
    </>
  );
}
