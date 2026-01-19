import { prisma } from "@/lib/db";
import { Markdown } from "@/components/content/markdown";
import { notFound } from "next/navigation";

export default async function DynamicDashboardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const page = await prisma.page.findUnique({
    where: {
      type_slug: {
        type: "DASHBOARD",
        slug,
      },
    },
  });

  if (!page || !page.published) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{page.title}</h1>
        <p className="text-muted-foreground">Custom dashboard page</p>
      </div>

      <div className="rounded-lg border bg-background p-6">
        <Markdown content={page.contentMd} />
      </div>
    </div>
  );
}
