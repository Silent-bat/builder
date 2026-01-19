# Visual Page Builder Editor Guide

## Overview

The page builder now features a **fully visual editing experience** with no JSON editing required. All components can be edited through intuitive visual controls.

## Key Improvements

### 1. Visual Array Editor
Previously, arrays (like navigation links, features, testimonials, etc.) required editing raw JSON. Now you get:

- **Visual item cards** for each array element
- **Add/Remove/Reorder** buttons for easy management
- **Inline editing** of all item properties
- **Expandable sections** to keep the interface clean
- **Type-specific fields** (text, number, image, boolean, etc.)

### 2. Smart Field Detection
The editor automatically detects what kind of data you're editing:
- Text fields → Text inputs
- Numbers → Number inputs
- Images → URL inputs with image preview support
- Booleans → Checkboxes
- Arrays within arrays → Comma-separated input

### 3. Component-Specific Schemas
Each component type has its own schema defining what fields are editable:

#### Navbar Links
- Label (text)
- Link URL (text)

#### Features
- Title (text)
- Description (textarea)
- Icon (emoji or text)

#### Testimonials
- Name (text)
- Role/Title (text)
- Testimonial content (textarea)
- Rating (1-5 number)
- Avatar URL (image)

#### Pricing Tiers
- Plan Name (text)
- Price (text)
- Features (comma-separated list)
- Highlighted (checkbox)

#### Products
- Product Name (text)
- Price (number)
- Image URL (image)
- Category (text)
- Rating (number)
- Description (textarea)
- Badge (optional text)

And many more...

## How to Use

### Editing Array Fields

1. **Click on a component** in the page builder
2. **Go to the Content tab** in the properties panel
3. **Find array fields** (like "Navigation Links", "Features", etc.)
4. **Click "Add Item"** to add a new element
5. **Click on an item** to expand and edit its properties
6. **Use arrow buttons** (↑↓) to reorder items
7. **Click the ✕ button** to remove an item

### Reordering Items

- **↑ button**: Move item up in the list
- **↓ button**: Move item down in the list
- Items at the top/bottom have disabled arrows

### Editing Nested Arrays

Some fields contain arrays within arrays (like footer sections with multiple links). These use a simplified comma-separated input:

```
Feature 1, Feature 2, Feature 3
```

The system automatically converts this to an array when saving.

## Available Components with Array Editing

### Layout Components
- **Navbar**: Navigation links, logo
- **Footer**: Footer sections, social links

### Marketing Components
- **Hero**: Background images, CTAs
- **Features**: Feature cards with icons
- **Testimonials**: Customer reviews with ratings
- **Stats**: Statistics with icons
- **CTA**: Call-to-action buttons
- **Newsletter**: Signup forms
- **Brand Showcase**: Brand logos

### Commerce Components
- **Product Grid**: Multiple products with filters
- **Product Showcase**: Featured product with images
- **Category Showcase**: Product categories
- **Pricing**: Pricing tiers with features

### Content Components
- **FAQ**: Question and answer pairs
- **Text**: Rich text content
- **Image**: Image galleries

## Tips for Best Experience

1. **Save frequently**: Changes are applied immediately but saved on publish
2. **Use descriptive names**: Make it easy to identify items in collapsed view
3. **Preview often**: Test your page on different screen sizes
4. **Leverage templates**: Start with pre-built templates and customize

## Technical Details

### File Structure
```
components/page-builder/
├── visual-array-editor.tsx       # Main visual editor component
├── array-schemas.ts              # Schema definitions for all array types
├── component-properties-panel.tsx # Properties panel with visual editor integration
├── inline-editable.tsx           # Inline text editing component
└── VISUAL_EDITOR_GUIDE.md       # This file
```

### Adding New Array Types

To add a new array type with visual editing:

1. **Define the schema** in `array-schemas.ts`:
```typescript
export const arraySchemas = {
  myNewArray: {
    fieldName: { type: "text", label: "Field Label" },
    anotherField: { type: "number", label: "Number Field" },
  },
  // ... other schemas
};
```

2. **Use it in component registry** in `component-registry.tsx`:
```typescript
propertySchema: [
  { key: "myNewArray", label: "My Array", type: "array" },
]
```

3. The visual editor will automatically pick it up!

### Supported Field Types
- `text`: Single-line text input
- `textarea`: Multi-line text input
- `number`: Number input
- `boolean`: Checkbox
- `image`: URL input for images
- `select`: Dropdown with options
- `array`: Nested array (comma-separated)

## Future Enhancements

Potential improvements for the visual editor:
- Drag-and-drop reordering
- Image upload integration
- Rich text editor for textarea fields
- Color picker for color fields
- Icon picker for icon fields
- Template presets for common array structures
