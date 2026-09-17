"use client"

import Link from 'next/link'
import Image from "next/image"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "sonner"
import { ShoppingCart, Search } from 'lucide-react'

// Local image imports
import logo from "../public/images/Meubel House_Logos-05.png"
import logoName from "../public/images/SkinClinic.png"
import { UserIcon } from 'lucide-react'

import { getCurrentUser, logoutUser } from '../services/user.service'
import { useCart } from '../context/cartContext'
import { useCartQuery } from '../hooks/useCartQuery'
import { useLogout, UseLogout } from '@/src/admin/hooks/Use-Logout'

const navItems = [
    { name: "Home", route: "/" },
    { name: "Shop", route: "/shop" },
    { name: "Contact", route: "/contact" },
]

export default function Navbar() {
    const pathName = usePathname()
    const router = useRouter()
    const queryClient = useQueryClient()
    const { setIsOpen } = useCart()
    const { data: cart } = useCartQuery()

    // Calculate total items in the cart
    const totalItems = cart?.items.reduce(
        (total, item) => total + item.productQuantity,
        0
    ) ?? 0

    const { data: user, isLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false,
    })
      const { logout } = useLogout();
    

    // const { mutate: Logout } = useMutation({
    //     mutationFn: logoutUser,
    //     onSuccess: () => {
    //         toast.success("Logged out successfully.")
    //         queryClient.setQueryData(["currentUser"], null)
    //         router.push("/login")
    //     },
    //     onError: () => {
    //         toast.error("Logout failed. Please try again.")
    //     }
    // })
    // const { mutateAsync: Logout } = UseLogout()
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md px-6 sm:px-10 py-4 shadow-sm transition-all">
            <div className="mx-auto flex max-w-7xl items-center justify-between">

                {/* Brand Logo Section */}
                <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
                    <Image
                        src={logo}
                        alt="Furniro Logo"
                        priority
                        className="h-8 w-auto max-w-[40px] object-contain transition-transform group-hover:scale-105"
                    />
                    <Image
                        src={logoName}
                        alt="Furniro"
                        className="h-5 w-auto object-contain"
                    />
                </Link>

                {/* Central Navigation Links */}
                <ul className="hidden md:flex items-center gap-10 font-sans text-sm font-semibold tracking-wide text-gray-700">
                    {navItems.map((item) => {
                        const isActive = pathName === item.route
                        return (
                            <li key={item.name} className="relative py-2">
                                <Link
                                    href={item.route}
                                    className={`transition-colors duration-200 hover:text-black ${isActive ? "text-black font-bold" : "text-gray-500"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                                {/* Active Link Indicator Line */}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#D49A20] rounded-full animate-in fade-in zoom-in-95 duration-300" />
                                )}
                            </li>
                        )
                    })}
                </ul>

                {/* Utility Actions & Auth Section */}
                <div className="flex items-center gap-4 sm:gap-6">

                    {/* Search Bar Dynamic Toggle */}
                    {pathName === "/shop" && (
                        <button
                            aria-label="Search"
                            className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-full transition-all duration-200"
                        >
                            <Search className="h-5 w-5 cursor-pointer" />
                        </button>
                    )}

                    {/* Auth Area */}
                    {isLoading ? (
                        <div className="w-20 h-8 bg-gray-100 animate-pulse rounded-full" />
                    ) : user ? (
                        <div className="flex items-center gap-4 border-r border-gray-200 pr-4">
                            <Link
                                href="#"
                                aria-label="Account"
                                className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 hover:text-black"
                            >
                                {/* <Image src={UserIcon} alt="Account" className="h-5 w-5 object-contain opacity-80" /> */}
                                <UserIcon className='h-5 w-5 object-contain opacity-80' />
                                <span className="hidden sm:inline">
                                    {user?.FirstName || "Profile"}
                                </span>
                            </Link>
                            <button
                                onClick={() => logout()}
                                className="text-xs font-semibold cursor-pointer text-red-500 hover:text-red-700 transition-colors bg-red-50/50 hover:bg-red-50 px-2.5 py-1.5 rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 text-sm font-semibold text-gray-600 border-r border-gray-100 pr-4">
                            <Link href="/login" className="hover:text-black transition-colors px-2 py-1">
                                Sign In
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-gray-900 text-white hover:bg-gray-800 transition-colors px-3 py-1.5 rounded-full text-xs"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}

                    {/* Cart Action */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative flex items-center p-2.5 cursor-pointer rounded-full text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 active:scale-95"
                        aria-label="Open cart"
                    >
                        <ShoppingCart className="h-5 w-5 stroke-[2.2]" />
                        {totalItems > 0 && (
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D49A20] text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>

            </div>
        </nav>
    )
}
