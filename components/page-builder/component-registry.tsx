import { HeroBlock } from "./blocks/hero-block";
import { FeaturesBlock } from "./blocks/features-block";
import { CTABlock } from "./blocks/cta-block";
import { TextBlock } from "./blocks/text-block";
import { ImageBlock } from "./blocks/image-block";
import { PricingBlock } from "./blocks/pricing-block";
import { TestimonialsBlock } from "./blocks/testimonials-block";
import { FAQBlock } from "./blocks/faq-block";
import { StatsBlock } from "./blocks/stats-block";
import { FooterBlock } from "./blocks/footer-block";
import { NavbarBlock } from "./blocks/navbar-block";
import { ProductGridBlock } from "./blocks/product-grid-block";
import { ProductShowcaseBlock } from "./blocks/product-showcase-block";
import { CategoryShowcaseBlock } from "./blocks/category-showcase-block";
import { NewsletterBlock } from "./blocks/newsletter-block";
import { BrandShowcaseBlock } from "./blocks/brand-showcase-block";
import { TimelineBlock } from "./blocks/timeline-block";
import { CarouselBlock } from "./blocks/carousel-block";
import { ParallaxBlock } from "./blocks/parallax-block";
import { GlassCardBlock } from "./blocks/glass-card-block";
import { AnimatedBackgroundBlock } from "./blocks/animated-background-block";

export interface ComponentDefinition {
  type: string;
  label: string;
  icon: string;
  category: "layout" | "content" | "marketing" | "commerce";
  component: React.ComponentType<any>;
  defaultProps: Record<string, any>;
  propertySchema: PropertySchema[];
}

export interface PropertySchema {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "color" | "image" | "array" | "boolean";
  options?: { label: string; value: string }[];
}

