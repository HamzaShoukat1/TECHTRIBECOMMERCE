

import "dotenv/config";

import { ApiClient } from "../hooks/ApiClient";
import type { Order } from "../utils/Types";

const BackenedUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";











export async function getAllOrders(): Promise<Order[]> {
    return ApiClient(`${BackenedUrl}/AllOrders`, {
        method: "GET",
    }) as Promise<Order[]>;
}
export async function getOrderDetail(id: string) {
    return ApiClient(`${BackenedUrl}/order/${id}`, {
        method: "GET",
    });
}
export async function getAllOrdersForAdminTable() {
    const res = await ApiClient(`${BackenedUrl}/AllOrders/ForAdminOrdersTable`, {
        method: "GET",
    });
    console.log("sasa", res.data)
    return res
};


export async function changeOrderStatus(id: string, nextStatus: string) {
    const res = await ApiClient(`${BackenedUrl}/order/${id}/status`, {
        method: "PUT",

        body: JSON.stringify({ nextStatus })
    });
    return res
}

