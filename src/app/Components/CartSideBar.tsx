"use client";
import Image from "next/image";
import { useCart } from "../context/cartContext";
import grouppng from "../public/images/Group.png";
import Link from "next/link";
import { useCartQuery } from "../hooks/useCartQuery";
import { CartItem } from "../utils/Types";
import { useRemoveCart } from "../hooks/UseRemoveCart";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/user.service";

export default function CartSidebar() {
    const { isOpen, setIsOpen } = useCart();

    // 1. Check current logged-in user state
    const { data: user, isLoading: isUserLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false,
    });

    // 2. Fetch cart data
    const { data: cart, isLoading: isCartLoading, isError } = useCartQuery();

    const { mutate: removeFromCart, isPending: isRemoving } = useRemoveCart();
    const [removingItemId, setRemovingItemId] = useState<string | null>(null);

    const subtotal =
        cart?.items.reduce(
            (total, item) => total + item.productPrice * item.productQuantity,
            0
        ) ?? 0;

    const isCartEmpty = !cart?.items || cart.items.length === 0;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex w-full justify-end bg-black/30">
            {/* Clickable Backdrop Overlay */}
            <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* Cart Sidebar Panel */}
            <div className="relative z-10 flex h-full w-full max-w-[417px] flex-col bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E5E5E5] px-[26px] pt-[27px] pb-[22px]">
                    <h2 className="text-[24px] font-semibold font-poppins tracking-tight text-[#111111]">
                        Shopping Cart
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close cart"
                        className="flex cursor-pointer items-center justify-center transition hover:opacity-75"
                    >
                        <Image src={grouppng} alt="Close" width={16} height={16} />
                    </button>
                </div>

                {/* Cart Body Contents */}
                <div className="flex-1 overflow-y-auto px-[26px] py-6">
                    {isUserLoading ? (
                        <div className="flex h-full items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                        </div>
                    ) : !user ? (
                        /* SHOW SIGN IN PROMPT IF NOT LOGGED IN */
                        <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                            <p className="mb-4 font-poppins text-[16px] font-medium text-[#717171]">
                                Please sign in to view your shopping cart
                            </p>
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center justify-center rounded-[10px] bg-black px-6 py-3 font-poppins text-[16px] text-white transition hover:bg-neutral-800"
                            >
                                Sign In
                            </Link>
                        </div>
                    ) : isCartLoading ? (
                        <div className="flex h-full items-center justify-center">
                            <p className="text-sm text-[#7A7A7A]">Loading your cart...</p>
                        </div>
                    ) : isError ? (
                        <div className="flex h-full items-center justify-center">
                            <p className="text-sm text-[#7A7A7A]">Error loading cart.</p>
                        </div>
                    ) : isCartEmpty ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <p className="font-poppins text-[16px] font-medium text-[#717171]">
                                Your cart is empty
                            </p>
                        </div>
                    ) : (
                        /* Render Authenticated Items List */
                        <div className="flex w-full flex-col gap-6">
                            {cart?.items?.map((item: CartItem) => (
                                <div key={item._id} className="flex items-center gap-5">
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#F4EEDF]">
                                        {item.productImage?.url ? (
                                            <Image
                                                src={item.productImage.url}
                                                alt={item.productName}
                                                width={80}
                                                height={80}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-poppins text-sm font-medium text-black">
                                            {item.productName}
                                        </p>
                                        <div className="mt-1 flex items-center gap-2 font-poppins text-[15px] text-[#717171]">
                                            <span>{item.productQuantity}</span>
                                            <span>x</span>
                                            <span className="font-medium text-[#D49A20]">
                                                ${(item.productPrice * item.productQuantity).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setRemovingItemId(item._id);
                                            removeFromCart(item._id, {
                                                onSuccess: () => {
                                                    setRemovingItemId(null);
                                                    toast.success("Item removed from cart");
                                                },
                                                onError: () => {
                                                    setRemovingItemId(null);
                                                    toast.error("Failed to remove item");
                                                },
                                            });
                                        }}
                                        disabled={isRemoving}
                                        className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#A7A7A7] text-xs font-semibold text-white transition hover:bg-[#111111]"
                                    >
                                        {isRemoving && removingItemId === item._id ? (
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                        ) : (
                                            "×"
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer: Subtotal and Action Buttons */}
                {user && !isCartEmpty && !isCartLoading && !isError && (
                    <div className="shrink-0 border-t border-[#E5E5E5] px-[26px] py-6">
                        <div className="mb-5 flex items-center justify-between text-[18px] text-[#111111]">
                            <span className="font-poppins font-medium">Subtotal</span>
                            <span className="font-poppins font-semibold text-[#D49A20]">
                                ${subtotal.toLocaleString()}
                            </span>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Link
                                href="/cart"
                                onClick={() => setIsOpen(false)}
                                className="flex h-[45px] w-full items-center justify-center rounded-[10px] border border-black font-poppins text-[14px] font-medium text-black transition hover:bg-neutral-50"
                            >
                                View Cart
                            </Link>
                            <Link
                                href="/checkout"
                                onClick={() => setIsOpen(false)}
                                className="flex h-[45px] w-full items-center justify-center rounded-[10px] bg-black font-poppins text-[14px] font-medium text-white transition hover:bg-neutral-800"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}