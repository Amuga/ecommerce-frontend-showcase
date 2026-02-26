// src/app/components/ProductCard.tsx
import React from "react";
import Image from "next/image";
import queryClient from "@/lib/queryClient";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { fetchProductById } from "@/lib/api/products";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const shouldTruncate = product.title.length > 50;
  const preFetchProduct = () => {
    queryClient.prefetchQuery({
      queryKey: ["product", product.id],
      queryFn: () => fetchProductById(product.id),
    });
  };
  const [expanded, setExpanded] = React.useState(false);
  const { addToCart } = useCartStore();
  return (
    <div className="flex flex-col h-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-100">
        <Link
          href={`/products/${product.id}`}
          className="block w-full h-full relative"
        >
          {product.image ? (
            <Image
              src={product.image || "/placeholder-fruit.jpg"}
              alt={product.title}
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain"
              onClick={preFetchProduct}
              onFocus={preFetchProduct}
            />
          ) : (
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          )}
        </Link>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <h2
          className={`text-lg font-semibold text-gray-900 ${shouldTruncate && !expanded ? "line-clamp-2" : ""}`}
          title={product.title}
          onClick={() => setExpanded(!expanded)}
        >
          {product.title}
        </h2>
        <p className="mt-1 text-sm text-gray-600">${product.price}</p>
        {product.rating && (
          <p className="mt-1 text-sm text-yellow-500">
            ★ {product.rating.rate}
            <span
              title={`Reviewed by ${product.rating.count} users`}
              className="ml-1 text-gray-500"
            >
              ({product.rating.count})
            </span>
          </p>
        )}
        <div className="mt-auto pt-4">
          <button
            className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
