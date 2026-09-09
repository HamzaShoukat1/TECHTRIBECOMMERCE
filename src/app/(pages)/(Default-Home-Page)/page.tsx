import Image from 'next/image'
import sectionImage from "../../public/images/scandinavian-interior-mockup-wall-decal-background 1.png"

// import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { IMAGES_DATA, rect36, rect37, rect38, rect39, rect40, rect41, rect43, rect44, rect45 } from "../../utils/index"
import RoomCarousel from '../../Components/RoomCarousal';
import ProductCard from '../../Components/ProductCard';
import { getAllProducts } from '../../services/product.service';
import type { IProduct, IProductResponse } from '../../utils/Types';















export default async function Page() {
  const productsResponse: IProductResponse = await getAllProducts();
  const products = productsResponse?.AllProducts?.slice(0, 8) ?? [];

  return (
    <main className="w-full min-h-screen bg-white space-y-[32px]">
      {/* Hero Section */}
      <section className="relative w-full h-[716px] overflow-hidden">
        <Image
          src={sectionImage}
          alt="Beautiful scandinavian interior mockup background showing a decorated wall"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-x-4 bottom-8 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-auto md:right-[5%] lg:right-[10%] w-[calc(100%-32px)] max-w-[643px] bg-[#FFF3E3] rounded-[10px] p-6 sm:p-10 md:p-14 shadow-lg">
          <div className="flex flex-col gap-4 w-full">
            <span className="font-poppins font-semibold text-[#333333] text-sm tracking-[3px] uppercase">
              New Arrival
            </span>

            <h1 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[52px] [-webkit-text-stroke:1px_black] lg:leading-[65px] text-[#B88E2F]">
              Discover Our <br className="hidden sm:inline" />New Collection
            </h1>

            <p className="font-poppins font-medium text-base sm:text-lg leading-relaxed text-[#333333] mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>

            <button className="bg-[#B88E2F] w-full sm:w-fit cursor-pointer hover:bg-[#a07b27] transition-all px-12 py-4  font-poppins font-bold text-white text-sm uppercase tracking-wider rounded-sm">
              BUY NOW
            </button>
          </div>
        </div>
      </section>
      {/* //image  */}

      <section className="w-full max-w-[1283px] mx-auto py-8 flex flex-col gap-12 items-center">
        {/* Header */}
        <div className="text-center max-w-[559px] flex flex-col gap-2">
          <h2 className="font-bold font-poppins text-2xl sm:text-[32px] text-[#333333]">
            Browse The Range
          </h2>
          <p className="font-poppins text-base sm:text-[20px] text-[#8A8A8A]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full ">
          {IMAGES_DATA.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="relative w-full aspect-[4/5] rounded-lg">
                <Image
                  src={item.image}
                  alt={item.text}
                  fill
                  className="object-cover  transition-transform duration-300"
                />
              </div>
              <h3 className="font-poppins font-semibold text-lg sm:text-xl text-[#333333]">
                {item.text}
              </h3>
            </div>
          ))}
        </div>
      </section>


      {/* //products  */}
      <section className='w-full max-w-[1236px]  mx-auto items-center space-y-[32px]'>
        <h2 className='font-bold text-[40px] flex justify-center pb-3'>Our Products</h2>
        <div className='grid grid-cols-1 gap-[32px]  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center mx-auto'>

          {products.map((product: IProduct) => (
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
        <button className="text-[#B88E2F] w-full sm:w-fit cursor-pointer    border-[#B88E2F] border-[1px] flex justify-center mx-auto items-center transition-all px-12 py-4  font-poppins font-bold text-sm uppercase tracking-wider rounded-sm">
          Show More
        </button>

      </section>
      {/* // furniture picture  */}

      {/* //carousle  and left data */}
      <div className="w-full bg-[#FCF8F3] py-10 md:py-16 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-10 px-6 lg:pl-[80px] lg:pr-0">

          {/* Left Content */}
          <div className="w-full lg:max-w-[422px] flex flex-col gap-4 shrink-0">
            <h1 className="font-bold font-poppins text-[32px] sm:text-[40px] leading-[120%] tracking-normal text-[#333333]">
              50+ Beautiful rooms inspiration
            </h1>
            <p className="text-[16px] font-medium leading-[150%] font-poppins max-w-[368px] tracking-normal text-[#616161]">
              Our designer already made a lot of beautiful prototype of rooms that inspire you
            </p>
            <button className="bg-[#B88E2F] text-white w-full sm:w-fit cursor-pointer flex justify-center items-center transition-all px-9 py-4 font-poppins font-semibold text-base rounded-none hover:bg-[#a37d26] mt-2">
              Explore More
            </button>
          </div>

          {/* Right Carousel */}
          <div className="w-full  lg:flex-1">
            <RoomCarousel />
          </div>

        </div>
      </div>

      {/* 9. Bottom-Right Kitchen Tiles (Rectangle 44) */}
      <section className="w-full max-w-[1799px] space-x-[-39px] space-y-[-39px] mx-auto py-12  overflow-hidden">

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <h2 className="font-poppins font-semibold text-[20px] text-gray-500 mb-1">
            Share your setup with
          </h2>
          <h1 className="font-poppins font-bold text-[40px] leading-[120%] tracking-normal text-[#3A3A3A]">
            #FuniroFurniture
          </h1>
        </div>

        {/* Grid Layout Setup */}
        <div className="grid grid-cols-12 gap-4 auto-rows-[140px] md:auto-rows-[180px] lg:auto-rows-[220px]">

          {/* --- TOP ROW BLOCKS --- */}
          {/* 1. Tall Left Shelf (Rectangle 36) */}
          <div className="col-span-2 row-span-2">
            <Image src={rect36} alt="Furniture setup" className="w-full h-full object-cover rounded-sm" />
          </div>

          {/* 2. Center-Left Laptop Desk (Rectangle 38) */}
          <div className="col-span-4 row-span-2">
            <Image src={rect38} alt="Furniture setup" className="w-full h-full object-cover rounded-sm" />
          </div>

          {/* 3. Center Tall Dining Set (Rectangle 40) */}
          <div className="col-span-3 row-span-3">
            <Image src={rect40} alt="Furniture setup" className="w-full h-full object-cover rounded-sm" />
          </div>

          {/* 4. Center-Right Cozy Bedroom (Rectangle 43) */}
          <div className="col-span-2 row-span-2">
            <Image src={rect43} alt="Furniture setup" className="w-full h-full object-cover rounded-sm" />
          </div>

          {/* 5. Right Edge Brick Dining Wall (Rectangle 45) */}
          <div className="col-span-1 row-span-2">
            <Image src={rect45} alt="Furniture setup" className="w-full h-full object-cover rounded-sm" />
          </div>


          {/* --- BOTTOM ROW BLOCKS --- */}

          {/* 6. Bottom-Left Vintage Chair (Rectangle 37) */}
          <div className="col-span-2 row-span-2">
            <Image src={rect37} alt="Furniture setup" className="w-full h-full object-cover rounded-sm" />
          </div>

          {/* 7. Bottom Center-Left Two Stool Vases (Rectangle 39) */}
          <div className="col-span-4 row-span-2">
            <Image src={rect39} alt="Furniture setup" className="w-full h-full object-cover rounded-sm" />
          </div>

          {/* 8. Bottom Center-Right Small Frame (Rectangle 41) */}
          <div className="col-span-1 row-span-1">
            <Image src={rect41} alt="Furniture setup" className="w-full h-full object-cover rounded-sm" />
          </div>

          {/* 9. Bottom-Right Kitchen Tiles (Rectangle 44) */}
          <div className="col-span-2 row-span-1">
            <Image src={rect44} alt="Furniture setup" className="w-full h-full object-cover rounded-sm" />
          </div>

        </div>
      </section>

    </main>
  )
}
