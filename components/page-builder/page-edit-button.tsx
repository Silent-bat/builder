"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageEditButtonProps {
  pageId: string;
  isAdmin: boolean;
}

export function PageEditButton({ pageId, isAdmin }: PageEditButtonProps) {
  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link href={`/admin/pages/${pageId}/edit`}>
        <Button className="shadow-lg">
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Page
        </Button>
      </Link>
    </div>
  );
}
