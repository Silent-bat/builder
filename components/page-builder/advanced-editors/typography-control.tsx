"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TypographyControlProps {
  label: string;
  value: {
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    letterSpacing?: string;
  };
  onChange: (value: any) => void;
}

const fontWeights = [
  { label: "Thin", value: "100" },
  { label: "Light", value: "300" },
  { label: "Normal", value: "400" },
  { label: "Medium", value: "500" },
  { label: "Semibold", value: "600" },
  { label: "Bold", value: "700" },
  { label: "Black", value: "900" },
];

export function TypographyControl({ label, value = {}, onChange }: TypographyControlProps) {
  const handleChange = (key: string, val: string) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-2">
        <div>
          <label className="text-xs text-muted-foreground">Font Size</label>
          <Input
            type="text"
            value={value.fontSize || ""}
            onChange={(e) => handleChange("fontSize", e.target.value)}
            placeholder="16px"
            className="h-8 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Font Weight</label>
          <select
            value={value.fontWeight || "400"}
            onChange={(e) => handleChange("fontWeight", e.target.value)}
            className="flex h-8 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {fontWeights.map((weight) => (
              <option key={weight.value} value={weight.value}>
                {weight.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Line Height</label>
          <Input
            type="text"
            value={value.lineHeight || ""}
            onChange={(e) => handleChange("lineHeight", e.target.value)}
            placeholder="1.5"
            className="h-8 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Letter Spacing</label>
          <Input
            type="text"
            value={value.letterSpacing || ""}
            onChange={(e) => handleChange("letterSpacing", e.target.value)}
            placeholder="0px"
            className="h-8 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
