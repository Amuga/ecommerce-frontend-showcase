"use client";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, total, removeFromCart, updateQuantity } = useCartStore();
  const router = useRouter();

  return (
    <div className="container max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="space-y-4">
          <p>Your cart is empty.</p>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="object-contain rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 border rounded cursor-pointer"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 border rounded cursor-pointer"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 cursor-pointer border border-red-500 px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ${total}</p>
          </div>
          <div className="w-full">
            <button
              onClick={() => router.push("/checkout")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
