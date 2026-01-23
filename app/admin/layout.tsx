import { requireAdmin } from "@/lib/session";
import { AdminShell } from "@/components/admin/shell";
import { ThemeProvider } from "@/components/theme-provider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AdminShell user={session.user} impersonator={session.impersonator}>
        {children}
      </AdminShell>
    </ThemeProvider>
  );
}
