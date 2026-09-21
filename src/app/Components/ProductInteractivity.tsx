"use client";

import { useState } from "react";

import { useQuantity } from "../hooks/UseQuantity";

import AddToCartButton from "./AddToCartButton";
import { CartItem } from "../context/cartContext";



export default function ProductInteractiveSection({
    product,
}: {
    product: CartItem;
}) {
    const {
        quantity,
        decreaseQuantity,
        increaseQuantity,
    } = useQuantity();

    const [selectedSize, setSelectedSize] = useState<string | null>(
        product.productSizes?.[0] || null
    );

    const [selectedColor, setSelectedColor] = useState<string | null>(
        product.productColors?.[0] || null
    );

    return (
        <div className="flex flex-col gap-6">

            {/* Color Selection */}
            {product.productColors &&
                product.productColors.length > 0 && (
                    <div className="flex flex-col gap-2">

                        <span className="text-sm font-medium text-gray-500">
                            Color
                        </span>

                        <div className="flex gap-2">
                            {product.productColors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${selectedColor === color
                                        ? "border-black scale-110"
                                        : "border-transparent"
                                        }`}
                                    style={{
                                        backgroundColor: color,
                                    }}
                                    title={color}
                                />
                            ))}
                        </div>
                    </div>
                )}

            {/* Size Selection */}
            {product.productSizes &&
                product.productSizes.length > 0 && (
                    <div className="flex flex-col gap-2">

                        <span className="text-sm font-medium text-gray-500">
                            Size
                        </span>

                        <div className="flex gap-2">
                            {product.productSizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all cursor-pointer ${selectedSize === size
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-black border-gray-300 hover:border-[#B88E2F]"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

            {/* Quantity + Add To Cart */}
            <div className="flex items-center gap-4">

                <div className="flex items-center justify-between gap-4 border px-4 py-3 rounded-xl w-full max-w-[123px]">

                    <button
                        onClick={decreaseQuantity}
                        className="text-black hover:text-[#B88E2F] cursor-pointer"
                    >
                        -
                    </button>

                    <span className="text-xl font-bold">
                        {quantity}
                    </span>

                    <button
                        onClick={increaseQuantity}
                        disabled={quantity >= 3}
                        className={`text-black hover:text-[#B88E2F] ${quantity >= 3 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                        +
                    </button>

                </div>

                <AddToCartButton
                    product={product}
                    quantity={quantity}
                    selectedSize={selectedSize}
                    selectedColor={selectedColor}
                />

            </div>
        </div>
    );
}
