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
        <Link href={`/products/${id}`} className="block h-full">
            <div className="w-full max-w-[285px] mx-auto  overflow-hidden pb-4 bg-white h-full flex flex-col">
                
                {/* Image Container */}
                <div className="relative w-full aspect-[285/301]">
                    <Image
                        src={image}
                        alt={heading}
                        fill 
                        sizes="(max-width: 768px) 100vw, 285px"
                        className="object-cover"
                        priority={false}
                    />

                    {Label && (
                        <div className="absolute top-4 right-4 w-12 h-12">
                            <Image 
                                src={Label} 
                                alt="discount label" 
                                fill
                                sizes="48px"
                                className="object-contain"
                            />
                        </div>
                    )}
                </div>

                {/* Product Details Content */}
                <div className="p-4 flex flex-col gap-[6px] bg-white flex-grow">
                    <h3 className="font-semibold font-poppins text-xl md:text-[24px] leading-tight text-[#3A3A3A] line-clamp-2">
                        {heading}
                    </h3>
                    <p className="font-medium font-poppins text-sm md:text-[16px] text-[#898989] line-clamp-2">
                        {paragraph}
                    </p>

                    <div className="flex items-center gap-3 mt-auto pt-2">
                        <span className="font-semibold font-poppins text-lg md:text-[20px] text-[#3A3A3A]">
                            ${price.toLocaleString()}
                        </span>
                    </div>
                </div>

            </div>
        </Link>
    )
}
