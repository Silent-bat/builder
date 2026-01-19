"use client";

import { Label } from "@/components/ui/label";
import { ColorPicker } from "../advanced-editors/color-picker";
import { Input } from "@/components/ui/input";

interface HoverControlProps {
  label: string;
  value: {
    backgroundColor?: string;
    color?: string;
    transform?: string;
    scale?: string;
    opacity?: string;
    boxShadow?: string;
  };
  onChange: (value: any) => void;
}

export function HoverControl({ label, value = {}, onChange }: HoverControlProps) {
  const handleChange = (key: string, val: string) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      <div className="space-y-2">
        <ColorPicker
          label="Hover Background"
          value={value.backgroundColor || ""}
          onChange={(val) => handleChange("backgroundColor", val)}
        />

        <ColorPicker
          label="Hover Text Color"
          value={value.color || ""}
          onChange={(val) => handleChange("color", val)}
        />

        <div>
          <label className="text-xs text-muted-foreground">Scale</label>
          <Input
            type="text"
            value={value.scale || ""}
            onChange={(e) => handleChange("scale", e.target.value)}
            placeholder="1.05"
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Opacity</label>
          <Input
            type="text"
            value={value.opacity || ""}
            onChange={(e) => handleChange("opacity", e.target.value)}
            placeholder="1"
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Box Shadow</label>
          <Input
            type="text"
            value={value.boxShadow || ""}
            onChange={(e) => handleChange("boxShadow", e.target.value)}
            placeholder="0 4px 12px rgba(0,0,0,0.1)"
            className="h-8 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
