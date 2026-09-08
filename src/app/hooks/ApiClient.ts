
export async function ApiClient(url: string, options?: RequestInit) {
    const response = await fetch(url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || "Something went wrong");
    }


    //   console.log("ers",response)
    console.log("data", data.data.AllProducts)
    return data.data
}