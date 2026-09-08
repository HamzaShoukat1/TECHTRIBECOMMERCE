import Image from 'next/image'
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'
import ProductInteractiveSection from '@/src/app/Components/ProductInteractivity'
import ReusableBanner from '@/src/app/Components/ReusableBanner'
import { getSingleProduct } from '@/src/app/services/product.service'
import { IPRODUCTDETAIL } from '@/src/app/utils/Types'

export default async function ProductDetailsPage({ params }: any) {
    const { id } = await params

    const singleProduct: IPRODUCTDETAIL = await getSingleProduct(id)
    const ProductArray: IPRODUCTDETAIL = singleProduct || {} as IPRODUCTDETAIL

    const heading = ProductArray.productName || "Asgaard sofa"
    const price = ProductArray.productPrice || "Rs. 250,000.00"
    const description = ProductArray.productDescription
    const image = ProductArray.productImage

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
                    <p className='text-[24px] font-medium text-[#9F9F9F] font-poppins mb-3'>{price}</p>

                    {/* Rating System Mock */}
                    <div className='flex items-center gap-4 mb-4 text-[13px] text-[#9F9F9F]'>
                        <div className='text-[#FFC700] text-lg flex gap-1'>★★★★★</div>
                        <span className='border-l border-[#9F9F9F] h-4 pl-4 font-poppins'>5 Customer Reviews</span>
                    </div>

                    <p className='text-[13px] font-poppins leading-[20px] text-black font-normal pr-6 mb-6'>{description}</p>

                    {/* Attributes: Size Selection */}
                    <div className='mb-4'>
                        <span className='text-[14px] text-[#9F9F9F] block mb-2'>Size</span>
                        <div className='flex gap-3 text-[13px]'>
                            <button className='w-[30px] h-[30px] rounded-[5px] bg-[#B88E2F] text-white flex items-center justify-center font-normal'>L</button>
                            <button className='w-[30px] h-[30px] rounded-[5px] bg-[#F9F1E7] text-black flex items-center justify-center font-normal hover:bg-[#B88E2F] hover:text-white transition'>XL</button>
                            <button className='w-[30px] h-[30px] rounded-[5px] bg-[#F9F1E7] text-black flex items-center justify-center font-normal hover:bg-[#B88E2F] hover:text-white transition'>XS</button>
                        </div>
                    </div>

                    {/* Attributes: Color Selection */}
                    <div className='mb-8'>
                        <span className='text-[14px] text-[#9F9F9F] block mb-2'>Color</span>
                        <div className='flex gap-3'>
                            <button className='w-[30px] h-[30px] rounded-full bg-[#816DFA] ring-2 ring-offset-2 ring-transparent focus:ring-[#816DFA]' aria-label="Purple"></button>
                            <button className='w-[30px] h-[30px] rounded-full bg-black ring-2 ring-offset-2 ring-transparent focus:ring-black' aria-label="Black"></button>
                            <button className='w-[30px] h-[30px] rounded-full bg-[#B88E2F] ring-2 ring-offset-2 ring-transparent focus:ring-[#B88E2F]' aria-label="Gold"></button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className='flex items-center gap-3 pb-12 border-b border-[#D9D9D9] mb-10'>
                        <ProductInteractiveSection product={singleProduct} />
                    </div>

                    {/* Summary Section Details */}
                    <div className='flex flex-col gap-3 text-[16px] text-[#9F9F9F] font-normal'>
                        <div className='flex'>
                            <span className='w-[100px]'>SKU</span>
                            <span className='mr-3'>:</span>
                            <span>SS001</span>
                        </div>
                        <div className='flex'>
                            <span className='w-[100px]'>Category</span>
                            <span className='mr-3'>:</span>
                            <span>Sofas</span>
                        </div>
                        <div className='flex'>
                            <span className='w-[100px]'>Tags</span>
                            <span className='mr-3'>:</span>
                            <span>Sofa, Chair, Home, Shop</span>
                        </div>
                        <div className='flex items-center'>
                            <span className='w-[100px]'>Share</span>
                            <span className='mr-3'>:</span>
                            <div className='flex gap-4 text-black text-lg'>
                                <a href="#" className='hover:text-[#B88E2F]'><FaFacebook /></a>
                                <a href="#" className='hover:text-[#B88E2F]'><FaLinkedin /></a>
                                <a href="#" className='hover:text-[#B88E2F]'><FaTwitter /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other section */}
            <div className="w-full max-w-[1240px] mx-auto px-4 py-12 font-sans">
                {/* Navigation Tabs */}
                <div className="flex justify-center items-center gap-14 border-b border-gray-200 pb-6 mb-8 text-xl">
                    <button className="font-medium text-black cursor-pointer">Description</button>
                    <button className="text-gray-400 hover:text-black transition cursor-pointer">Additional Information</button>
                    <button className="text-gray-400 hover:text-black transition cursor-pointer">Reviews [5]</button>
                </div>

                {/* Description Paragraphs */}
                <div className="max-w-[1024px] mx-auto flex flex-col gap-6 text-[#9F9F9F] text-base leading-relaxed text-justify mb-12">
                    <p>
                        Embodying the raw, wayward spirit of rock & roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
                    </p>
                </div>
            </div>
        </>
    )
}
