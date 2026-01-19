import { requireAdmin } from "@/lib/session";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function AdminPage() {
  const session = await requireAdmin();

  // Fetch some admin stats
  const stats = await prisma.user.groupBy({
    by: ["role"],
    _count: true,
  });

  const totalUsers = stats.reduce((acc, curr) => acc + curr._count, 0);
  const adminCount = stats.find((s) => s.role === "ADMIN")?._count || 0;
  const userCount = stats.find((s) => s.role === "USER")?._count || 0;

  const recentUsers = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your application and users
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
              <CardDescription>All registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{totalUsers}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regular Users</CardTitle>
              <CardDescription>Users with standard access</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{userCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Administrators</CardTitle>
              <CardDescription>Users with admin privileges</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{adminCount}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest user registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No users yet</p>
              ) : (
                <div className="space-y-3">
                  {recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{user.name || "No name"}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            user.role === "ADMIN"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {user.role}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Admin Tools</CardTitle>
              <CardDescription>Manage your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">User Management</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    View, edit, and manage user accounts and permissions
                  </p>
                  <p className="text-xs text-muted-foreground">Coming soon...</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Settings</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Configure application settings and preferences
                  </p>
                  <p className="text-xs text-muted-foreground">Coming soon...</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Analytics</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    View detailed analytics and user insights
                  </p>
                  <p className="text-xs text-muted-foreground">Coming soon...</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Logs</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Review system logs and audit trails
                  </p>
                  <p className="text-xs text-muted-foreground">Coming soon...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
