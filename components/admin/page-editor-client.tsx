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
            onClick={() => router.push(`/admin/pages/${page.id}/settings`)}
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
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
