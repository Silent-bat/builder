"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import { Navbar } from "@/components/dashboard/navbar";

export function DashboardShell({
  user,
  impersonator,
  children,
}: {
  user: any;
  impersonator?: any;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar
          user={user}
          userRole={user.role}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
      </div>

      <MobileSidebar user={user} userRole={user.role} />

      <div
        className={
          "flex flex-1 flex-col overflow-hidden transition-[margin] duration-300 " +
          (collapsed ? "lg:ml-[70px]" : "lg:ml-[280px]")
        }
      >
        <Navbar user={user} impersonator={impersonator} />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
