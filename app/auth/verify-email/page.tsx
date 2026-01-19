"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/lib/toast";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    verifyEmail(token);
  }, [token]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Your email has been verified successfully!");
        toast.success("Email verified!", "You can now access all features");
        setTimeout(() => router.push("/dashboard"), 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Verification failed");
        toast.error("Verification failed", data.error);
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred during verification");
      toast.error("Verification failed", "Please try again");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            {status === "loading" && "Verifying your email address..."}
            {status === "success" && "Verification successful!"}
            {status === "error" && "Verification failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {status === "loading" && (
            <>
              <Spinner size="lg" />
              <p className="text-sm text-muted-foreground">Please wait...</p>
            </>
          )}
          
          {status === "success" && (
            <>
              <div className="text-6xl">✓</div>
              <p className="text-center text-muted-foreground">{message}</p>
              <p className="text-sm text-muted-foreground">
                Redirecting to dashboard...
              </p>
            </>
          )}
          
          {status === "error" && (
            <>
              <div className="text-6xl">✗</div>
              <p className="text-center text-muted-foreground">{message}</p>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => router.push("/auth/sign-in")}>
                  Sign In
                </Button>
                <Button variant="outline" onClick={() => router.push("/")}>
                  Go Home
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
