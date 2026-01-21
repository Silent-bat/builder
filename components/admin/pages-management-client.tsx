"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/lib/toast";

interface Page {
  id: string;
  title: string;
  slug: string;
  type: string;
  published: boolean;
  _count: {
    components: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface PagesManagementClientProps {
  pages: Page[];
}

export function PagesManagementClient({ pages: initialPages }: PagesManagementClientProps) {
  const [pages, setPages] = useState(initialPages);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "LANDING" | "NORMAL" | "DASHBOARD">("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const [showTypeChangeDialog, setShowTypeChangeDialog] = useState(false);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [newPageType, setNewPageType] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");
  const router = useRouter();

  const filteredPages = pages.filter((page) => {
    const matchesSearch = 
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "ALL" || page.type === filterType;
    const matchesStatus = 
      filterStatus === "ALL" ||
      (filterStatus === "PUBLISHED" && page.published) ||
      (filterStatus === "DRAFT" && !page.published);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleChangePageType = async (pageId: string, newType: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/pages/${pageId}/change-type`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to change page type");
      }

      // Refresh pages data
      const updatedPages = pages.map(p => 
        p.id === pageId ? { ...p, type: newType } : 
        (newType === "LANDING" && p.type === "LANDING") ? { ...p, type: "NORMAL" } : p
      );
      setPages(updatedPages);
      
      toast.success("Success!", data.message);
      router.refresh();
    } catch (error) {
      console.error("Error changing page type:", error);
      toast.error("Error", error instanceof Error ? error.message : "Failed to change page type");
    } finally {
      setIsLoading(false);
      setShowTypeChangeDialog(false);
    }
  };

  const openTypeChangeDialog = (page: any, newType: string) => {
    setSelectedPage(page);
    setNewPageType(newType);
    setShowTypeChangeDialog(true);
  };

  const handleDuplicate = async (pageId: string) => {
    try {
      const res = await fetch(`/api/admin/pages/${pageId}/duplicate`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to duplicate page");

      const newPage = await res.json();
      toast.success("Page duplicated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to duplicate page");
    }
  };

  const handleDelete = async (pageId: string, pageTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${pageTitle}"?`)) return;

    try {
      const res = await fetch(`/api/admin/pages/${pageId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete page");

      setPages(pages.filter((p) => p.id !== pageId));
      toast.success("Page deleted successfully");
    } catch (error) {
      toast.error("Failed to delete page");
    }
  };

  const handleTogglePublish = async (pageId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/pages/${pageId}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (!res.ok) throw new Error("Failed to update page");

      setPages(pages.map((p) => 
        p.id === pageId ? { ...p, published: !currentStatus } : p
      ));
      toast.success(currentStatus ? "Page unpublished" : "Page published");
    } catch (error) {
      toast.error("Failed to update page");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>All Pages ({filteredPages.length})</CardTitle>
            <CardDescription>Landing pages and dynamic dashboard pages</CardDescription>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="ALL">All Types</option>
            <option value="LANDING">Landing</option>
            <option value="NORMAL">Normal</option>
            <option value="DASHBOARD">Dashboard</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="ALL">All Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {filteredPages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground mb-4">
                {pages.length === 0 ? "No pages yet." : "No pages match your filters."}
              </p>
              {pages.length === 0 && (
                <Link href="/admin/pages/new">
                  <Button>Create Your First Page</Button>
                </Link>
              )}
            </div>
          ) : (
            filteredPages.map((p) => (
              <div key={p.id} className="flex items-center justify-between border rounded-lg p-4 hover:bg-accent/50 transition-colors group">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{p.title}</p>
                    <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      {p.type}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        p.published
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      {p.type === "LANDING" ? "/" : 
                       p.type === "NORMAL" ? `/${p.slug}` : 
                       `/dashboard/${p.slug}`}
                    </span>
                    <span>•</span>
                    <span>{p._count.components} components</span>
                    <span>•</span>
                    <span>Updated {new Date(p.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quick Publish Toggle */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTogglePublish(p.id, p.published)}
                    title={p.published ? "Unpublish" : "Publish"}
                  >
                    {p.published ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </Button>

                  <Link href={`/admin/pages/${p.id}`}>
                    <Button variant="outline" size="sm">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Button>
                  </Link>

                  {p.published && (
                    <Link href={`/p/${p.slug}`} target="_blank">
                      <Button variant="outline" size="sm" title="View Page">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Button>
                    </Link>
                  )}

                  {/* More Actions Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDuplicate(p.id)}>
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Duplicate Page
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push(`/admin/pages/${p.id}`)}>
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDelete(p.id, p.title)}
                        className="text-destructive focus:text-destructive"
                      >
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Page
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>

    {/* Page Type Change Confirmation Dialog */}
    {showTypeChangeDialog && selectedPage && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-md">
          <h3 className="text-lg font-semibold mb-2">
            {newPageType === "LANDING" ? "Set as Homepage?" : `Change to ${newPageType} Page?`}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {newPageType === "LANDING" 
              ? `"${selectedPage.title}" will become the new homepage. The current homepage will be converted to a normal page.`
              : `"${selectedPage.title}" will be changed to a ${newPageType.toLowerCase()} page.`
            }
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowTypeChangeDialog(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleChangePageType(selectedPage.id, newPageType)}
              disabled={isLoading}
              className={newPageType === "LANDING" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              {isLoading ? "Updating..." : "Confirm"}
            </Button>
          </div>
        </div>
      </div>
    )}
  </>;
}
