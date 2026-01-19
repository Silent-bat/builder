"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { componentRegistry, renderComponent } from "./component-registry";
import { SortableComponent } from "./sortable-component";
import { AdvancedPropertiesPanel } from "./advanced-properties-panel";
import { toast } from "@/lib/toast";

interface PageComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  styles?: {
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    textColor?: string;
  };
}

interface PageEditorProps {
  pageId?: string;
  initialComponents?: PageComponent[];
  onSave?: (components: PageComponent[]) => void;
}

export function PageEditor({ pageId, initialComponents = [], onSave }: PageEditorProps) {
  const [components, setComponents] = useState<PageComponent[]>(initialComponents);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"edit" | "desktop" | "tablet" | "mobile">("edit");
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [history, setHistory] = useState<PageComponent[][]>([initialComponents]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo: Ctrl+Z or Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      
      // Redo: Ctrl+Y or Cmd+Shift+Z
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
      
      // Save: Ctrl+S or Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
      
      // Duplicate selected component: Ctrl+D or Cmd+D
      if ((e.ctrlKey || e.metaKey) && e.key === "d" && selectedComponent) {
        e.preventDefault();
        duplicateComponent(selectedComponent);
      }
      
      // Deselect: Escape
      if (e.key === "Escape" && selectedComponent) {
        e.preventDefault();
        setSelectedComponent(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIndex, history, selectedComponent, components]);

  const addToHistory = (newComponents: PageComponent[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newComponents);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newComponents = arrayMove(items, oldIndex, newIndex);
        addToHistory(newComponents);
        return newComponents;
      });
    }
  };

  const addComponent = (type: string) => {
    const definition = componentRegistry.find(c => c.type === type);
    if (!definition) return;

    const newComponent: PageComponent = {
      id: `component_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      type,
      props: { ...definition.defaultProps },
      styles: {
        padding: "default",
        margin: "default",
        backgroundColor: "transparent",
        textColor: "default",
      },
    };

    const newComponents = [...components, newComponent];
    setComponents(newComponents);
    setSelectedComponent(newComponent.id);
    addToHistory(newComponents);
    toast.success(`${definition.label} added`);
  };

  const updateComponent = (id: string, updates: Partial<PageComponent>) => {
    const newComponents = components.map(c => 
      c.id === id ? { ...c, ...updates } : c
    );
    setComponents(newComponents);
    addToHistory(newComponents);
  };

  const deleteComponent = (id: string) => {
    const newComponents = components.filter(c => c.id !== id);
    setComponents(newComponents);
    addToHistory(newComponents);
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
    toast.success("Component removed");
  };

  const duplicateComponent = (id: string) => {
    const component = components.find(c => c.id === id);
    if (!component) return;

    const newComponent: PageComponent = {
      ...component,
      id: `component_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    };

    const index = components.findIndex(c => c.id === id);
    const newComponents = [...components];
    newComponents.splice(index + 1, 0, newComponent);
    setComponents(newComponents);
    addToHistory(newComponents);
    toast.success("Component duplicated");
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setComponents(history[historyIndex - 1]);
      toast.success("Undo");
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setComponents(history[historyIndex + 1]);
      toast.success("Redo");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (onSave) {
        await onSave(components);
      }
      toast.success("Page saved successfully");
    } catch (error) {
      toast.error("Failed to save page");
    } finally {
      setSaving(false);
    }
  };

  const filteredComponents = componentRegistry.filter(c =>
    c.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const componentsByCategory = filteredComponents.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, typeof componentRegistry>);

  const categoryLabels = {
    layout: { label: "Layout", icon: "🏗️" },
    content: { label: "Content", icon: "📄" },
    marketing: { label: "Marketing", icon: "📢" },
    commerce: { label: "Commerce", icon: "🛒" },
  };

  const selectedComponentData = components.find(c => c.id === selectedComponent);
  const selectedDefinition = selectedComponentData 
    ? componentRegistry.find(d => d.type === selectedComponentData.type)
    : null;

  const previewWidth = {
    edit: "100%",
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  }[previewMode];

  return (
    <div className="flex h-full">
      {/* Component Library Sidebar */}
      {previewMode === "edit" && (
        <div className="w-72 border-r bg-muted/30 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b">
            <Input
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9"
            />
          </div>

          {/* Components by Category */}
          <div className="flex-1 overflow-y-auto p-4">
            {searchTerm ? (
              <>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Search Results ({filteredComponents.length})
                </h3>
                <div className="space-y-2">
                  {filteredComponents.map((component) => (
                    <button
                      key={component.type}
                      onClick={() => addComponent(component.type)}
                      className="w-full text-left p-3 rounded-lg border bg-background hover:bg-accent transition-colors hover:shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{component.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{component.label}</p>
                          <p className="text-xs text-muted-foreground">{component.type}</p>
                        </div>
                        <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                {Object.entries(componentsByCategory).map(([category, components]) => (
                  <div key={category}>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <span>{categoryLabels[category as keyof typeof categoryLabels].icon}</span>
                      <span>{categoryLabels[category as keyof typeof categoryLabels].label}</span>
                      <span className="text-xs font-normal">({components.length})</span>
                    </h3>
                    <div className="space-y-2">
                      {components.map((component) => (
                        <button
                          key={component.type}
                          onClick={() => addComponent(component.type)}
                          className="w-full text-left p-3 rounded-lg border bg-background hover:bg-accent transition-colors hover:shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{component.icon}</span>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{component.label}</p>
                              <p className="text-xs text-muted-foreground">{component.type}</p>
                            </div>
                            <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-t bg-background">
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex justify-between">
                <span>Components:</span>
                <span className="font-medium">{components.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Available:</span>
                <span className="font-medium">{componentRegistry.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Enhanced Toolbar */}
        <div className="border-b p-3 flex items-center justify-between bg-background shadow-sm">
          <div className="flex items-center gap-2">
            {/* Undo/Redo */}
            <div className="flex items-center gap-1 border-r pr-2 mr-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={undo}
                disabled={historyIndex <= 0}
                title="Undo (Ctrl+Z)"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                title="Redo (Ctrl+Y)"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
                </svg>
              </Button>
            </div>

            {/* Preview Mode Buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant={previewMode === "edit" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("edit")}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Button>
              <Button
                variant={previewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("desktop")}
                title="Desktop Preview"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Button>
              <Button
                variant={previewMode === "tablet" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("tablet")}
                title="Tablet Preview"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </Button>
              <Button
                variant={previewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("mobile")}
                title="Mobile Preview"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </Button>
            </div>

            <div className="border-r pr-2 mr-2" />

            {/* Clear All */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm("Clear all components?")) {
                  const newComponents: PageComponent[] = [];
                  setComponents(newComponents);
                  addToHistory(newComponents);
                  setSelectedComponent(null);
                  toast.success("All components cleared");
                }
              }}
              disabled={components.length === 0}
              title="Clear All"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </Button>
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} disabled={saving}>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            {saving ? "Saving..." : "Save Page"}
          </Button>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto bg-muted/20">
          <div 
            className="mx-auto transition-all duration-300"
            style={{ 
              width: previewWidth,
              minHeight: "100%",
            }}
          >
            {components.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center text-muted-foreground max-w-md">
                  <div className="mb-4 flex justify-center">
                    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-lg font-medium mb-2">Start Building Your Page</p>
                  <p className="text-sm">
                    Add components from the sidebar to create your page
                  </p>
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg text-left">
                    <p className="text-xs font-medium mb-2">💡 Quick Tips:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Click components in sidebar to add them</li>
                      <li>• Drag components to reorder</li>
                      <li>• Click a component to edit properties</li>
                      <li>• Use preview modes to check responsiveness</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : previewMode !== "edit" ? (
              <div className="bg-background min-h-screen shadow-2xl">
                {components.map((component) => (
                  <div key={component.id}>
                    {renderComponent(component.type, component.props)}
                  </div>
                ))}
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={components.map(c => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="p-4 space-y-3">
                    {components.map((component) => (
                      <SortableComponent
                        key={component.id}
                        id={component.id}
                        type={component.type}
                        props={component.props}
                        styles={component.styles}
                        isSelected={selectedComponent === component.id}
                        onClick={() => setSelectedComponent(component.id)}
                        onDelete={() => deleteComponent(component.id)}
                        onDuplicate={() => duplicateComponent(component.id)}
                        onPropChange={(key, value) => {
                          updateComponent(component.id, {
                            props: { ...component.props, [key]: value }
                          });
                        }}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>

        {/* Footer Info Bar */}
        {previewMode === "edit" && (
          <div className="border-t p-2 bg-background flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>{components.length} components</span>
              {selectedComponent && (
                <span>• {selectedDefinition?.label} selected</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Z</kbd>
              <span className="mx-2">Undo</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Y</kbd>
              <span>Redo</span>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Properties Panel */}
      {previewMode === "edit" && selectedComponentData && selectedDefinition && (
        <AdvancedPropertiesPanel
          component={selectedComponentData}
          definition={selectedDefinition}
          onUpdate={(updates) => updateComponent(selectedComponentData.id, updates)}
          onClose={() => setSelectedComponent(null)}
        />
      )}
    </div>
  );
}
