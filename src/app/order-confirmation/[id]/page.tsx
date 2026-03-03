"use client"; // Required for client-side interactivity

import { useOrderStore } from "@/store/useOrderStore";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { SuccessIcon } from "@/components/icons";

export default function OrderConfirmationPage() {
  const { order, orderDetails } = useOrderStore();
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      <div className="mb-6">
        <SuccessIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-lg text-gray-600">Thank you for your purchase!</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <p className="mb-2">
          <span className="font-medium">Order ID:</span> ORD-
          {order?.id || "N/A"}
        </p>
        <div className="mb-4">
          <h3 className="font-medium mb-2">Items Purchased:</h3>
          <ul className="divide-y divide-gray-200">
            {orderDetails &&
              orderDetails.map((item) => (
                <li key={item.id} className="py-2 flex justify-between">
                  <span>
                    {item.title} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            <span className="font-medium mt-4 block text-right">
              Total: $
              {orderDetails
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </ul>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
