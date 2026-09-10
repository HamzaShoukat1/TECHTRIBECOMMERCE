



import "dotenv/config"

import { ApiClient } from "../hooks/ApiClient"
import { CartResponse } from "../utils/Types"

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

export async function getCartDetails() {
    const cart = await ApiClient(`${BackenedUrl}/cart/details`, {
        method: "GET",
    });

    return {
        ...cart,
        items: cart.items.map((item: {
            _id: string;
            productId: CartResponse["items"][number];
            productSize: string;
            productColor: string;
            quantity: number;
        }) => ({
            ...item.productId,
            _id: item._id,
            productQuantity: item.quantity,
            selectedSize: item.productSize,
            selectedColor: item.productColor,
        })),
    } as CartResponse;
}


export async function removeFromCart(id: string) {
    return ApiClient(`${BackenedUrl}/cart/remove/${id}`, {
        method: "DELETE",
    });
}