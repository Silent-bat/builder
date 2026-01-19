"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const presetColors = [
  "#000000", "#ffffff", "#ef4444", "#f97316", "#f59e0b", "#eab308",
  "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9",
  "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#f43f5e", "#64748b",
];

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <div
          className="w-12 h-10 rounded-md border-2 border-input cursor-pointer hover:border-primary transition-colors"
          style={{ backgroundColor: value || "#ffffff" }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <Input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1"
        />
      </div>
      
      {showPicker && (
        <div className="p-3 border rounded-md bg-card space-y-2">
          <div className="grid grid-cols-10 gap-1">
            {presetColors.map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded border border-input hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChange(color);
                  setShowPicker(false);
                }}
                title={color}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value || "#000000"}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-10 rounded border cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
