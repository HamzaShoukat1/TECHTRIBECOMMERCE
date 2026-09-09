



import "dotenv/config"

import { ApiClient } from "../hooks/ApiClient"

const BackenedUrl = process.env.EXPRESS_BACKENED_URL || "http://localhost:8000";










export async function AddToCart(
    id: string,
    quantity: number,
    selectedSize: string | null,
    selectedColor: string | null
) {
    return ApiClient(`${BackenedUrl}/cart/create/${id}`, {
        method: "POST",
        body: JSON.stringify({
            quantity,
            productSize: selectedSize,
            productColor: selectedColor,
        }),
    });
}