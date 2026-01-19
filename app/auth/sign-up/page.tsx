import { SignUpForm } from "@/components/auth/sign-up-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <Link href="/" className="text-2xl font-bold hover:underline">
          Next.js Boilerplate
        </Link>
      </div>
      <SignUpForm />
    </div>
  );
}
