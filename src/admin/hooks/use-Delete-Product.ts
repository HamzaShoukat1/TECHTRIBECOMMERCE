import { deleteProduct } from "@/src/app/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";





export function useDeleteProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (productId: string) => deleteProduct(productId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products-admin"],
            });
        },
    });
}