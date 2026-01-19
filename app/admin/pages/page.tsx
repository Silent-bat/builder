import Link from "next/link";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PagesManagementClient } from "@/components/admin/pages-management-client";

export default async function AdminPagesIndex() {
  await requireAdmin();

  const pages = await prisma.page.findMany({
    orderBy: [{ type: "asc" }, { slug: "asc" }],
    include: {
      _count: {
        select: {
          components: true
        }
      }
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Pages</h1>
          <p className="text-muted-foreground">Create and edit landing and dashboard pages</p>
        </div>
        <Link href="/admin/pages/new">
          <Button>Create Page</Button>
        </Link>
      </div>

      <PagesManagementClient pages={pages} />
    </div>
  );
}
