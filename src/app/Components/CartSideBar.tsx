"use client";

import Image from "next/image";
import { useCart } from "../context/cartContext";
import grouppng from "../public/images/Group.png";
import Link from "next/link";

export default function CartSidebar() {
    const { isOpen, setIsOpen, cart, removeItem, subtotal } = useCart();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex w-full justify-end bg-black/30 ">

            {/* Cart Sidebar */}
            <div className="flex h-full w-full max-w-[417px] flex-col bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E5E5E5] px-[26px] pt-[27px] pb-[22px]">

                    <h2 className="text-[24px] font-semibold font-poppins tracking-tight text-[#111111]">
                        Shopping Cart
                    </h2>

                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close cart"
                        className="flex items-center cursor-pointer justify-center border-[#C9C9C9] text-[#999999] transition hover:border-black hover:text-black"
                    >
                        <Image
                            src={grouppng}
                            alt="Close"
                            width={16}
                        />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-[26px] py-10">

                    {cart.length === 0 ? (
                        <p className="text-sm text-[#7A7A7A]">
                            Your cart is empty.
                        </p>
                    ) : (
                        <div className="flex w-full flex-col gap-4">

                            {cart.map((item, index) => (


                                <div
                                    key={item._id ?? index}
                                    className="flex items-center gap-7"
                                >

                                    {/* Product Image */}
                                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#F4EEDF]">
                                        {item.productImage?.url ? (
                                            <Image
                                                src={item.productImage.url}
                                                alt={item.productName}
                                                width={96}
                                                height={96}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                                No image
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="min-w-0 flex-1">


                                        <div className="mt-2 flex items-center gap-3 text-[16px] text-[#717171]">

                                            <span>
                                                {item.productQuantity}
                                            </span>

                                            <span>
                                                x
                                            </span>

                                            <span className="font-medium text-[#D49A20]">
                                                Rs. {(item.productPrice * item.productQuantity).toLocaleString()}
                                            </span>

                                        </div>

                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeItem(item._id)}
                                        aria-label={`Remove ${item.productName}`}
                                        className="flex  w-full max-w-[20px] cursor-pointer shrink-0 items-center justify-center rounded-full bg-[#A7A7A7] text-sm font-semibold text-white transition hover:bg-[#111111]"
                                    >
                                        ×
                                    </button>

                                </div>

                            ))}

                        </div>
                    )}

                </div>

                {/* Subtotal */}
                <div className=" border-[#E5E5E5] px-[32px] py-6  space-x-[1223px]">

                    <div className=" w-full max-w-[250px] flex items-center  justify-between text-[18px] text-[#111111]">


                        <span className="font-medium font-poppins tracking-normal">
                            Subtotal
                        </span>

                        <span className="font-semibold text-[#D49A20] tracking-normal font-poppins">
                            Rs. {subtotal.toLocaleString()}
                        </span>

                    </div>

                </div>

                {/* Bottom Buttons */}
                <div className="  border-t border-[#E5E5E5] px-[26px] py-6 font-poppins cursor-pointer">

                    <div className="flex items-center py-2  cursor-pointer justify-start gap-[14px]">

                        <  Link href="/cart" onClick={() => setIsOpen(false)}>
                            <button
                                className="  w-full cursor-pointer max-w-[87px] rounded-full border border-[#111111] px-4 py-2 text-[14px] text-[#111111] transition hover:bg-[#111111] hover:text-white"
                            >
                                Cart
                            </button>
                        </Link>

                        <button
                            className=" w-full cursor-pointer max-w-[118px] rounded-full border border-[#111111] px-4 py-2 text-[14px] text-[#111111] transition hover:bg-[#111111] hover:text-white"
                        >
                            Checkout
                        </button>



                    </div>

                </div>

            </div>

        </div>
    );
}