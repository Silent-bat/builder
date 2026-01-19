"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { renderComponent, getComponentByType } from "./component-registry";
import { applyComponentStyles } from "./style-utils";

interface SortableComponentProps {
  id: string;
  type: string;
  props: Record<string, any>;
  styles?: Record<string, any>;
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onPropChange?: (key: string, value: any) => void;
}

export function SortableComponent({
  id,
  type,
  props,
  styles,
  isSelected,
  onClick,
  onDelete,
  onDuplicate,
  onPropChange,
}: SortableComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const definition = getComponentByType(type);

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className={`relative group ${isSelected ? 'ring-2 ring-primary' : ''} ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}`}
        onClick={onClick}
      >
        {/* Drag Handle & Actions */}
        <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            {...attributes}
            {...listeners}
            className="p-2 bg-background border rounded hover:bg-accent cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="p-2 bg-background border rounded hover:bg-accent"
            title="Duplicate"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 bg-background border rounded hover:bg-destructive hover:text-destructive-foreground"
            title="Delete"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* Component Label */}
        <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-2 py-1 bg-background border rounded text-xs font-medium">
            {definition?.icon} {definition?.label}
          </span>
        </div>

        {/* Component Preview */}
        <div className={isSelected ? "pointer-events-auto" : "pointer-events-none"} style={applyComponentStyles(styles)}>
          {renderComponent(type, props, { 
            isEditMode: isSelected, 
            onPropChange 
          })}
        </div>
      </Card>
    </div>
  );
}
