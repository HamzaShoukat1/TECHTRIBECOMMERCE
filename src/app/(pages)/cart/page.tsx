"use client";

import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import shopPageBanner from "../../public/images/Shop-page-images/Rectangle 1(1).png";
import Link from "next/link";
import ReusableBanner from "../../Components/ReusableBanner";
import { useCart } from "../../context/cartContext";
import UsableSkeleton from "../../Components/UsableSkeleton";

export default function CartPage() {
    const { cart, subtotal, removeItem, isInitialized } = useCart();

    return (
        <div className="font-poppins bg-white min-h-screen">
            {/* 1. Page Header Hero Banner always stays on top */}
            <ReusableBanner title="Cart" image={shopPageBanner} />

            {!isInitialized ? (
                <UsableSkeleton />
            ) : (
                <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-16 lg:flex-row lg:items-start xl:px-16">

                    {/* Left Side: Product Table Area */}
                    <div className="w-full lg:flex-1">
                        {/* Header Row - Desktop Only */}
                        <div className="hidden md:grid grid-cols-[2.5fr_1fr_1fr_1.2fr_50px] bg-[#F9F1E7] px-8 py-4 text-[16px] font-medium text-black items-center rounded-sm">
                            <p>Product</p>
                            <p className="text-center md:text-left">Price</p>
                            <p className="text-center">Quantity</p>
                            <p className="text-right pr-4">Subtotal</p>
                            <span />
                        </div>

                        {/* Cart Items Iteration */}
                        <div className="mt-6 flex flex-col gap-6">
                            {cart.length === 0 ? (
                                <div className="rounded-md border border-[#EEE3D0] bg-[#F9F1E7]/30 px-6 py-12 text-center text-[18px] text-[#9F9F9F]">
                                    Your cart is currently empty.
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div
                                    key={item._id}
                                    className="flex flex-col gap-4 border-b border-gray-100 pb-6 md:border-none md:pb-0 md:grid md:grid-cols-[2.5fr_1fr_1fr_1.2fr_50px] md:items-center md:px-8 md:py-4"
                                    >
                                        {/* Column 1: Image & Name */}
                                        <div className="flex items-center gap-4 sm:gap-8">
                                            <div className="h-[105px] w-[105px] shrink-0 overflow-hidden rounded-[10px] bg-[#F9F1E7] flex items-center justify-center">
                                                <Image
                                                    src={item.productImage}
                                                    alt={item.productName}
                                                    width={105}
                                                    height={105}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <p className="text-[16px] text-[#9F9F9F] font-normal truncate max-w-[180px] sm:max-w-none">
                                                {item.productName}
                                            </p>
                                        </div>

                                        {/* Column 2: Price */}
                                        <div className="flex justify-between items-center md:block">
                                            <span className="text-[14px] text-[#9F9F9F] font-medium md:hidden">Price:</span>
                                            <p className="text-[16px] text-[#9F9F9F]">
                                                Rs. {item.productPrice}.00
                                            </p>
                                        </div>

                                        {/* Column 3: Quantity Field */}
                                        <div className="flex justify-between items-center md:justify-center">
                                            <span className="text-[14px] text-[#9F9F9F] font-medium md:hidden">Quantity:</span>
                                            <span className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[5px] border border-[#9F9F9F] text-[16px] text-black bg-white">
                                                {item.productQuantity}
                                            </span>
                                        </div>

                                        {/* Column 4: Subtotal calculation */}
                                        <div className="flex justify-between items-center md:block md:text-right md:pr-4">
                                            <span className="text-[14px] text-[#9F9F9F] font-medium md:hidden">Subtotal:</span>
                                            <p className="text-[16px] font-normal text-black">
                                                Rs. {(item.productPrice * item.productQuantity).toLocaleString()}.00
                                            </p>
                                        </div>

                                        {/* Column 5: Actions */}
                                        <div className="flex justify-end md:justify-center mt-2 md:mt-0">
                                            <button
                                                onClick={() => removeItem(item._id)}
                                                aria-label={`Remove ${item.productName}`}
                                                className="cursor-pointer text-[18px] text-[#B88E2F] transition hover:text-red-600 p-2"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Side: Totals Summary Panel */}
                    <aside className="w-full bg-[#F9F1E7] px-6 py-10 md:px-16 md:py-14 lg:max-w-[393px] rounded-sm flex flex-col items-center">
                        <h2 className="text-center text-[32px] font-semibold text-black tracking-wide">
                            Cart Totals
                        </h2>

                        <div className="mt-14 w-full space-y-6 max-w-[280px]">
                            <div className="flex items-center justify-between">
                                <span className="text-[16px] font-medium text-black">Subtotal</span>
                                <span className="text-[16px] text-[#9F9F9F]">
                                    Rs. {subtotal?.toLocaleString() || "0"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[16px] font-medium text-black">Total</span>
                                <span className="text-[20px] font-medium text-[#B88E2F]">
                                    Rs. {subtotal?.toLocaleString() || "0"}
                                </span>
                            </div>
                        </div>
                        <Link href="/checkout" className="w-full max-w-[222px] mt-12">
                            <button className="w-full h-[58.93px] border border-black rounded-[15px] font-medium text-[20px] hover:bg-black hover:text-white transition duration-300 cursor-pointer">
                                Check Out
                            </button>
                        </Link>

                    </aside>
                </section>
            )}
        </div>
    );
}
