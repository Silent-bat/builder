import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST() {
  try {
    // Delete existing e-commerce page if it exists
    await prisma.pageComponent.deleteMany({
      where: { pageId: "ecommerce_store_v2" },
    });

    await prisma.page.deleteMany({
      where: { id: "ecommerce_store_v2" },
    });

    // Create e-commerce page
    const page = await prisma.page.create({
      data: {
        id: "ecommerce_store_v2",
        type: "LANDING",
        slug: "store",
        title: "Modern E-Commerce Store - Full Featured",
        contentMd: "",
        published: true,
        seoTitle: "Shop Premium Products - Modern Store",
        seoDescription: "Discover our collection of premium products with the best shopping experience",
      },
    });

    // 1. Navbar
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "navbar",
        order: 0,
        props: {
          brandName: "ModernShop",
          logo: "",
          links: [
            { label: "Shop All", href: "#products" },
            { label: "Categories", href: "#categories" },
            { label: "Deals", href: "#deals" },
            { label: "About", href: "#about" },
          ],
          showAuth: true,
          ctaText: "Cart (0)",
          ctaLink: "#cart",
          transparent: false,
        },
      },
    });

    // 2. Hero Section - E-commerce Banner
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "hero",
        order: 1,
        props: {
          title: "New Season Collection",
          subtitle: "Discover the latest trends with up to 60% off on selected items",
          buttonText: "Shop Collection",
          buttonLink: "#products",
          backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=800&fit=crop",
          style: {
            gradient: {
              type: "linear",
              angle: "135deg",
              stops: [
                { color: "rgba(0,0,0,0.4)", position: "0%" },
                { color: "rgba(0,0,0,0.7)", position: "100%" },
              ],
            },
            animation: {
              type: "fadeIn",
              duration: "1.2s",
              easing: "ease-out",
            },
            padding: { top: "120px", bottom: "120px" },
            color: "#ffffff",
          },
        },
      },
    });

    // 3. Category Showcase
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "categoryShowcase",
        order: 2,
        props: {
          title: "Shop by Category",
          subtitle: "Find exactly what you're looking for",
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
          style: {
            animation: { type: "fadeInUp", duration: "1s", delay: "0.2s" },
            padding: { top: "80px", bottom: "40px" },
          },
        },
      },
    });

    // 4. Product Showcase - Featured Product
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "productShowcase",
        order: 3,
        props: {
          productName: "Premium Wireless Headphones",
          tagline: "Immerse yourself in crystal-clear sound with industry-leading noise cancellation",
          price: 199.99,
          originalPrice: 299.99,
          images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop"],
          features: [
            "Active Noise Cancellation",
            "30-hour battery life",
            "Premium leather cushions",
            "Bluetooth 5.0 connectivity",
            "Foldable design with carrying case",
            "Touch controls",
          ],
          buttonText: "Buy Now - $199.99",
          buttonLink: "#checkout",
          layout: "left",
          style: {
            animation: { type: "fadeInLeft", duration: "1s", delay: "0.4s" },
            padding: { top: "60px", bottom: "60px" },
            backgroundColor: "#ffffff",
          },
        },
      },
    });

    // 5. Product Grid - All Products
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "productGrid",
        order: 4,
        props: {
          title: "Best Selling Products",
          subtitle: "Our most popular items",
          columns: "3",
          showFilters: true,
          products: [
            {
              id: "1",
              name: "Premium Cotton T-Shirt",
              price: 29.99,
              image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
              category: "clothing",
              rating: 4.8,
              description: "Ultra-soft 100% organic cotton. Available in 8 colors.",
              badge: "New Arrival",
            },
            {
              id: "2",
              name: "Running Shoes Pro",
              price: 89.99,
              image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
              category: "footwear",
              rating: 4.9,
              description: "Lightweight mesh design with advanced cushioning technology.",
            },
            {
              id: "3",
              name: "Leather Backpack",
              price: 149.99,
              image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
              category: "accessories",
              rating: 4.7,
              description: "Genuine leather with padded laptop compartment up to 15 inches.",
              badge: "Bestseller",
            },
            {
              id: "4",
              name: "Smart Watch Ultra",
              price: 299.99,
              image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
              category: "electronics",
              rating: 4.9,
              description: "AMOLED display, GPS, heart rate monitor, 7-day battery.",
              badge: "Hot",
            },
            {
              id: "5",
              name: "Wireless Earbuds Pro",
              price: 129.99,
              image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
              category: "electronics",
              rating: 4.8,
              description: "ANC, 24h battery, IPX7 waterproof, wireless charging.",
            },
            {
              id: "6",
              name: "Designer Sunglasses",
              price: 179.99,
              image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
              category: "accessories",
              rating: 4.6,
              description: "UV400 protection, polarized lenses, titanium frame.",
            },
            {
              id: "7",
              name: "Denim Jacket",
              price: 79.99,
              image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
              category: "clothing",
              rating: 4.7,
              description: "Classic fit, 100% cotton denim, available in 3 washes.",
            },
            {
              id: "8",
              name: "Canvas Sneakers",
              price: 49.99,
              image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
              category: "footwear",
              rating: 4.5,
              description: "Comfortable canvas upper, rubber sole, perfect for casual wear.",
            },
            {
              id: "9",
              name: "Leather Wallet",
              price: 59.99,
              image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
              category: "accessories",
              rating: 4.8,
              description: "Slim design, RFID blocking, genuine leather, 6 card slots.",
            },
          ],
          style: {
            animation: { type: "fadeInUp", duration: "1s", delay: "0.6s" },
            padding: { top: "80px", bottom: "80px" },
            backgroundColor: "#f9fafb",
          },
        },
      },
    });

    // 6. Stats - Social Proof
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "stats",
        order: 5,
        props: {
          stats: [
            { icon: "👥", value: "100K+", label: "Happy Customers" },
            { icon: "⭐", value: "4.9/5", label: "Customer Rating" },
            { icon: "📦", value: "500K+", label: "Orders Delivered" },
            { icon: "🚚", value: "2-Day", label: "Fast Shipping" },
          ],
          backgroundColor: "primary",
          style: {
            animation: { type: "fadeIn", duration: "1s", delay: "0.8s" },
            padding: { top: "60px", bottom: "60px" },
          },
        },
      },
    });

    // 7. Testimonials
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "testimonials",
        order: 6,
        props: {
          title: "What Our Customers Say",
          subtitle: "Real reviews from real shoppers",
          testimonials: [
            {
              name: "Jennifer Adams",
              role: "Verified Buyer",
              content: "Absolutely love my new backpack! The quality is outstanding and it arrived in perfect condition. Will definitely shop here again!",
              rating: 5,
              avatar: "",
            },
            {
              name: "David Kim",
              role: "Verified Buyer",
              content: "The wireless earbuds exceeded my expectations. Sound quality is amazing and they're so comfortable for all-day wear.",
              rating: 5,
              avatar: "",
            },
            {
              name: "Lisa Thompson",
              role: "Verified Buyer",
              content: "Best online shopping experience ever! Fast shipping, easy returns, and the products are even better than the photos.",
              rating: 5,
              avatar: "",
            },
          ],
          style: {
            animation: { type: "fadeInUp", duration: "1s", delay: "1s" },
            padding: { top: "80px", bottom: "80px" },
          },
        },
      },
    });

    // 8. Newsletter
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "newsletter",
        order: 7,
        props: {
          title: "Get 15% Off Your First Order",
          subtitle: "Join our newsletter and receive exclusive deals, new product alerts, and style tips delivered to your inbox",
          placeholder: "Enter your email address",
          buttonText: "Get My Discount",
          showImage: true,
          style: {
            animation: { type: "zoomIn", duration: "0.8s", delay: "1.2s" },
            padding: { top: "80px", bottom: "80px" },
            gradient: {
              type: "linear",
              angle: "135deg",
              stops: [
                { color: "#6366f1", position: "0%" },
                { color: "#8b5cf6", position: "100%" },
              ],
            },
          },
        },
      },
    });

    // 9. Brand Showcase
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "brandShowcase",
        order: 8,
        props: {
          title: "Featured Brands",
          backgroundColor: "muted",
          brands: [
            { name: "Nike", logo: "" },
            { name: "Adidas", logo: "" },
            { name: "Apple", logo: "" },
            { name: "Samsung", logo: "" },
            { name: "Sony", logo: "" },
            { name: "Canon", logo: "" },
          ],
          style: {
            animation: { type: "fadeIn", duration: "1s", delay: "1.4s" },
            padding: { top: "60px", bottom: "60px" },
          },
        },
      },
    });

    // 10. Footer
    await prisma.pageComponent.create({
      data: {
        pageId: page.id,
        type: "footer",
        order: 9,
        props: {
          companyName: "ModernShop",
          tagline: "Your trusted online store since 2024",
          socialLinks: [
            { icon: "f", href: "#", label: "Facebook" },
            { icon: "𝕏", href: "#", label: "Twitter" },
            { icon: "📷", href: "#", label: "Instagram" },
            { icon: "📌", href: "#", label: "Pinterest" },
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
                { label: "Returns & Exchanges", href: "#returns" },
                { label: "Size Guide", href: "#size" },
                { label: "FAQ", href: "#faq" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About Us", href: "#about" },
                { label: "Careers", href: "#careers" },
                { label: "Sustainability", href: "#sustainability" },
                { label: "Press", href: "#press" },
              ],
            },
          ],
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Full-featured e-commerce store created successfully!",
      pageId: page.id,
      url: `/p/${page.slug}`,
      editUrl: `/admin/pages/${page.id}`,
      components: 10,
    });
  } catch (error: any) {
    console.error("Error creating e-commerce page:", error);
    return NextResponse.json(
      { error: "Failed to create page", details: error.message },
      { status: 500 }
    );
  }
}
