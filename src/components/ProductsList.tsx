"use client";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { useSearchParams } from "next/navigation";

export default function ProductsList() {
  const { data: products, isLoading, error } = useProducts();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  if (isLoading) {
    return <div>Loading products...</div>;
  }
  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  const filteredProducts = category
    ? products?.filter((product: Product) => product.category === category)
    : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts?.map((product: Product) => (
        <div key={product.id} className="border rounded-lg p-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
