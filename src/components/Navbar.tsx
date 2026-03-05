"use client";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  const { cart } = useCartStore();
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link
          href="/"
          aria-label="Go to homepage"
          className="text-xl font-bold text-gray-600 hover:text-gray-900 transition-colors"
        >
          Liftshops
        </Link>
        <SearchBar />
        <Link
          href="/cart"
          className="relative p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          🛒
          {cart.length > 0 && (
            <span
              className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${cart.length > 0 ? "animate-pulse" : ""}`}
              aria-label={`Cart with ${cart.length} items in cart`}
            >
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};
