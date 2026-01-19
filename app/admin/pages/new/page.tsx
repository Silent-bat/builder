"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/lib/toast";

type PageType = "LANDING" | "DASHBOARD";

export default function NewPage() {
  const router = useRouter();
  const [type, setType] = useState<PageType>("DASHBOARD");
  const [slug, setSlug] = useState("new-page");
  const [title, setTitle] = useState("New Page");
  const [published, setPublished] = useState(true);
  const [contentMd, setContentMd] = useState("# New Page\n\nWrite content here...");
  const [saving, setSaving] = useState(false);

  const create = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, slug, title, contentMd, published }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create");
      toast.success("Created", "Page created");
      router.push(`/admin/pages/${data.id}`);
      router.refresh();
    } catch (e: any) {
      toast.error("Create failed", e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create Page</h1>
        <p className="text-muted-foreground">Create a new landing or dashboard page</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Page Details</CardTitle>
          <CardDescription>Slug must be lowercase letters, numbers, and hyphens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              value={type}
              onChange={(e) => setType(e.target.value as PageType)}
            >
              <option value="LANDING">Landing</option>
              <option value="DASHBOARD">Dashboard</option>
            </select>
            <p className="text-xs text-muted-foreground">
              Landing pages are rendered on the homepage when slug is "home".
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
            <p className="text-xs text-muted-foreground">
              URL: {type === "LANDING" ? "/" : `/dashboard/${slug}`}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="published"
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <Label htmlFor="published">Published</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown)</Label>
            <textarea
              id="content"
              className="min-h-[260px] w-full rounded-md border border-input bg-transparent p-3 text-sm shadow-sm"
              value={contentMd}
              onChange={(e) => setContentMd(e.target.value)}
            />
          </div>

          <Button onClick={create} disabled={saving}>
            {saving ? "Creating..." : "Create"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
