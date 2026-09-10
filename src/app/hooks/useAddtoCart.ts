"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddToCart } from "../services/Cart.Service";

export function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            productId,
            quantity,
            selectedSize,
            selectedColor,
        }: {
            productId: string;
            quantity: number;
            selectedSize: string | null;
            selectedColor: string | null;
        }) =>
            AddToCart(
                productId,
                quantity,
                selectedSize,
                selectedColor
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },
    });
}