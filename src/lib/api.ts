// API utility functions for client and order management

export interface ClientData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  allergies?: string;
  preferences?: string[];
}

export interface OrderData {
  formula: string;
  quantity: number;
  frequency: string;
  client: ClientData & { id?: string };
  total: number;
}

// Create a client via API
export async function createClient(clientData: ClientData) {
  try {
    const response = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      throw new Error("Failed to create client");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
}

// Create an order via API
export async function createOrder(orderData: OrderData) {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}
