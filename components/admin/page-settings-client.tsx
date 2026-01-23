"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/lib/toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface PageSettingsClientProps {
  page: {
    id: string;
    title: string;
    slug: string;
    type: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  currentLandingPage: {
    id: string;
    title: string;
  } | null;
}

export function PageSettingsClient({ page, currentLandingPage }: PageSettingsClientProps) {
  const router = useRouter();
  const [title, setTitle] = useState(page.title);
  const [slug, setSlug] = useState(page.slug);
  const [saving, setSaving] = useState(false);
  const [showLandingDialog, setShowLandingDialog] = useState(false);
  const [changingType, setChangingType] = useState(false);

  const isLandingPage = page.type === "LANDING";
  const canSetAsLanding = page.published && !isLandingPage;

  const handleSaveBasicSettings = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/pages/${page.id}/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save settings");
      }

      toast.success("Settings saved successfully");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSetAsLanding = async () => {
    setChangingType(true);
    try {
      const res = await fetch(`/api/admin/pages/${page.id}/change-type`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newType: "LANDING" }),
      });

      if (!res.ok) {
        throw new Error("Failed to set as landing page");
      }

      toast.success("Page is now the landing page");
      router.refresh();
      setShowLandingDialog(false);
    } catch (error) {
      toast.error("Failed to set as landing page");
    } finally {
      setChangingType(false);
    }
  };

  const handleRemoveFromLanding = async () => {
    setChangingType(true);
    try {
      const res = await fetch(`/api/admin/pages/${page.id}/change-type`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newType: "NORMAL" }),
      });

      if (!res.ok) {
        throw new Error("Failed to change page type");
      }

      toast.success("Page is no longer the landing page");
      router.refresh();
    } catch (error) {
      toast.error("Failed to change page type");
    } finally {
      setChangingType(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Page Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your page settings</p>
        </div>
        <Button variant="outline" onClick={() => router.push("/admin/pages")}>
          Back to Pages
        </Button>
      </div>

      {/* Basic Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update your page title and URL slug</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Page"
            />
          </div>
          <div>
            <Label htmlFor="slug">URL Slug</Label>
            <div className="flex gap-2 items-center">
              <span className="text-muted-foreground text-sm">/</span>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                placeholder="my-awesome-page"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              This will be your page URL: {window.location.origin}/{slug}
            </p>
          </div>
          <Button onClick={handleSaveBasicSettings} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Landing Page Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Landing Page</CardTitle>
          <CardDescription>
            {isLandingPage 
              ? "This page is currently your site's homepage" 
              : "Set this page as your site's homepage"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLandingPage ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium text-blue-900 dark:text-blue-100">This is your homepage</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Visitors will see this page when they visit your site</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={handleRemoveFromLanding}
                disabled={changingType}
              >
                {changingType ? "Updating..." : "Remove as Landing Page"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {currentLandingPage && (
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    Current landing page: <span className="font-medium">{currentLandingPage.title}</span>
                  </p>
                </div>
              )}
              {canSetAsLanding ? (
                <Button onClick={() => setShowLandingDialog(true)}>
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Set as Landing Page
                </Button>
              ) : (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⚠️ Page must be published before it can be set as the landing page
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Page Info */}
      <Card>
        <CardHeader>
          <CardTitle>Page Information</CardTitle>
          <CardDescription>Additional details about this page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Page ID:</span>
            <span className="font-mono text-xs">{page.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium">{page.type}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status:</span>
            <span className={`font-medium ${page.published ? "text-green-600" : "text-gray-600"}`}>
              {page.published ? "Published" : "Draft"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Created:</span>
            <span>{new Date(page.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last Updated:</span>
            <span>{new Date(page.updatedAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common page operations</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/admin/pages/${page.id}`)}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Content
          </Button>
          <Button variant="outline" onClick={() => window.open(`/${slug}`, "_blank")}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview Page
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={showLandingDialog} onOpenChange={setShowLandingDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Set as Landing Page?</AlertDialogTitle>
            <AlertDialogDescription>
              {currentLandingPage ? (
                <>
                  This will make <strong>{title}</strong> your new homepage. 
                  The current homepage (<strong>{currentLandingPage.title}</strong>) will be changed to a normal page.
                </>
              ) : (
                <>
                  This will make <strong>{title}</strong> your homepage. 
                  Visitors will see this page when they visit your site.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSetAsLanding} disabled={changingType}>
              {changingType ? "Setting..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
