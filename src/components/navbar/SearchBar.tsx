"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useClickOutside } from "@/hooks/useClickOutside";

import Link from "next/link";
import Image from "next/image";

export const SearchBar = () => {
  const { data: products = [] } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const debounceTimer = useRef<NodeJS.Timeout>(null);

  const filteredProductsMemo = useMemo(() => {
    return searchQuery.length >= 3
      ? products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];
  }, [searchQuery, products]);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    if (searchQuery.length >= 3) {
      setIsLoading(true);
      debounceTimer.current = setTimeout(() => {
        setFilteredProducts(filteredProductsMemo);
        setIsLoading(false);
        setShowDropdown(true);
      }, 300);
    } else {
      setFilteredProducts([]);
      setShowDropdown(false);
    }
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery, filteredProductsMemo]);

  useClickOutside(searchRef, () => setShowDropdown(false));

  // Improved keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredProducts.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev < filteredProducts.length - 1 ? prev + 1 : 0), // Loop to top
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev > 0 ? prev - 1 : filteredProducts.length - 1), // Loop to bottom
      );
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    } else if (e.key === "Enter" && filteredProducts.length > 0) {
      const product = filteredProducts[selectedIndex >= 0 ? selectedIndex : 0];
      router.push(`/products/${product.id}`);
      setSearchQuery("");
      setShowDropdown(false);
    }
  };

  return (
    <div
      className="relative max-w-xl flex-1 mx-4 md:block hidden"
      ref={searchRef}
      role="combobox"
      aria-expanded={showDropdown}
      aria-controls="search-results"
    >
      <input
        type="text"
        placeholder="Search products..."
        aria-label="Search products"
        aria-autocomplete="list"
        aria-controls="search-results"
        className="w-full  p-2 border rounded-lg"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setSelectedIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => searchQuery.length >= 3 && setShowDropdown(true)}
      />
      {showDropdown && (
        <div
          id="search-results"
          role="listbox"
          className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10 search-dropdown"
        >
          {isLoading ? (
            <div className="p-2 text-gray-500">Loading...</div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.slice(0, 5).map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                role="option"
                id={`search-result-${index}`}
                aria-selected={selectedIndex === index}
                className={`block p-2 hover:bg-gray-100 ${
                  selectedIndex === index ? "bg-gray-100" : ""
                }`}
                onClick={() => {
                  setSearchQuery("");
                  setShowDropdown(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={product.image}
                    alt={product.title}
                    className="w-8 h-8 object-contain"
                    width={64}
                    height={64}
                    priority={index === 0}
                  />
                  <span>{product.title}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-2 text-gray-500">No products found.</div>
          )}
        </div>
      )}
    </div>
  );
};
