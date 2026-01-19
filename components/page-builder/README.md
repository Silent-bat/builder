# Advanced Page Builder

A fully customizable, drag-and-drop page builder with advanced styling controls, undo/redo, and responsive preview modes.

## Features

### ✨ Core Features
- **Drag & Drop**: Reorder components easily with intuitive drag-and-drop
- **Component Library**: 11+ pre-built components organized by category
- **Live Preview**: Real-time preview as you build
- **Undo/Redo**: Full history support with keyboard shortcuts
- **Search**: Quickly find components by name or type
- **Component Categories**: Organized into Layout, Content, Marketing, and Commerce

### 🎨 Advanced Styling
- **Color Picker**: Full color customization with presets and custom colors
- **Spacing Controls**: Individual control over padding and margin (top, right, bottom, left)
- **Typography**: Font size, weight, line height, and letter spacing
- **Borders**: Width, color, and border radius
- **Background**: Custom background colors for each component

### 📱 Responsive Design
- **Preview Modes**: Desktop, Tablet (768px), and Mobile (375px) views
- **Responsive Breakpoints**: Test your design across different screen sizes
- **Device Icons**: Quick switching between preview modes

### ⌨️ Keyboard Shortcuts
- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Y` or `Ctrl/Cmd + Shift + Z`: Redo
- `Ctrl/Cmd + S`: Save page
- `Ctrl/Cmd + D`: Duplicate selected component
- `Delete` or `Backspace`: Delete selected component
- `Escape`: Deselect component

## Component Categories

### 🏗️ Layout
- **Navigation Bar**: Responsive navbar with logo and links
- **Footer**: Multi-column footer with social links

### 📄 Content
- **Text Content**: Rich text with alignment options
- **Image**: Images with captions and size options
- **FAQ**: Accordion-style frequently asked questions

### 📢 Marketing
- **Hero Section**: Eye-catching hero with CTA
- **Features Grid**: Showcase key features
- **Call to Action**: Conversion-focused CTA sections
- **Testimonials**: Customer reviews and ratings
- **Statistics**: Display key metrics

### 🛒 Commerce
- **Pricing Table**: Pricing plans with features

## Usage

### Basic Usage

```tsx
import { PageEditor } from "@/components/page-builder/page-editor";

export default function EditPage() {
  const handleSave = async (components) => {
    // Save components to your backend
    await fetch("/api/pages", {
      method: "POST",
      body: JSON.stringify({ components }),
    });
  };

  return (
    <PageEditor
      pageId="page-id"
      initialComponents={[]}
      onSave={handleSave}
    />
  );
}
```

### Rendering a Published Page

```tsx
import { PageRenderer } from "@/components/page-builder/page-renderer";

export default function PublicPage({ components }) {
  return <PageRenderer components={components} />;
}
```

## Component Structure

Each component has:
- `id`: Unique identifier
- `type`: Component type (hero, features, etc.)
- `props`: Component-specific properties
- `style`: Custom styling (optional)

### Example Component Data

```json
{
  "id": "component_1234567890_abc123",
  "type": "hero",
  "props": {
    "title": "Welcome to Our Platform",
    "subtitle": "Build amazing things",
    "buttonText": "Get Started",
    "buttonLink": "/signup"
  },
  "style": {
    "padding": {
      "top": "80px",
      "bottom": "80px"
    },
    "backgroundColor": "#f3f4f6",
    "typography": {
      "fontSize": "48px",
      "fontWeight": "700"
    }
  }
}
```

## Creating Custom Components

### 1. Create the Block Component

```tsx
// components/page-builder/blocks/custom-block.tsx
export function CustomBlock({ title, description }: { title: string; description: string }) {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
```

### 2. Register the Component

```tsx
// components/page-builder/component-registry.tsx
import { CustomBlock } from "./blocks/custom-block";

export const componentRegistry: ComponentDefinition[] = [
  // ... other components
  {
    type: "custom",
    label: "Custom Section",
    icon: "✨",
    category: "content",
    component: CustomBlock,
    defaultProps: {
      title: "Custom Title",
      description: "Custom description",
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
];
```

## Advanced Property Editors

### Available Property Types

- `text`: Single-line text input
- `textarea`: Multi-line text input
- `select`: Dropdown selection
- `number`: Numeric input
- `color`: Color picker with presets
- `image`: Image URL with preview
- `array`: JSON editor for complex data

### Custom Property Schema

```tsx
propertySchema: [
  { key: "title", label: "Title", type: "text" },
  { 
    key: "alignment", 
    label: "Alignment", 
    type: "select",
    options: [
      { label: "Left", value: "left" },
      { label: "Center", value: "center" },
      { label: "Right", value: "right" },
    ]
  },
  { key: "backgroundColor", label: "Background Color", type: "color" },
]
```

## Tips & Best Practices

1. **Use Categories Wisely**: Organize components by their primary use case
2. **Default Props**: Always provide sensible defaults for new components
3. **Component Naming**: Use clear, descriptive names and icons
4. **Responsive Testing**: Always test in all three preview modes
5. **Save Often**: Use Ctrl/Cmd + S to save your work regularly
6. **Undo History**: The builder maintains up to 50 undo states

## Architecture

```
components/page-builder/
├── page-editor.tsx              # Main editor component
├── page-renderer.tsx            # Public-facing renderer
├── component-registry.tsx       # Component definitions
├── component-properties-panel.tsx # Properties editor
├── advanced-properties-panel.tsx  # Wrapper for properties
├── sortable-component.tsx       # Draggable component wrapper
├── style-utils.tsx              # Style application utilities
├── advanced-editors/            # Advanced input controls
│   ├── color-picker.tsx
│   ├── spacing-control.tsx
│   ├── typography-control.tsx
│   └── responsive-control.tsx
└── blocks/                      # Component implementations
    ├── hero-block.tsx
    ├── features-block.tsx
    ├── cta-block.tsx
    └── ...
```

## Future Enhancements

- [ ] Component templates/presets
- [ ] Global style settings
- [ ] Custom CSS injection
- [ ] Image upload integration
- [ ] A/B testing variants
- [ ] SEO metadata per component
- [ ] Animation/transition controls
- [ ] Grid/flexbox layout options
