"use client";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { Categories } from "./Categories";
import { SidebarCart } from "@/components/navbar/SidebarCart";

export const Navbar = () => {
  const { cart } = useCartStore();
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="text-xl font-bold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Liftshops
          </Link>
          <SearchBar />
          <SidebarCart />
        </div>

        <div className="flex justify-center">
          <Categories />
        </div>
      </div>
    </nav>
  );
};
