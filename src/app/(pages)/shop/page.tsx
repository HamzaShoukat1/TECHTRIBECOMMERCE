'use client' // [1] Convert to Client Component for state and interactivity

import { useState, useEffect } from 'react'
import shopPageBanner from "../../public/images/Shop-page-images/Rectangle 1(1).png"
import Image from 'next/image'
import ShopBanner from "../../public/images/Shop-page-images/Frame 161.png"
import ReusableBanner from "../../Components/ReusableBanner"
import { getAllProducts } from "../../services/product.service"
import { IProduct, IProductResponse } from "../../utils/Types"
import ProductCard from "../../Components/ProductCard"

export default function Page() {


  const [productsArray, setProductsArray] = useState<IProduct[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const productsPerPage = 4

  useEffect(() => {
    async function fetchData() {
      const ALLPRODUCTS: IProductResponse = await getAllProducts()
      setProductsArray(ALLPRODUCTS?.AllProducts || [])
    }
    fetchData()
  }, [])

  // [3] Calculate pagination indexes
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = productsArray.slice(indexOfFirstProduct, indexOfLastProduct)

  // Calculate total pages
  const totalPages = Math.ceil(productsArray.length / productsPerPage)

  // Navigation handlers
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  return (
    <>
      <ReusableBanner title={"SHOP"} image={shopPageBanner} />

      {/* FilterBar */}
      <section className="w-full max-w-[1440px] mx-auto items-center py-12 justify-center flex space-y-[32px]">
        <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* [4] Map over currentProducts instead of productsArray */}
          {currentProducts.map((product: IProduct) => (
            <ProductCard
              id={product._id}
              key={product._id}
              image={product.productImage.url}
              heading={product.productName}
              paragraph={product.productDescription || ""}
              price={product.productPrice}
            />
          ))}
        </div>       </section>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center m-12 gap-5 font-sans text-sm font-medium selection:bg-transparent">

        {/* Dynamic page numbers based on actual product count */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNum = index + 1
          const isActive = currentPage === pageNum

          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`flex h-15 w-15 items-center justify-center cursor-pointer rounded-lg transition-colors duration-200 ${isActive
                ? "bg-[#b68c2d] text-white"
                : "bg-[#faf4ec] text-[#2c2419] hover:bg-[#f3e9da]"
                }`}
            >
              {pageNum}
            </button>
          )
        })}

        {/* Next Button */}
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          className={`flex items-center h-15 w-15 justify-center cursor-pointer rounded-lg px-5 transition-colors duration-200 ${currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#faf4ec] text-[#2c2419] hover:bg-[#f3e9da]"
            }`}
        >
          Next
        </button>
      </div>

      {/* Banner */}
      <div className='w-full'>
        <div className='w-full flex justify-center mx-auto bg-[#F9F1E7] py-6 px-4 md:px-12 flex-col sm:flex-row gap-4'>
          <Image src={ShopBanner} alt='banner' />
        </div>
      </div>
    </>
  )
}
