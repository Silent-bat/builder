// Script to create a test landing page with advanced features
// Run with: npx tsx scripts/create-test-landing-page.ts

import { prisma } from "../lib/db";

async function createTestLandingPage() {
  console.log("🚀 Creating advanced landing page...");

  try {
    // Get first user
    const user = await prisma.user.findFirst({
      select: { id: true }
    });

    if (!user) {
      console.error("❌ No user found. Please create a user first.");
      return;
    }

    // Create page
    const page = await prisma.page.create({
      data: {
        id: "test_advanced_landing",
        type: "LANDING",
        slug: "advanced-landing",
        title: "Advanced Landing Page Demo",
        contentMd: "",
        published: true,
        seoTitle: "Advanced Page Builder Demo",
        seoDescription: "A showcase of all new page builder features",
      }
    });

    console.log("✅ Page created!");

    // Hero with gradient and animation
    const hero = {
      title: "Welcome to the Future",
      subtitle: "Experience the most advanced page builder with animations, 3D effects, and stunning gradients",
      buttonText: "Get Started",
      buttonLink: "#features",
    };

    const heroStyle = {
      gradient: {
        type: "linear",
        angle: "135deg",
        stops: [
          { color: "#667eea", position: "0%" },
          { color: "#764ba2", position: "100%" },
        ],
      },
      animation: {
        type: "fadeInUp",
        duration: "1s",
        easing: "ease-out",
      },
      padding: { top: "80px", bottom: "80px" },
    };

    await prisma.pageComponent.create({
      data: {
        pageId: "test_advanced_landing",
        type: "hero",
        order: 0,
        props: { ...hero, style: heroStyle },
      }
    });

    console.log("✅ Hero component added");

    // Features with animation
    const features = {
      title: "Amazing Features",
      subtitle: "Built with the latest technology",
      features: [
        {
          icon: "⚡",
          title: "Lightning Fast",
          description: "GPU-accelerated animations",
        },
        {
          icon: "🎨",
          title: "Beautiful Design",
          description: "Stunning gradients and effects",
        },
        {
          icon: "🎮",
          title: "3D Effects",
          description: "Full 3D transform support",
        },
      ],
    };

    const featuresStyle = {
      animation: { type: "fadeIn", duration: "1.2s", delay: "0.3s" },
      padding: { top: "60px", bottom: "60px" },
    };

    await prisma.pageComponent.create({
      data: {
        pageId: "test_advanced_landing",
        type: "features",
        order: 1,
        props: { ...features, style: featuresStyle },
      }
    });

    console.log("✅ Features component added");

    // Stats with animation
    const stats = {
      stats: [
        { icon: "🚀", value: "16", label: "Animations" },
        { icon: "✨", value: "8", label: "Visual Effects" },
        { icon: "🎯", value: "13", label: "3D Transforms" },
        { icon: "🌈", value: "∞", label: "Gradients" },
      ],
      backgroundColor: "primary",
    };

    const statsStyle = {
      animation: { type: "fadeInUp", duration: "1s", delay: "0.5s" },
      padding: { top: "60px", bottom: "60px" },
    };

    await prisma.pageComponent.create({
      data: {
        pageId: "test_advanced_landing",
        type: "stats",
        order: 2,
        props: { ...stats, style: statsStyle },
      }
    });

    console.log("✅ Stats component added");

    // CTA with gradient
    const cta = {
      title: "Ready to Build Amazing Sites?",
      description: "Start creating stunning websites with our advanced page builder today",
      buttonText: "Start Building",
      secondaryButtonText: "Learn More",
      buttonLink: "#start",
      secondaryButtonLink: "#docs",
    };

    const ctaStyle = {
      gradient: {
        type: "radial",
        stops: [
          { color: "#f093fb", position: "0%" },
          { color: "#f5576c", position: "100%" },
        ],
      },
      animation: { type: "zoomIn", duration: "0.8s", delay: "0.7s" },
      padding: { top: "80px", bottom: "80px" },
    };

    await prisma.pageComponent.create({
      data: {
        pageId: "test_advanced_landing",
        type: "cta",
        order: 3,
        props: { ...cta, style: ctaStyle },
      }
    });

    console.log("✅ CTA component added");

    console.log("\n🎉 Test landing page created successfully!");
    console.log("📍 View it at: http://localhost:3000/p/advanced-landing");
  } catch (error) {
    console.error("❌ Error creating page:", error);
  }
}

createTestLandingPage();
