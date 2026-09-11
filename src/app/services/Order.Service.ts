

import "dotenv/config";

import { ApiClient } from "../hooks/ApiClient";
import type { Order } from "../utils/Types";

const BackenedUrl = process.env.EXPRESS_BACKENED_URL || "http://localhost:8000";











export async function getAllOrders(): Promise<Order[]> {
    return ApiClient(`${BackenedUrl}/AllOrders`, {
        method: "GET",
    }) as Promise<Order[]>;
}