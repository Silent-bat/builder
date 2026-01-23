import { requireAuth } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/shell";
import { ThemeProvider } from "@/components/theme-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DashboardShell user={session.user} impersonator={session.impersonator}>
        {children}
      </DashboardShell>
    </ThemeProvider>
  );
}
