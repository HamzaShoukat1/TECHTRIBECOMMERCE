import Image from 'next/image'
import { notFound } from 'next/navigation'
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'
import ProductInteractiveSection from '@/src/app/Components/ProductInteractivity'
import ReusableBanner from '@/src/app/Components/ReusableBanner'
import type { CartItem } from '@/src/app/context/cartContext'
import { getSingleProduct } from '@/src/app/services/product.service'
import { IPRODUCTDETAIL } from '@/src/app/utils/Types'


export default async function ProductDetailsPage({ params }: any) {
    const { id } = await params

    if (!/^[a-f\d]{24}$/i.test(id)) {
        notFound()
    }

    const singleProduct: IPRODUCTDETAIL = await getSingleProduct(id)
    if (!singleProduct) {
        notFound()
    }

    const heading = singleProduct.productName || "Asgaard sofa"
    const price = singleProduct.productPrice
    const description = singleProduct.productDescription
    const image = singleProduct.productImage?.url || ""
    const productSizes = singleProduct.productSizes || []
    const productColors = singleProduct.productColors || []

    const formattedProductForCart: any = {
        _id: singleProduct._id || id,
        productName: heading,
        productPrice: price,
        productImage: singleProduct.productImage,
        productDescription: description,
        productSizes: productSizes,
        productColors: productColors,
        productQuantity: 1,
        createdAt: singleProduct.createdAt,
        updatedAt: singleProduct.updatedAt,
    }

    return (
        <>
            <div className='flex bg-[#F9F1E7]'>
                <ReusableBanner
                    parents={[{ label: 'Shop', href: '/shop' }]}
                    breadcrumbPosition='start'
                    makeLineBigger='large'
                />
                <h1 className='absolute top-41 left-60'>
                    {heading}
                </h1>
            </div>

            <div className='w-full flex max-w-[1440px] mx-auto bg-white py-10 px-8 gap-12 font-poppins'>

                {/* LEFT SIDE: Image Gallery Panel */}
                <div className='flex gap-4 items-start'>
                    {/* Thumbnails */}
                    <div className='flex flex-col gap-4'>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className='w-[76px] h-[80px] bg-[#FFF9F3] rounded-10 flex items-center justify-center cursor-pointer border border-transparent hover:border-[#B88E2F]'>
                                <Image
                                    src={image}
                                    alt='thumbnail'
                                    width={70}
                                    height={70}
                                    className='object-contain p-1'
                                />
                            </div>
                        ))}
                    </div>
                    {/* Main Image */}
                    <div className='w-full max-w-[423px] h-[500px] bg-[#F9F1E7] rounded-10 flex items-center justify-center overflow-hidden'>
                        <Image
                            src={image}
                            alt={heading}
                            width={423}
                            height={500}
                            className='object-contain w-full h-full bg-[#F9F1E7]'
                        />
                    </div>
                </div>

                {/* RIGHT SIDE: Product Info Panel */}
                <div className='w-full max-w-[606.01px] flex flex-col text-black'>
                    <h1 className='text-[42px] leading-tight font-poppins font-normal mb-1'>{heading}</h1>
                    <p className='text-[24px] font-medium text-[#9F9F9F] font-poppins mb-3'>${price}</p>

                    {/* Rating System Mock */}
                    <div className='flex items-center gap-4 mb-4 text-[13px] text-[#9F9F9F]'>
                        <div className='text-[#FFC700] text-lg flex gap-1'>★★★★★</div>
                        <span className='border-l border-[#9F9F9F] h-4 pl-4 font-poppins'>5 Customer Reviews</span>
                    </div>

                    <p className='text-[13px] font-poppins leading-[20px] text-black font-normal pr-6 mb-6'>{description}</p>

                    <ProductInteractiveSection product={formattedProductForCart} />

                    {/* Metadata Dividers */}
                    <div className="border-t border-[#D9D9D9] pt-8 mt-6 flex flex-col gap-3 text-[16px] text-[#9F9F9F]">
                        <div className="flex gap-4">
                            <span className="w-20">SKU</span>
                            <span>: SS001</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="w-20">Category</span>
                            <span>: Sofas</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="w-20">Share</span>
                            <div className="flex items-center gap-3 text-black">
                                : <FaFacebook className="cursor-pointer" />
                                <FaLinkedin className="cursor-pointer" />
                                <FaTwitter className="cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
