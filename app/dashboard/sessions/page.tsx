import { requireAuth } from "@/lib/session";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";

export default async function SessionsPage() {
  const session = await requireAuth();

  // Get all sessions for the current user
  const sessions = await prisma.session.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const currentSessionToken = session.session.token;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Active Sessions</h1>
        <p className="text-muted-foreground">Manage your active login sessions across devices</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Sessions</CardTitle>
          <CardDescription>
            You are currently signed in on {sessions.length} {sessions.length === 1 ? "device" : "devices"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((s) => {
              const isCurrent = s.token === currentSessionToken;
              const expiresAt = new Date(s.expiresAt);
              const isExpired = expiresAt < new Date();

              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {s.userAgent?.includes("Mobile") ? "📱 Mobile Device" : "💻 Desktop"}
                      </p>
                      {isCurrent && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                      {isExpired && (
                        <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded-full">
                          Expired
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {s.ipAddress || "Unknown location"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Created: {new Date(s.createdAt).toLocaleDateString()} • 
                      Expires: {expiresAt.toLocaleDateString()}
                    </p>
                  </div>
                  {!isCurrent && !isExpired && (
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  )}
                </div>
              );
            })}
            {sessions.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No active sessions found
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Always sign out when using public or shared computers</li>
            <li>• Review your active sessions regularly</li>
            <li>• Revoke any sessions you don't recognize</li>
            <li>• Enable two-factor authentication for extra security</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
