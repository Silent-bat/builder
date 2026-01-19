"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EffectsControlProps {
  label: string;
  value: {
    blur?: string;
    brightness?: string;
    contrast?: string;
    grayscale?: string;
    hueRotate?: string;
    saturate?: string;
    sepia?: string;
    backdropBlur?: string;
  };
  onChange: (value: any) => void;
}

export function EffectsControl({ label, value = {}, onChange }: EffectsControlProps) {
  const handleChange = (key: string, val: string) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-muted-foreground">Blur</label>
          <Input
            type="text"
            value={value.blur || ""}
            onChange={(e) => handleChange("blur", e.target.value)}
            placeholder="0px"
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Brightness</label>
          <Input
            type="text"
            value={value.brightness || ""}
            onChange={(e) => handleChange("brightness", e.target.value)}
            placeholder="100%"
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Contrast</label>
          <Input
            type="text"
            value={value.contrast || ""}
            onChange={(e) => handleChange("contrast", e.target.value)}
            placeholder="100%"
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Grayscale</label>
          <Input
            type="text"
            value={value.grayscale || ""}
            onChange={(e) => handleChange("grayscale", e.target.value)}
            placeholder="0%"
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Hue Rotate</label>
          <Input
            type="text"
            value={value.hueRotate || ""}
            onChange={(e) => handleChange("hueRotate", e.target.value)}
            placeholder="0deg"
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Saturate</label>
          <Input
            type="text"
            value={value.saturate || ""}
            onChange={(e) => handleChange("saturate", e.target.value)}
            placeholder="100%"
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Sepia</label>
          <Input
            type="text"
            value={value.sepia || ""}
            onChange={(e) => handleChange("sepia", e.target.value)}
            placeholder="0%"
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Backdrop Blur</label>
          <Input
            type="text"
            value={value.backdropBlur || ""}
            onChange={(e) => handleChange("backdropBlur", e.target.value)}
            placeholder="0px"
            className="h-8 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
