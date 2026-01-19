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

interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  owner: {
    name: string;
    email: string;
  };
  _count: {
    members: number;
    teams: number;
  };
}

interface OrganizationsClientProps {
  organizations: Organization[];
}

export function OrganizationsClient({ organizations: initialOrgs }: OrganizationsClientProps) {
  const [organizations, setOrganizations] = useState(initialOrgs);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create organization");
      }

      toast.success("Organization created successfully");
      setFormData({ name: "", slug: "", description: "" });
      setCreateOpen(false);
      
      // Refresh list
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create organization");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (org: Organization) => {
    setSelectedOrg(org);
    setFormData({
      name: org.name,
      slug: org.slug,
      description: org.description || "",
    });
    setEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrg) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/organizations/${selectedOrg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update organization");
      }

      toast.success("Organization updated successfully");
      setEditOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update organization");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (org: Organization) => {
    setSelectedOrg(org);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedOrg) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/organizations/${selectedOrg.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete organization");
      }

      toast.success("Organization deleted successfully");
      setDeleteOpen(false);
      setOrganizations(organizations.filter(o => o.id !== selectedOrg.id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete organization");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Organizations</h1>
            <p className="text-muted-foreground">Manage organizations and their settings</p>
          </div>
          <Button onClick={() => setCreateOpen(true)}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Organization
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <Card key={org.id}>
              <CardHeader>
                <CardTitle>{org.name}</CardTitle>
                <CardDescription>/{org.slug}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {org.description && (
                    <p className="text-sm text-muted-foreground">{org.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Owner:</span>
                    <span className="font-medium">{org.owner.name}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Members:</span>
                    <span className="font-medium">{org._count.members}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Teams:</span>
                    <span className="font-medium">{org._count.teams}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(org)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDeleteClick(org)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {organizations.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">No organizations yet</p>
              <Button onClick={() => setCreateOpen(true)}>Create your first organization</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Dialog */}
      <AlertDialog open={createOpen} onOpenChange={setCreateOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Create Organization</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new organization to manage teams and members.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ 
                    ...formData, 
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                  });
                }}
                placeholder="Acme Corporation"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="acme-corp"
                pattern="[a-z0-9-]+"
                required
              />
              <p className="text-xs text-muted-foreground">
                Only lowercase letters, numbers, and hyphens
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Building the future..."
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Organization</AlertDialogTitle>
            <AlertDialogDescription>
              Update organization details.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Acme Corporation"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-slug">Slug</Label>
              <Input
                id="edit-slug"
                value={formData.slug}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Slug cannot be changed
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Building the future..."
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{selectedOrg?.name}</strong> and all its teams and members.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? "Deleting..." : "Delete Organization"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
