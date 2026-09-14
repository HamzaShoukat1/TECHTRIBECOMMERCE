import { z } from "zod";

export const productSchema = z.object({
    productName: z
        .string()
        .min(1, { message: "Product name is required" })
        .max(100, { message: "Product name is too long" }),

    productPrice: z
        .number()
        .positive({ message: "Price must be a positive number" }),
    productImage: z.record(z.string(), z.string()),


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
});

export type Product = z.infer<typeof productSchema>;