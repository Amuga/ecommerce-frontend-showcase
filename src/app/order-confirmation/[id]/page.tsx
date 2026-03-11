"use client"; // Required for client-side interactivity

import { useOrderStore } from "@/store/useOrderStore";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { CartItemsList } from "@/components/CartItemsList";
import { SuccessIcon } from "@/components/icons";
import { useEffect } from "react";

export default function OrderConfirmationPage() {
  const { order, orderDetails } = useOrderStore();
  const { clearCart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    // Clear the cart when this page loads
    clearCart();
  }, [clearCart]);

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      <div className="mb-6">
        <SuccessIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <h2 className="text-xl text-gray-700 mb-4">
          (This is a mock confirmation page. No transaction was made.)
        </h2>
        <p className="text-lg text-gray-600">Thank you for your purchase!</p>
        <p className="text-lg text-gray-600">
          Your shipping details will be sent to your email.
        </p>
      </div>

      <div className="bg-gray-200 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <p className="mb-2">
          <span className="font-medium">Order ID:</span> ORD-
          {order?.id || "N/A"}
        </p>
        <div className="mb-4">
          <h3 className="font-medium mb-2">Items Purchased:</h3>
          <CartItemsList
            items={orderDetails}
            mode="readonly-receipt"
            emptyMessage="No items in order"
          />
          <div className="mt-4 pt-4 border-t border-gray-600">
            <span className="font-medium block text-right">
              Total: $
              {orderDetails
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={handleClick} className="btn-primary">
          Go back to Home
        </button>
      </div>
    </div>
  );
}
