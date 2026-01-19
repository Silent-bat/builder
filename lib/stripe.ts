import Stripe from "stripe";
import { env } from "./env";

// Initialize Stripe only if API key is available
export const stripe = env.STRIPE_SECRET_KEY
  ? new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
      typescript: true,
    })
  : null;

// Stripe helper functions
export const stripeHelpers = {
  // Create checkout session for subscription
  async createCheckoutSession({
    priceId,
    userId,
    userEmail,
    successUrl,
    cancelUrl,
  }: {
    priceId: string;
    userId: string;
    userEmail: string;
    successUrl: string;
    cancelUrl: string;
  }) {
    if (!stripe) {
      throw new Error("Stripe not configured");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: userEmail,
      metadata: {
        userId,
      },
    });

    return session;
  },

  // Create customer portal session
  async createPortalSession({
    customerId,
    returnUrl,
  }: {
    customerId: string;
    returnUrl: string;
  }) {
    if (!stripe) {
      throw new Error("Stripe not configured");
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return session;
  },

  // Get subscription details
  async getSubscription(subscriptionId: string) {
    if (!stripe) {
      throw new Error("Stripe not configured");
    }

    return await stripe.subscriptions.retrieve(subscriptionId);
  },

  // Cancel subscription
  async cancelSubscription(subscriptionId: string) {
    if (!stripe) {
      throw new Error("Stripe not configured");
    }

    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
  },

  // Get customer
  async getCustomer(customerId: string) {
    if (!stripe) {
      throw new Error("Stripe not configured");
    }

    return await stripe.customers.retrieve(customerId);
  },
};

// Stripe pricing (placeholder - replace with your actual price IDs)
export const STRIPE_PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    priceId: null,
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
    ],
  },
  PRO: {
    name: "Pro",
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID || "price_placeholder_pro",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: null, // Custom pricing
    priceId: null,
    features: [
      "Everything in Pro",
      "Dedicated support",
      "SLA guarantee",
      "Custom contract",
    ],
  },
};
