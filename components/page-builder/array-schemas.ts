// Define schemas for different array types in components

export const arraySchemas: Record<string, Record<string, { type: string; label: string; options?: any[] }>> = {
  links: {
    label: { type: "text", label: "Label" },
    href: { type: "text", label: "Link URL" },
  },
  features: {
    title: { type: "text", label: "Title" },
    description: { type: "textarea", label: "Description" },
    icon: { type: "text", label: "Icon (emoji or text)" },
  },
  tiers: {
    name: { type: "text", label: "Plan Name" },
    price: { type: "text", label: "Price" },
    features: { type: "array", label: "Features (comma-separated)" },
    highlighted: { type: "boolean", label: "Highlight this plan" },
  },
  testimonials: {
    name: { type: "text", label: "Name" },
    role: { type: "text", label: "Role/Title" },
    content: { type: "textarea", label: "Testimonial" },
    rating: { type: "number", label: "Rating (1-5)" },
    avatar: { type: "image", label: "Avatar URL" },
  },
  faqs: {
    question: { type: "text", label: "Question" },
    answer: { type: "textarea", label: "Answer" },
  },
  stats: {
    value: { type: "text", label: "Value" },
    label: { type: "text", label: "Label" },
    icon: { type: "text", label: "Icon (emoji)" },
  },
  sections: {
    title: { type: "text", label: "Section Title" },
    links: { type: "array", label: "Links (format: Label|URL, comma-separated)" },
  },
  socialLinks: {
    icon: { type: "text", label: "Icon (emoji or text)" },
    href: { type: "text", label: "URL" },
    label: { type: "text", label: "Label" },
  },
  products: {
    name: { type: "text", label: "Product Name" },
    price: { type: "number", label: "Price" },
    image: { type: "image", label: "Image URL" },
    category: { type: "text", label: "Category" },
    rating: { type: "number", label: "Rating (1-5)" },
    description: { type: "textarea", label: "Description" },
    badge: { type: "text", label: "Badge (optional)" },
  },
  images: {
    url: { type: "image", label: "Image URL" },
    alt: { type: "text", label: "Alt Text" },
  },
  categories: {
    name: { type: "text", label: "Category Name" },
    image: { type: "image", label: "Image URL" },
    productCount: { type: "number", label: "Product Count" },
    link: { type: "text", label: "Link URL" },
  },
  brands: {
    name: { type: "text", label: "Brand Name" },
    logo: { type: "image", label: "Logo URL" },
  },
  steps: {
    title: { type: "text", label: "Step Title" },
    description: { type: "textarea", label: "Description" },
    icon: { type: "text", label: "Icon/Number" },
  },
  slides: {
    image: { type: "image", label: "Background Image URL" },
    title: { type: "text", label: "Slide Title" },
    description: { type: "textarea", label: "Description" },
    buttonText: { type: "text", label: "Button Text (optional)" },
    buttonLink: { type: "text", label: "Button Link (optional)" },
  },
  cards: {
    title: { type: "text", label: "Card Title" },
    description: { type: "textarea", label: "Description" },
    icon: { type: "text", label: "Icon (emoji or text)" },
  },
};

// Helper to get schema for an array field
export function getArraySchema(fieldName: string): Record<string, { type: string; label: string; options?: any[] }> | undefined {
  return arraySchemas[fieldName];
}
