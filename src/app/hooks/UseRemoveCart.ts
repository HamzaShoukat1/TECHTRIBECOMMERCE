import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "../services/Cart.Service";

export function useRemoveCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => removeFromCart(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },
    });
}