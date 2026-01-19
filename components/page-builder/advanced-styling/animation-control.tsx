"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AnimationControlProps {
  label: string;
  value: {
    type?: string;
    duration?: string;
    delay?: string;
    easing?: string;
    iteration?: string;
  };
  onChange: (value: any) => void;
}

const animationTypes = [
  { label: "None", value: "none" },
  { label: "Fade In", value: "fadeIn" },
  { label: "Fade In Up", value: "fadeInUp" },
  { label: "Fade In Down", value: "fadeInDown" },
  { label: "Fade In Left", value: "fadeInLeft" },
  { label: "Fade In Right", value: "fadeInRight" },
  { label: "Slide In Up", value: "slideInUp" },
  { label: "Slide In Down", value: "slideInDown" },
  { label: "Slide In Left", value: "slideInLeft" },
  { label: "Slide In Right", value: "slideInRight" },
  { label: "Zoom In", value: "zoomIn" },
  { label: "Zoom Out", value: "zoomOut" },
  { label: "Bounce", value: "bounce" },
  { label: "Pulse", value: "pulse" },
  { label: "Shake", value: "shake" },
  { label: "Rotate In", value: "rotateIn" },
  { label: "Flip", value: "flip" },
];

const easingTypes = [
  { label: "Linear", value: "linear" },
  { label: "Ease", value: "ease" },
  { label: "Ease In", value: "ease-in" },
  { label: "Ease Out", value: "ease-out" },
  { label: "Ease In Out", value: "ease-in-out" },
  { label: "Cubic Bezier", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
];

export function AnimationControl({ label, value = {}, onChange }: AnimationControlProps) {
  const handleChange = (key: string, val: string) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      <div className="space-y-2">
        <div>
          <label className="text-xs text-muted-foreground">Animation Type</label>
          <select
            value={value.type || "none"}
            onChange={(e) => handleChange("type", e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {animationTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {value.type && value.type !== "none" && (
          <>
            <div>
              <label className="text-xs text-muted-foreground">Duration</label>
              <Input
                type="text"
                value={value.duration || "1s"}
                onChange={(e) => handleChange("duration", e.target.value)}
                placeholder="1s"
                className="h-8"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Delay</label>
              <Input
                type="text"
                value={value.delay || "0s"}
                onChange={(e) => handleChange("delay", e.target.value)}
                placeholder="0s"
                className="h-8"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Easing</label>
              <select
                value={value.easing || "ease"}
                onChange={(e) => handleChange("easing", e.target.value)}
                className="flex h-8 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {easingTypes.map((easing) => (
                  <option key={easing.value} value={easing.value}>
                    {easing.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Iteration Count</label>
              <Input
                type="text"
                value={value.iteration || "1"}
                onChange={(e) => handleChange("iteration", e.target.value)}
                placeholder="1 or infinite"
                className="h-8"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
