"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageEditor } from "@/components/page-builder/page-editor";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";

interface PageEditorClientProps {
  page: {
    id: string;
    title: string;
    slug: string;
    published: boolean;
    components: Array<{
      id: string;
      type: string;
      order: number;
      props: any;
    }>;
  };
}

export function PageEditorClient({ page }: PageEditorClientProps) {
  const router = useRouter();
  const [publishing, setPublishing] = useState(false);

  const initialComponents = page.components.map((comp) => ({
    id: comp.id,
    type: comp.type,
    props: comp.props,
    style: comp.props?.style || {},
    styles: comp.props?.styles || {},
  }));

  const handleSave = async (components: any[]) => {
    try {
      const res = await fetch(`/api/admin/pages/${page.id}/components`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ components }),
      });

      if (!res.ok) {
        throw new Error("Failed to save components");
      }

      toast.success("Page saved successfully");
    } catch (error) {
      toast.error("Failed to save page");
      throw error;
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const endpoint = page.published
        ? `/api/admin/pages/${page.id}/publish`
        : `/api/admin/pages/${page.id}/publish`;
      
      const method = page.published ? "DELETE" : "POST";

      const res = await fetch(endpoint, { method });

      if (!res.ok) {
        throw new Error(`Failed to ${page.published ? "unpublish" : "publish"} page`);
      }

      toast.success(`Page ${page.published ? "unpublished" : "published"} successfully`);
      router.refresh();
    } catch (error) {
      toast.error(`Failed to ${page.published ? "unpublish" : "publish"} page`);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between bg-background">
        <div>
          <h1 className="text-xl font-bold">{page.title}</h1>
          <p className="text-sm text-muted-foreground">/{page.slug}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            page.published 
              ? "bg-green-100 text-green-700" 
              : "bg-gray-100 text-gray-700"
          }`}>
            {page.published ? "Published" : "Draft"}
          </span>
          <Button
            variant="outline"
            onClick={handlePublish}
            disabled={publishing}
          >
            {publishing 
              ? "..." 
              : page.published 
                ? "Unpublish" 
                : "Publish"
            }
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/pages")}
          >
            Back to Pages
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <PageEditor
          pageId={page.id}
          initialComponents={initialComponents}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
