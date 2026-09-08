'use client';

import { useState } from 'react';


import shopPageBanner from '../../public/images/Shop-page-images/Rectangle 1(1).png';
import { useCart } from '../../context/cartContext';
import ReusableBanner from '../../Components/ReusableBanner';
import UsableSkeleton from '../../Components/UsableSkeleton';



type PaymentMethod = 'bank' | 'cod';

export default function CheckoutPage() {

    const { cart, subtotal, isInitialized } = useCart();

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>('bank');

    return (

        <div className="w-full min-h-screen font-poppins bg-white text-black font-sans">

            {/* Header Banner */}

            <ReusableBanner
                title="Checkout"
                image={shopPageBanner}
            />

            {/* Main Layout */}

            <div className="max-w-[1240px] font-poppins mx-auto py-16 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* LEFT SIDE: Billing Details */}

                <form className="flex flex-col gap-6">

                    <h2 className="text-[36px] font-semibold mb-4">
                        Billing details
                    </h2>

                    {/* First & Last Name */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="flex flex-col gap-2">

                            <label className="text-[16px] font-medium">
                                First Name
                            </label>

                            <input
                                type="text"
                                required
                                className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                            />

                        </div>

                        <div className="flex flex-col gap-2">

                            <label className="text-[16px] font-medium">
                                Last Name
                            </label>

                            <input
                                type="text"
                                required
                                className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                            />

                        </div>

                    </div>

                    {/* Company Name */}

                    <div className="flex flex-col gap-2">

                        <label className="text-[16px] font-medium">
                            Company Name (Optional)
                        </label>

                        <input
                            type="text"
                            className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                        />

                    </div>

                    {/* Country */}

                    <div className="flex flex-col gap-2">

                        <label className="text-[16px] font-medium">
                            Country / Region
                        </label>

                        <div className="relative">

                            <select
                                defaultValue="sri-lanka"
                                className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 bg-white outline-none appearance-none cursor-pointer text-[#9F9F9F]"
                            >

                                <option value="sri-lanka">
                                    Sri Lanka
                                </option>

                                <option value="pakistan">
                                    Pakistan
                                </option>

                                <option value="uae">
                                    United Arab Emirates
                                </option>

                            </select>

                            <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">
                                ▼
                            </span>

                        </div>

                    </div>

                    {/* Street Address */}

                    <div className="flex flex-col gap-2">

                        <label className="text-[16px] font-medium">
                            Street address
                        </label>

                        <input
                            type="text"
                            required
                            className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                        />

                    </div>

                    {/* Town / City */}

                    <div className="flex flex-col gap-2">

                        <label className="text-[16px] font-medium">
                            Town / City
                        </label>

                        <input
                            type="text"
                            required
                            className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                        />

                    </div>

                    {/* Province */}

                    <div className="flex flex-col gap-2">

                        <label className="text-[16px] font-medium">
                            Province
                        </label>

                        <div className="relative">

                            <select
                                defaultValue="western"
                                className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 bg-white outline-none appearance-none cursor-pointer text-[#9F9F9F]"
                            >

                                <option value="western">
                                    Western Province
                                </option>

                                <option value="central">
                                    Central Province
                                </option>

                                <option value="southern">
                                    Southern Province
                                </option>

                            </select>

                            <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">
                                ▼
                            </span>

                        </div>

                    </div>

                    {/* ZIP */}

                    <div className="flex flex-col gap-2">

                        <label className="text-[16px] font-medium">
                            ZIP code
                        </label>

                        <input
                            type="text"
                            required
                            className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                        />

                    </div>

                    {/* Phone */}

                    <div className="flex flex-col gap-2">

                        <label className="text-[16px] font-medium">
                            Phone
                        </label>

                        <input
                            type="tel"
                            required
                            className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                        />

                    </div>

                    {/* Email */}

                    <div className="flex flex-col gap-2">

                        <label className="text-[16px] font-medium">
                            Email address
                        </label>

                        <input
                            type="tel"
                            required
                            className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                        />

                    </div>

                    {/* Additional Information */}

                    <div className="flex flex-col gap-2">

                        <label className="text-[16px] font-medium">
                        </label>

                        <input
                            type="tel"
                            required
                            placeholder="Addition information"
                            className="w-full h-[60px] border border-[#9F9F9F] rounded-[10px] px-4 outline-none focus:border-black transition"
                        />

                    </div>

                </form>


                {/* RIGHT SIDE: Order Summary */}

                <div className="flex flex-col bg-white pt-4 lg:px-8">

                    {/* Header */}

                    <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
                        <span className="text-[24px] font-medium">
                            Product
                        </span>
                        <span className="text-[24px] font-medium">
                        </span>

                        <span className="text-[24px] font-medium">
                            Rs. {subtotal?.toLocaleString() || "0"}
                        </span>

                    </div>


                    {/* Products */}

                    {!isInitialized ? (
<UsableSkeleton />

                    ) : (

                        <>

                            {cart.map((item) => (

                                <div
                                    key={item.id}
                                    className="flex justify-between items-center mb-4"
                                >

                                    <span className="text-[#9F9F9F] text-[16px]">

                                        {item.name}

                                        <strong className="text-black font-medium ml-2">
                                            × {item.quantity}
                                        </strong>

                                    </span>

                                    <span className="font-light text-[16px]">
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                    </span>

                                </div>

                            ))}


                            {/* Subtotal */}

                            <div className="flex justify-between items-center mb-4">

                                <span className="text-[16px] font-normal">
                                    Subtotal
                                </span>

                                <span className="font-light text-[16px]">
                                    Rs. {subtotal?.toLocaleString() || "0"}
                                </span>

                            </div>


                            {/* Total */}

                            <div className="flex justify-between items-center pb-8 border-b border-[#D9D9D9] mb-8">

                                <span className="text-[16px] font-normal">
                                    Total
                                </span>

                                <span className="text-[24px] font-bold text-[#B88E2F]">
                                    Rs. {subtotal?.toLocaleString() || "0"}
                                </span>

                            </div>

                        </>

                    )}


                    {/* Payment Methods */}

                    <div className="flex flex-col gap-4 mb-6">

                        {/* Bank Transfer */}

                        <div className="flex flex-col gap-2">

                            <button
                                type="button"
                                className="flex items-center gap-3 cursor-pointer text-[16px] font-medium text-left"
                                onClick={() => setPaymentMethod('bank')}
                            >

                                <span
                                    className={`w-3 h-3 rounded-full flex items-center justify-center border border-black ${paymentMethod === 'bank'
                                        ? 'bg-black'
                                        : 'bg-transparent'
                                        }`}
                                />

                                Direct Bank Transfer

                            </button>


                            {paymentMethod === 'bank' && (

                                <p className="text-[#9F9F9F] text-[14px] leading-[22px] font-light mt-1">

                                    Make your payment directly into our bank
                                    account. Please use your Order ID as the
                                    payment reference. Your order will not be
                                    shipped until the funds have cleared in our
                                    account.

                                </p>

                            )}

                        </div>


                        {/* Cash On Delivery */}

                        <button
                            type="button"
                            className={`flex items-center gap-3 cursor-pointer text-[16px] text-left ${paymentMethod === 'cod'
                                ? 'text-black font-medium'
                                : 'text-[#9F9F9F] font-normal'
                                }`}
                            onClick={() => setPaymentMethod('cod')}
                        >

                            <span
                                className={`w-3 h-3 rounded-full flex items-center justify-center border ${paymentMethod === 'cod'
                                    ? 'border-black bg-black'
                                    : 'border-[#9F9F9F] bg-transparent'
                                    }`}
                            />

                            Cash On Delivery

                        </button>

                    </div>


                    {/* Privacy Notice */}

                    <p className="text-[14px] font-light text-black leading-[22px] mb-8">

                        Your personal data will be used to support your
                        experience throughout this website, to manage access
                        to your account, and for other purposes described in
                        our{' '}

                        <strong className="font-semibold cursor-pointer">
                            privacy policy.
                        </strong>

                    </p>


                    {/* Submit Button */}

                    <div className="flex justify-center w-full">

                        <button
                            type="submit"
                            className="border cursor-pointer border-black rounded-[15px] px-12 py-4 text-[16px] font-medium hover:bg-black hover:text-white transition"
                        >
                            Place order
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}