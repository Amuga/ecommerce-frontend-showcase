"use client"; // Required for client-side interactivity

import { useOrderStore } from "@/store/useOrderStore";
import { useRouter } from "next/navigation";

export default function OrderConfirmationPage() {
  const { orderDetails } = useOrderStore();
  const router = useRouter();

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      <div className="mb-6">
        <svg
          className="w-16 h-16 mx-auto text-green-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-lg text-gray-600">Thank you for your purchase!</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <p className="mb-2">
          <span className="font-medium">Order ID:</span> ORD-
          {orderDetails?.id || "N/A"}
        </p>
        <div className="mb-4">
          <h3 className="font-medium mb-2">Items Purchased:</h3>
          <ul className="divide-y divide-gray-200">
            {orderDetails &&
              orderDetails.products.map((item) => (
                <li key={item.productId} className="py-2 flex justify-between">
                  <span>
                    {item.productId} x {item.quantity}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
