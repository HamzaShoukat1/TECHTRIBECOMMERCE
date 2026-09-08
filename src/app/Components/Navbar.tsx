"use client"

import Link from 'next/link'
import Image from "next/image"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Local image imports
import logo from "../public/images/Meubel House_Logos-05.png"
import logoName from "../public/images/SkinClinic.png"
import personIcon from "../public/images/Vector.png"
import cart from "../public/images/ant-design_shopping-cart-outlined.png"
import heart from "../public/images/akar-icons_heart.png"
import search from "../public/images/akar-icons_search.png"
import { getCurrentUser, logoutUser } from '../services/user.service'

export { logo, personIcon, cart, heart, search }

const navItems = [
    { name: "Home", route: "/" },
    { name: "Shop", route: "/shop" },
    // { name: "About", route: "/about" },
    { name: "Contact", route: "/contact" },
]

export default function Navbar() {
    const router = useRouter()
    const queryClient = useQueryClient()

    const { data: user, isLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false,
    })

    const { mutate: logout } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            toast.success("Logged out successfully.")
            queryClient.setQueryData(["currentUser"], null)
            router.push("/login")
        },
        onError: () => {
            toast.error("Logout failed. Please try again.")
        }
    })

    return (
        <nav className="z-50 w-full bg-white py-7 px-10 shadow-sm">
            <div className="mx-auto flex max-w-[1286px] items-center justify-between w-full">

                {/* Brand Logo Section */}
                <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
                    <Image
                        src={logo}
                        alt="Furniro Logo"
                        priority
                        className="h-8 w-full max-w-[50px] object-contain"
                    />
                    <Image
                        src={logoName}
                        alt="Furniro"
                        className="h-6 w-auto object-contain font-bold"
                    />
                </Link>

                {/* Central Navigation Links */}
                <ul className="hidden lg:flex items-center font-extrabold gap-14 font-montserrat text-[16px] font-black text-[#000000]">
                    {navItems.map((item) => (
                        <li key={item.name} className="transition-colors hover:text-gray-600">
                            <Link href={item.route}>{item.name}</Link>
                        </li>
                    ))}
                </ul>

                {/* Utility Actions & Auth Section */}
                <div className="flex items-center gap-6 text-black text-sm font-semibold">

                    {isLoading ? (
                        <div className="w-24 h-6 bg-gray-200 animate-pulse rounded" />
                    ) : user ? (
                        <div className="flex items-center gap-6">
                            <Link href="/profile" aria-label="Account" className="flex items-center gap-1 hover:opacity-80">
                                <Image src={personIcon} alt="Account" className="h-6 object-contain w-full max-w-[24px]" />
                                <span className="hidden sm:inline font-medium text-gray-700">
                                    {user?.FirstName || "Profile"}
                                </span>
                            </Link>
                            <button
                                onClick={() => logout()}
                                className="text-red-600 hover:text-red-700 transition-colors font-bold cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 text-[15px] font-bold text-gray-800">
                            <Link href="/login" className="hover:text-gray-600 transition-colors">
                                Sign In
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link href="/signup" className="hover:text-gray-600 transition-colors">
                                Sign Up
                            </Link>
                        </div>
                    )}

                    {/* Standard E-Commerce Icons */}
                    <button aria-label="Search" className="focus:outline-none hover:opacity-80 transition-opacity">
                        <Image src={search} alt="Search" className="h-6 object-contain w-full max-w-[28px]" />
                    </button>

                    <Link href="/favorites" aria-label="Favorites" className="hover:opacity-80 transition-opacity">
                        <Image src={heart} alt="Favorites" className="h-6 w-full max-w-[28px] object-contain" />
                    </Link>

                    <Link href="/cart" aria-label="Shopping Cart" className="hover:opacity-80 transition-opacity">
                        <Image src={cart} alt="Cart" className="h-6 object-contain w-full max-w-[28px]" />
                    </Link>
                </div>

            </div>
        </nav>
    )
}
