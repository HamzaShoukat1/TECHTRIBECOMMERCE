"use client";

import { useQuery } from "@tanstack/react-query";
import { useCart } from "../context/cartContext";
import { useAddToCart } from "../hooks/useAddtoCart";
import { CartItem } from "../utils/Types";
import { getCurrentUser } from "../services/user.service";
import { useRouter } from "next/navigation";

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

    const { mutate, isPending } = useAddToCart()
    const { setIsOpen } = useCart();
    const router = useRouter()
    const { data: user } = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false,
    })

    const handleClick = async () => {

        if (!user) {
            router.push("/login")

            return
        }
        mutate({
            productId: product._id,
            quantity,
            selectedColor,
            selectedSize
        },
            {
                onSuccess: () => {
                    setIsOpen(true);
                },
                onError: (err) => {

                }
            },

        )
    };


    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className="border border-black font-poppins rounded-[15px] cursor-pointer hover:bg-black hover:text-white transition duration-300 font-normal text-[20px] w-53.75 h-16 disabled:opacity-50"
        >
            {isPending ? "Adding..." : "Add To Cart"}
        </button>
    );
}