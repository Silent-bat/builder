"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface VisualArrayEditorProps {
  value: any[];
  onChange: (value: any[]) => void;
  itemSchema?: Record<string, { type: string; label: string; options?: any[] }>;
  label?: string;
}

export function VisualArrayEditor({
  value = [],
  onChange,
  itemSchema,
  label,
}: VisualArrayEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleAdd = () => {
    const newItem = itemSchema
      ? Object.keys(itemSchema).reduce((acc, key) => {
          const schema = itemSchema[key];
          if (schema.type === "array") {
            acc[key] = [];
          } else if (schema.type === "number") {
            acc[key] = 0;
          } else if (schema.type === "boolean") {
            acc[key] = false;
          } else {
            acc[key] = "";
          }
          return acc;
        }, {} as any)
      : {};

    onChange([...value, newItem]);
    setExpandedIndex(value.length);
  };

  const handleRemove = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const handleUpdate = (index: number, updates: any) => {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], ...updates };
    onChange(newValue);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= value.length) return;

    const newValue = [...value];
    [newValue[index], newValue[newIndex]] = [newValue[newIndex], newValue[index]];
    onChange(newValue);
    setExpandedIndex(newIndex);
  };

  const getItemPreview = (item: any): string => {
    if (typeof item === "string") return item;
    
    // Try common preview fields
    const previewFields = ["title", "name", "label", "question", "productName", "heading"];
    for (const field of previewFields) {
      if (item[field]) return item[field];
    }
    
    // Fallback to first string value
    const firstString = Object.values(item).find(v => typeof v === "string");
    return firstString ? String(firstString) : "Item";
  };

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">{label}</Label>
          <span className="text-xs text-muted-foreground">{value.length} items</span>
        </div>
      )}

      <div className="space-y-2">
        {value.map((item, index) => (
          <Card key={index} className="p-3">
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="flex-1 text-left text-sm font-medium hover:text-primary transition-colors truncate"
              >
                {index + 1}. {getItemPreview(item)}
              </button>
              <div className="flex gap-1 ml-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMove(index, "up")}
                  disabled={index === 0}
                  className="h-7 w-7 p-0"
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMove(index, "down")}
                  disabled={index === value.length - 1}
                  className="h-7 w-7 p-0"
                >
                  ↓
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(index)}
                  className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                >
                  ✕
                </Button>
              </div>
            </div>

            {expandedIndex === index && itemSchema && (
              <div className="space-y-3 mt-3 pt-3 border-t">
                {Object.entries(itemSchema).map(([key, schema]) => (
                  <div key={key} className="space-y-1">
                    <Label className="text-xs">{schema.label}</Label>
                    {schema.type === "text" && (
                      <Input
                        value={item[key] || ""}
                        onChange={(e) =>
                          handleUpdate(index, { [key]: e.target.value })
                        }
                        className="h-8 text-sm"
                      />
                    )}
                    {schema.type === "textarea" && (
                      <textarea
                        value={item[key] || ""}
                        onChange={(e) =>
                          handleUpdate(index, { [key]: e.target.value })
                        }
                        className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    )}
                    {schema.type === "number" && (
                      <Input
                        type="number"
                        value={item[key] || 0}
                        onChange={(e) =>
                          handleUpdate(index, { [key]: parseFloat(e.target.value) || 0 })
                        }
                        className="h-8 text-sm"
                      />
                    )}
                    {schema.type === "boolean" && (
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item[key] || false}
                          onChange={(e) =>
                            handleUpdate(index, { [key]: e.target.checked })
                          }
                          className="rounded border-input"
                        />
                      </div>
                    )}
                    {schema.type === "select" && (
                      <select
                        value={item[key] || ""}
                        onChange={(e) =>
                          handleUpdate(index, { [key]: e.target.value })
                        }
                        className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Select...</option>
                        {schema.options?.map((opt: any) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {schema.type === "image" && (
                      <Input
                        type="url"
                        value={item[key] || ""}
                        onChange={(e) =>
                          handleUpdate(index, { [key]: e.target.value })
                        }
                        placeholder="https://..."
                        className="h-8 text-sm"
                      />
                    )}
                    {schema.type === "array" && (
                      <div className="p-2 border rounded bg-muted/30">
                        <p className="text-xs text-muted-foreground mb-1">
                          Array items (comma-separated)
                        </p>
                        <Input
                          value={Array.isArray(item[key]) ? item[key].join(", ") : ""}
                          onChange={(e) => {
                            const values = e.target.value
                              .split(",")
                              .map(v => v.trim())
                              .filter(v => v);
                            handleUpdate(index, { [key]: values });
                          }}
                          placeholder="Item 1, Item 2, Item 3"
                          className="h-8 text-sm"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAdd}
        className="w-full"
      >
        + Add Item
      </Button>
    </div>
  );
}
