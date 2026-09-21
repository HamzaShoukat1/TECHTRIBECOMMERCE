'use client' 
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
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const productsPerPage = 4

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const ALLPRODUCTS: IProductResponse = await getAllProducts()
        setProductsArray(ALLPRODUCTS?.AllProducts || [])
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
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

      {/* FilterBar & Products Section */}
      <section className="w-full max-w-[1440px] mx-auto items-center py-12 justify-center flex flex-col space-y-[32px]">

        {loading ? (
          /* Tailored Tailwind CSS Spinner Loader */
          <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b68c2d]"></div>
            <p className="mt-4 text-sm font-medium text-gray-500">Loading products...</p>
          </div>
        ) : currentProducts.length === 0 ? (
          /* Empty State fallback */
          <div className="flex items-center justify-center min-h-[300px] w-full">
            <p className="text-gray-500 text-lg font-medium">No products found.</p>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full px-4">
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
          </div>
        )}

      </section>

      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center m-12 gap-5 font-sans text-sm font-medium selection:bg-transparent">
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
      )}

      {/* Banner */}
      <div className='w-full'>
        <div className='w-full flex justify-center mx-auto bg-[#F9F1E7] py-6 px-4 md:px-12 flex-col sm:flex-row gap-4'>
          <Image src={ShopBanner} alt='banner' />
        </div>
      </div>
    </>
  )
}
