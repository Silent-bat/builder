import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST() {
  try {
    // Delete existing test page if it exists
    await prisma.pageComponent.deleteMany({
      where: { pageId: "test_advanced_landing" },
    });

    await prisma.page.deleteMany({
      where: { id: "test_advanced_landing" },
    });

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
        seoDescription: "A showcase of animations, 3D effects, gradients, and more",
      },
    });

    // Component 1: Hero with gradient and animation
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "hero",
        order: 0,
        props: {
          title: "Welcome to the Future",
          subtitle: "Experience the most advanced page builder with animations, 3D effects, and stunning gradients",
          buttonText: "Get Started",
          buttonLink: "#features",
          style: {
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
          },
        },
      },
    });

    // Component 2: Features with animation
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "features",
        order: 1,
        props: {
          title: "Amazing Features",
          subtitle: "Built with the latest technology",
          features: [
            { icon: "⚡", title: "Lightning Fast", description: "GPU-accelerated animations for smooth performance" },
            { icon: "🎨", title: "Beautiful Design", description: "Stunning gradients and visual effects" },
            { icon: "🎮", title: "3D Effects", description: "Full 3D transform support with perspective" },
          ],
          style: {
            animation: { type: "fadeIn", duration: "1.2s", delay: "0.3s" },
            padding: { top: "60px", bottom: "60px" },
          },
        },
      },
    });

    // Component 3: Stats with animation
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "stats",
        order: 2,
        props: {
          stats: [
            { icon: "🚀", value: "16", label: "Animations" },
            { icon: "✨", value: "8", label: "Visual Effects" },
            { icon: "🎯", value: "13", label: "3D Transforms" },
            { icon: "🌈", value: "∞", label: "Gradients" },
          ],
          backgroundColor: "primary",
          style: {
            animation: { type: "fadeInUp", duration: "1s", delay: "0.5s" },
            padding: { top: "60px", bottom: "60px" },
          },
        },
      },
    });

    // Component 4: CTA with gradient
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "cta",
        order: 3,
        props: {
          title: "Ready to Build Amazing Sites?",
          description: "Start creating stunning websites with our advanced page builder today",
          buttonText: "Start Building",
          secondaryButtonText: "Learn More",
          buttonLink: "/admin/pages",
          secondaryButtonLink: "/docs",
          style: {
            gradient: {
              type: "linear",
              angle: "135deg",
              stops: [
                { color: "#f093fb", position: "0%" },
                { color: "#f5576c", position: "100%" },
              ],
            },
            animation: { type: "zoomIn", duration: "0.8s", delay: "0.7s" },
            padding: { top: "80px", bottom: "80px" },
          },
        },
      },
    });

    // Component 5: Testimonials
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "testimonials",
        order: 4,
        props: {
          title: "What People Are Saying",
          subtitle: "Loved by designers and developers worldwide",
          testimonials: [
            {
              name: "Alex Chen",
              role: "Frontend Developer",
              content: "The animation system is incredible! I can create Awwwards-level sites now.",
              rating: 5,
            },
            {
              name: "Sarah Johnson",
              role: "UX Designer",
              content: "The 3D transforms and gradients are game-changing. So easy to use!",
              rating: 5,
            },
            {
              name: "Mike Rodriguez",
              role: "Agency Owner",
              content: "Our clients love the interactive effects. Best page builder ever!",
              rating: 5,
            },
          ],
          style: {
            animation: { type: "fadeInUp", duration: "1s", delay: "0.9s" },
            padding: { top: "60px", bottom: "60px" },
          },
        },
      },
    });

    // Component 6: Footer
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "footer",
        order: 5,
        props: {
          companyName: "Advanced Builder",
          tagline: "Build anything you can imagine",
          socialLinks: [
            { icon: "𝕏", href: "#", label: "Twitter" },
            { icon: "ⓘ", href: "#", label: "LinkedIn" },
            { icon: "G", href: "#", label: "GitHub" },
          ],
          sections: [
            {
              title: "Product",
              links: [
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "Templates", href: "#templates" },
              ],
            },
            {
              title: "Resources",
              links: [
                { label: "Documentation", href: "/docs" },
                { label: "Blog", href: "/blog" },
                { label: "Support", href: "/support" },
              ],
            },
          ],
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Test landing page created successfully!",
      pageId: page.id,
      url: `/p/${page.slug}`,
    });
  } catch (error: any) {
    console.error("Error creating test page:", error);
    return NextResponse.json(
      { error: "Failed to create page", details: error.message },
      { status: 500 }
    );
  }
}
