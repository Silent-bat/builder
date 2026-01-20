import { Suspense } from "react";
import { SignInForm } from "@/components/auth/sign-in-form";
import Link from "next/link";

function SignInContent() {
  return <SignInForm />;
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <Link href="/" className="text-2xl font-bold hover:underline">
          Next.js Boilerplate
        </Link>
      </div>
      <Suspense fallback={
        <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-10 bg-muted rounded"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </div>
      }>
        <SignInContent />
      </Suspense>
    </div>
  );
}
