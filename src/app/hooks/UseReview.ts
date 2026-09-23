import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddReview, getReviewForspecificProducts } from "../services/review.Service";
import { toast } from "sonner";
export function UseReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reviewData: { orderId: string, rating: number, comment?: string }) => AddReview(reviewData),
        onSuccess: (data) => {
            console.log("Review submitted successfully:", data);
            toast.success("review added SuccessFully", {
                position: "top-left"
            })
            queryClient.invalidateQueries({
                queryKey: ["review"],
            });
            queryClient.invalidateQueries({
                queryKey:["AllOrders"]
            })
        },
        onError: (err) => {
            if (err instanceof Error) {
                if (err.message?.includes("You have already reviewed this product")) {
                    toast.error("You have already reviewed this product", { position: "top-left" });
                }


            } else {
                toast.error("An unexpected error occurred", { position: "top-left" });
            }

        }
    });
}
export function useGetReviews(id: string) {
    return useQuery({
        queryKey: ["review", id],
        queryFn: () => getReviewForspecificProducts(id),
        enabled: !!id
    });
}