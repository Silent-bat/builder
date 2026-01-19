"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TransformControlProps {
  label: string;
  value: {
    rotate?: string;
    rotateX?: string;
    rotateY?: string;
    rotateZ?: string;
    scale?: string;
    scaleX?: string;
    scaleY?: string;
    skewX?: string;
    skewY?: string;
    translateX?: string;
    translateY?: string;
    translateZ?: string;
    perspective?: string;
  };
  onChange: (value: any) => void;
}

export function TransformControl({ label, value = {}, onChange }: TransformControlProps) {
  const handleChange = (key: string, val: string) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      <div className="space-y-3">
        {/* Rotation */}
        <div>
          <label className="text-xs text-muted-foreground font-semibold mb-1 block">Rotation</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">Rotate</label>
              <Input
                type="text"
                value={value.rotate || ""}
                onChange={(e) => handleChange("rotate", e.target.value)}
                placeholder="0deg"
                className="h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Rotate X</label>
              <Input
                type="text"
                value={value.rotateX || ""}
                onChange={(e) => handleChange("rotateX", e.target.value)}
                placeholder="0deg"
                className="h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Rotate Y</label>
              <Input
                type="text"
                value={value.rotateY || ""}
                onChange={(e) => handleChange("rotateY", e.target.value)}
                placeholder="0deg"
                className="h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Rotate Z</label>
              <Input
                type="text"
                value={value.rotateZ || ""}
                onChange={(e) => handleChange("rotateZ", e.target.value)}
                placeholder="0deg"
                className="h-8 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Scale */}
        <div>
          <label className="text-xs text-muted-foreground font-semibold mb-1 block">Scale</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">Scale</label>
              <Input
                type="text"
                value={value.scale || ""}
                onChange={(e) => handleChange("scale", e.target.value)}
                placeholder="1"
                className="h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Scale X</label>
              <Input
                type="text"
                value={value.scaleX || ""}
                onChange={(e) => handleChange("scaleX", e.target.value)}
                placeholder="1"
                className="h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Scale Y</label>
              <Input
                type="text"
                value={value.scaleY || ""}
                onChange={(e) => handleChange("scaleY", e.target.value)}
                placeholder="1"
                className="h-8 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Skew */}
        <div>
          <label className="text-xs text-muted-foreground font-semibold mb-1 block">Skew</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">Skew X</label>
              <Input
                type="text"
                value={value.skewX || ""}
                onChange={(e) => handleChange("skewX", e.target.value)}
                placeholder="0deg"
                className="h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Skew Y</label>
              <Input
                type="text"
                value={value.skewY || ""}
                onChange={(e) => handleChange("skewY", e.target.value)}
                placeholder="0deg"
                className="h-8 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Translate (3D Position) */}
        <div>
          <label className="text-xs text-muted-foreground font-semibold mb-1 block">Position (3D)</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">X</label>
              <Input
                type="text"
                value={value.translateX || ""}
                onChange={(e) => handleChange("translateX", e.target.value)}
                placeholder="0px"
                className="h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Y</label>
              <Input
                type="text"
                value={value.translateY || ""}
                onChange={(e) => handleChange("translateY", e.target.value)}
                placeholder="0px"
                className="h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Z</label>
              <Input
                type="text"
                value={value.translateZ || ""}
                onChange={(e) => handleChange("translateZ", e.target.value)}
                placeholder="0px"
                className="h-8 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Perspective */}
        <div>
          <label className="text-xs text-muted-foreground">Perspective</label>
          <Input
            type="text"
            value={value.perspective || ""}
            onChange={(e) => handleChange("perspective", e.target.value)}
            placeholder="1000px"
            className="h-8 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
