"use client";

import { useState } from "react";
import { FileUpload } from "./file-upload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AvatarUploadProps {
  currentAvatar?: string | null;
  onUploadComplete?: (url: string) => void;
}

export function AvatarUpload({ currentAvatar, onUploadComplete }: AvatarUploadProps) {
  const [avatar, setAvatar] = useState<string | null>(currentAvatar || null);

  const handleUpload = (url: string) => {
    setAvatar(url);
    onUploadComplete?.(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>Upload a profile picture for your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-semibold text-muted-foreground">?</span>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <FileUpload
              accept="image/*"
              maxSize={2 * 1024 * 1024} // 2MB
              onUploadComplete={handleUpload}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
