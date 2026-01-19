# 🚀 Advanced Page Builder - Next.js SaaS Boilerplate

A professional-grade, production-ready page builder with 21 advanced components, visual editing, and modern design system. Build stunning websites with carousels, parallax effects, glassmorphism, and animated backgrounds - all without writing code.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🎨 **Advanced Page Builder**
- **21 Professional Components** - More than premium builders
- **Visual Editing** - Click any text to edit inline
- **No Code Required** - Intuitive drag-and-drop interface
- **Real-time Preview** - See changes instantly
- **Responsive Design** - Mobile, tablet, and desktop views

### 🎠 **Advanced Components**
- **Carousel/Slider** - Auto-playing slides with smooth transitions
- **Parallax Sections** - Scroll-based background animations
- **Glass Cards** - Modern glassmorphism with 3 background types
- **Animated Backgrounds** - Particles, waves, gradients, and grid patterns
- **Timeline** - Professional step-by-step displays
- And 16 more fully-featured components!

### 🎭 **Modern Design System**
- **Dark Theme** - Professional Convergent.org aesthetic
- **Smooth Animations** - GPU-accelerated effects
- **Gradient System** - Beautiful color transitions
- **Glow Effects** - Eye-catching hover states
- **Responsive Typography** - Fluid scaling with clamp()

### 📊 **Page Management**
- **Search & Filter** - Find pages quickly
- **Duplicate Pages** - Clone entire pages instantly
- **Version Control** - Draft and published states
- **Component Tracking** - See component counts per page
- **Bulk Actions** - Manage multiple pages efficiently

### 🔐 **Complete Authentication**
- **Better Auth** - Modern auth solution
- **Email/Password** - Traditional authentication
- **Email Verification** - Secure account activation
- **Password Reset** - User-friendly recovery
- **Role-based Access** - Admin and user roles

### 🏢 **Multi-Tenancy**
- **Organizations** - Team workspaces
- **Team Management** - Invite and manage members
- **Role Permissions** - Fine-grained access control

### 💳 **Billing Integration**
- **Stripe** - Payment processing
- **Subscription Plans** - Recurring billing
- **Customer Portal** - Self-service management

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- PostgreSQL or SQLite database

### Installation

```bash
# Clone the repository
git clone https://github.com/Silent-bat/builder.git
cd builder

# Install dependencies
npm install
# or
pnpm install

# Setup environment variables
cp .env.example .env

# Configure your database URL in .env
DATABASE_URL="file:./prisma/dev.db"  # For SQLite
# or
DATABASE_URL="postgresql://..."      # For PostgreSQL

# Push database schema
npx prisma db push

# (Optional) Seed sample data
npx prisma db seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` and login with:
- **Email:** admin@example.com
- **Password:** Admin123!

---

## 🎨 Component Library

### Layout Components (2)
- **Navbar** - Responsive navigation with mobile menu
- **Footer** - Multi-column footer with links

### Content Components (5)
- **Text** - Rich text content blocks
- **Image** - Responsive images with captions
- **FAQ** - Accordion-style Q&A
- **Timeline** ⭐ - Step-by-step process display

### Marketing Components (10)
- **Hero** - Full-screen hero with animations
- **CTA** - Call-to-action sections
- **Features** - Feature showcases with icons
- **Testimonials** - Customer reviews
- **Stats** - Animated statistics
- **Newsletter** - Email signup forms
- **Carousel** ⭐ - Auto-playing slider
- **Parallax** ⭐ - Scroll effects
- **Glass Cards** ⭐ - Glassmorphism
- **Animated BG** ⭐ - Background animations

### Commerce Components (4)
- **Product Grid** - Product listings
- **Product Showcase** - Featured products
- **Category Showcase** - Category displays
- **Brand Showcase** - Brand logos

---

## 🎭 Advanced Features

### Inline Editing
Click any text element to edit it directly. No sidebars, no forms - just click and type.

### Visual Array Editors
Edit complex data structures (testimonials, features, products) through intuitive visual interfaces. No JSON required!

### Animation System
- **Gradient Shift** - 8s color transitions
- **Glow Pulse** - Pulsing glow effects
- **Float** - 6s floating motion
- **Shimmer** - Loading animations
- **Fade In Up** - Entrance animations

### Responsive Design
All components automatically adapt to:
- 📱 Mobile (320px+)
- 📱 Tablet (640px+)
- 💻 Desktop (1024px+)
- 🖥️ Large (1440px+)

---

## 🛠️ Tech Stack

### Core
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling

### Database & Auth
- **Prisma** - Type-safe ORM
- **Better Auth** - Modern authentication
- **PostgreSQL/SQLite** - Database options

### UI & Animations
- **Radix UI** - Accessible components
- **Custom CSS** - Advanced effects
- **GPU Acceleration** - Smooth performance

---

## 📦 Build & Deploy

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

The app can also be deployed to Netlify, Railway, Render, or any Node.js hosting platform.

---

## 🎯 Use Cases

### Perfect For:
- 🚀 **SaaS Landing Pages** - Showcase your product
- 🛍️ **E-commerce Sites** - Product catalogs
- 💼 **Agency Websites** - Portfolio and services
- 📱 **App Landing Pages** - Mobile app marketing
- 🎨 **Portfolio Sites** - Creative showcases
- 🏢 **Corporate Sites** - Business websites
- 📰 **Marketing Pages** - Campaign landing pages

---

## 📖 Environment Variables

Required variables in `.env`:

```env
# Database
DATABASE_URL="your-database-url"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Email (Optional - for verification)
RESEND_API_KEY="your-resend-key"

# Stripe (Optional - for billing)
STRIPE_SECRET_KEY="your-stripe-key"
STRIPE_WEBHOOK_SECRET="your-webhook-secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-publishable-key"
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Convergent.org** - Design inspiration
- **Next.js Team** - Amazing framework
- **Vercel** - Hosting platform
- **Better Auth** - Authentication solution
- **Tailwind CSS** - Styling system

---

## 📬 Support

- **Issues:** [GitHub Issues](https://github.com/Silent-bat/builder/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Silent-bat/builder/discussions)

---

## 🌟 Screenshots

### Page Builder Interface
![Page Builder](https://via.placeholder.com/800x400?text=Page+Builder+Interface)

### Component Library
![Components](https://via.placeholder.com/800x400?text=21+Professional+Components)

### Advanced Components
![Advanced](https://via.placeholder.com/800x400?text=Carousel+Parallax+Glass+Cards)

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

**⭐ Star this repo if you find it useful!**
