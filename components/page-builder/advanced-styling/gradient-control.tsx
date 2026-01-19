"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "../advanced-editors/color-picker";

interface GradientStop {
  color: string;
  position: string;
}

interface GradientControlProps {
  label: string;
  value: {
    type?: string;
    angle?: string;
    stops?: GradientStop[];
  };
  onChange: (value: any) => void;
}

export function GradientControl({ label, value = {}, onChange }: GradientControlProps) {
  const stops = value.stops || [
    { color: "#667eea", position: "0%" },
    { color: "#764ba2", position: "100%" },
  ];

  const handleTypeChange = (type: string) => {
    onChange({ ...value, type });
  };

  const handleAngleChange = (angle: string) => {
    onChange({ ...value, angle });
  };

  const handleStopChange = (index: number, key: string, val: string) => {
    const newStops = [...stops];
    newStops[index] = { ...newStops[index], [key]: val };
    onChange({ ...value, stops: newStops });
  };

  const addStop = () => {
    const newStops = [...stops, { color: "#ffffff", position: "50%" }];
    onChange({ ...value, stops: newStops });
  };

  const removeStop = (index: number) => {
    if (stops.length > 2) {
      const newStops = stops.filter((_, i) => i !== index);
      onChange({ ...value, stops: newStops });
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground">Type</label>
          <select
            value={value.type || "linear"}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="flex h-8 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
            <option value="conic">Conic</option>
          </select>
        </div>

        {value.type !== "radial" && (
          <div>
            <label className="text-xs text-muted-foreground">Angle/Direction</label>
            <Input
              type="text"
              value={value.angle || "135deg"}
              onChange={(e) => handleAngleChange(e.target.value)}
              placeholder="135deg or to right"
              className="h-8 text-sm"
            />
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-muted-foreground font-semibold">Color Stops</label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addStop}
              className="h-6 text-xs"
            >
              + Add
            </Button>
          </div>
          
          <div className="space-y-2">
            {stops.map((stop, index) => (
              <div key={index} className="flex gap-2 items-start p-2 border rounded">
                <div className="flex-1 space-y-2">
                  <div
                    className="h-8 w-full rounded border-2"
                    style={{ backgroundColor: stop.color }}
                  />
                  <Input
                    type="text"
                    value={stop.color}
                    onChange={(e) => handleStopChange(index, "color", e.target.value)}
                    placeholder="#667eea"
                    className="h-7 text-xs"
                  />
                  <Input
                    type="text"
                    value={stop.position}
                    onChange={(e) => handleStopChange(index, "position", e.target.value)}
                    placeholder="0%"
                    className="h-7 text-xs"
                  />
                </div>
                {stops.length > 2 && (
                  <button
                    onClick={() => removeStop(index)}
                    className="text-red-500 hover:text-red-700 text-xs mt-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="text-xs text-muted-foreground">Preview</label>
          <div
            className="h-20 w-full rounded border"
            style={{
              background: generateGradient(value),
            }}
          />
        </div>
      </div>
    </div>
  );
}

function generateGradient(value: any): string {
  const type = value.type || "linear";
  const angle = value.angle || "135deg";
  const stops = value.stops || [
    { color: "#667eea", position: "0%" },
    { color: "#764ba2", position: "100%" },
  ];

  const stopsString = stops.map((s: any) => `${s.color} ${s.position}`).join(", ");

  if (type === "radial") {
    return `radial-gradient(circle, ${stopsString})`;
  } else if (type === "conic") {
    return `conic-gradient(from ${angle}, ${stopsString})`;
  } else {
    return `linear-gradient(${angle}, ${stopsString})`;
  }
}
