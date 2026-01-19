import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST() {
  try {
    // Delete existing e-commerce page if it exists
    await prisma.pageComponent.deleteMany({
      where: { pageId: "ecommerce_demo" },
    });

    await prisma.page.deleteMany({
      where: { id: "ecommerce_demo" },
    });

    // Create e-commerce page
    const page = await prisma.page.create({
      data: {
        id: "ecommerce_demo",
        type: "LANDING",
        slug: "shop",
        title: "Modern E-Commerce Store",
        contentMd: "",
        published: true,
        seoTitle: "Shop Amazing Products - Modern Store",
        seoDescription: "Discover our collection of premium products with stunning animations and effects",
      },
    });

    // 1. Hero Section - E-commerce Banner
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "hero",
        order: 0,
        props: {
          title: "Summer Collection 2024",
          subtitle: "Discover our newest arrivals with exclusive discounts up to 50% off",
          buttonText: "Shop Now",
          buttonLink: "#products",
          backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=600&fit=crop",
          style: {
            gradient: {
              type: "linear",
              angle: "135deg",
              stops: [
                { color: "rgba(0,0,0,0.3)", position: "0%" },
                { color: "rgba(0,0,0,0.6)", position: "100%" },
              ],
            },
            animation: {
              type: "fadeIn",
              duration: "1s",
              easing: "ease-out",
            },
            padding: { top: "100px", bottom: "100px" },
            color: "#ffffff",
          },
        },
      },
    });

    // 2. Stats Section - Social Proof
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "stats",
        order: 1,
        props: {
          stats: [
            { icon: "👥", value: "50K+", label: "Happy Customers" },
            { icon: "⭐", value: "4.9", label: "Average Rating" },
            { icon: "📦", value: "100K+", label: "Products Sold" },
            { icon: "🚚", value: "24h", label: "Fast Delivery" },
          ],
          backgroundColor: "default",
          style: {
            animation: { type: "fadeInUp", duration: "1s", delay: "0.2s" },
            padding: { top: "60px", bottom: "60px" },
            backgroundColor: "#f9fafb",
          },
        },
      },
    });

    // 3. Featured Products Section
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "features",
        order: 2,
        props: {
          title: "Featured Products",
          subtitle: "Handpicked items just for you",
          features: [
            {
              icon: "👕",
              title: "Premium T-Shirt",
              description: "Ultra-soft cotton blend. Available in 5 colors. $29.99",
            },
            {
              icon: "👟",
              title: "Running Shoes",
              description: "Lightweight and comfortable. Perfect for daily wear. $89.99",
            },
            {
              icon: "🎒",
              title: "Leather Backpack",
              description: "Genuine leather with laptop compartment. $149.99",
            },
            {
              icon: "⌚",
              title: "Smart Watch",
              description: "Track your fitness goals. Water resistant. $199.99",
            },
            {
              icon: "🎧",
              title: "Wireless Earbuds",
              description: "Premium sound quality. 24h battery life. $129.99",
            },
            {
              icon: "📱",
              title: "Phone Case",
              description: "Shockproof protection. Sleek design. $24.99",
            },
          ],
          style: {
            animation: { type: "fadeInUp", duration: "1s", delay: "0.4s" },
            padding: { top: "80px", bottom: "80px" },
          },
        },
      },
    });

    // 4. Pricing/Categories Section
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "pricing",
        order: 3,
        props: {
          title: "Shop by Category",
          subtitle: "Find exactly what you're looking for",
          tiers: [
            {
              name: "Fashion",
              price: "Starting at $19",
              features: [
                "Men's & Women's Clothing",
                "Shoes & Accessories",
                "Seasonal Collections",
                "Free Returns",
              ],
              highlighted: false,
            },
            {
              name: "Electronics",
              price: "Starting at $49",
              features: [
                "Latest Tech Gadgets",
                "Audio & Video",
                "Smart Home Devices",
                "1-Year Warranty",
                "Tech Support",
              ],
              highlighted: true,
            },
            {
              name: "Lifestyle",
              price: "Starting at $29",
              features: [
                "Home & Kitchen",
                "Sports & Fitness",
                "Beauty & Personal Care",
                "Fast Shipping",
              ],
              highlighted: false,
            },
          ],
          style: {
            animation: { type: "fadeIn", duration: "1s", delay: "0.6s" },
            padding: { top: "80px", bottom: "80px" },
            backgroundColor: "#ffffff",
          },
        },
      },
    });

    // 5. Customer Testimonials
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "testimonials",
        order: 4,
        props: {
          title: "What Our Customers Say",
          subtitle: "Real reviews from real people",
          testimonials: [
            {
              name: "Emma Wilson",
              role: "Verified Buyer",
              content: "Best online shopping experience! Fast delivery and amazing quality. The t-shirt I ordered exceeded my expectations.",
              rating: 5,
              avatar: "",
            },
            {
              name: "James Chen",
              role: "Verified Buyer",
              content: "The wireless earbuds are incredible! Crystal clear sound and the battery really does last 24 hours. Highly recommend!",
              rating: 5,
              avatar: "",
            },
            {
              name: "Sofia Martinez",
              role: "Verified Buyer",
              content: "Love my new backpack! The leather quality is top-notch and it fits my laptop perfectly. Worth every penny!",
              rating: 5,
              avatar: "",
            },
          ],
          style: {
            animation: { type: "fadeInUp", duration: "1s", delay: "0.8s" },
            padding: { top: "80px", bottom: "80px" },
            effects: {
              backdropBlur: "5px",
            },
          },
        },
      },
    });

    // 6. CTA Section - Special Offer
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "cta",
        order: 5,
        props: {
          title: "Limited Time Offer! 🎉",
          description: "Sign up now and get 20% off your first order. Plus free shipping on orders over $50!",
          buttonText: "Get Your Discount",
          secondaryButtonText: "Browse Products",
          buttonLink: "#signup",
          secondaryButtonLink: "#products",
          style: {
            gradient: {
              type: "linear",
              angle: "135deg",
              stops: [
                { color: "#6366f1", position: "0%" },
                { color: "#8b5cf6", position: "100%" },
              ],
            },
            animation: { type: "zoomIn", duration: "0.8s", delay: "1s" },
            padding: { top: "80px", bottom: "80px" },
          },
        },
      },
    });

    // 7. Footer
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "footer",
        order: 6,
        props: {
          companyName: "ModernShop",
          tagline: "Your trusted online store since 2024",
          socialLinks: [
            { icon: "f", href: "#", label: "Facebook" },
            { icon: "𝕏", href: "#", label: "Twitter" },
            { icon: "📷", href: "#", label: "Instagram" },
          ],
          sections: [
            {
              title: "Shop",
              links: [
                { label: "New Arrivals", href: "#new" },
                { label: "Best Sellers", href: "#bestsellers" },
                { label: "Sale", href: "#sale" },
                { label: "Gift Cards", href: "#gifts" },
              ],
            },
            {
              title: "Customer Service",
              links: [
                { label: "Contact Us", href: "#contact" },
                { label: "Shipping Info", href: "#shipping" },
                { label: "Returns", href: "#returns" },
                { label: "FAQ", href: "#faq" },
              ],
            },
            {
              title: "About",
              links: [
                { label: "Our Story", href: "#story" },
                { label: "Careers", href: "#careers" },
                { label: "Press", href: "#press" },
              ],
            },
          ],
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "E-commerce page created successfully!",
      pageId: page.id,
      url: `/p/${page.slug}`,
      editUrl: `/admin/pages/${page.id}`,
    });
  } catch (error: any) {
    console.error("Error creating e-commerce page:", error);
    return NextResponse.json(
      { error: "Failed to create page", details: error.message },
      { status: 500 }
    );
  }
}
