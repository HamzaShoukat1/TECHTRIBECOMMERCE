"use client"

import Link from 'next/link'
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { ShoppingCart, Search, ShoppingBag } from 'lucide-react'

// Local image imports
import logo from "../public/images/Meubel House_Logos-05.png"
import logoName from "../public/images/SkinClinic.png"
import { UserIcon } from 'lucide-react'
import { getCurrentUser } from '../services/user.service'
import { useCart } from '../context/cartContext'
import { useCartQuery } from '../hooks/useCartQuery'
import { useLogout } from '@/src/admin/hooks/Use-Logout'
import { UseGetAllOrders } from '../hooks/UseGetAllOrders'





const navItems = [
  { name: "Home", route: "/" },
  { name: "Shop", route: "/shop" },
  { name: "Contact", route: "/contact" },
]

export default function Navbar() {
  const pathName = usePathname()
  const { setIsOpen } = useCart()
  const { data: cart } = useCartQuery()
  const { data: user } = useQuery({ queryKey: ["currentUser"], queryFn: getCurrentUser, retry: false, });
  // Fetch orders data using the hook
  const { data: orders } = UseGetAllOrders()
  const orderCount = orders?.length ?? 0

  const isAuthPage = pathName === "/login" || pathName === "/signup"

  // Calculate total items in the cart
  const totalItems = cart?.items.reduce(
    (total, item) => total + item.productQuantity,
    0
  ) ?? 0


  const { logout } = useLogout();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md px-6 sm:px-10 py-4 shadow-sm transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Brand Logo Section */}
        <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
          <Image src={logo} alt="Furniro Logo" width={40} height={40} className="w-9 h-auto object-contain" />
          <Image src={logoName} alt="Furniro" width={100} height={40} className="w-24 h-auto object-contain hidden sm:block" />
        </Link>

        {/* Navigation Links */}
        {!isAuthPage && (
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathName === item.route
              return (
                <Link
                  key={item.route}
                  href={item.route}
                  className={`text-sm font-medium transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-amber-600 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${isActive ? "text-amber-600 after:scale-x-100" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          {!isAuthPage && (
            <>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50 max-md:hidden">
                <Search className="w-5 h-5" />
              </button>

              {/* Orders Counter Icon */}
              {/* Orders Counter Icon */}
              {/* Orders Icon - Only show when signed in */}
              {user && (
                <Link
                  href="/orders"
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50 relative"
                >
                  <ShoppingBag className="w-5 h-5" />

                  {orderCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-medium text-white ring-2 ring-white">
                      {orderCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Cart Icon trigger */}
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50 relative"
              >
                <ShoppingCart className="w-5 h-5 cursor-pointer" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-medium text-white ring-2 ring-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </>
          )}

          {/* User management */}
          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <div className="hidden lg:block text-right">
                <p className="text-xs font-medium text-gray-900">{user.firstName}</p>
                <p className="text-[10px] text-gray-500 truncate max-w-[120px]">{user.email}</p>
              </div>
              <button
                onClick={() => logout()}
                className="text-xs font-medium text-gray-500 cursor-pointer hover:text-red-600 transition-colors py-1.5 px-3 rounded-md hover:bg-red-50 border border-gray-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50"
            >
              <UserIcon className="w-5 h-5" />
            </Link>
          )}
        </div>

      </div>
    </nav>
  )
}
