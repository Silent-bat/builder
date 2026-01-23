import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PageSettingsClient } from "@/components/admin/page-settings-client";

export default async function PageSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();

  const { id } = await params;

  const page = await prisma.page.findUnique({
    where: { id },
  });

  if (!page) notFound();

  // Check if there's another landing page
  const currentLandingPage = await prisma.page.findFirst({
    where: {
      type: "LANDING",
      published: true,
    },
  });

  return <PageSettingsClient page={page} currentLandingPage={currentLandingPage} />;
}
