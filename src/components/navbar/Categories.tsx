"use client";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { useSearchParams } from "next/navigation";

export const Categories = () => {
  const { data: products = [], isLoading } = useProducts();
  const searchParams = useSearchParams();

  // Extract and sort categories
  const categories = products
    ? [...new Set(products.map((p) => p.category))].sort((a, b) =>
        a.localeCompare(b),
      )
    : [];

  if (isLoading) {
    return <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />;
  }

  return (
    <div className="flex gap-6">
      {categories.map((category) => (
        <Link
          key={category}
          href={`/?category=${encodeURIComponent(category)}`}
          className={`capitalize transition-colors ${category === searchParams.get("category") ? "text-blue-600 font-medium pointer-events-none" : "text-gray-600 hover:text-gray-900"}`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};
