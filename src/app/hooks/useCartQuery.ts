"use client";

import { useQuery } from "@tanstack/react-query";
import { getCartDetails } from "../services/Cart.Service";

export function useCartQuery() {
    return useQuery({
        queryKey: ["cart"],
        queryFn: getCartDetails,
        staleTime: 1000 * 60 * 5
    });
}