import { requireAuth } from "@/lib/session";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await requireAuth();

  return (
    <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {session.user.name || "User"}!</h1>
          <p className="text-muted-foreground">
            Here's your dashboard overview
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">{session.user.name || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{session.user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Role</p>
                  <p className="text-sm text-muted-foreground capitalize">{session.user.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Your activity overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Account Created</span>
                  <span className="text-sm font-medium">
                    {new Date(session.user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Login</span>
                  <span className="text-sm font-medium">Today</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Complete your setup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Account created</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Email verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">○</span>
                  <span className="text-muted-foreground">Complete profile</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Your Dashboard</CardTitle>
              <CardDescription>Start building your application</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This is your personal dashboard. You can customize this page to show your application-specific
                content and features. Add widgets, charts, recent activity, or whatever makes sense for your use case.
              </p>
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm font-medium mb-2">Next Steps:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Customize your profile settings</li>
                  <li>Explore the features available to you</li>
                  <li>Check out the documentation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
