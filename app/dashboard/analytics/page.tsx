import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/db";
import { AnalyticsCharts } from "@/components/dashboard/analytics-charts";

export default async function AnalyticsPage() {
  await requireAuth();

  // Fetch real analytics data from database
  const totalUsers = await prisma.user.count();
  const recentUsersCount = await prisma.user.count({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
      },
    },
  });

  // Get user growth data for the last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const users = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // Get project stats
  const totalProjects = await prisma.project.count();
  const activeProjects = await prisma.project.count({
    where: { status: 'ACTIVE' },
  });

  // Get organization stats
  const totalOrganizations = await prisma.organization.count();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your performance and insights</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">All registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">New Users (7d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{recentUsersCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Users in last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">{totalProjects} total projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalOrganizations}</div>
            <p className="text-xs text-muted-foreground mt-1">Active organizations</p>
          </CardContent>
        </Card>
      </div>

      <AnalyticsCharts users={users} />
    </div>
  );
}
