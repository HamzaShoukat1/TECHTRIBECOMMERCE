"use client";

import { useState, useEffect, Suspense } from "react";

import shopPageBanner from "../../public/images/Shop-page-images/Rectangle 1(1).png";

import ReusableBanner from "../../Components/ReusableBanner";
import { getAllProducts } from "../../services/product.service";
import { IProduct, IProductResponse } from "../../utils/Types";
import ProductCard from "../../Components/ProductCard";
import trophy from "../../public/images/trophy 1.png";
import guarentee from "../../public/images/guarantee.png";
import { useSearchParams } from "next/navigation";
import { useProductSearch } from "../../hooks/useProductSearch";
import { useDebounce } from "../../hooks/usedebounce";
import Shipping from "../../public/images/shipping.png";
import CustomerSupport from "../../public/images/customer-support.png";
import Image from "next/image";

export {
  trophy,
  guarentee,
  Shipping,
  CustomerSupport,
};

function ShopContent() {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const debouncedSearch = useDebounce(
    searchQuery,
    400
  );
  const {
    data: searchResults = [],
    isLoading: isSearchLoading,
  } = useProductSearch(debouncedSearch);

  const [productsArray, setProductsArray] = useState<IProduct[]>(
    []
  );

  const [loading, setLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const productsPerPage = 12


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const ALLPRODUCTS: IProductResponse =
          await getAllProducts();

        setProductsArray(
          ALLPRODUCTS?.AllProducts || []
        );
      } catch (error) {
        console.error(
          "Failed to fetch products:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  const displayedProducts =
    debouncedSearch.trim().length >= 2
      ? searchResults
      : productsArray;

  /*
   * Reset pagination whenever search changes.
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  /*
   * Pagination
   */
  const indexOfLastProduct =
    currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts =
    displayedProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

  const totalPages = Math.ceil(
    displayedProducts.length / productsPerPage
  );

  /*
   * Pagination handlers
   */
  const handlePageClick = (
    pageNumber: number
  ) => {
    setCurrentPage(pageNumber);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(
        (prev) => prev + 1
      );
    }
  };

  return (
    <>
      <ReusableBanner
        title={"SHOP"}
        image={shopPageBanner}
      />

      {/* FilterBar & Products Section */}
      <section className="w-full max-w-[1440px] mx-auto  overflow-hidden items-center py-12 justify-center flex text-center md:text-start flex-col space-y-[32px]">

        {loading || isSearchLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b68c2d]"></div>

            <p className="mt-4 text-sm font-medium text-gray-500">
              Loading products...
            </p>
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px] w-full">
            <p className="text-gray-500 text-lg font-medium">
              No products found.
            </p>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full px-4">

            {currentProducts.map(
              (product: IProduct) => (
                <ProductCard
                  id={product._id}
                  key={product._id}
                  image={product.productImage.url}
                  heading={product.productName}
                  paragraph={
                    product.productDescription || ""
                  }
                  price={product.productPrice}
                />
              )
            )}

          </div>
        )}

      </section>

      {!loading &&
        !isSearchLoading &&
        totalPages > 1 && (

        <div className="flex items-center justify-center m-12 gap-5 font-sans text-sm font-medium selection:bg-transparent ">

          {Array.from(
            { length: totalPages },
            (_, index) => {

              const pageNum = index + 1;

              const isActive =
                currentPage === pageNum;

              return (
                <button
                  key={pageNum}
                  onClick={() =>
                    handlePageClick(pageNum)
                  }
                  className={`flex h-15 w-15 items-center justify-center cursor-pointer rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-[#b68c2d] text-white"
                      : "bg-[#faf4ec] text-[#2c2419] hover:bg-[#f3e9da]"
                  }`}
                >
                  {pageNum}
                </button>
              );
            }
          )}

          {/* Next Button */}
          <button
            onClick={handleNextClick}
            disabled={
              currentPage === totalPages
            }
            className={`flex items-center h-15 w-15 justify-center cursor-pointer rounded-lg px-5 transition-colors duration-200 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#faf4ec] text-[#2c2419] hover:bg-[#f3e9da]"
            }`}
          >
            Next
          </button>

        </div>
      )}

     {/* Banner */} 
{/* Banner */}
<div className="bg-[#FAF4ED] font-poppins w-full py-12 md:py-16 flex justify-center items-center px-6 sm:px-12">
  <div className="w-full max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-6 justify-items-stretch">
    
    {/* High Quality */}
    <div className="flex items-center gap-4 w-full mx-auto max-w-[320px] sm:max-w-none">
      <Image 
        src={trophy} 
        alt="High Quality" 
        className="w-12 h-12 md:w-14 md:h-14 object-contain flex-shrink-0" 
      />
      <div className="flex flex-col justify-center min-w-0">
        <h4 className="font-semibold text-lg md:text-xl lg:text-2xl text-[#242424] leading-tight truncate-none">
          High Quality
        </h4>
        <p className="text-xs md:text-sm text-[#898989] font-medium leading-normal mt-1">
          crafted from top materials
        </p>
      </div>
    </div>

    {/* Warranty Protection */}
    <div className="flex items-center gap-4 w-full mx-auto max-w-[320px] sm:max-w-none">
      <Image 
        src={guarentee} 
        alt="Warranty Protection" 
        className="w-12 h-12 md:w-14 md:h-14 object-contain flex-shrink-0" 
      />
      <div className="flex flex-col justify-center min-w-0">
        <h4 className="font-semibold text-lg md:text-xl lg:text-2xl text-[#242424] leading-tight">
          Warranty Protection
        </h4>
        <p className="text-xs md:text-sm text-[#898989] font-medium leading-normal mt-1">
          Over 2 years
        </p>
      </div>
    </div>

    {/* Free Shipping */}
    <div className="flex items-center gap-4 w-full mx-auto max-w-[320px] sm:max-w-none">
      <Image 
        src={Shipping} 
        alt="Free Shipping" 
        className="w-12 h-12 md:w-14 md:h-14 object-contain flex-shrink-0" 
      />
      <div className="flex flex-col justify-center min-w-0">
        <h4 className="font-semibold text-lg md:text-xl lg:text-2xl text-[#242424] leading-tight">
          Free Shipping
        </h4>
        <p className="text-xs md:text-sm text-[#898989] font-medium leading-normal mt-1">
          Order over 150 $
        </p>
      </div>
    </div>

    {/* 24 / 7 Support */}
    <div className="flex items-center gap-4 w-full mx-auto max-w-[320px] sm:max-w-none">
      <Image 
        src={CustomerSupport} 
        alt="24/7 Support" 
        className="w-12 h-12 md:w-14 md:h-14 object-contain flex-shrink-0" 
      />
      <div className="flex flex-col justify-center min-w-0">
        <h4 className="font-semibold text-lg md:text-xl lg:text-2xl text-[#242424] leading-tight">
          24 / 7 Support
        </h4>
        <p className="text-xs md:text-sm text-[#898989] font-medium leading-normal mt-1">
          Dedicated support
        </p>
      </div>
    </div>

  </div>
</div>


    </>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b68c2d]"></div>

          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading products...
          </p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}