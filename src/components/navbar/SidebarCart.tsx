// components/navbar/SidebarCart.tsx;
"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { CartItemsList } from "../CartItemsList";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function SidebarCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, total, updateQuantity, removeFromCart } = useCartStore();

  useEffect(() => {
    // Close sidebar when navigating to a new page
    setIsOpen(false);
  }, [usePathname()]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Open cart"
      >
        🛒
        {cart.length > 0 && (
          <span
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse"
            aria-label={`Cart with ${cart.length} items`}
          >
            {cart.length}
          </span>
        )}
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-full flex flex-col p-4">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-bold">Your Cart ({cart.length})</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <p className="text-gray-600">Your cart is empty.</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto gap-2">
                <CartItemsList
                  items={cart}
                  onQuantityChange={updateQuantity}
                  onRemove={removeFromCart}
                />
              </div>

              {/* Sidebar Footer */}
              <div className="border-t pt-4 space-y-2">
                <div className="text-center">
                  <p className="text-lg font-bold">
                    Total: ${total.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/cart"
                    className="flex-1 text-center px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    View Full Cart
                  </Link>
                  <Link
                    href="/checkout"
                    className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-xs "
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
