"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SpacingControlProps {
  label: string;
  value: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  onChange: (value: any) => void;
}

export function SpacingControl({ label, value = {}, onChange }: SpacingControlProps) {
  const handleChange = (side: string, val: string) => {
    onChange({ ...value, [side]: val });
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-muted-foreground">Top</label>
          <Input
            type="text"
            value={value.top || ""}
            onChange={(e) => handleChange("top", e.target.value)}
            placeholder="0px"
            className="h-8 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Right</label>
          <Input
            type="text"
            value={value.right || ""}
            onChange={(e) => handleChange("right", e.target.value)}
            placeholder="0px"
            className="h-8 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Bottom</label>
          <Input
            type="text"
            value={value.bottom || ""}
            onChange={(e) => handleChange("bottom", e.target.value)}
            placeholder="0px"
            className="h-8 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Left</label>
          <Input
            type="text"
            value={value.left || ""}
            onChange={(e) => handleChange("left", e.target.value)}
            placeholder="0px"
            className="h-8 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
