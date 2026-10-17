import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api";

export function useProducts(params: { skip: number; limit: number; search: string }) {
  const { skip, limit, search } = params;

  return useQuery({
    // queryKey changes whenever search, skip or limit changes,
    // so React Query fetches + caches each combination separately.
    queryKey: ["products", { search, skip, limit }],
    queryFn: () => fetchProducts({ skip, limit, search }),
    placeholderData: (previousData) => previousData, // keep old page visible while new page loads
  });
}
