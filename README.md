# Next.js Boilerplate

A modern, production-ready Next.js boilerplate with authentication, database, and beautiful UI components. Built to accelerate your app development.

## Features

- ⚡ **Next.js 15** - React framework with App Router
- 🔐 **Better Auth** - Modern authentication solution with email/password
- 🗄️ **Prisma** - Type-safe ORM with PostgreSQL
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautiful, accessible UI components (no icons)
- 👥 **Role-Based Access** - User and Admin roles with protected routes
- 🔒 **Middleware Protection** - Secure route protection out of the box
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🌙 **Dark Mode Support** - Built-in dark mode with CSS variables
- 🚀 **TypeScript** - Fully typed for better DX

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or remote)
- pnpm (recommended package manager)

Install pnpm if you haven't:
```bash
npm install -g pnpm
```

### Installation

1. **Clone or download this boilerplate**

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then edit `.env` and update the values:

```env
# Database - Update with your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# Better Auth - Generate a random secret (min 32 characters)
BETTER_AUTH_SECRET="your-secret-key-here-min-32-chars"
BETTER_AUTH_URL="http://localhost:3000"

# Admin Setup - First user with this email becomes admin
ADMIN_EMAIL="admin@example.com"
```

To generate a secure secret, you can use:

```bash
openssl rand -base64 32
```

4. **Set up the database**

Generate Prisma client and push schema to database:

```bash
pnpm db:generate
pnpm db:push
```

For production, use migrations:

```bash
pnpm db:migrate
```

5. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── auth/            # Better Auth API endpoints
│   ├── auth/                # Authentication pages
│   │   ├── sign-in/         # Sign in page
│   │   └── sign-up/         # Sign up page
│   ├── dashboard/           # User dashboard
│   ├── admin/               # Admin dashboard
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── auth/                # Authentication components
│   └── dashboard/           # Dashboard components
├── lib/                     # Utilities and configurations
│   ├── auth.ts              # Better Auth configuration
│   ├── auth-client.ts       # Client-side auth utilities
│   ├── db.ts                # Prisma client
│   ├── session.ts           # Session utilities
│   └── utils.ts             # Helper functions
├── prisma/                  # Database schema and migrations
│   └── schema.prisma        # Prisma schema
├── middleware.ts            # Next.js middleware for route protection
└── package.json             # Dependencies and scripts
```

## Authentication

### Sign Up

Users can create an account at `/auth/sign-up` with:
- Name
- Email
- Password (minimum 8 characters)

### Sign In

Users can sign in at `/auth/sign-in` with:
- Email
- Password

### Making a User Admin

To make a user an admin:

1. Set the `ADMIN_EMAIL` in your `.env` file to the user's email
2. The first user who signs up with that email will automatically become an admin
3. Alternatively, manually update the user's role in the database:

```sql
UPDATE "users" SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

### Protected Routes

- `/dashboard` - Requires authentication
- `/admin` - Requires authentication + ADMIN role

Routes are protected by:
1. Middleware (`middleware.ts`) - Initial check for session token
2. Server components - Session verification with database

## Database

### Schema

The Prisma schema includes:
- **User** - User accounts with role-based access
- **Session** - User sessions
- **Account** - Authentication accounts (email/password, OAuth)
- **Verification** - Email verification tokens

### Available Scripts

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database (development)
pnpm db:push

# Create and run migrations (production)
pnpm db:migrate

# Open Prisma Studio (database GUI)
pnpm db:studio
```

## Customization

### Adding More UI Components

This boilerplate includes basic shadcn/ui components. To add more:

1. Create the component file in `components/ui/`
2. Follow the shadcn/ui patterns used in existing components
3. Import and use in your pages

### Adding Social Authentication

To add OAuth providers (GitHub, Google, etc.):

1. Update `lib/auth.ts` to include social providers:

```typescript
socialProviders: {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  },
},
```

2. Add environment variables
3. Update sign-in/sign-up forms to include social login buttons

### Styling

The app uses Tailwind CSS with CSS variables for theming:
- Edit `app/globals.css` to customize colors
- Light and dark mode themes are defined with CSS variables
- Use `cn()` utility from `lib/utils.ts` for conditional classes

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Node.js:
- Railway
- Render
- DigitalOcean
- AWS
- etc.

Make sure to:
1. Set all environment variables
2. Run database migrations
3. Use a production PostgreSQL database

## Scripts

```bash
# Development
pnpm dev             # Start development server

# Production
pnpm build           # Build for production
pnpm start           # Start production server

# Database
pnpm db:generate     # Generate Prisma client
pnpm db:push         # Push schema to database
pnpm db:migrate      # Run migrations
pnpm db:studio       # Open Prisma Studio

# Linting
pnpm lint            # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Auth**: Better Auth
- **Database**: PostgreSQL + Prisma
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Deployment**: Vercel (recommended)

## License

MIT

## Support

For issues and questions:
- Check the documentation for each technology used
- Review the code comments
- Open an issue in your repository

---

Built with ❤️ using Next.js, Better Auth, Prisma, and Tailwind CSS
