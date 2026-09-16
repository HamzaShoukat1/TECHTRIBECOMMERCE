

import "dotenv/config";

import { ApiClient } from "../hooks/ApiClient";
import type { Order } from "../utils/Types";

const BackenedUrl = process.env.EXPRESS_BACKENED_URL || "http://localhost:8000";











export async function getAllOrders(): Promise<Order[]> {
    return ApiClient(`${BackenedUrl}/AllOrders`, {
        method: "GET",
    }) as Promise<Order[]>;
}
export async function getAllOrdersForAdmin(): Promise<Order[]> {
    return ApiClient(`${BackenedUrl}/AllOrders/ForAdminOrders`, {
        method: "GET",
    }) as Promise<Order[]>;
}
export async function getAllOrdersForAdminTable() {
    const res = await ApiClient(`${BackenedUrl}/AllOrders/ForAdminOrdersTable`, {
        method: "GET",
    });
    console.log("sasa", res.data)
    return res
};


export async function AddReview(reviewData: { orderId: string, rating: number, comment: string }) {
    const res = await ApiClient(`${BackenedUrl}/review/create`, {
        method: "POST",

        body: JSON.stringify(reviewData)
    });
    return res
}

