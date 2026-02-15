import { loadStripe, Stripe } from "@stripe/stripe-js";

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Create a checkout session (this should be done on the backend)
export async function createCheckoutSession(orderData: {
  formula: string;
  quantity: number;
  frequency: string;
  amount: number;
  customerEmail: string;
  customerName: string;
}) {
  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
