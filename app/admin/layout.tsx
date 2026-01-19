import { requireAdmin } from "@/lib/session";
import { AdminShell } from "@/components/admin/shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <AdminShell user={session.user} impersonator={session.impersonator}>
      {children}
    </AdminShell>
  );
}
