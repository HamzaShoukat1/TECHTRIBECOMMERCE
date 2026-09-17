import shopPageBanner from "../../public/images/Shop-page-images/Rectangle 1(1).png"
import Image from 'next/image'
import { SlidersHorizontal, LayoutGrid, Rows3 } from 'lucide-react'
import ShopBanner from "../../public/images/Shop-page-images/Frame 161.png"
import ReusableBanner from "../../Components/ReusableBanner"
import { getAllProducts } from "../../services/product.service"
import { IProduct, IProductResponse } from "../../utils/Types"
import ProductCard from "../../Components/ProductCard"

export default async function page() {

  const ALLPRODUCTS: IProductResponse = await getAllProducts()
  console.log("sa", ALLPRODUCTS)


  const productsArray = ALLPRODUCTS?.AllProducts || [];


  console.log("real data", productsArray);



  return (
    <>

      <ReusableBanner title={"SHOP"} image={shopPageBanner} />

      {/* FilterBar  */}


      <section className="w-full max-w-[1440px] mx-auto  items-center  py-12 justify-center flex  space-y-[32px]">
        <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
          {productsArray.map((product: IProduct) => (
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
      </section>

      {/* //  */}
      <div className="flex items-center  justify-center  m-12 gap-5  font-sans text-sm font-medium selection:bg-transparent">
        <button className="flex h-15 w-15 items-center justify-center cursor-pointer rounded-lg bg-[#b68c2d] text-white transition-colors duration-200">
          1
        </button>

        <button className="flex  h-15 w-15 items-center justify-center cursor-pointer rounded-lg bg-[#faf4ec] text-[#2c2419] transition-colors duration-200 hover:bg-[#f3e9da]">
          2
        </button>

        <button className="flex  h-15 w-15 items-center justify-center cursor-pointer rounded-lg bg-[#faf4ec] text-[#2c2419] transition-colors duration-200 hover:bg-[#f3e9da]">
          3
        </button>

        <button className="flex items-center   h-15 w-15 justify-center  cursor-pointer rounded-lg bg-[#faf4ec] px-5 text-[#2c2419] transition-colors duration-200 hover:bg-[#f3e9da]">
          Next
        </button>
      </div>



      {/* banner  */}
      <div className='w-full   '>
        <div className='w-full  flex justify-center  mx-auto  bg-[#F9F1E7] py-6 px-4 md:px-12   flex-col sm:flex-row gap-4 '>

          <Image src={ShopBanner} alt='banner' />
        </div>

      </div>

    </>
  )
}
