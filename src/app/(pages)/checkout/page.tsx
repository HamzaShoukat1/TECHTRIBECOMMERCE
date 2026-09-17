"use client";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import shopPageBanner from "../../public/images/Shop-page-images/Rectangle 1(1).png";

import { useCart } from "../../context/cartContext";
import ReusableBanner from "../../Components/ReusableBanner";
import UsableSkeleton from "../../Components/UsableSkeleton";
import { useCartQuery } from "../../hooks/useCartQuery";

import {
    CheckoutInput,
    checkoutSchema,
} from "@/src/lib/zod/schemas";
import { createCheckoutSession } from "@/src/app/services/payment.service";

export default function CheckoutPage() {
    const { data: cart } = useCartQuery();
    // const { isInitialized } = useCart();

    const form = useForm<CheckoutInput>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            FirstName: "",
            LastName: "",
            Country: "pakistan",
            StreetAddress: "",
            City: "",
            ZIPcode: "",
            Phone: "",
            Emailaddress: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createCheckoutSession,
        onSuccess: (session) => {
            if (session?.url) {
                window.location.href = session.url;
                return;
            }

            toast.error("Unable to create checkout session",{
                position:"top-left"
            });
        },
        onError: (error) => {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Unable to start payment"
            );
        },
    });

    const subtotal =
        cart?.items.reduce(
            (total, item) =>
                total + item.productPrice * item.productQuantity,
            0
        ) ?? 0;

    function onSubmit(data: CheckoutInput) {
        mutate(data);
    }

    return (
        <div className="w-full min-h-screen font-poppins bg-white text-black font-sans">
            {/* Header Banner */}
            <ReusableBanner
                title="Checkout"
                image={shopPageBanner}
            />

            {/* Main Layout */}
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-[1240px] font-poppins mx-auto py-16 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
            >
                {/* LEFT SIDE: Billing Details */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-[36px] font-semibold mb-4">
                        Billing details
                    </h2>

                    {/* First Name / Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <Controller
                            name="FirstName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="checkout-first-name"
                                        className="text-[16px] font-medium"
                                    >
                                        First Name
                                    </label>

                                    <input
                                        {...field}
                                        id="checkout-first-name"
                                        type="text"
                                        placeholder=""
                                        aria-invalid={fieldState.invalid}
                                        className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                                    />

                                    {fieldState.error && (
                                        <p className="text-sm text-red-600">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Last Name */}
                        <Controller
                            name="LastName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="checkout-last-name"
                                        className="text-[16px] font-medium"
                                    >
                                        Last Name
                                    </label>

                                    <input
                                        {...field}
                                        id="checkout-last-name"
                                        type="text"
                                        placeholder=""
                                        aria-invalid={fieldState.invalid}
                                        className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                                    />

                                    {fieldState.error && (
                                        <p className="text-sm text-red-600">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    {/* Country */}
                    <Controller
                        name="Country"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="checkout-country"
                                    className="text-[16px] font-medium"
                                >
                                    Country
                                </label>

                                <select
                                    id="checkout-country"
                                    name={field.name}
                                    ref={field.ref}
                                    value={field.value ?? "pakistan"}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    aria-invalid={fieldState.invalid}
                                    className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 bg-white outline-none appearance-none cursor-pointer text-black"
                                >
                                    <option value="pakistan">
                                        Pakistan
                                    </option>

                                    <option value="sri-lanka">
                                        Sri Lanka
                                    </option>

                                    <option value="uae">
                                        United Arab Emirates
                                    </option>
                                </select>

                                {fieldState.error && (
                                    <p className="text-sm text-red-600">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    {/* Street Address */}
                    <Controller
                        name="StreetAddress"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="checkout-street-address"
                                    className="text-[16px] font-medium"
                                >
                                    Street Address
                                </label>

                                <input
                                    {...field}
                                    id="checkout-street-address"
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                    className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                                />

                                {fieldState.error && (
                                    <p className="text-sm text-red-600">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    {/* City */}
                    <Controller
                        name="City"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="checkout-city"
                                    className="text-[16px] font-medium"
                                >
                                    City
                                </label>

                                <input
                                    {...field}
                                    id="checkout-city"
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                    className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                                />

                                {fieldState.error && (
                                    <p className="text-sm text-red-600">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    {/* ZIP Code */}
                    <Controller
                        name="ZIPcode"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="checkout-zip-code"
                                    className="text-[16px] font-medium"
                                >
                                    ZIP code
                                </label>

                                <input
                                    {...field}
                                    id="checkout-zip-code"
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                    className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                                />

                                {fieldState.error && (
                                    <p className="text-sm text-red-600">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    {/* Phone */}
                    <Controller
                        name="Phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="checkout-phone"
                                    className="text-[16px] font-medium"
                                >
                                    Phone
                                </label>

                                <input
                                    {...field}
                                    id="checkout-phone"
                                    type="tel"
                                    aria-invalid={fieldState.invalid}
                                    className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                                />

                                {fieldState.error && (
                                    <p className="text-sm text-red-600">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    {/* Email */}
                    <Controller
                        name="Emailaddress"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="checkout-email"
                                    className="text-[16px] font-medium"
                                >
                                    Email address
                                </label>

                                <input
                                    {...field}
                                    id="checkout-email"
                                    type="email"
                                    aria-invalid={fieldState.invalid}
                                    className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                                />

                                {fieldState.error && (
                                    <p className="text-sm text-red-600">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    {/* Additional Information */}
                </div>

                {/* RIGHT SIDE: Order Summary */}
                <div className="flex flex-col bg-white pt-4 lg:px-8">
                    {/* Header */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
                        <span className="text-[24px] font-medium">
                            Product
                        </span>

                        <span className="text-[24px] font-medium">
                            ${subtotal.toLocaleString()}
                        </span>
                    </div>

                    {/* Products */}
                    {/* {!isInitialized ? (
                        <UsableSkeleton />
                    ) : ( */}
                        <>
                            {cart?.items?.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex justify-between items-center mb-4"
                                >
                                    <span className="text-[#9F9F9F] text-[16px]">
                                        {item.productName}

                                        <strong className="text-black font-medium ml-2">
                                            × {item.productQuantity}
                                        </strong>
                                    </span>

                                    <span className="font-light text-[16px]">
                                        $
                                        {(
                                            item.productPrice *
                                            item.productQuantity
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            ))}

                            {/* Subtotal */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[16px] font-normal">
                                    Subtotal
                                </span>

                                <span className="font-light text-[16px]">
                                    ${subtotal.toLocaleString()}
                                </span>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center pb-8 border-b border-[#D9D9D9] mb-8">
                                <span className="text-[16px] font-normal">
                                    Total
                                </span>

                                <span className="text-[24px] font-bold text-[#B88E2F]">
                                    ${subtotal.toLocaleString()}
                                </span>
                            </div>
                        </>

                    {/* Payment Methods */}
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex flex-col gap-2">
                            <button
                                type="button"
                                className="flex items-center gap-3 cursor-pointer text-[16px] font-medium text-left"
                            >
                                <span className="w-3 h-3 rounded-full flex items-center justify-center border border-black bg-black" />

                                Secure card payment via Stripe
                            </button>

                            <p className="text-[#9F9F9F] text-[14px] leading-[22px] font-light mt-1">
                                You will be redirected to Stripe's secure
                                hosted checkout page to complete your payment.
                            </p>
                        </div>
                    </div>

                    {/* Privacy Notice */}
                    <p className="text-[14px] font-light text-black leading-[22px] mb-8">
                        Your personal data will be used to support your
                        experience throughout this website, to manage access
                        to your account, and for other purposes described in
                        our{" "}
                        <strong className="font-semibold cursor-pointer">
                            privacy policy.
                        </strong>
                    </p>

                    {/* Submit Button */}
                    <div className="flex justify-center w-full">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="border cursor-pointer border-black rounded-[15px] px-12 py-4 text-[16px] font-medium hover:bg-black hover:text-white transition"
                        >
                            {isPending ? "Creating checkout..." : "Place order"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}