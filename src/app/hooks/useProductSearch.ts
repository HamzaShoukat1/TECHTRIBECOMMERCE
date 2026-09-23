import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../services/product.service";

export function useProductSearch(query: string) {
    return useQuery({
        queryKey: ["search", query],

        queryFn: () => searchProducts(query),

        enabled: query.trim().length >= 2,

        staleTime: 30 * 1000,
    });
}