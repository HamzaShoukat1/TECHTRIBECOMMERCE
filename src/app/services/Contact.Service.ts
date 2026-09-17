//    const reviews: Review[] = Array.isArray(response)
//         ? response
//         : response?.data ?? [];




import "dotenv/config"

import { ApiClient } from "../hooks/ApiClient"

const BackenedUrl = process.env.EXPRESS_BACKENED_URL || "http://localhost:8000";

export async function createContact(contactData: { name: string, email: string, subject: string, message: string }) {
    return ApiClient(`${BackenedUrl}/contact/create`, {
        method: "POST",
        body: JSON.stringify(contactData),

    });
}


