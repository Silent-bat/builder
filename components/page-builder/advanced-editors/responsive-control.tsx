"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ResponsiveControlProps {
  label: string;
  value: {
    mobile?: any;
    tablet?: any;
    desktop?: any;
  };
  onChange: (value: any) => void;
  children: (device: "mobile" | "tablet" | "desktop", value: any, onChange: (val: any) => void) => React.ReactNode;
}

export function ResponsiveControl({ label, value = {}, onChange, children }: ResponsiveControlProps) {
  const [activeDevice, setActiveDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");

  const handleDeviceChange = (device: "mobile" | "tablet" | "desktop", val: any) => {
    onChange({ ...value, [device]: val });
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-1 mb-2">
        <Button
          type="button"
          size="sm"
          variant={activeDevice === "mobile" ? "default" : "outline"}
          onClick={() => setActiveDevice("mobile")}
          className="flex-1 h-8"
        >
          📱
        </Button>
        <Button
          type="button"
          size="sm"
          variant={activeDevice === "tablet" ? "default" : "outline"}
          onClick={() => setActiveDevice("tablet")}
          className="flex-1 h-8"
        >
          📱
        </Button>
        <Button
          type="button"
          size="sm"
          variant={activeDevice === "desktop" ? "default" : "outline"}
          onClick={() => setActiveDevice("desktop")}
          className="flex-1 h-8"
        >
          💻
        </Button>
      </div>
      <div className="border rounded-md p-3 bg-muted/30">
        {children(activeDevice, value[activeDevice], (val) => handleDeviceChange(activeDevice, val))}
      </div>
    </div>
  );
}
