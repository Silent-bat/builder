"use client";

import { ComponentDefinition } from "./component-registry";
import { ComponentPropertiesPanel } from "./component-properties-panel";

interface PageComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  style?: Record<string, any>;
  styles?: {
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    textColor?: string;
  };
}

interface AdvancedPropertiesPanelProps {
  component: PageComponent;
  definition: ComponentDefinition;
  onUpdate: (updates: Partial<PageComponent>) => void;
  onClose: () => void;
}

export function AdvancedPropertiesPanel({
  component,
  definition,
  onUpdate,
  onClose,
}: AdvancedPropertiesPanelProps) {
  const handlePropsUpdate = (props: Record<string, any>, style?: Record<string, any>) => {
    onUpdate({ 
      props,
      style: style || component.style,
    });
  };

  return (
    <div className="w-96 border-l bg-background flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4">
        <ComponentPropertiesPanel
          component={{
            ...component,
            style: component.style,
          }}
          definition={definition}
          onUpdate={handlePropsUpdate}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
