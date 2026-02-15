import { Client } from "@notionhq/client";

// Initialize Notion client
export const notionClient = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY || "",
});

// Database IDs (to be set in environment variables)
export const NOTION_DATABASES = {
  CLIENTS: import.meta.env.VITE_NOTION_CLIENTS_DB_ID || "",
  ORDERS: import.meta.env.VITE_NOTION_ORDERS_DB_ID || "",
  RECIPES: import.meta.env.VITE_NOTION_RECIPES_DB_ID || "",
};

// Types
export interface NotionClient {
  name: string;
  email: string;
  phone: string;
  address: string;
  basketType: "Végétarien" | "Diététique" | "Sportif";
  frequency: "Unique" | "Hebdomadaire" | "Bimensuelle";
  allergies?: string;
}

export interface NotionOrder {
  orderNumber: string;
  clientId: string;
  date: string;
  basketType: string;
  quantity: number;
  amount: number;
  status: "En attente" | "Confirmée" | "Livrée";
  paymentConfirmed: boolean;
  stripePaymentId?: string;
}

// Create a new client in Notion
export async function createNotionClient(client: NotionClient) {
  try {
    const response = await notionClient.pages.create({
      parent: { database_id: NOTION_DATABASES.CLIENTS },
      properties: {
        Nom: {
          title: [{ text: { content: client.name } }],
        },
        Email: {
          email: client.email,
        },
        Téléphone: {
          phone_number: client.phone,
        },
        Adresse: {
          rich_text: [{ text: { content: client.address } }],
        },
        "Type de panier": {
          select: { name: client.basketType },
        },
        Fréquence: {
          select: { name: client.frequency },
        },
        Allergies: {
          rich_text: client.allergies
            ? [{ text: { content: client.allergies } }]
            : [],
        },
        Statut: {
          select: { name: "Actif" },
        },
      },
    });
    return response.id;
  } catch (error) {
    console.error("Error creating Notion client:", error);
    throw error;
  }
}

// Create a new order in Notion
export async function createNotionOrder(order: NotionOrder) {
  try {
    const response = await notionClient.pages.create({
      parent: { database_id: NOTION_DATABASES.ORDERS },
      properties: {
        "N° Commande": {
          title: [{ text: { content: order.orderNumber } }],
        },
        Client: {
          relation: [{ id: order.clientId }],
        },
        Date: {
          date: { start: order.date },
        },
        "Type panier": {
          rich_text: [{ text: { content: order.basketType } }],
        },
        Quantité: {
          number: order.quantity,
        },
        Montant: {
          number: order.amount,
        },
        Statut: {
          select: { name: order.status },
        },
        "Paiement confirmé": {
          checkbox: order.paymentConfirmed,
        },
        "Stripe Payment ID": {
          rich_text: order.stripePaymentId
            ? [{ text: { content: order.stripePaymentId } }]
            : [],
        },
      },
    });
    return response.id;
  } catch (error) {
    console.error("Error creating Notion order:", error);
    throw error;
  }
}
