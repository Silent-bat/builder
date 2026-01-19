import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import { AdminUsersClient } from "@/components/admin/admin-users-client";

export default async function AdminUsersPage() {
  const session = await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <AdminUsersClient 
      users={users} 
      currentUserId={session.user.id}
      currentUserEmail={session.user.email}
      currentUserRole={session.user.role}
    />
  );
}
