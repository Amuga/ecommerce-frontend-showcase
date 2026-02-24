"use client";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export default function ProductsList() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return <div>Loading products...</div>;
  }
  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.map((product: Product) => (
        <div key={product.id} className="border rounded-lg p-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
