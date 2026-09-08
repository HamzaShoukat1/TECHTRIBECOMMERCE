import "dotenv/config"

import { IProduct } from "../utils/Types";
import { ApiClient } from "../hooks/ApiClient";

const BackenedUrl = process.env.EXPRESS_BACKENED_URL || "http://localhost:8000";

export async function createProduct(createProductData: IProduct) {
    return ApiClient(`${BackenedUrl}/product/create`, {
        method: "POST",
        body: JSON.stringify(createProductData),

    });
}


export async function getAllProducts() {
    return ApiClient(`${BackenedUrl}/product/getAllProducts`, {
        method: "GET",
    });
}

export async function getSingleProduct(id: string) {
    return ApiClient(`${BackenedUrl}/product/${id}`, {
        method: "GET",
    });
}


export async function logoutUser() {
    return ApiClient(`${BackenedUrl}/auth/logout`, {
        method: "POST",

    });
}