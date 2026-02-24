import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api/products";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
