"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { SignupInput, signupSchema } from "@/src/lib/zod/schemas"

import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "../../../../components/ui/field"
import { Input } from "../../../../components/ui/input"
import { createUser } from "@/src/app/services/user.service"
import { useRouter } from "next/navigation"

export  default function SignupForm() {
  const router = useRouter()
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      email: "",
      password: "",
    },
  })

  // 3. Declare the mutation hook
  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: (response) => {
      toast.success("Account created successfully!")

      form.reset()
      router.push("/login")
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again."
      toast.error(errorMsg)
    }
  })

  function onSubmit(data: SignupInput) {
    mutate({
      FirstName: data.FirstName,
      LastName: data.LastName,
      email: data.email,
      password: data.password
    })
  }

  return (
// 1. Wrap the entire card component inside this parent div to center it vertically and horizontally
<div className="min-h-screen flex items-center justify-center p-4 bg-background font-poppins">
  
  <Card className="w-full sm:max-w-md shadow-lg"> 
    <CardHeader>
      <CardTitle className="text-2xl font-bold tracking-tight text-center">Create an account</CardTitle>
      <CardDescription className="text-center">
        Enter your details below to create your Techtribe account.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form id="form-rhf-signup" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="space-y-4">

          {/* First Name Field */}
          <Controller
            name="FirstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-first-name">First Name</FieldLabel>
                <Input
                  {...field}
                  id="signup-first-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="John"
                  disabled={isPending}
                  className="h-11" 
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Last Name Field */}
          <Controller
            name="LastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-last-name">Last Name</FieldLabel>
                <Input
                  {...field}
                  id="signup-last-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Doe"
                  disabled={isPending}
                  className="h-11"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Email Field */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-email">Email Address</FieldLabel>
                <Input
                  {...field}
                  id="signup-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="name@example.com"
                  disabled={isPending}
                  className="h-11" // 💡 Increased input height
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
                <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                <Input
                  {...field}
                  id="signup-password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="••••••••"
                  disabled={isPending} 
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
      <Field orientation="horizontal" className="w-full flex gap-4 justify-end">
        <Button type="button" variant="outline" className="h-11 cursor-pointer" onClick={() => form.reset()} disabled={isPending}>
          Reset
        </Button>
        <Button type="submit" form="form-rhf-signup" className="h-11 px-6 cursor-pointer" disabled={isPending}>
          {isPending ? "Submitting..." : "Sign Up"}
        </Button>
      </Field>
    </CardFooter>
  </Card>

</div>


  )
}
