import "dotenv/config"

import { ApiClient } from "../hooks/ApiClient"

const BackenedUrl = process.env.EXPRESS_BACKENED_URL || "http://localhost:8000";

export async function createUser(signupData: { FirstName: string; LastName: string; email: string; password: string }) {
    return ApiClient(`${BackenedUrl}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(signupData),

    });
}


export async function loginUser(loginData: { email: string; password: string }) {
    return ApiClient(`${BackenedUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginData),
    });
}

export async function getCurrentUser() {
    return ApiClient(`${BackenedUrl}/auth/currentUser`, {
        method: "GET",
    });
}


export async function logoutUser() {
    return ApiClient(`${BackenedUrl}/auth/logout`, {
        method: "POST",
        
    });
}