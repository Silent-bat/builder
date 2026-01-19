"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "@/lib/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface NavbarProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
  impersonator?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

function PageTitle({ pathname }: { pathname: string }) {
  if (pathname.startsWith("/admin")) return "Admin";
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  return "App";
}

export function Navbar({ user, impersonator }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [stopping, setStopping] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      router.push("/");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  const stopImpersonation = async () => {
    setStopping(true);
    try {
      const res = await fetch("/api/admin/impersonate", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast.success("Stopped impersonating");
      router.push("/admin/users");
      router.refresh();
    } catch (e: any) {
      toast.error("Failed", e.message);
    } finally {
      setStopping(false);
    }
  };

  const displayName = user.name || user.email || "Account";
  const initials = (displayName || "A")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <header className="border-b bg-background">
      {impersonator && (
        <div className="border-b bg-amber-50 text-amber-900">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="text-sm">
              Impersonating: <span className="font-medium">{user.email}</span> •
              Signed in as: <span className="font-medium">{impersonator.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={stopImpersonation}
              disabled={stopping}
            >
              {stopping ? "Stopping..." : "Stop"}
            </Button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={pathname.startsWith("/admin") ? "/admin" : "/dashboard"} className="font-semibold">
            <PageTitle pathname={pathname} />
          </Link>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {pathname}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-md border px-2 py-1.5 hover:bg-accent">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {initials}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium leading-4">{displayName}</div>
                  <div className="text-xs text-muted-foreground leading-4">{user.role}</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/sessions">Sessions</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {user.role === "ADMIN" && (
                <>
                  <DropdownMenuLabel>Admin</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Overview</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/users">Users</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/pages">Pages</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onSelect={(e) => {
                e.preventDefault();
                handleSignOut();
              }}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
