

import "dotenv/config";

import { ApiClient } from "../hooks/ApiClient";

const BackenedUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";










export async function getReviewForspecificProducts(id: string) {
    const res = await ApiClient(`${BackenedUrl}/review/${id}`, {
        method: "GET",
    });

    console.log("Response:", res);

    const eral = res
    return eral

}

export async function AddReview(reviewData: { orderId: string, rating: number, comment: string }) {
    const res = await ApiClient(`${BackenedUrl}/review/create`, {
        method: "POST",

        body: JSON.stringify(reviewData)
    });
    return res
}

