import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../services/Order.Service";
import type { Order } from "../utils/Types";

export function UseGetAllOrders(enabled:boolean) {
    const res = useQuery<Order[]>({
        queryKey: ["AllOrders"],
        queryFn: getAllOrders,
        enabled,
        retry:false
    });
    return res
}