export const componentRegistry: ComponentDefinition[] = [
  {
    type: "navbar",
    label: "Navigation Bar",
    icon: "📋",
    category: "layout",
    component: NavbarBlock,
    defaultProps: {
      brandName: "SaaS Boilerplate",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Docs", href: "/dashboard/docs" },
      ],
      showAuth: true,
      ctaText: "Get Started",
      ctaLink: "/auth/sign-up",
      transparent: false,
    },
    propertySchema: [
      { key: "brandName", label: "Brand Name", type: "text" },
      { key: "logo", label: "Logo URL", type: "image" },
      { key: "links", label: "Navigation Links", type: "array" },
      { key: "ctaText", label: "CTA Button Text", type: "text" },
      { key: "ctaLink", label: "CTA Button Link", type: "text" },
    ],
  },
  {
    type: "hero",
    label: "Hero Section",
    icon: "🎯",
    category: "marketing",
    component: HeroBlock,
    defaultProps: {
      title: "Welcome to Our Platform",
      subtitle: "Build amazing things with our powerful tools",
      buttonText: "Get Started",
      buttonLink: "#",
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "buttonText", label: "Button Text", type: "text" },
      { key: "buttonLink", label: "Button Link", type: "text" },
      { key: "backgroundImage", label: "Background Image URL", type: "image" },
    ],
  },
  {
    type: "features",
    label: "Features Grid",
    icon: "⭐",
    category: "marketing",
    component: FeaturesBlock,
    defaultProps: {
      title: "Features",
      subtitle: "Everything you need to succeed",
      features: [
        { title: "Fast", description: "Lightning-fast performance", icon: "⚡" },
        { title: "Secure", description: "Bank-level security", icon: "🔒" },
        { title: "Reliable", description: "99.9% uptime guarantee", icon: "✓" },
      ],
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "features", label: "Features", type: "array" },
    ],
  },
  {
    type: "cta",
    label: "Call to Action",
    icon: "🎉",
    category: "marketing",
    component: CTABlock,
    defaultProps: {
      title: "Ready to get started?",
      description: "Join thousands of users already using our platform",
      buttonText: "Sign Up Now",
      buttonLink: "/auth/sign-up",
      secondaryButtonText: "Learn More",
      secondaryButtonLink: "#",
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "buttonText", label: "Primary Button Text", type: "text" },
      { key: "buttonLink", label: "Primary Button Link", type: "text" },
      { key: "secondaryButtonText", label: "Secondary Button Text", type: "text" },
      { key: "secondaryButtonLink", label: "Secondary Button Link", type: "text" },
    ],
  },
  {
    type: "text",
    label: "Text Content",
    icon: "📝",
    category: "content",
    component: TextBlock,
    defaultProps: {
      content: "<p>Add your content here...</p>",
      align: "left",
    },
    propertySchema: [
      { key: "content", label: "Content", type: "textarea" },
      { 
        key: "align", 
        label: "Alignment", 
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
        ]
      },
    ],
  },
  {
    type: "image",
    label: "Image",
    icon: "🖼️",
    category: "content",
    component: ImageBlock,
    defaultProps: {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
      alt: "Image",
      width: "large",
    },
    propertySchema: [
      { key: "src", label: "Image URL", type: "image" },
      { key: "alt", label: "Alt Text", type: "text" },
      { key: "caption", label: "Caption", type: "text" },
      { 
        key: "width", 
        label: "Width", 
        type: "select",
        options: [
          { label: "Full Width", value: "full" },
          { label: "Large", value: "large" },
          { label: "Medium", value: "medium" },
          { label: "Small", value: "small" },
        ]
      },
    ],
  },
  {
    type: "pricing",
    label: "Pricing Table",
    icon: "💰",
    category: "commerce",
    component: PricingBlock,
    defaultProps: {
      title: "Pricing Plans",
      subtitle: "Choose the perfect plan for your needs",
      tiers: [
        {
          name: "Free",
          price: "$0",
          features: ["Basic features", "Up to 5 projects", "Community support"]
        },
        {
          name: "Pro",
          price: "$29",
          features: ["All Free features", "Unlimited projects", "Priority support"],
          highlighted: true
        },
      ],
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "tiers", label: "Pricing Tiers", type: "array" },
    ],
  },
  {
    type: "testimonials",
    label: "Testimonials",
    icon: "💬",
    category: "marketing",
    component: TestimonialsBlock,
    defaultProps: {
      title: "What Our Users Say",
      subtitle: "Join thousands of satisfied customers",
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "CEO, TechCorp",
          content: "This platform has transformed how we build applications.",
          rating: 5
        },
        {
          name: "Michael Chen",
          role: "Lead Developer",
          content: "The best boilerplate I've used. Saved us months of development time.",
          rating: 5
        },
      ],
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "testimonials", label: "Testimonials", type: "array" },
    ],
  },
  {
    type: "faq",
    label: "FAQ",
    icon: "❓",
    category: "content",
    component: FAQBlock,
    defaultProps: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know",
      faqs: [
        {
          question: "What's included?",
          answer: "Full authentication, admin panel, page builder, and more."
        },
        {
          question: "Can I customize it?",
          answer: "Absolutely! Built with Tailwind CSS and fully customizable."
        },
      ],
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "faqs", label: "FAQ Items", type: "array" },
    ],
  },
  {
    type: "stats",
    label: "Statistics",
    icon: "📊",
    category: "marketing",
    component: StatsBlock,
    defaultProps: {
      stats: [
        { value: "10,000+", label: "Active Users", icon: "👥" },
        { value: "99.9%", label: "Uptime", icon: "⚡" },
        { value: "50+", label: "Features", icon: "✨" },
        { value: "24/7", label: "Support", icon: "💬" }
      ],
      backgroundColor: "muted",
    },
    propertySchema: [
      { key: "stats", label: "Statistics", type: "array" },
      { 
        key: "backgroundColor", 
        label: "Background", 
        type: "select",
        options: [
          { label: "Muted", value: "muted" },
          { label: "Primary", value: "primary" },
        ]
      },
    ],
  },
  {
    type: "footer",
    label: "Footer",
    icon: "🦶",
    category: "layout",
    component: FooterBlock,
    defaultProps: {
      companyName: "Your Company",
      tagline: "Build amazing things",
      sections: [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ]
        },
      ],
      socialLinks: [
        { icon: "𝕏", href: "#", label: "Twitter" },
        { icon: "in", href: "#", label: "LinkedIn" },
      ],
    },
    propertySchema: [
      { key: "companyName", label: "Company Name", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "sections", label: "Footer Sections", type: "array" },
      { key: "socialLinks", label: "Social Links", type: "array" },
    ],
  },
  {
    type: "productGrid",
    label: "Product Grid",
    icon: "🛍️",
    category: "commerce",
    component: ProductGridBlock,
    defaultProps: {
      title: "Our Products",
      subtitle: "Discover our collection",
      columns: "3",
      showFilters: true,
      products: [
        {
          id: "1",
          name: "Premium T-Shirt",
          price: 29.99,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
          category: "clothing",
          rating: 4.8,
          description: "Ultra-soft cotton blend",
          badge: "New",
        },
        {
          id: "2",
          name: "Running Shoes",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
          category: "footwear",
          rating: 4.9,
          description: "Lightweight and comfortable",
        },
        {
          id: "3",
          name: "Leather Backpack",
          price: 149.99,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
          category: "accessories",
          rating: 4.7,
          description: "Genuine leather with laptop compartment",
          badge: "Bestseller",
        },
      ],
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { 
        key: "columns", 
        label: "Columns", 
        type: "select",
        options: [
          { label: "2 Columns", value: "2" },
          { label: "3 Columns", value: "3" },
          { label: "4 Columns", value: "4" },
        ]
      },
      { key: "products", label: "Products", type: "array" },
    ],
  },
  {
    type: "productShowcase",
    label: "Product Showcase",
    icon: "⭐",
    category: "commerce",
    component: ProductShowcaseBlock,
    defaultProps: {
      productName: "Premium Wireless Headphones",
      tagline: "Immerse yourself in crystal-clear sound",
      price: 199.99,
      originalPrice: 299.99,
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop"],
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Premium leather cushions",
        "Bluetooth 5.0",
        "Foldable design with carrying case",
      ],
      buttonText: "Buy Now",
      buttonLink: "#",
      layout: "left",
    },
    propertySchema: [
      { key: "productName", label: "Product Name", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "price", label: "Price", type: "number" },
      { key: "originalPrice", label: "Original Price", type: "number" },
      { key: "images", label: "Images", type: "array" },
      { key: "features", label: "Features", type: "array" },
      { key: "buttonText", label: "Button Text", type: "text" },
      { key: "buttonLink", label: "Button Link", type: "text" },
      { 
        key: "layout", 
        label: "Layout", 
        type: "select",
        options: [
          { label: "Image Left", value: "left" },
          { label: "Image Right", value: "right" },
        ]
      },
    ],
  },
  {
    type: "categoryShowcase",
    label: "Category Showcase",
    icon: "📂",
    category: "commerce",
    component: CategoryShowcaseBlock,
    defaultProps: {
      title: "Shop by Category",
      subtitle: "Explore our collections",
      categories: [
        {
          name: "Men's Fashion",
          image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&h=400&fit=crop",
          productCount: 245,
          link: "#mens",
        },
        {
          name: "Women's Fashion",
          image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop",
          productCount: 312,
          link: "#womens",
        },
        {
          name: "Electronics",
          image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
          productCount: 189,
          link: "#electronics",
        },
        {
          name: "Home & Living",
          image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop",
          productCount: 156,
          link: "#home",
        },
      ],
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "categories", label: "Categories", type: "array" },
    ],
  },
  {
    type: "newsletter",
    label: "Newsletter Signup",
    icon: "✉️",
    category: "marketing",
    component: NewsletterBlock,
    defaultProps: {
      title: "Stay Updated",
      subtitle: "Subscribe to our newsletter for exclusive deals and new arrivals",
      placeholder: "Enter your email",
      buttonText: "Subscribe",
      showImage: true,
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "placeholder", label: "Placeholder", type: "text" },
      { key: "buttonText", label: "Button Text", type: "text" },
    ],
  },
  {
    type: "brandShowcase",
    label: "Brand Showcase",
    icon: "🏢",
    category: "marketing",
    component: BrandShowcaseBlock,
    defaultProps: {
      title: "Trusted by leading brands",
      backgroundColor: "default",
      brands: [
        { name: "Brand 1", logo: "" },
        { name: "Brand 2", logo: "" },
        { name: "Brand 3", logo: "" },
        { name: "Brand 4", logo: "" },
        { name: "Brand 5", logo: "" },
        { name: "Brand 6", logo: "" },
      ],
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "brands", label: "Brands", type: "array" },
      { 
        key: "backgroundColor", 
        label: "Background", 
        type: "select",
        options: [
          { label: "Default", value: "default" },
          { label: "Muted", value: "muted" },
        ]
      },
    ],
  },
  {
    type: "timeline",
    label: "Timeline / How It Works",
    icon: "🔄",
    category: "content",
    component: TimelineBlock,
    defaultProps: {
      title: "How It Works",
      subtitle: "Get started in three simple steps",
      steps: [
        {
          title: "Sign Up",
          description: "Create your account in seconds. No credit card required.",
          icon: "1"
        },
        {
          title: "Customize",
          description: "Tailor the platform to your needs with our intuitive interface.",
          icon: "2"
        },
        {
          title: "Launch",
          description: "Go live and start seeing results immediately.",
          icon: "3"
        }
      ],
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "steps", label: "Steps", type: "array" },
    ],
  },
  {
    type: "carousel",
    label: "Carousel / Slider",
    icon: "🎠",
    category: "marketing",
    component: CarouselBlock,
    defaultProps: {
      slides: [
        {
          image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200",
          title: "Welcome to Our Platform",
          description: "Build amazing things with our powerful tools",
          buttonText: "Get Started",
          buttonLink: "#",
        },
        {
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200",
          title: "Collaborate with Your Team",
          description: "Work together seamlessly across projects",
          buttonText: "Learn More",
          buttonLink: "#",
        },
      ],
      autoplay: true,
      interval: 5000,
      showArrows: true,
      showDots: true,
    },
    propertySchema: [
      { key: "slides", label: "Slides", type: "array" },
      { key: "autoplay", label: "Autoplay", type: "boolean" },
      { key: "interval", label: "Interval (ms)", type: "number" },
      { key: "showArrows", label: "Show Arrows", type: "boolean" },
      { key: "showDots", label: "Show Dots", type: "boolean" },
    ],
  },
  {
    type: "parallax",
    label: "Parallax Section",
    icon: "🌄",
    category: "marketing",
    component: ParallaxBlock,
    defaultProps: {
      backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600",
      title: "Parallax Effect",
      subtitle: "Scroll to see the magic happen",
      speed: 0.5,
      overlay: true,
      overlayOpacity: 0.5,
    },
    propertySchema: [
      { key: "backgroundImage", label: "Background Image", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "speed", label: "Parallax Speed", type: "number" },
      { key: "overlay", label: "Show Overlay", type: "boolean" },
      { key: "overlayOpacity", label: "Overlay Opacity", type: "number" },
    ],
  },
  {
    type: "glassCard",
    label: "Glass Cards",
    icon: "💎",
    category: "marketing",
    component: GlassCardBlock,
    defaultProps: {
      title: "Glassmorphism Design",
      subtitle: "Modern transparent cards with blur effect",
      cards: [
        {
          title: "Premium Quality",
          description: "Experience the highest quality with our glassmorphic design",
          icon: "✨",
        },
        {
          title: "Modern Aesthetic",
          description: "Clean, contemporary look that stands out",
          icon: "🎨",
        },
        {
          title: "Smooth Effects",
          description: "Blur and transparency create depth",
          icon: "🌊",
        },
      ],
      backgroundType: "gradient",
      backgroundImage: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600",
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "cards", label: "Cards", type: "array" },
      { 
        key: "backgroundType", 
        label: "Background Type", 
        type: "select",
        options: [
          { label: "Gradient", value: "gradient" },
          { label: "Image", value: "image" },
          { label: "Animated", value: "animated" },
        ]
      },
      { key: "backgroundImage", label: "Background Image", type: "text" },
    ],
  },
  {
    type: "animatedBackground",
    label: "Animated Background",
    icon: "🌟",
    category: "marketing",
    component: AnimatedBackgroundBlock,
    defaultProps: {
      title: "Animated Backgrounds",
      subtitle: "Create stunning visual experiences",
      buttonText: "Get Started",
      buttonLink: "#",
      animationType: "particles",
    },
    propertySchema: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "buttonText", label: "Button Text", type: "text" },
      { key: "buttonLink", label: "Button Link", type: "text" },
      { 
        key: "animationType", 
        label: "Animation Type", 
        type: "select",
        options: [
          { label: "Particles", value: "particles" },
          { label: "Waves", value: "waves" },
          { label: "Gradient", value: "gradient" },
          { label: "Grid", value: "grid" },
        ]
      },
    ],
  },
];

export function getComponentByType(type: string) {
  return componentRegistry.find(c => c.type === type);
}

export function renderComponent(
  type: string, 
  props: any, 
  options?: { 
    isEditMode?: boolean; 
    onPropChange?: (key: string, value: any) => void 
  }
) {
  const definition = getComponentByType(type);
  if (!definition) return null;
  
  const Component = definition.component;
  return <Component {...props} _editMode={options?.isEditMode} _onPropChange={options?.onPropChange} />;
}
