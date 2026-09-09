"use client";

import { useCart, type CartItem } from "../context/cartContext";
import { AddToCart } from "../services/Cart.Service";

type ProductProps = {
    product: CartItem
    quantity: number;
    selectedSize: string | null;
    selectedColor: string | null;

};

export default function AddToCartButton({
    product,
    quantity,
    selectedSize,
    selectedColor,
}: ProductProps) {

    const { addToItem } = useCart();

    const handleClick = async () => {
        try {
            const response = await AddToCart(
                product._id,
                quantity,
                selectedSize,
                selectedColor
            );

            console.log("Cart response:", response);

            addToItem({
                ...product,
                productQuantity: quantity,
                selectedColor,
                selectedSize,
            });

        } catch (error) {
            console.error("Failed to add product to cart:", error);
        }
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