"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImpersonateButton } from "@/components/admin/impersonate-button";
import { UserCreateDialog } from "@/components/admin/user-create-dialog";
import { UserEditDialog } from "@/components/admin/user-edit-dialog";
import { toast } from "@/lib/toast";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

interface AdminUsersClientProps {
  users: User[];
  currentUserId: string;
  currentUserEmail: string;
  currentUserRole: string;
}

export function AdminUsersClient({ 
  users: initialUsers, 
  currentUserId, 
  currentUserEmail, 
  currentUserRole 
}: AdminUsersClientProps) {
  const [users, setUsers] = useState(initialUsers);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  const refreshUsers = async () => {
    try {
      const res = await fetch("/api/admin/users/list");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to refresh users:", error);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete user");
      }

      toast.success("User deleted successfully");
      setDeleteOpen(false);
      setSelectedUser(null);
      
      // Remove user from local state
      setUsers(users.filter(u => u.id !== selectedUser.id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Users</h1>
            <p className="text-muted-foreground">Manage users and impersonate for support</p>
          </div>
          <Button onClick={() => setCreateOpen(true)}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User List ({users.length})</CardTitle>
            <CardDescription>
              You are signed in as {currentUserEmail} (role: {currentUserRole})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No users found. Create your first user to get started.
                </div>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between border rounded-lg p-3">
                    <div>
                      <p className="font-medium">{user.name || "No name"}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Role: {user.role} • Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(user)}
                        disabled={user.id === currentUserId}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                      <ImpersonateButton userId={user.id} disabled={user.id === currentUserId} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <UserCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={refreshUsers}
      />

      <UserEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        user={selectedUser}
        onSuccess={refreshUsers}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{selectedUser?.name}</strong> ({selectedUser?.email}).
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
