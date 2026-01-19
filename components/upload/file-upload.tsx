"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { formatFileSize, isValidImageType } from "@/lib/uploadthing";

interface FileUploadProps {
  onUploadComplete?: (url: string) => void;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
}

export function FileUpload({
  onUploadComplete,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  className,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      toast.error("File too large", `Maximum size is ${formatFileSize(maxSize)}`);
      return;
    }

    // Validate file type for images
    if (accept.includes("image") && !isValidImageType(file)) {
      toast.error("Invalid file type", "Please upload a valid image file");
      return;
    }

    setUploading(true);

    try {
      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }

      // In production, upload to your storage service
      // For now, we'll just show a success message
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const uploadedUrl = URL.createObjectURL(file);
      
      toast.success("Upload complete", `${file.name} uploaded successfully`);
      onUploadComplete?.(uploadedUrl);
    } catch (error: any) {
      toast.error("Upload failed", error.message || "Please try again");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="space-y-4">
        {preview && (
          <div className="relative w-full h-48 border rounded-lg overflow-hidden">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full"
          >
            {uploading ? "Uploading..." : preview ? "Change File" : "Choose File"}
          </Button>
          
          {preview && !uploading && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setPreview(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              Remove
            </Button>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground">
          Maximum file size: {formatFileSize(maxSize)}
        </p>
      </div>
    </div>
  );
}
