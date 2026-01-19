import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { OrganizationsClient } from "@/components/admin/organizations-client";

export default async function AdminOrganizationsPage() {
  await requireAdmin();

  const organizations = await prisma.organization.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      owner: {
        select: {
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          members: true,
          teams: true,
        },
      },
    },
  });

  return <OrganizationsClient organizations={organizations} />;
}
