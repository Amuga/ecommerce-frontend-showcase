import { fetchProducts } from "@/lib/api/products";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import ProductsList from "@/components/ProductsList";

export default async function Home() {
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome to Liftshops</h1>
      <h2 className="text-lg text-gray-600 mt-2">
        Lifting your shopping experience to criminal heights
      </h2>
      <div className="mt-6">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductsList />
        </HydrationBoundary>
      </div>
    </main>
  );
}
