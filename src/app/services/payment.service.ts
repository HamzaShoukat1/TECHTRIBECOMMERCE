import "dotenv/config";

import { ApiClient } from "../hooks/ApiClient";

const BackenedUrl = process.env.EXPRESS_BACKENED_URL || "http://localhost:8000";

export type CreateCheckoutSessionInput = {
    FirstName: string;
    LastName: string;
    Country: string;
    StreetAddress: string;
    City: string;
    ZIPcode: string;
    Phone: string;
    Emailaddress: string;
};

export type CheckoutSessionResponse = {
    url: string;
};

export async function createCheckoutSession(
    checkoutData: CreateCheckoutSessionInput
) {
    return ApiClient(`${BackenedUrl}/payment/checkout-session`, {
        method: "POST",
        body: JSON.stringify(checkoutData),
    }) as Promise<CheckoutSessionResponse>;
}

export async function getPaymentDetails(session_id: string) {
    return ApiClient(`${BackenedUrl}/payment/getcurrentpurchasedetail/${session_id}`, {
        method: "GET"
    }

    )
}