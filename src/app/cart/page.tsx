"use client";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, total, removeFromCart, updateQuantity } = useCartStore();
  const router = useRouter();

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg bg-gray-50 shadow-sm">
          <p className="text-gray-600">Your cart is empty.</p>
          <button onClick={() => router.push("/")} className="btn-secondary">
            Go back
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <div className="flex items-center gap-4">
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
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 text-center">
            <p className="text-xl font-bold">Total: ${total}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-end gap-4">
            <button onClick={() => router.back()} className="btn-secondary">
              Go back
            </button>
            <button
              onClick={() => router.push("/checkout")}
              className="btn-primary"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
