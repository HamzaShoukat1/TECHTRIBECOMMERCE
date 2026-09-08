import shopPageBanner from '../../public/images/Shop-page-images/Rectangle 1(1).png';
import { MapPin, Phone, Clock } from 'lucide-react'
import Image from 'next/image';
import ShopBanner from "../../public/images/Shop-page-images/Frame 161.png"
import ReusableBanner from '../../Components/ReusableBanner';

export default function page() {
    return (
        <>
            <ReusableBanner title="Contact" image={shopPageBanner} />

            <section className="max-w-[1440px] mx-auto px-4 py-16 sm:py-24 bg-white font-sans text-black">
                {/* Header Section */}
               <div className='flex flex-col pb-12 sm:pb-16'>
                 <div className="text-center w-full max-w-[644px] mx-auto ">
                    <h2 className="text-3xl font-semibold mb-2 font-poppins">Get In Touch With Us</h2>
                    <p className="text-[#9F9F9F] text-[16px] leading-[auto] w-full max-w-[644px] font-poppins tracking-normal">
                        For More Information About Our Product & Services. Please Feel Free To Drop Us
                        An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
                    </p>
                </div>
                
               </div>

                {/* Content Section 2 columns */}
                <div className="max-w-[1058px] mx-auto grid grid-cols-1 font-poppins md:grid-cols-[1fr_2fr] gap-12 md:gap-24 px-4">

                    {/* Left Column: Contact Details */}
                    <div className="space-y-8 max-w-[393px]">
                        {/* Address */}
                        <div className="flex gap-6">
                            <MapPin className="w-6 h-6 mt-1 flex-shrink-0 text-black" />
                            <div>
                                <h3 className="text-xl font-bold mb-1 font-poppins ">Address</h3>
                                <p className="text-sm  leading-tight text-[#000000]">
                                    236 5th SE Avenue, New York NY10000, United States
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-6">
                            <Phone className="w-6 h-6 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold mb-1 font-poppins">Phone</h3>
                                <p className="text-sm text-[#000000] text-black">Mobile: +(84) 546-6789</p>
                                <p className="text-sm text-[#000000] text-black">Hotline: +(84) 456-6789</p>
                            </div>
                        </div>

                        {/* Working Time */}
                        <div className="flex gap-6">
                            <Clock className="w-6 h-6 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold mb-1 font-poppins">Working Time</h3>
                                <p className="text-sm text-[#000000]">Monday-Friday: 9:00 - 22:00</p>
                                <p className="text-sm text-[#000000]">Saturday-Sunday: 9:00 - 21:00</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <form className="space-y-6 max-w-[530px] w-full">
                        {/* Name Input */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="name" className="text-sm font-medium">Your name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Abc"
                                className="w-full h-[55px] border border-[#9F9F9F] rounded-[10px] px-6 text-sm placeholder-[#9F9F9F] focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="email" className="text-sm font-medium">Email address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Abc@def.com"
                                className="w-full h-[55px] border border-[#9F9F9F] rounded-[10px] px-6 text-sm placeholder-[#9F9F9F] focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        {/* Subject Input */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                placeholder="This is an optional"
                                className="w-full h-[55px] border border-[#9F9F9F] rounded-[10px] px-6 text-sm placeholder-[#9F9F9F] focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        {/* Message Input */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <textarea
                                id="message"
                                placeholder="Hi! I'd like to ask about"
                                rows={4}
                                className="w-full border border-[#9F9F9F] rounded-[10px] p-6 text-sm placeholder-[#9F9F9F] focus:outline-none focus:border-black transition-colors resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full sm:w-[237px] h-[55px] bg-[#B88E2F] hover:bg-[#a37d26] text-white font-medium rounded-[5px] transition-colors text-sm tracking-wide"
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </section>

            {/* banner  */}
            <div className='w-full   '>
                <div className='w-full  flex justify-center  mx-auto  bg-[#F9F1E7] py-6 px-4 md:px-12   flex-col sm:flex-row gap-4 '>

                    <Image src={ShopBanner} alt='banner' />
                </div>

            </div>
        </>
    )
}
