import { requireAuth } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();

  return (
    <DashboardShell user={session.user} impersonator={session.impersonator}>
      {children}
    </DashboardShell>
  );
}
