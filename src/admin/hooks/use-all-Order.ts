import { changeOrderStatus, getOrderDetail, getAllOrdersForAdminTable } from "@/src/app/services/Order.Service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function UseOrderDetail(id: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrderDetail(id),
    staleTime: 1000 * 60,
    enabled: Boolean(id), 
  });
}
export function useAllOrdersForTable() {
    return useQuery({
        queryKey: ['admin-orders-table'],
        queryFn: getAllOrdersForAdminTable,
        staleTime: 1000 * 60,
    })
}




export function useChangeOrderStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, nextStatus }: { id: string, nextStatus: string }) => changeOrderStatus(id, nextStatus),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-orders-table"],



            });


        },
        onError: (err) => {
            if (err instanceof Error) {
                toast.error("After delivered you cant change order status", {
                    position: "top-left"
                });
            } else {
                toast.error("An unexpected error occurred", {
                    position: "top-left"
                });
            }
        }
    });

}