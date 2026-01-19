"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { useState } from "react";

type Invoice = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string | null;
  createdAt: Date;
};

type BillingContentProps = {
  invoices: Invoice[];
};

export default function BillingContent({ invoices }: BillingContentProps) {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create checkout session");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleManageBilling = async () => {
    try {
      setPortalLoading(true);
      const res = await fetch("/api/stripe/create-portal", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create portal session");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create portal session");
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and billing</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Free</div>
            <p className="text-xs text-muted-foreground mt-1">$0/month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">-</div>
            <p className="text-xs text-muted-foreground mt-1">Track your usage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">-</div>
            <p className="text-xs text-muted-foreground mt-1">No active subscription</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>Choose the plan that fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-3xl font-bold mb-4">
                $0<span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Basic features</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Up to 5 projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Community support</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            </div>

            <div className="border-2 border-primary rounded-lg p-6 relative">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="text-3xl font-bold mb-4">
                $29<span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>All Free features</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Unlimited projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Advanced analytics</span>
                </li>
              </ul>
              <Button 
                className="w-full" 
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? "Loading..." : "Upgrade to Pro"}
              </Button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button 
              variant="link" 
              onClick={handleManageBilling}
              disabled={portalLoading}
            >
              {portalLoading ? "Loading..." : "Manage Billing in Stripe →"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              No payment methods saved yet. Payment methods will appear here once you subscribe to a paid plan.
            </p>
            <p className="text-sm text-muted-foreground">
              Payment methods are managed securely through Stripe.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent invoices</CardDescription>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No billing history yet. Your invoices will appear here once you subscribe to a paid plan.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{invoice.description || 'Invoice'}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(invoice.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      ${(invoice.amount / 100).toFixed(2)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      invoice.status === 'PAID' ? 'bg-green-100 text-green-700' :
                      invoice.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {invoice.status}
                    </span>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
