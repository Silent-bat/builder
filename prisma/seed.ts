import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Get first user (or create a demo user if none exists)
  let user = await prisma.user.findFirst();
  
  if (!user) {
    console.log("No users found. Creating demo user...");
    user = await prisma.user.create({
      data: {
        id: "demo-user-id",
        name: "Demo User",
        email: "demo@example.com",
        emailVerified: true,
        role: "USER",
      },
    });
    console.log("Created demo user:", user.email);
  } else {
    console.log("Using existing user:", user.email);
  }

  // Seed Projects
  console.log("Seeding projects...");
  const projects = await prisma.project.createMany({
    data: [
      {
        title: "Website Redesign",
        description: "Complete overhaul of company website with modern UI/UX",
        status: "ACTIVE",
        progress: 65,
        userId: user.id,
      },
      {
        title: "Mobile App Development",
        description: "Native iOS and Android app for customer engagement",
        status: "ACTIVE",
        progress: 40,
        userId: user.id,
      },
      {
        title: "API Integration",
        description: "Integrate third-party payment and analytics APIs",
        status: "ACTIVE",
        progress: 85,
        userId: user.id,
      },
      {
        title: "Documentation Portal",
        description: "Build comprehensive documentation for developers",
        status: "COMPLETED",
        progress: 100,
        userId: user.id,
      },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${projects.count} projects`);

  // Seed Organizations
  console.log("Seeding organizations...");
  const organization = await prisma.organization.create({
    data: {
      name: "Acme Corporation",
      slug: "acme-corp",
      description: "Building the future of technology",
      ownerId: user.id,
    },
  });
  console.log("Created organization:", organization.name);

  // Add organization members
  console.log("Seeding organization members...");
  await prisma.organizationMember.create({
    data: {
      organizationId: organization.id,
      userId: user.id,
      role: "OWNER",
      status: "ACTIVE",
    },
  });
  console.log("Added user to organization");

  // Seed Teams within organization
  console.log("Seeding teams...");
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: "Product Team",
        organizationId: organization.id,
      },
    }),
    prisma.team.create({
      data: {
        name: "Engineering Team",
        organizationId: organization.id,
      },
    }),
  ]);
  console.log("Created teams:", teams.map(t => t.name).join(", "));

  // Seed Team Members
  console.log("Seeding team members...");
  await prisma.teamMember.create({
    data: {
      teamId: teams[0].id,
      userId: user.id,
      role: "OWNER",
      status: "ACTIVE",
    },
  });
  console.log("Added user to team");

  // Seed Support Tickets
  console.log("Seeding support tickets...");
  const tickets = await prisma.supportTicket.createMany({
    data: [
      {
        userId: user.id,
        subject: "Cannot access billing dashboard",
        message: "I'm getting a 404 error when trying to view my billing information. Can you help?",
        status: "RESOLVED",
        priority: "MEDIUM",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      },
      {
        userId: user.id,
        subject: "Feature request: Dark mode",
        message: "Would love to see a dark mode option for the dashboard. My eyes would appreciate it!",
        status: "IN_PROGRESS",
        priority: "LOW",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        userId: user.id,
        subject: "Payment processing error",
        message: "My payment was declined but I was charged. Need urgent assistance.",
        status: "OPEN",
        priority: "HIGH",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${tickets.count} support tickets`);

  // Seed Documentation Categories
  console.log("Seeding documentation...");
  
  const gettingStartedCategory = await prisma.docCategory.create({
    data: {
      title: "Getting Started",
      description: "Learn the basics and get up and running quickly",
      order: 1,
    },
  });

  const coreConceptsCategory = await prisma.docCategory.create({
    data: {
      title: "Core Concepts",
      description: "Understand the fundamental concepts",
      order: 2,
    },
  });

  const apiReferenceCategory = await prisma.docCategory.create({
    data: {
      title: "API Reference",
      description: "Complete API documentation",
      order: 3,
    },
  });

  const advancedCategory = await prisma.docCategory.create({
    data: {
      title: "Advanced Topics",
      description: "Deep dives into advanced features",
      order: 4,
    },
  });

  // Seed Documentation Articles
  console.log("Seeding documentation articles...");
  
  await prisma.docArticle.createMany({
    data: [
      // Getting Started articles
      {
        categoryId: gettingStartedCategory.id,
        title: "Quick Start Guide",
        slug: "quick-start",
        content: "# Quick Start Guide\n\nWelcome! This guide will help you get started in just a few minutes.\n\n## Step 1: Create Your Account\nSign up using your email or social login.\n\n## Step 2: Set Up Your Profile\nComplete your profile information in the settings page.\n\n## Step 3: Explore Features\nCheck out the dashboard to see all available features.",
        views: 1245,
        order: 1,
      },
      {
        categoryId: gettingStartedCategory.id,
        title: "Installation",
        slug: "installation",
        content: "# Installation\n\nLearn how to install and configure the application.\n\n## Prerequisites\n- Node.js 18+\n- PostgreSQL database\n- npm or pnpm\n\n## Installation Steps\n```bash\nnpm install\ncp .env.example .env\nnpm run db:migrate\n```",
        views: 892,
        order: 2,
      },
      // Core Concepts articles
      {
        categoryId: coreConceptsCategory.id,
        title: "Authentication",
        slug: "authentication",
        content: "# Authentication\n\nLearn how authentication works in the platform.\n\n## Authentication Methods\n- Email/Password\n- Magic Links\n- OAuth Providers\n\n## Security\nWe use industry-standard encryption and security practices.",
        views: 756,
        order: 1,
      },
      {
        categoryId: coreConceptsCategory.id,
        title: "Database",
        slug: "database",
        content: "# Database\n\nUnderstand how data is stored and managed.\n\n## Database Schema\nWe use PostgreSQL with Prisma ORM.\n\n## Models\n- User\n- Project\n- Team\n- And more...",
        views: 634,
        order: 2,
      },
      // API Reference articles
      {
        categoryId: apiReferenceCategory.id,
        title: "REST API",
        slug: "rest-api",
        content: "# REST API\n\n## Base URL\n`https://api.example.com/v1`\n\n## Authentication\nInclude your API key in the header:\n```\nAuthorization: Bearer YOUR_API_KEY\n```\n\n## Endpoints\n- GET /users\n- POST /projects\n- PUT /projects/:id",
        views: 523,
        order: 1,
      },
      {
        categoryId: apiReferenceCategory.id,
        title: "Webhooks",
        slug: "webhooks",
        content: "# Webhooks\n\nSet up webhooks to receive real-time notifications.\n\n## Available Events\n- user.created\n- project.updated\n- payment.succeeded\n\n## Webhook Security\nAll webhooks are signed with HMAC SHA-256.",
        views: 412,
        order: 2,
      },
      // Advanced articles
      {
        categoryId: advancedCategory.id,
        title: "Deployment",
        slug: "deployment",
        content: "# Deployment Guide\n\n## Deployment Options\n- Vercel (Recommended)\n- AWS\n- Docker\n- Self-hosted\n\n## Environment Variables\nMake sure to set all required environment variables in production.",
        views: 389,
        order: 1,
      },
      {
        categoryId: advancedCategory.id,
        title: "Performance Optimization",
        slug: "performance",
        content: "# Performance Optimization\n\n## Best Practices\n- Use caching strategically\n- Optimize database queries\n- Implement lazy loading\n- Use CDN for static assets\n\n## Monitoring\nSet up monitoring to track performance metrics.",
        views: 298,
        order: 2,
      },
    ],
    skipDuplicates: true,
  });
  console.log("Created documentation articles");

  // Seed Invoices
  console.log("Seeding invoices...");
  const invoices = await prisma.invoice.createMany({
    data: [
      {
        userId: user.id,
        amount: 2900, // $29.00
        currency: "usd",
        status: "PAID",
        description: "Pro Plan - Monthly Subscription",
        paidAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        userId: user.id,
        amount: 2900,
        currency: "usd",
        status: "PAID",
        description: "Pro Plan - Monthly Subscription",
        paidAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      },
      {
        userId: user.id,
        amount: 2900,
        currency: "usd",
        status: "PAID",
        description: "Pro Plan - Monthly Subscription",
        paidAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${invoices.count} invoices`);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
