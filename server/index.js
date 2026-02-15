// Backend server for API routes
// Run with: node server/index.js
// Or use: npm run dev:server

import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: `${__dirname}/../.env` });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

// Initialize Notion
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const NOTION_DATABASES = {
  CLIENTS: process.env.NOTION_CLIENTS_DB_ID || "",
  ORDERS: process.env.NOTION_ORDERS_DB_ID || "",
};

// Create a client in Notion
app.post("/api/clients", async (req, res) => {
  try {
    const { fullName, email, phone, address, postalCode, city, allergies, preferences } = req.body;

    if (!fullName || !email || !phone || !address || !postalCode || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await notion.pages.create({
      parent: { database_id: NOTION_DATABASES.CLIENTS },
      properties: {
        Nom: {
          title: [{ text: { content: fullName } }],
        },
        Email: {
          email: email,
        },
        Téléphone: {
          phone_number: phone,
        },
        Adresse: {
          rich_text: [{ text: { content: `${address}, ${postalCode} ${city}` } }],
        },
        "Type de panier": {
          select: { name: "Végétarien" }, // Will be updated from order
        },
        Fréquence: {
          select: { name: "Unique" }, // Will be updated from order
        },
        Allergies: {
          rich_text: allergies ? [{ text: { content: allergies } }] : [],
        },
        Statut: {
          select: { name: "Actif" },
        },
      },
    });

    res.json({ id: response.id, ...response });
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({ error: "Failed to create client", details: error.message });
  }
});

// Create an order in Notion
app.post("/api/orders", async (req, res) => {
  try {
    const { formula, quantity, frequency, client, total } = req.body;

    if (!client || !client.id) {
      return res.status(400).json({ error: "Client ID is required" });
    }

    // Generate order number
    const orderNumber = `OC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const response = await notion.pages.create({
      parent: { database_id: NOTION_DATABASES.ORDERS },
      properties: {
        "N° Commande": {
          title: [{ text: { content: orderNumber } }],
        },
        Client: {
          relation: [{ id: client.id }],
        },
        Date: {
          date: { start: new Date().toISOString() },
        },
        "Type panier": {
          rich_text: [{ text: { content: formula } }],
        },
        Quantité: {
          number: quantity,
        },
        Montant: {
          number: total,
        },
        Statut: {
          select: { name: "En attente" },
        },
        "Paiement confirmé": {
          checkbox: false,
        },
      },
    });

    res.json({ id: response.id, orderNumber, ...response });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order", details: error.message });
  }
});

// Create Stripe checkout session
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { formula, quantity, frequency, amount, customerEmail, customerName, orderId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Panier ${formula}`,
              description: `${quantity} panier(s) - ${frequency}`,
            },
            unit_amount: Math.round(amount / quantity), // Price per unit
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      customer_email: customerEmail,
      metadata: {
        orderId: orderId || "",
        formula,
        frequency,
        customerName,
      },
      success_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/commander`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Stripe webhook handler
app.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Update order in Notion
    try {
      // Find order by Stripe session ID or metadata
      // Update payment status
      console.log("Payment confirmed for session:", session.id);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  }

  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
