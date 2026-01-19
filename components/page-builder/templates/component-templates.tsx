// Component Templates for Different Website Styles

export const componentTemplates = {
  ecommerce: {
    name: "E-commerce",
    icon: "🛒",
    components: [
      {
        type: "productCard",
        label: "Product Card",
        preview: "Product showcase with image, price, and add to cart",
      },
      {
        type: "productGrid",
        label: "Product Grid",
        preview: "Grid of products with filters",
      },
      {
        type: "shoppingCart",
        label: "Shopping Cart",
        preview: "Cart sidebar with items",
      },
      {
        type: "checkout",
        label: "Checkout Form",
        preview: "Multi-step checkout process",
      },
      {
        type: "productGallery",
        label: "Product Gallery",
        preview: "Image gallery with zoom",
      },
    ],
  },
  music: {
    name: "Music & Audio",
    icon: "🎵",
    components: [
      {
        type: "audioPlayer",
        label: "Audio Player",
        preview: "Custom audio player with waveform",
      },
      {
        type: "albumCover",
        label: "Album Cover",
        preview: "3D rotating album cover",
      },
      {
        type: "playlist",
        label: "Playlist",
        preview: "Song list with play buttons",
      },
      {
        type: "lyricsDisplay",
        label: "Lyrics Display",
        preview: "Synced lyrics display",
      },
      {
        type: "musicVideo",
        label: "Music Video",
        preview: "Video player with controls",
      },
    ],
  },
  portfolio: {
    name: "Portfolio",
    icon: "💼",
    components: [
      {
        type: "projectShowcase",
        label: "Project Showcase",
        preview: "Featured projects with hover effects",
      },
      {
        type: "skillsChart",
        label: "Skills Chart",
        preview: "Visual skills representation",
      },
      {
        type: "timeline",
        label: "Timeline",
        preview: "Career/education timeline",
      },
      {
        type: "contactForm",
        label: "Contact Form",
        preview: "Professional contact form",
      },
      {
        type: "certificateGallery",
        label: "Certificates",
        preview: "Certificates and awards",
      },
    ],
  },
  "3d": {
    name: "3D & Interactive",
    icon: "🎮",
    components: [
      {
        type: "threeDModel",
        label: "3D Model Viewer",
        preview: "Interactive 3D model display",
      },
      {
        type: "parallaxSection",
        label: "Parallax Section",
        preview: "3D parallax scrolling effect",
      },
      {
        type: "cardFlip",
        label: "3D Card Flip",
        preview: "Flippable 3D cards",
      },
      {
        type: "carousel3d",
        label: "3D Carousel",
        preview: "Rotating 3D carousel",
      },
      {
        type: "glassmorphism",
        label: "Glassmorphism Card",
        preview: "Modern glass effect cards",
      },
    ],
  },
  restaurant: {
    name: "Restaurant & Food",
    icon: "🍕",
    components: [
      {
        type: "menuGrid",
        label: "Menu Grid",
        preview: "Food menu with categories",
      },
      {
        type: "reservation",
        label: "Reservation Form",
        preview: "Table booking form",
      },
      {
        type: "chefProfile",
        label: "Chef Profile",
        preview: "Chef introduction section",
      },
      {
        type: "foodGallery",
        label: "Food Gallery",
        preview: "Image gallery with lightbox",
      },
      {
        type: "deliveryTracker",
        label: "Delivery Tracker",
        preview: "Order tracking interface",
      },
    ],
  },
  blog: {
    name: "Blog & Content",
    icon: "📝",
    components: [
      {
        type: "articleCard",
        label: "Article Card",
        preview: "Blog post preview card",
      },
      {
        type: "authorBio",
        label: "Author Bio",
        preview: "Author information box",
      },
      {
        type: "relatedPosts",
        label: "Related Posts",
        preview: "Related articles section",
      },
      {
        type: "newsletter",
        label: "Newsletter Signup",
        preview: "Email subscription form",
      },
      {
        type: "commentSection",
        label: "Comments",
        preview: "Comments and discussion",
      },
    ],
  },
  saas: {
    name: "SaaS & Software",
    icon: "💻",
    components: [
      {
        type: "dashboard",
        label: "Dashboard Preview",
        preview: "Software dashboard mockup",
      },
      {
        type: "comparisonTable",
        label: "Feature Comparison",
        preview: "Compare pricing plans",
      },
      {
        type: "integrations",
        label: "Integrations",
        preview: "Connected services grid",
      },
      {
        type: "apiDocs",
        label: "API Documentation",
        preview: "Code examples and docs",
      },
      {
        type: "metrics",
        label: "Metrics Display",
        preview: "Key performance indicators",
      },
    ],
  },
  agency: {
    name: "Agency & Creative",
    icon: "🎨",
    components: [
      {
        type: "serviceCards",
        label: "Service Cards",
        preview: "Services with hover effects",
      },
      {
        type: "clientLogos",
        label: "Client Logos",
        preview: "Trusted by section",
      },
      {
        type: "caseStudy",
        label: "Case Study",
        preview: "Detailed project breakdown",
      },
      {
        type: "teamGrid",
        label: "Team Grid",
        preview: "Team members showcase",
      },
      {
        type: "processDiagram",
        label: "Process Diagram",
        preview: "Workflow visualization",
      },
    ],
  },
};

export const stylePresets = {
  modern: {
    name: "Modern",
    colors: {
      primary: "#667eea",
      secondary: "#764ba2",
      accent: "#f093fb",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
    },
    effects: {
      borderRadius: "12px",
      shadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
  },
  minimal: {
    name: "Minimal",
    colors: {
      primary: "#000000",
      secondary: "#666666",
      accent: "#ffffff",
    },
    fonts: {
      heading: "Helvetica, Arial, sans-serif",
      body: "Helvetica, Arial, sans-serif",
    },
    effects: {
      borderRadius: "0px",
      shadow: "none",
    },
  },
  vibrant: {
    name: "Vibrant",
    colors: {
      primary: "#ff6b6b",
      secondary: "#4ecdc4",
      accent: "#ffe66d",
    },
    fonts: {
      heading: "Poppins, sans-serif",
      body: "Poppins, sans-serif",
    },
    effects: {
      borderRadius: "20px",
      shadow: "0 8px 32px rgba(255,107,107,0.3)",
    },
  },
  elegant: {
    name: "Elegant",
    colors: {
      primary: "#2c3e50",
      secondary: "#8e44ad",
      accent: "#e74c3c",
    },
    fonts: {
      heading: "Playfair Display, serif",
      body: "Lato, sans-serif",
    },
    effects: {
      borderRadius: "8px",
      shadow: "0 4px 20px rgba(0,0,0,0.15)",
    },
  },
  neon: {
    name: "Neon",
    colors: {
      primary: "#00ff9f",
      secondary: "#00b8ff",
      accent: "#ff0080",
    },
    fonts: {
      heading: "Orbitron, sans-serif",
      body: "Roboto, sans-serif",
    },
    effects: {
      borderRadius: "4px",
      shadow: "0 0 20px rgba(0,255,159,0.5)",
    },
  },
  organic: {
    name: "Organic",
    colors: {
      primary: "#6a994e",
      secondary: "#bc4749",
      accent: "#f2cc8f",
    },
    fonts: {
      heading: "Merriweather, serif",
      body: "Open Sans, sans-serif",
    },
    effects: {
      borderRadius: "24px",
      shadow: "0 6px 24px rgba(106,153,78,0.2)",
    },
  },
};
