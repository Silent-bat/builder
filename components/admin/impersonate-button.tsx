"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ImpersonateButton({ userId, disabled }: { userId: string; disabled?: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const impersonate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/impersonate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to impersonate");
      toast.success("Impersonation started", "You are now acting as that user");
      router.push("/dashboard");
      router.refresh();
    } catch (e: any) {
      toast.error("Impersonation failed", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" size="sm" disabled={disabled || loading} onClick={impersonate}>
      {loading ? "Starting..." : "Impersonate"}
    </Button>
  );
}
