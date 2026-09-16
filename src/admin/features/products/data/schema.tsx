import { z } from "zod";

export const productSchema = z.object({
    _id: z.string(),
    productName: z
        .string()
        .min(1, { message: "Product name is required" })
        .max(100, { message: "Product name is too long" }),

    productPrice: z
        .number()
        .positive({ message: "Price must be a positive number" }),
    // productImage: z.record(z.string(), z.string()),
    productImage: z.object({ url: z.string().url({ message: "Invalid image URL", }), }),


    productSizes: z
        .array(z.string())
        .min(1, { message: "At least one size must be selected" }),

    productColors: z
        .array(z.string().min(1))
        .min(1, { message: "At least one color must be selected" }),

    productDescription: z
        .string()
        .min(10, {
            message: "Description must be at least 10 characters long",
        }),
        createdAt:z.string(),
        updatedAt:z.string()
});

export type Product = z.infer<typeof productSchema>;