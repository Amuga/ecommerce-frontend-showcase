"use client";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { CartItemsList } from "@/components/CartItemsList";
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
          <CartItemsList
            items={cart}
            onQuantityChange={updateQuantity}
            onRemove={removeFromCart}
          />
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
