import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/db";
import BillingContent from "./billing-content";

export default async function BillingPage() {
  const session = await requireAuth();

  // Fetch user's invoices
  const invoices = await prisma.invoice.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  return <BillingContent invoices={invoices} />;
}
