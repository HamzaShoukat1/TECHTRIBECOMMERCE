import { z } from "zod";

export const signupSchema = z
    .object({
        FirstName: z
            .string()
            .trim()
            .min(1, "First name is required")
            .max(50, "First name cannot exceed 50 characters")
            .regex(/^[a-zA-Z\s-]+$/, "First name can only contain letters, spaces, or hyphens"),

        LastName: z
            .string()
            .trim()
            .min(1, "Last name is required")
            .max(50, "Last name cannot exceed 50 characters")
            .regex(/^[a-zA-Z\s-]+$/, "Last name can only contain letters, spaces, or hyphens"),

        email: z
            .string()
            .trim()
            .min(1, "Email is required")
            .email("Invalid email address format"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .max(100, "Password is too long")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),

    })


export const signInSchema = z
    .object({
     

        email: z
            .string()
            .trim()
            .min(1, "Email is required")
            .email("Invalid email address format"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .max(100, "Password is too long")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),

    })


export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signInSchema>;

