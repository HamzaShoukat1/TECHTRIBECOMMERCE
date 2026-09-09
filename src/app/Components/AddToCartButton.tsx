"use client";

import { useCart } from "../context/cartContext";
import type { CartItem } from "../context/cartContext";

type ProductProps = {
    product: CartItem;
    quantity: number
};

export default function AddToCartButton({ product, quantity }: ProductProps) {
    const { addToItem } = useCart();

    const handleClick = () => {
        addToItem({
            ...product,
            productQuantity: quantity,
        });
    };

    return (
        <button
            onClick={handleClick}
            className="border border-black font-poppins rounded-[15px] cursor-pointer hover:bg-black hover:text-white transition duration-300 font-normal text-[20px] w-53.75 h-16"
        >
            Add To Cart
        </button>
    );
}