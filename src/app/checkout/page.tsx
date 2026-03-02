"use client";

import { useMutation } from "@tanstack/react-query";
import { submitOrder } from "@/lib/api/order";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCartStore();
  const { setOrderDetails } = useOrderStore();
  const router = useRouter();

  const {
    mutate: submitOrderMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () =>
      submitOrder({
        userId: 1, // Mock user ID
        date: new Date().toISOString(),
        products: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      }),
    onSuccess: (order) => {
      setOrderDetails(order);
      clearCart();
      router.push("/order-confirmation/" + order.id);
    },
    onError: (err) => {
      console.error(`Failed to place order: ${err.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitOrderMutation();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <ul className="mb-4">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between mb-2">
            <span>
              {item.title} (x{item.quantity})
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <h1 className="text-2xl font-bold mb-4">Payment Information (Mock)</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1">Name on Card</label>
          <input
            type="text"
            placeholder="John Doe"
            className="p-2 border rounded max-w-64 w-full"
            required
          />
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input
            type="text"
            placeholder="4242 4242 4242 4242"
            className="p-2 border rounded w-full max-w-48"
            required
            maxLength={19}
          />
          <label className="block text-sm font-medium mb-1">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            className="p-2 border rounded w-full max-w-20"
            required
            maxLength={5}
          />
          <label className="block text-sm font-medium mb-1">CVC</label>
          <input
            type="text"
            placeholder="123"
            className="p-2 border rounded w-full max-w-12"
            required
            maxLength={4}
          />
        </div>
        <h1 className="block text-lg font-bold text-center">
          Total: ${total.toFixed(2)}
        </h1>

        <button
          type="submit"
          disabled={isPending}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isPending ? "Processing..." : "Place Order"}
        </button>
        {isError && <p className="text-red-500">{error.message}</p>}
      </form>
    </div>
  );
}
