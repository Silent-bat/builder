"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/lib/toast";

export type PageType = "LANDING" | "DASHBOARD";

export interface PageRecord {
  id: string;
  type: PageType;
  slug: string;
  title: string;
  contentMd: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export function PageForm({ page }: { page: PageRecord }) {
  const [title, setTitle] = useState(page.title);
  const [slug] = useState(page.slug);
  const [type] = useState<PageType>(page.type);
  const [published, setPublished] = useState(page.published);
  const [contentMd, setContentMd] = useState(page.contentMd || "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/pages/${page.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, contentMd, published }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      toast.success("Saved", "Page updated");
    } catch (e: any) {
      toast.error("Save failed", e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Page</CardTitle>
        <CardDescription>
          Type: <span className="font-medium">{type}</span> • Slug:{" "}
          <span className="font-medium">{slug}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
            placeholder="# Hello\n\nWrite markdown here..."
          />
          <p className="text-xs text-muted-foreground">
            Tip: Keep it simple. This boilerplate renders a safe subset (no raw HTML).
          </p>
        </div>

        <Button onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </CardContent>
    </Card>
  );
}
