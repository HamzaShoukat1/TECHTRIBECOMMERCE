"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/src/app/services/product.service";
import { IProduct } from "@/src/app/utils/Types";

// export type ProductCreate = {
//     productName: string;
//     productPrice: number;
//     productImage: {
//         url: string;
//     };
//     productSizes: string[];
//     productColors: string[];
//     productDescription: string;
// };

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productData: IProduct) => createProduct(productData),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products-admin"],
            });

        },
    });
}
