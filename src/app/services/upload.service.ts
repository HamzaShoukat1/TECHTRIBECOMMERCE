

import "dotenv/config";

import { ApiClient } from "../hooks/ApiClient";

const BackenedUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";






export async function uploadImage(file: File) {
      const formData = new FormData();

  formData.append("file", file);
    const res = await ApiClient(`${BackenedUrl}/upload/image`, {
        method: "POST",

        body: formData
    });
    return res
}

