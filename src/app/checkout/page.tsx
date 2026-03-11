"use client";

import { useMutation } from "@tanstack/react-query";
import { submitOrder } from "@/lib/api/order";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { CartItemsList } from "@/components/CartItemsList";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, total } = useCartStore();
  const { setOrder, setOrderDetails } = useOrderStore();
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
      setOrder(order);
      setOrderDetails([...cart]);
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
      <div className="border rounded-lg p-4 mb-6 bg-gray-50 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        <CartItemsList items={cart} mode="readonly-checkout" />
      </div>

      <div className="border rounded-lg p-4 mb-6 bg-gray-50 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Payment Information </h1>
        <h2 className="text-lg text-gray-600 mb-6">
          (This is a mock checkout form. No real payment processing occurs.)
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Name on Card
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="p-3 border rounded w-full"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                className="p-3 border rounded w-full"
                required
                maxLength={19}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="p-3 border rounded w-full"
                required
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVC</label>
              <input
                type="text"
                placeholder="123"
                className="p-3 border rounded w-full"
                required
                maxLength={4}
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <h1 className="text-xl font-bold">Total: ${total.toFixed(2)}</h1>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
            >
              Go back
            </button>
            <button type="submit" disabled={isPending} className="btn-primary">
              {isPending ? "Processing..." : "Place Order"}
            </button>
          </div>

          {isError && (
            <p className="text-red-500 text-center mt-4 p-2 bg-red-50 border border-red-200 rounded">
              {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
