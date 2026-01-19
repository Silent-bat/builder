import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PageRenderer } from "@/components/page-builder/page-renderer";
import { PageEditButton } from "@/components/page-builder/page-edit-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

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
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

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
}
