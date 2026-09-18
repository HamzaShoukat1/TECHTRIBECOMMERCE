

import "dotenv/config";

import { ApiClient } from "../hooks/ApiClient";

const BackenedUrl = process.env.EXPRESS_BACKENED_URL || "http://localhost:8000";






export async function getDashboardStats() {
    const res = await ApiClient(`${BackenedUrl}/dashboard/stats`, {
        method: "GET",
    });
    return res?.data ?? res ?? null
}
