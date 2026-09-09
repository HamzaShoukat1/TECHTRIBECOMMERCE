"use client";

import { CartItem, useCart } from "../context/cartContext";
import { useQuantity } from "../hooks/UseQuantity";
import AddToCartButton from "./AddToCartButton";



export default function ProductInteractiveSection({ product }: { product: CartItem }) {
    const { quantity, decreaseQuantity, increaseQuantity } = useQuantity();
    // const {decreaseQuantity,increaseQuantity} = useCart()

    // const decrease = ()=> {
    //     decreaseQuantity(product._id)
    // }
    // const increase = ()=> {
    //     increaseQuantity(product._id)
    // }

    return (
        <div className="flex   items-center  gap-4 ">
            <div className="flex items-center justify-between gap-4 border px-4 py-3  rounded-xl w-full max-w-[123px]">
                <button
                    onClick={decreaseQuantity}
                    className="text-black hover:text-[#B88E2F] cursor-pointer"
                >
                    -
                </button>
                <span className="text-xl font-bold">{quantity}</span>
                <button
                    onClick={increaseQuantity}
                    className="text-black hover:text-[#B88E2F] cursor-pointer"
                >
                    +
                </button>
            </div>

            {/* Your Add to Cart Button */}
            <AddToCartButton product={product} quantity={quantity} />
        </div>
    );
}
