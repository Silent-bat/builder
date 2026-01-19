"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/lib/toast";

interface Team {
  id: string;
  name: string;
  createdAt: Date;
  organization: {
    name: string;
    slug: string;
  } | null;
  _count: {
    members: number;
  };
}

interface Organization {
  id: string;
  name: string;
  slug: string;
}

interface TeamsClientProps {
  teams: Team[];
  organizations: Organization[];
}

export function TeamsClient({ teams: initialTeams, organizations }: TeamsClientProps) {
  const [teams, setTeams] = useState(initialTeams);
  const [createOpen, setCreateOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organizationId: "",
  });

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create team");
      }

      toast.success("Team created successfully");
      setFormData({ name: "", organizationId: "" });
      setCreateOpen(false);
      
      // Refresh list
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Teams</h1>
            <p className="text-muted-foreground">Manage teams within organizations</p>
          </div>
          <Button onClick={() => setCreateOpen(true)} disabled={organizations.length === 0}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Team
          </Button>
        </div>

        {organizations.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Create an organization first before creating teams
              </p>
              <Button asChild>
                <a href="/admin/organizations">Go to Organizations</a>
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Card key={team.id}>
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
                <CardDescription>
                  {team.organization ? `${team.organization.name}` : "No organization"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Members:</span>
                    <span className="font-medium">{team._count.members}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="font-medium">
                      {new Date(team.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Members
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {teams.length === 0 && organizations.length > 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">No teams yet</p>
              <Button onClick={() => setCreateOpen(true)}>Create your first team</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Dialog */}
      <AlertDialog open={createOpen} onOpenChange={setCreateOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Create Team</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new team within an organization.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Engineering Team"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <select
                id="organization"
                value={formData.organizationId}
                onChange={(e) => setFormData({ ...formData, organizationId: e.target.value })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              >
                <option value="">Select organization...</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Team"}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
