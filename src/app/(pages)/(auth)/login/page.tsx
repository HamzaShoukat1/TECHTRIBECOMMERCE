"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { SigninInput, signInSchema } from "@/src/lib/zod/schemas"

import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/src/components/ui/field"
import { loginUser } from "@/src/app/services/user.service"

export default function SigninForm() {
    const router = useRouter()
    const queryClient = useQueryClient()

    const form = useForm<SigninInput>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { mutate: login, isPending } = useMutation({
        mutationFn: loginUser,
        onSuccess: (response) => {
            queryClient.setQueryData(["currentUser"], response.user)
            toast.success("Welcome back! Logged in successfully.")
            form.reset()
            router.push("/")
        },
        onError: (error: any) => {
            const errorMsg = error?.response?.data?.message || "Invalid credentials. Please try again."
            toast.error(errorMsg)
        }
    })

    function onSubmit(data: SigninInput) {
        login({
            email: data.email,
            password: data.password,
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background font-poppins">

            <Card className="w-full sm:max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold tracking-tight text-center">Sign In</CardTitle>
                    <CardDescription className="text-center">
                        Enter your account details to securely log back in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form-rhf-signin" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="space-y-4">

                            {/* Username or Email Identifier Field */}
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="signin-identifier">Email or Username</FieldLabel>
                                        <Input
                                            {...field}
                                            id="signin-identifier"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="name@example.com or username"
                                            disabled={isPending}
                                            autoComplete="username"
                                            className="h-11"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            {/* Password Field */}
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="signin-password">Password</FieldLabel>
                                        <Input
                                            {...field}
                                            id="signin-password"
                                            type="password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="••••••••"
                                            disabled={isPending}
                                            autoComplete="current-password"
                                            className="h-11"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Field orientation="horizontal" className="w-full flex gap-4 justify-end cursor-pointer">
                        <Button type="button" variant="outline" className="h-11 cursor-pointer" onClick={() => form.reset()} disabled={isPending}>
                            Clear
                        </Button>
                        <Button type="submit" form="form-rhf-signin" className="h-11 px-6 cursor-pointer" disabled={isPending}>
                            {isPending ? "Signing in..." : "Sign In"}
                        </Button>
                    </Field>

                    <p className="text-sm text-center text-muted-foreground w-full">
                        Don't have an account yet?{" "}
                        <a href="/signup" className="text-primary cursor-pointer   underline underline-offset-4 hover:text-primary/90">
                            Sign up
                        </a>
                    </p>
                </CardFooter>
            </Card>

        </div>

    )
}
