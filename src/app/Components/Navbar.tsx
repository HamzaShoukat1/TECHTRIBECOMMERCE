"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"
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
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathName = usePathname()
  const { setIsOpen } = useCart()
  const { data: cart } = useCartQuery()
  const { data: user } = useQuery({ queryKey: ["currentUser"], queryFn: getCurrentUser, retry: false });

  const isAuthPage = pathName === "/login" || pathName === "/signup"

  // Calculate total items in the cart
  const totalItems = cart?.items.reduce(
    (total, item) => total + item.productQuantity,
    0
  ) ?? 0

  const { logout } = useLogout();
  useEffect(() => {
    if (pathName !== "/shop") return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      const queryString = params.toString();

      router.replace(
        queryString
          ? `/shop?${queryString}`
          : "/shop",

      );
    }, 400);

    return () => clearTimeout(timer);
  }, [search, pathName, router]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-sm transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Left Side: Hamburger & Brand Logo Section */}
        <div className="flex items-center gap-3">
          {!isAuthPage && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-200 rounded-xl hover:bg-gray-100 md:hidden"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
            <Image src={logo} alt="Furniro Logo" width={40} height={40} className="w-8  h-auto object-contain hidden md:block" />
            <Image src={logoName} alt="Furniro" width={100} height={40} className="w-20 h-auto object-contain hidden sm:block" />
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
        <div className="flex items-center gap-2 sm:gap-4">
          {!isAuthPage && (
            <>
              {/* Desktop Search Bar (Hidden on Mobile screens) */}
              {pathName === "/shop" && (
                <div className="relative hidden sm:block w-48 md:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              {/* Orders Icon - Now visible on ALL screen sizes */}
              {user && (
                <Link href="/orders" className="inline-block">
                  <button className="text-xs font-medium text-gray-600 cursor-pointer hover:text-amber-700 transition-colors py-1.5 px-3 rounded-md hover:bg-amber-50/50 border border-gray-300 whitespace-nowrap">
                    My Orders
                  </button>
                </Link>
              )}

              {/* Cart Icon trigger */}
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50 relative shrink-0"
              >
                <ShoppingCart className="w-5 h-5 cursor-pointer" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[9px] font-bold text-white ring-2 ring-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </>
          )}

          {/* User management */}
          {user ? (
            <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-gray-200 shrink-0">
              <div className="hidden lg:block text-right">
                <p className="text-xs font-semibold text-gray-900">{user.firstName}</p>
                <p className="text-[10px] text-gray-500 truncate max-w-[120px]">{user.email}</p>
              </div>
              <button
                onClick={() => logout()}
                className="text-xs font-medium text-gray-600 cursor-pointer hover:text-red-600 transition-colors py-1.5 px-3 rounded-md hover:bg-red-50 border border-gray-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2 justify-center shrink-0">
              <Link href="/login">
                <button className="text-xs font-medium text-gray-600 cursor-pointer bg-white py-1.5 px-3 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
                  Sign In
                </button>
              </Link>
              <Link href="/signup" className="hidden sm:block">
                <button className="text-xs font-medium text-white cursor-pointer bg-amber-600 py-1.5 px-3 rounded-md hover:bg-amber-700 transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Overlay Links */}
      {!isAuthPage && isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-3 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">

          {/* Mobile search integration */}
          {pathName === "/shop" && (
            <div className="relative w-full mb-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          )}

          {navItems.map((item) => {
            const isActive = pathName === item.route
            return (
              <Link
                key={item.route}
                href={item.route}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium transition-colors px-3 py-2.5 rounded-lg ${isActive ? "text-amber-600 bg-amber-50/70" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                {item.name}
              </Link>
            )
          })}

          {/* Mobile Specific Action Links */}
          {user && (
            <Link
              href="/orders"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium transition-colors px-3 py-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              My Orders
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
