"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentDefinition } from "./component-registry";
import { ColorPicker } from "./advanced-editors/color-picker";
import { SpacingControl } from "./advanced-editors/spacing-control";
import { TypographyControl } from "./advanced-editors/typography-control";
import { AnimationControl } from "./advanced-styling/animation-control";
import { EffectsControl } from "./advanced-styling/effects-control";
import { TransformControl } from "./advanced-styling/transform-control";
import { HoverControl } from "./advanced-styling/hover-control";
import { GradientControl } from "./advanced-styling/gradient-control";
import { VisualArrayEditor } from "./visual-array-editor";
import { getArraySchema } from "./array-schemas";
import { CustomCSSEditor } from "./advanced-styling/custom-css-editor";

interface ComponentPropertiesPanelProps {
  component: {
    id: string;
    type: string;
    props: Record<string, any>;
    style?: Record<string, any>;
  };
  definition: ComponentDefinition;
  onUpdate: (props: Record<string, any>, style?: Record<string, any>) => void;
  onClose: () => void;
}

export function ComponentPropertiesPanel({
  component,
  definition,
  onUpdate,
  onClose,
}: ComponentPropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<"content" | "style" | "effects" | "advanced">("content");
  const [props, setProps] = useState(component.props);
  const [style, setStyle] = useState(component.style || {});

  const handleChange = (key: string, value: any) => {
    const newProps = { ...props, [key]: value };
    setProps(newProps);
    onUpdate(newProps, style);
  };

  const handleStyleChange = (key: string, value: any) => {
    const newStyle = { ...style, [key]: value };
    setStyle(newStyle);
    onUpdate(props, newStyle);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">
          {definition.icon} {definition.label}
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-accent rounded"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab("content")}
          className={`flex-1 py-2 px-3 font-medium transition-colors whitespace-nowrap text-sm ${
            activeTab === "content"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          📝 Content
        </button>
        <button
          onClick={() => setActiveTab("style")}
          className={`flex-1 py-2 px-3 font-medium transition-colors whitespace-nowrap text-sm ${
            activeTab === "style"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          🎨 Style
        </button>
        <button
          onClick={() => setActiveTab("effects")}
          className={`flex-1 py-2 px-3 font-medium transition-colors whitespace-nowrap text-sm ${
            activeTab === "effects"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          ✨ Effects
        </button>
        <button
          onClick={() => setActiveTab("advanced")}
          className={`flex-1 py-2 px-3 font-medium transition-colors whitespace-nowrap text-sm ${
            activeTab === "advanced"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          ⚙️ Advanced
        </button>
      </div>

      {/* Content Tab */}
      {activeTab === "content" && (
        <div className="space-y-4">
          {definition.propertySchema.map((schema) => (
            <div key={schema.key} className="space-y-2">
              <Label htmlFor={schema.key}>{schema.label}</Label>
              
              {schema.type === "text" && (
                <Input
                  id={schema.key}
                  value={props[schema.key] || ""}
                  onChange={(e) => handleChange(schema.key, e.target.value)}
                />
              )}

              {schema.type === "textarea" && (
                <textarea
                  id={schema.key}
                  value={props[schema.key] || ""}
                  onChange={(e) => handleChange(schema.key, e.target.value)}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              )}

              {schema.type === "select" && schema.options && (
                <select
                  id={schema.key}
                  value={props[schema.key] || ""}
                  onChange={(e) => handleChange(schema.key, e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {schema.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {schema.type === "number" && (
                <Input
                  id={schema.key}
                  type="number"
                  value={props[schema.key] || 0}
                  onChange={(e) => handleChange(schema.key, parseInt(e.target.value))}
                />
              )}

              {schema.type === "image" && (
                <div className="space-y-2">
                  <Input
                    id={schema.key}
                    value={props[schema.key] || ""}
                    onChange={(e) => handleChange(schema.key, e.target.value)}
                    placeholder="Image URL"
                  />
                  {props[schema.key] && (
                    <img 
                      src={props[schema.key]} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded border"
                    />
                  )}
                </div>
              )}

              {schema.type === "color" && (
                <ColorPicker
                  label={schema.label}
                  value={props[schema.key] || ""}
                  onChange={(value) => handleChange(schema.key, value)}
                />
              )}

              {schema.type === "array" && (
                <VisualArrayEditor
                  value={props[schema.key] || []}
                  onChange={(value) => handleChange(schema.key, value)}
                  itemSchema={getArraySchema(schema.key)}
                  label={schema.label}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Style Tab */}
      {activeTab === "style" && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase">Layout</h4>
            
            <SpacingControl
              label="Padding"
              value={style.padding || {}}
              onChange={(value) => handleStyleChange("padding", value)}
            />

            <SpacingControl
              label="Margin"
              value={style.margin || {}}
              onChange={(value) => handleStyleChange("margin", value)}
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase">Colors</h4>
            
            <ColorPicker
              label="Background Color"
              value={style.backgroundColor || ""}
              onChange={(value) => handleStyleChange("backgroundColor", value)}
            />

            <ColorPicker
              label="Text Color"
              value={style.color || ""}
              onChange={(value) => handleStyleChange("color", value)}
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase">Typography</h4>
            
            <TypographyControl
              label="Typography"
              value={style.typography || {}}
              onChange={(value) => handleStyleChange("typography", value)}
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase">Border</h4>
            
            <div>
              <Label>Border Width</Label>
              <Input
                type="text"
                value={style.borderWidth || ""}
                onChange={(e) => handleStyleChange("borderWidth", e.target.value)}
                placeholder="1px"
              />
            </div>

            <ColorPicker
              label="Border Color"
              value={style.borderColor || ""}
              onChange={(value) => handleStyleChange("borderColor", value)}
            />

            <div>
              <Label>Border Radius</Label>
              <Input
                type="text"
                value={style.borderRadius || ""}
                onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
                placeholder="8px"
              />
            </div>
          </div>
        </div>
      )}

      {/* Effects Tab */}
      {activeTab === "effects" && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase">Animation</h4>
            
            <AnimationControl
              label="Entrance Animation"
              value={style.animation || {}}
              onChange={(value) => handleStyleChange("animation", value)}
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase">Filters & Effects</h4>
            
            <EffectsControl
              label="Visual Effects"
              value={style.effects || {}}
              onChange={(value) => handleStyleChange("effects", value)}
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase">3D Transform</h4>
            
            <TransformControl
              label="3D Transformations"
              value={style.transform || {}}
              onChange={(value) => handleStyleChange("transform", value)}
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase">Hover Effects</h4>
            
            <HoverControl
              label="Hover State"
              value={style.hover || {}}
              onChange={(value) => handleStyleChange("hover", value)}
            />
          </div>
        </div>
      )}

      {/* Advanced Tab */}
      {activeTab === "advanced" && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase">Gradient Background</h4>
            
            <GradientControl
              label="Gradient"
              value={style.gradient || {}}
              onChange={(value) => handleStyleChange("gradient", value)}
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase">Custom CSS</h4>
            
            <CustomCSSEditor
              label="Custom Styles"
              value={style.customCSS || ""}
              onChange={(value) => handleStyleChange("customCSS", value)}
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase">CSS Classes</h4>
            
            <div>
              <Label>Custom Classes</Label>
              <Input
                type="text"
                value={style.customClasses || ""}
                onChange={(e) => handleStyleChange("customClasses", e.target.value)}
                placeholder="class-1 class-2 class-3"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Add custom CSS class names separated by spaces
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase">Advanced Properties</h4>
            
            <div>
              <Label>Z-Index</Label>
              <Input
                type="text"
                value={style.zIndex || ""}
                onChange={(e) => handleStyleChange("zIndex", e.target.value)}
                placeholder="auto"
              />
            </div>

            <div>
              <Label>Position</Label>
              <select
                value={style.position || "relative"}
                onChange={(e) => handleStyleChange("position", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="static">Static</option>
                <option value="relative">Relative</option>
                <option value="absolute">Absolute</option>
                <option value="fixed">Fixed</option>
                <option value="sticky">Sticky</option>
              </select>
            </div>

            <div>
              <Label>Overflow</Label>
              <select
                value={style.overflow || "visible"}
                onChange={(e) => handleStyleChange("overflow", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="visible">Visible</option>
                <option value="hidden">Hidden</option>
                <option value="scroll">Scroll</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div>
              <Label>Cursor</Label>
              <select
                value={style.cursor || "default"}
                onChange={(e) => handleStyleChange("cursor", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="default">Default</option>
                <option value="pointer">Pointer</option>
                <option value="move">Move</option>
                <option value="text">Text</option>
                <option value="wait">Wait</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          Component ID: {component.id}
        </p>
      </div>
    </div>
  );
}
