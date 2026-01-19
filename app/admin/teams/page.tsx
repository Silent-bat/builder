import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { TeamsClient } from "@/components/admin/teams-client";

export default async function AdminTeamsPage() {
  await requireAdmin();

  const teams = await prisma.team.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      organization: {
        select: {
          name: true,
          slug: true,
        },
      },
      _count: {
        select: {
          members: true,
        },
      },
    },
  });

  const organizations = await prisma.organization.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  return <TeamsClient teams={teams} organizations={organizations} />;
}
