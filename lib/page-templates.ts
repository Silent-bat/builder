export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  category: "landing" | "blog" | "ecommerce" | "portfolio" | "corporate";
  thumbnail?: string;
  components: Array<{
    type: string;
    props: Record<string, any>;
    order: number;
  }>;
}

export const pageTemplates: PageTemplate[] = [
  // Landing Page Templates
  {
    id: "startup-landing",
    name: "Startup Landing",
    description: "Modern landing page perfect for startups and SaaS products",
    category: "landing",
    components: [
      {
        type: "navbar",
        order: 0,
        props: {
          brandName: "Your Brand",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Contact", href: "#contact" },
          ],
        },
      },
      {
        type: "hero",
        order: 1,
        props: {
          title: "Build Your Dream Product Faster",
          subtitle: "The all-in-one platform for modern teams. Ship faster, scale easier, grow smarter.",
          ctaText: "Get Started Free",
          ctaLink: "#signup",
          backgroundImage: "",
        },
      },
      {
        type: "features",
        order: 2,
        props: {
          title: "Everything You Need",
          subtitle: "Powerful features to help you succeed",
          features: [
            {
              title: "Lightning Fast",
              description: "Optimized for speed and performance",
              icon: "⚡",
            },
            {
              title: "Secure by Default",
              description: "Enterprise-grade security built-in",
              icon: "🔒",
            },
            {
              title: "Easy to Use",
              description: "Intuitive interface anyone can master",
              icon: "✨",
            },
          ],
        },
      },
      {
        type: "pricing",
        order: 3,
        props: {
          title: "Simple, Transparent Pricing",
          subtitle: "Choose the plan that's right for you",
          plans: [
            {
              name: "Starter",
              price: "$9",
              period: "per month",
              features: ["5 Projects", "10 GB Storage", "Email Support"],
              highlighted: false,
            },
            {
              name: "Professional",
              price: "$29",
              period: "per month",
              features: ["Unlimited Projects", "100 GB Storage", "Priority Support", "Advanced Analytics"],
              highlighted: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              period: "contact us",
              features: ["Unlimited Everything", "Dedicated Support", "Custom Integrations", "SLA"],
              highlighted: false,
            },
          ],
        },
      },
      {
        type: "cta",
        order: 4,
        props: {
          title: "Ready to Get Started?",
          subtitle: "Join thousands of teams already using our platform",
          buttonText: "Start Free Trial",
          buttonLink: "#signup",
        },
      },
      {
        type: "footer",
        order: 5,
        props: {
          companyName: "Your Company",
          description: "Building the future, one line of code at a time.",
          links: [
            { label: "About", href: "#" },
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
          ],
        },
      },
    ],
  },
  
  // E-commerce Template
  {
    id: "ecommerce-store",
    name: "E-commerce Store",
    description: "Complete online store with product showcase and categories",
    category: "ecommerce",
    components: [
      {
        type: "navbar",
        order: 0,
        props: {
          brandName: "Shop Name",
          links: [
            { label: "Shop", href: "#shop" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ],
        },
      },
      {
        type: "hero",
        order: 1,
        props: {
          title: "Welcome to Our Store",
          subtitle: "Discover amazing products at unbeatable prices",
          ctaText: "Shop Now",
          ctaLink: "#products",
        },
      },
      {
        type: "category-showcase",
        order: 2,
        props: {
          title: "Shop by Category",
          categories: [
            { name: "Electronics", image: "", itemCount: 150 },
            { name: "Fashion", image: "", itemCount: 300 },
            { name: "Home & Garden", image: "", itemCount: 200 },
            { name: "Sports", image: "", itemCount: 120 },
          ],
        },
      },
      {
        type: "product-grid",
        order: 3,
        props: {
          title: "Featured Products",
          products: [
            { name: "Product 1", price: "$99.99", image: "", rating: 4.5 },
            { name: "Product 2", price: "$149.99", image: "", rating: 5 },
            { name: "Product 3", price: "$79.99", image: "", rating: 4 },
            { name: "Product 4", price: "$199.99", image: "", rating: 4.5 },
          ],
        },
      },
      {
        type: "brand-showcase",
        order: 4,
        props: {
          title: "Trusted Brands",
          brands: [
            { name: "Brand 1", logo: "" },
            { name: "Brand 2", logo: "" },
            { name: "Brand 3", logo: "" },
            { name: "Brand 4", logo: "" },
          ],
        },
      },
      {
        type: "newsletter",
        order: 5,
        props: {
          title: "Stay Updated",
          subtitle: "Subscribe to get special offers and updates",
          placeholder: "Enter your email",
        },
      },
      {
        type: "footer",
        order: 6,
        props: {
          companyName: "Your Store",
          description: "Quality products, delivered to your door.",
          links: [
            { label: "Shipping", href: "#" },
            { label: "Returns", href: "#" },
            { label: "FAQ", href: "#" },
          ],
        },
      },
    ],
  },

  // Blog Template
  {
    id: "blog-minimal",
    name: "Minimal Blog",
    description: "Clean and minimal blog layout perfect for writers",
    category: "blog",
    components: [
      {
        type: "navbar",
        order: 0,
        props: {
          brandName: "My Blog",
          links: [
            { label: "Home", href: "#" },
            { label: "Articles", href: "#articles" },
            { label: "About", href: "#about" },
          ],
        },
      },
      {
        type: "hero",
        order: 1,
        props: {
          title: "Welcome to My Blog",
          subtitle: "Thoughts, stories, and ideas",
          ctaText: "Read Latest",
          ctaLink: "#articles",
        },
      },
      {
        type: "text",
        order: 2,
        props: {
          title: "Latest Articles",
          content: "Explore our latest posts and insights.",
        },
      },
      {
        type: "newsletter",
        order: 3,
        props: {
          title: "Never Miss a Post",
          subtitle: "Get the latest articles delivered to your inbox",
          placeholder: "Your email address",
        },
      },
      {
        type: "footer",
        order: 4,
        props: {
          companyName: "My Blog",
          description: "Sharing knowledge, one post at a time.",
          links: [
            { label: "RSS", href: "#" },
            { label: "Twitter", href: "#" },
            { label: "GitHub", href: "#" },
          ],
        },
      },
    ],
  },

  // Portfolio Template
  {
    id: "portfolio-creative",
    name: "Creative Portfolio",
    description: "Showcase your work with this stunning portfolio template",
    category: "portfolio",
    components: [
      {
        type: "navbar",
        order: 0,
        props: {
          brandName: "Your Name",
          links: [
            { label: "Work", href: "#work" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ],
        },
      },
      {
        type: "hero",
        order: 1,
        props: {
          title: "Hi, I'm a Creative Designer",
          subtitle: "I create beautiful digital experiences",
          ctaText: "View My Work",
          ctaLink: "#work",
        },
      },
      {
        type: "stats",
        order: 2,
        props: {
          title: "Experience & Achievements",
          stats: [
            { label: "Years Experience", value: "5+" },
            { label: "Projects Completed", value: "100+" },
            { label: "Happy Clients", value: "50+" },
            { label: "Awards Won", value: "10+" },
          ],
        },
      },
      {
        type: "testimonials",
        order: 3,
        props: {
          title: "What Clients Say",
          testimonials: [
            {
              name: "John Doe",
              role: "CEO, Company",
              content: "Amazing work! Highly recommended.",
              avatar: "",
            },
            {
              name: "Jane Smith",
              role: "Marketing Director",
              content: "Professional and creative. Exceeded expectations!",
              avatar: "",
            },
          ],
        },
      },
      {
        type: "cta",
        order: 4,
        props: {
          title: "Let's Work Together",
          subtitle: "Have a project in mind? Let's make it happen!",
          buttonText: "Get in Touch",
          buttonLink: "#contact",
        },
      },
      {
        type: "footer",
        order: 5,
        props: {
          companyName: "Your Name",
          description: "Designer & Developer",
          links: [
            { label: "LinkedIn", href: "#" },
            { label: "Dribbble", href: "#" },
            { label: "Instagram", href: "#" },
          ],
        },
      },
    ],
  },

  // Corporate Template
  {
    id: "corporate-professional",
    name: "Corporate Professional",
    description: "Professional template for businesses and enterprises",
    category: "corporate",
    components: [
      {
        type: "navbar",
        order: 0,
        props: {
          brandName: "Corporation Inc.",
          links: [
            { label: "Services", href: "#services" },
            { label: "About", href: "#about" },
            { label: "Team", href: "#team" },
            { label: "Contact", href: "#contact" },
          ],
        },
      },
      {
        type: "hero",
        order: 1,
        props: {
          title: "Leading Innovation in Business",
          subtitle: "Trusted by Fortune 500 companies worldwide",
          ctaText: "Learn More",
          ctaLink: "#services",
        },
      },
      {
        type: "features",
        order: 2,
        props: {
          title: "Our Services",
          subtitle: "Comprehensive solutions for your business",
          features: [
            {
              title: "Consulting",
              description: "Strategic guidance from industry experts",
              icon: "💼",
            },
            {
              title: "Technology",
              description: "Cutting-edge tech solutions",
              icon: "💻",
            },
            {
              title: "Support",
              description: "24/7 dedicated customer support",
              icon: "🎯",
            },
          ],
        },
      },
      {
        type: "stats",
        order: 3,
        props: {
          title: "Proven Track Record",
          stats: [
            { label: "Clients Worldwide", value: "500+" },
            { label: "Team Members", value: "200+" },
            { label: "Countries", value: "50+" },
            { label: "Success Rate", value: "99%" },
          ],
        },
      },
      {
        type: "testimonials",
        order: 4,
        props: {
          title: "Client Success Stories",
          testimonials: [
            {
              name: "Michael Chen",
              role: "CTO, Tech Corp",
              content: "Outstanding results and professional service.",
              avatar: "",
            },
            {
              name: "Sarah Williams",
              role: "VP Operations",
              content: "Transformed our business operations completely.",
              avatar: "",
            },
          ],
        },
      },
      {
        type: "cta",
        order: 5,
        props: {
          title: "Ready to Transform Your Business?",
          subtitle: "Schedule a consultation with our experts today",
          buttonText: "Contact Us",
          buttonLink: "#contact",
        },
      },
      {
        type: "footer",
        order: 6,
        props: {
          companyName: "Corporation Inc.",
          description: "Excellence in business solutions since 2000",
          links: [
            { label: "Careers", href: "#" },
            { label: "Press", href: "#" },
            { label: "Legal", href: "#" },
          ],
        },
      },
    ],
  },

  // Blank Template
  {
    id: "blank",
    name: "Blank Page",
    description: "Start from scratch with a blank canvas",
    category: "landing",
    components: [],
  },
];

export function getTemplateById(id: string): PageTemplate | undefined {
  return pageTemplates.find(template => template.id === id);
}

export function getTemplatesByCategory(category: PageTemplate["category"]): PageTemplate[] {
  return pageTemplates.filter(template => template.category === category);
}
