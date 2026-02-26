import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api/products";

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });
};
