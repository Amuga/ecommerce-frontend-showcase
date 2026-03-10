"use client";
import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(Number(params.id));
  const { addToCart } = useCartStore();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading product...</div>;
  }
  if (error) {
    return <div>Error loading product: {error.message}</div>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="container mx-auto p-4 max-w-4xl min-h-[50vh] max-h-[70vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="relative w-auto aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            loading="eager"
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 33vw"
            fill
          />
        </div>
        <div className="gap-4 flex flex-col">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl text-gray-700">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center">
            <p className="text-yellow-500">★ {product.rating.rate}</p>
            <span className="ml-2 text-gray-500">
              ({product.rating.count} reviews)
            </span>
          </div>
          <button className="btn-primary " onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <button onClick={() => router.back()} className="btn-secondary mb-4">
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
