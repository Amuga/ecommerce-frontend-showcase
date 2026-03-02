import { Order } from "@/types";

const API_BASE_URL = "https://fakestoreapi.com";

export async function submitOrder(
  orderData: Omit<Order, "id">,
): Promise<Order> {
  try {
    const response = await fetch(`${API_BASE_URL}/carts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error(`Failed to submit order: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
}
