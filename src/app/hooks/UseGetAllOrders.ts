import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../services/Order.Service";
import type { Order } from "../utils/Types";

export function UseGetAllOrders() {
    const res = useQuery<Order[]>({
        queryKey: ["AllOrders"],
        queryFn: getAllOrders,
        retry: false
    });
    return res
}