"use client";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  const { cart } = useCartStore();
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-600">
          Liftshops
        </Link>
        <SearchBar />
        <Link href="/cart" className="relative">
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};
