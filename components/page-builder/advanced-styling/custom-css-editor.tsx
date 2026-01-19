"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CustomCSSEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function CustomCSSEditor({ label, value = "", onChange }: CustomCSSEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-7 text-xs"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>
      
      {isExpanded && (
        <div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/* Custom CSS */&#10;.my-class {&#10;  property: value;&#10;}"
            className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Add custom CSS classes or inline styles. Changes apply immediately.
          </p>
        </div>
      )}
    </div>
  );
}
