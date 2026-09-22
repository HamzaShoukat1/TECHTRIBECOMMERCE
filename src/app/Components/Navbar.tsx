"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { ShoppingCart, Search, Menu, X } from 'lucide-react'

// Local image imports
import logo from "../public/images/Meubel House_Logos-05.png"
import logoName from "../public/images/SkinClinic.png"
import { getCurrentUser } from '../services/user.service'
import { useCart } from '../context/cartContext'
import { useCartQuery } from '../hooks/useCartQuery'
import { useLogout } from '@/src/admin/hooks/Use-Logout'

const navItems = [
  { name: "Home", route: "/" },
  { name: "Shop", route: "/shop" },
  { name: "Contact", route: "/contact" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathName = usePathname()
  const { setIsOpen } = useCart()
  const { data: cart } = useCartQuery()
  const { data: user } = useQuery({ queryKey: ["currentUser"], queryFn: getCurrentUser, retry: false });
  // Fetch orders data using the hook

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

        {/* Left Side: Hamburger & Brand Logo Section */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Icon - Hidden on md and up */}
          {!isAuthPage && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-500 rounded-full hover:bg-gray-50 md:hidden"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}

          <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
            <Image src={logo} alt="Furniro Logo" width={40} height={40} className="w-9 h-auto object-contain" />
            <Image src={logoName} alt="Furniro" width={100} height={40} className="w-24 h-auto object-contain hidden sm:block" />
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
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

              {/* Orders Icon - Only show when signed in */}
              {user && (
                <Link
                  href="/orders"
                >

                  {/* Clean, medium-weight text label */}
                  <button className="text-xs font-medium text-gray-500 cursor-pointer hover:text-yellow-600 transition-colors py-1.5 px-3 rounded-md hover:bg-red-50 border border-gray-500">
                    My Orders
                  </button>


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
                className="text-xs font-medium text-gray-500 cursor-pointer hover:text-red-600 transition-colors py-1.5 px-3 rounded-md hover:bg-red-50 border border-gray-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <button className="text-xs font-medium text-gray-500 cursor-pointer bg-white py-1.5 px-3 rounded-md border border-gray-500 hover:bg-gray-50 transition-colors">
                  Sign In
                </button>
              </Link>
              <Link
                href="/signup"
                className="text-gray-800 hover:text-gray-900 transition-colors"
              >
                <button className="text-xs font-medium text-gray-500 cursor-pointer bg-white py-1.5 px-3 rounded-md border border-gray-500 hover:bg-gray-50 transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Drawer Overlay Links */}
      {!isAuthPage && isMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
          {navItems.map((item) => {
            const isActive = pathName === item.route
            return (
              <Link
                key={item.route}
                href={item.route}
                onClick={() => setIsMenuOpen(false)} // Close drawer on route click
                className={`text-sm font-medium transition-colors px-2 py-1.5 rounded-md ${isActive ? "text-amber-600 bg-amber-50/50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
