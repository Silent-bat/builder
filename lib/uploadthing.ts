// Uploadthing configuration
// This is a placeholder - you'll need to get your API keys from uploadthing.com

import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

// Define your file router type
type OurFileRouter = {
  imageUploader: any;
  profilePicture: any;
};

// Generate Upload Button and Dropzone
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// File upload helper
export async function uploadFile(file: File): Promise<string> {
  // Placeholder for file upload logic
  // In production, this would use Uploadthing, S3, or Cloudflare R2
  
  // Return a placeholder URL
  return URL.createObjectURL(file);
}

export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

export function isValidImageType(file: File): boolean {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  return validTypes.includes(file.type);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
