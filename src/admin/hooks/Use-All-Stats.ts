import { getDashboardStats } from "@/src/app/services/Dashboard.service";
import { useQuery } from "@tanstack/react-query";






export function useDashboardStats() {
    return useQuery({
        queryKey: ["admin-dashboard-stats"],
        queryFn: getDashboardStats,
        staleTime: 1000 * 60,
    });
}