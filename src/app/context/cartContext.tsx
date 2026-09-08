"use client";

import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/Uselocalstorage";

// export type CartItem = {
//     id: number;
//     name: string;
//     price: number;
//     quantity: number;
//     image: string | StaticImageData;
// };
export type CartItem = {
    _id: string;
    productName: string;
    productPrice: number;
    productImage: string;
    productDescription: string;
    productReviews?: string[];
    productSizes: ("L" | "XL" | "XS")[];
    productColors?: string[];
    productQuantity: number;
    createdAt: string;
    updatedAt: string;
};

type CartContextType = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    cart: CartItem[];
    addToItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    subtotal: number;
    isInitialized: boolean;
};

const CartContext = createContext<CartContextType>({
    isOpen: false,
    setIsOpen: () => { },
    cart: [],
    addToItem: () => { },
    removeItem: () => { },
    increaseQuantity: () => { },
    decreaseQuantity: () => { },
    subtotal: 0,
    isInitialized: false,
});

export const CartProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart, isInitialized] = useLocalStorage<CartItem[]>("shopping_cart", []);






    const addToItem = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i._id === item._id);

            if (existing) {
                return prev.map((i) =>
                    i._id === item._id
                        ? {
                            ...i,
                            quantity: i.productQuantity + 1,
                        }
                        : i
                );
            }

            return [
                ...prev,
                {
                    ...item,
                    quantity: 1,
                },
            ];
        });

        setIsOpen(true);
    };

    const removeItem = (id: string) => {
        setCart((prev) => prev.filter((item) => item._id !== id));
    };

    const increaseQuantity = (id: string) => {
        setCart((prev) =>
            prev.map((item) =>
                item._id === id
                    ? { ...item, quantity: item.productQuantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (id: string) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item._id === id
                        ? { ...item, quantity: item.productQuantity - 1 }
                        : item
                )
                .filter((item) => item.productQuantity > 0)
        );
    };

    const subtotal = cart.reduce((total, item) => total + item.productPrice * item.productQuantity, 0);

    return (
        <CartContext.Provider
            value={{
                isOpen,
                setIsOpen,
                cart,
                addToItem,
                removeItem,
                increaseQuantity,
                decreaseQuantity,
                subtotal,
                isInitialized,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);