
// export async function ApiClient(url: string, options?: RequestInit) {
//     const response = await fetch(url, {
//         credentials: "include",
//         headers: {
//             ...(isFormData
//                 ? {}
//                 : {
//                     "Content-Type": "application/json",
//                 }),
//             ...options?.headers,
//         },
//         // headers: {
//         //     "Content-Type": "application/json",
//         // },
//         ...options,
//     });

//     const data = await response.json().catch(() => null);

//     if (!response.ok) {
//         throw new Error(data?.message || "Something went wrong");
//     }


//     return data?.data
// }
export async function ApiClient(url: string, options?: RequestInit) {
  const isFormData = options?.body instanceof FormData;

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...(isFormData
        ? {}
        : {
            "Content-Type": "application/json",
          }),
      ...options?.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data?.data;
}



// Optional: a helper or variable to manage the token dynamically
// let accessToken: string | null = null;

// export function setAccessToken(token: string | null) {
//     accessToken = token;
// }

// export async function ApiClient(url: string, options?: RequestInit) {
//   // Grab token from memory, localStorage, or your state management
//   const token = accessToken || (typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null);

//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//     ...(options?.headers as Record<string, string>),
//   };

//   // Automatically attach Authorization header if token exists
//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   const response = await fetch(url, {
//     credentials: "include",
//     ...options,
//     headers,
//   });

//   const data = await response.json().catch(() => null);
//   if (!response.ok) {
//     throw new Error(data?.message || "Something went wrong");
//   }
//   return data?.data;
// }
