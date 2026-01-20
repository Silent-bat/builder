"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/lib/toast";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });
      
      if (result.error) {
        toast.error("Sign in failed", result.error.message || "Invalid email or password");
        return;
      }
      
      toast.success("Welcome back!", "You have successfully signed in");
      
      // Redirect to the page they came from, or based on user role
      if (from && !from.startsWith("/auth")) {
        router.push(from);
      } else {
        const userRole = (result.data?.user as any)?.role;
        if (userRole === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      
      // Handle different error types
      let errorMessage = "Invalid email or password";
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.error?.message) {
        errorMessage = err.error.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      // Specific error messages
      if (errorMessage.includes("INVALID_EMAIL_OR_PASSWORD") || 
          errorMessage.includes("Invalid email or password")) {
        toast.error("Invalid credentials", "The email or password you entered is incorrect. Please try again.");
      } else if (errorMessage.includes("USER_NOT_FOUND")) {
        toast.error("Account not found", "No account exists with this email address.");
      } else if (errorMessage.includes("INVALID_PASSWORD")) {
        toast.error("Incorrect password", "The password you entered is incorrect. Please try again.");
      } else {
        toast.error("Sign in failed", errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a 
                href="/auth/forgot-password" 
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <a href="/auth/sign-up" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
