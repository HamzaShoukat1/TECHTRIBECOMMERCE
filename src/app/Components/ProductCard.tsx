import Image, { StaticImageData } from "next/image"
import Link from 'next/link';

type ProductTypes = {
    id: string
    image: string
    heading: string
    paragraph: string
    price: number
    Label?: string | StaticImageData
    cutPrice?: string
}

export default function ProductCard({ id, Label, image, heading, paragraph, price, cutPrice }: ProductTypes) {
    return (
        <Link href={`/products/${id}`} >
            <div className="w-full max-w-[285px] bg-[#F4F5F7] rounded-sm overflow-hidden pb-4">
                <div className="relative w-full h-[301px]">
                    <Image
                        src={image}
                        width={285}
                        height={301}
                        alt={heading}
                        className="object-cover w-full h-full"
                    />

                    {Label && (
                        <div className="absolute top-4 right-4">
                            <Image src={Label} alt="discount label" width={48} height={48} />
                        </div>
                    )}
                </div>

                {/* Product Details Content */}
                <div className="p-4 flex flex-col gap-[6px] w-full max-w-[285px]">
                    <h3 className="font-semibold font-poppins text-[24px] leading-tight text-[#3A3A3A]">
                        {heading}
                    </h3>
                    <p className="font-medium font-poppins text-[16px] text-[#898989] line-clamp-1">
                        {paragraph}
                    </p>

                    <div className="flex items-center gap-3">
                        <span className="font-semibold font-poppins text-[20px] text-[#3A3A3A]">
                            {price}
                        </span>
                        {cutPrice && (
                            <span className="font-normal font-poppins text-[16px] text-[#B0B0B0] line-through">
                                {cutPrice}
                            </span>
                        )}
                    </div>
                </div>

            </div>
        </Link>
    )
}
