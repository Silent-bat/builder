"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/lib/toast";

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId?: string;
  teamId?: string;
  type: "organization" | "team";
}

export function InviteDialog({ open, onOpenChange, organizationId, teamId, type }: InviteDialogProps) {
  const [loading, setLoading] = useState(false);
  const [inviteMode, setInviteMode] = useState<"email" | "existing">("email");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [inviteUrl, setInviteUrl] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  // Fetch users when switching to existing user mode
  useEffect(() => {
    if (inviteMode === "existing" && open) {
      fetchUsers();
    }
  }, [inviteMode, open]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users/list");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleInviteByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/invites/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          organizationId,
          teamId,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create invite");
      }

      setInviteUrl(data.inviteUrl);
      
      if (data.existingUser) {
        toast.success("Invite sent! User already exists and has been added.");
      } else {
        toast.success("Invite created! Share the link with the new user.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create invite");
    } finally {
      setLoading(false);
    }
  };

  const handleInviteExisting = async () => {
    if (!selectedUserId) {
      toast.error("Please select a user");
      return;
    }

    setLoading(true);

    try {
      // Get user email first
      const user = users.find(u => u.id === selectedUserId);
      if (!user) {
        throw new Error("User not found");
      }

      const res = await fetch("/api/invites/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          organizationId,
          teamId,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to invite user");
      }

      toast.success(`${user.name} has been invited!`);
      setEmail("");
      setSelectedUserId("");
      setInviteUrl("");
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to invite user");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl);
    toast.success("Invite link copied to clipboard!");
  };

  const handleClose = () => {
    setEmail("");
    setInviteUrl("");
    setSelectedUserId("");
    setInviteMode("email");
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Invite to {type === "organization" ? "Organization" : "Team"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Choose how you want to invite members
          </AlertDialogDescription>
        </AlertDialogHeader>

        {!inviteUrl ? (
          <>
            <div className="flex gap-2 mb-4">
              <Button
                type="button"
                variant={inviteMode === "email" ? "default" : "outline"}
                size="sm"
                onClick={() => setInviteMode("email")}
                className="flex-1"
              >
                By Email
              </Button>
              <Button
                type="button"
                variant={inviteMode === "existing" ? "default" : "outline"}
                size="sm"
                onClick={() => setInviteMode("existing")}
                className="flex-1"
              >
                Existing User
              </Button>
            </div>

            {inviteMode === "email" ? (
              <form onSubmit={handleInviteByEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    If the user doesn't exist, they'll be able to create an account
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="MEMBER">Member</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                <AlertDialogFooter>
                  <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Generate Invite Link"}
                  </Button>
                </AlertDialogFooter>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user">Select User</Label>
                  <select
                    id="user"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">Choose a user...</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="existing-role">Role</Label>
                  <select
                    id="existing-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="MEMBER">Member</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                <AlertDialogFooter>
                  <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
                    Cancel
                  </Button>
                  <Button onClick={handleInviteExisting} disabled={loading || !selectedUserId}>
                    {loading ? "Inviting..." : "Invite User"}
                  </Button>
                </AlertDialogFooter>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <Label className="text-xs text-muted-foreground">Invite Link</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input value={inviteUrl} readOnly className="text-sm" />
                <Button size="sm" onClick={copyToClipboard}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">What's next?</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Share this link with the invitee</li>
                <li>Link expires in 7 days</li>
                <li>They'll set up their account if new</li>
              </ul>
            </div>

            <AlertDialogFooter>
              <Button onClick={handleClose}>Done</Button>
            </AlertDialogFooter>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
