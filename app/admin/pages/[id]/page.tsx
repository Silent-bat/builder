import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PageEditorClient } from "@/components/admin/page-editor-client";

export default async function AdminPageEditor({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();

  const { id } = await params;

  const page = await prisma.page.findUnique({
    where: { id },
    include: {
      components: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!page) notFound();

  return <PageEditorClient page={page} />;
}
