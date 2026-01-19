import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/db";

export default async function SupportPage() {
  const session = await requireAuth();

  // Fetch user's support tickets
  const tickets = await prisma.supportTicket.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Support</h1>
        <p className="text-muted-foreground">Get help when you need it</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Email Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get help via email. We typically respond within 24 hours.
            </p>
            <Button className="w-full">Send Email</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Live Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Chat with our support team in real-time.
            </p>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Browse our comprehensive documentation and guides.
            </p>
            <Button variant="outline" className="w-full">View Docs</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit a Ticket</CardTitle>
          <CardDescription>Describe your issue and we'll help you resolve it</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Brief description of your issue" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select 
              id="category" 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              <option>Technical Issue</option>
              <option>Billing Question</option>
              <option>Feature Request</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea 
              id="message"
              className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              placeholder="Describe your issue in detail..."
            />
          </div>
          <Button>Submit Ticket</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Tickets</CardTitle>
          <CardDescription>Your support ticket history</CardDescription>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No support tickets yet. Create a ticket above to get help with any issues.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">#{ticket.id.slice(0, 8)} - {ticket.subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(ticket.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-700' :
                      ticket.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                      ticket.status === 'CLOSED' ? 'bg-gray-100 text-gray-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ticket.priority === 'URGENT' ? 'bg-red-100 text-red-700' :
                      ticket.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                      ticket.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {ticket.priority}
                    </span>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
          <CardDescription>Frequently asked questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="font-medium mb-2">How do I reset my password?</p>
              <p className="text-sm text-muted-foreground">
                Go to Settings and click on "Change Password" to update your password.
              </p>
            </div>
            <div className="border-b pb-4">
              <p className="font-medium mb-2">How do I upgrade my plan?</p>
              <p className="text-sm text-muted-foreground">
                Visit the Billing page to view available plans and upgrade your subscription.
              </p>
            </div>
            <div className="border-b pb-4">
              <p className="font-medium mb-2">Can I cancel anytime?</p>
              <p className="text-sm text-muted-foreground">
                Yes, you can cancel your subscription at any time from the Billing page.
              </p>
            </div>
            <div className="pb-4">
              <p className="font-medium mb-2">How do I contact support?</p>
              <p className="text-sm text-muted-foreground">
                Create a support ticket above or email us at support@example.com for assistance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
