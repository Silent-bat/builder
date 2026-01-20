import { prisma } from "@/lib/db";
import { PageRenderer } from "@/components/page-builder/page-renderer";
import { PageEditButton } from "@/components/page-builder/page-edit-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  console.log("[HomePage] Starting render...");
  // Try to find a landing page with slug "home" or any LANDING page
  let page = null;
  let dbError = null;
  try {
    page = await prisma.page.findFirst({
      where: {
        type: "LANDING",
        published: true,
      },
      include: {
        components: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: {
        createdAt: "asc", // Get the first created landing page
      },
    });
  } catch (error) {
    // Database not available - log and continue with default page
    console.error("[HomePage] Database error:", error);
    dbError = error instanceof Error ? error.message : "Unknown error";
    page = null;
  }

  // Check if user is admin
  let session = null;
  let isAdmin = false;
  let authError = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
    isAdmin = session?.user ? (session.user as any).role === "ADMIN" : false;
  } catch (error) {
    // Session check failed - not critical for homepage
    console.error("[HomePage] Auth error:", error);
    authError = error instanceof Error ? error.message : "Unknown error";
  }
  console.log("[HomePage] Page query result:", page ? "Found" : "Not found");

  // Always show LANDING page if it exists, otherwise default homepage
  if (page && page.components.length > 0) {
    try {
      const components = page.components.map((comp) => ({
        id: comp.id,
        type: comp.type,
        props: comp.props,
      }));

      return (
        <>
          <PageRenderer components={components} />
          <PageEditButton pageId={page.id} isAdmin={isAdmin} />
        </>
      );
    } catch (renderError) {
      console.error("[HomePage] PageRenderer error:", renderError);
      // Fall through to default page if PageRenderer fails
    }
  }

  // Default landing page if no custom page exists
  return (
    <div className="min-h-screen">
      {/* Debug info - remove after fixing */}
      {(dbError || authError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
          <p className="font-bold">Debug Information:</p>
          {dbError && <p className="text-sm">DB Error: {dbError}</p>}
          {authError && <p className="text-sm">Auth Error: {authError}</p>}
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Your Platform
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Build amazing things with our powerful tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                >
                  Get Started
                </Link>
                <Link
                  href="/auth/sign-in"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to succeed
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast</h3>
              <p className="text-muted-foreground">Lightning-fast performance</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p className="text-muted-foreground">Bank-level security</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-semibold mb-2">Reliable</h3>
              <p className="text-muted-foreground">99.9% uptime guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of users already using our platform
          </p>
          <Link
            href="/auth/sign-up"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-background text-foreground hover:bg-background/90 h-11 px-8"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {isAdmin && page && (
        <PageEditButton pageId={page.id} isAdmin={true} />
      )}

      {isAdmin && !page && (
        <div className="fixed bottom-4 right-4 z-50">
          <Link href="/admin/pages/new">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 shadow-lg">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Landing Page
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
