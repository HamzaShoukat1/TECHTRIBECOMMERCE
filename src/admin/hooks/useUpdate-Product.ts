"use client";

import { updateProduct } from "@/src/app/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../features/products/data/schema";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Product;
    }) => updateProduct(id, data as any),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products-admin"],
      });
    },
  });
}