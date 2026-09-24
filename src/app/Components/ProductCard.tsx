import Image, { StaticImageData } from "next/image"
import Link from 'next/link';

type ProductTypes = {
  id: string
  image: string
  heading: string
  paragraph: string
  price: number
  Label?: string | StaticImageData
}

export default function ProductCard({ id, Label, image, heading, paragraph, price }: ProductTypes) {
  return (
    <Link href={`/products/${id}`} className="block h-full w-full">
      <div className="w-full overflow-hidden pb-4 bg-gray-100 h-full flex flex-col border sm:max-w-[285px] mx-auto p-4">

        {/* Image Container */}
        <div className="relative w-full max-w-sm h-70 overflow-hidden rounded-lg">
          <Image 
            src={image} 
            alt={heading} 
            fill 
            className="object-cover" 
            priority={false} 
          />
          {Label && (
            <div className="absolute top-4 right-4 w-12 h-12">
              <Image src={Label} alt="discount label" fill sizes="48px" className="object-contain" />
            </div>
          )}
        </div>

        {/* Product Details Content */}
        <div className="p-4 flex flex-col gap-[6px] bg-white flex-grow">
          <h3 className="font-semibold flex justify-center md:justify-start font-poppins text-xl md:text-[24px] leading-tight text-[#3A3A3A] line-clamp-2">
            {heading}
          </h3>
          <p className="font-medium font-poppins flex justify-center md:justify-start  text-sm md:text-[16px] text-[#898989] line-clamp-2">
            {paragraph}
          </p>
            <span className="font-semibold flex justify-center md:justify-start  font-poppins text-lg md:text-[20px] text-[#3A3A3A]">
              ${price.toLocaleString()}
            </span>
        </div>

      </div>
    </Link>
  )
}
