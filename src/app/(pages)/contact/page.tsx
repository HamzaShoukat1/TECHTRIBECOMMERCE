"use client"

import React, { useState } from 'react';
import shopPageBanner from '../../public/images/Shop-page-images/Rectangle 1(1).png';
import { MapPin, Phone, Clock } from 'lucide-react';
import Image from 'next/image';
import ShopBanner from "../../public/images/Shop-page-images/Frame 161.png";
import ReusableBanner from '../../Components/ReusableBanner';
import { UseContact } from '../../hooks/UseContact';

export default function Page() {
    const { mutateAsync: SentMessage, isPending, isSuccess } = UseContact();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await SentMessage(formData);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <>
            <ReusableBanner title="Contact" image={shopPageBanner} />

            <section className="max-w-[1440px] mx-auto px-4 py-16 sm:py-24 bg-white font-sans text-black">
                {/* Header Section */}
                <div className='flex flex-col pb-12 sm:pb-16'>
                    <div className="text-center w-full max-w-[644px] mx-auto ">
                        <h2 className="text-3xl font-semibold mb-2 font-poppins">Get In Touch With Us</h2>
                        <p className="text-[#9F9F9F] text-[16px] leading-relaxed w-full max-w-[644px] font-poppins tracking-normal">
                            For More Information About Our Product & Services. Please Feel Free To Drop Us
                            An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
                        </p>
                    </div>
                </div>

                {/* Content Section 2 columns */}
                <div className="max-w-[1058px] mx-auto grid grid-cols-1 font-poppins md:grid-cols-[1fr_1.5fr] gap-12 md:gap-24 px-4">

                    {/* Left Column: Contact Details */}
                    <div className="space-y-8 max-w-[393px]">
                        {/* Address */}
                        <div className="flex gap-6">
                            <MapPin className="w-6 h-6 mt-1 flex-shrink-0 text-black" />
                            <div>
                                <h3 className="text-xl font-medium mb-1 font-poppins text-black">Address</h3>
                                <p className="text-sm text-gray-700 leading-snug">
                                    238 5th Ave, New York, NY 10001, United States
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-6">
                            <Phone className="w-6 h-6 mt-1 flex-shrink-0 text-black" />
                            <div>
                                <h3 className="text-xl font-medium mb-1 font-poppins text-black">Phone</h3>
                                <p className="text-sm text-gray-700 leading-snug">
                                    Mobile: +(123) 456-7890<br />
                                    Hotline: +(123) 456-7891
                                </p>
                            </div>
                        </div>

                        {/* Working Time */}
                        <div className="flex gap-6">
                            <Clock className="w-6 h-6 mt-1 flex-shrink-0 text-black" />
                            <div>
                                <h3 className="text-xl font-medium mb-1 font-poppins text-black">Working Time</h3>
                                <p className="text-sm text-gray-700 leading-snug">
                                    Monday-Friday: 9:00 - 22:00<br />
                                    Saturday-Sunday: 9:00 - 21:00
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6 max-w-[530px]">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2 text-black">Your name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="hamza"
                                    required
                                    className="w-full px-4 py-4 border border-[#9F9F9F] rounded-lg focus:outline-none focus:border-black transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2 text-black">Email address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Abc@def.com"
                                    required
                                    className="w-full px-4 py-4 border border-[#9F9F9F] rounded-lg focus:outline-none focus:border-black transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-black">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="This is an optional"
                                    className="w-full px-4 py-4 border border-[#9F9F9F] rounded-lg focus:outline-none focus:border-black transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2 text-black">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Hi! i'd like to ask about..."
                                    required
                                    className="w-full px-4 py-4 border border-[#9F9F9F] rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full sm:w-[237px] bg-[#B88E2F] cursor-pointer hover:bg-[#9E7824] text-white py-3 px-8 rounded transition-colors font-medium disabled:bg-gray-400"
                                >
                                    {isPending ? 'Sending...' : 'Submit'}
                                </button>
                            </div>

                            {isSuccess && (
                                <p className="text-green-600 font-medium mt-2">
                                    Your message has been sent successfully!
                                </p>
                            )}
                        </form>
                    </div>

                </div>
            </section>

            {/* Bottom Shop Features Banner */}
            <div className="w-full max-w-[1440px] mx-auto">
                <Image
                    src={ShopBanner}
                    alt="Shop Features"
                    layout="responsive"
                    priority
                />
            </div>
        </>
    );
}
