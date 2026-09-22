import { useQuery } from "@tanstack/react-query";
import { getPaymentDetails } from "../services/payment.service";

export function UsePayemntDetailsforCurrentUser(session_id: any) {
    return useQuery({
        queryKey: ["payment", session_id],
        queryFn: () => getPaymentDetails(session_id),
        enabled: !!session_id,

        // 🔄 Automatically retry if the production API says order not found
        retry: (failureCount, error: any) => {
            // Adjust this condition based on how your backend/service throws errors
            // (e.g., error.status === 404 or checking the error message string)
            if (failureCount < 5) {
                console.log(`Order not found yet. Retry attempt #${failureCount + 1}...`);
                return true;
            }
            return false;
        },

        // ⏱️ Wait 2 seconds between each retry attempt
        retryDelay: 2000,

        // Optional: Keep polling every 5 seconds if you want to be extra safe 
        // until valid data is returned
        refetchInterval: (query) => {
            const data: any = query.state.data;
            return data && data.orderId ? false : 3000;
        }
    });
}
