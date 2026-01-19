import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripeHelpers } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    const checkoutSession = await stripeHelpers.createCheckoutSession({
      priceId,
      userId: session.user.id,
      userEmail: session.user.email!,
      successUrl: `${process.env.BETTER_AUTH_URL}/dashboard/billing?success=true`,
      cancelUrl: `${process.env.BETTER_AUTH_URL}/dashboard/billing?canceled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Checkout session error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
