'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'

import carousalImg1 from '../public/images/carousle/Image.png'
import carousalImg2 from '../public/images/carousle/Rectangle 25.png'

const slides = [
  {
    id: 1,
    img: carousalImg1,
    num: '01',
    category: 'Bed Room',
    title: 'Inner Peace',
  },
  {
    id: 2,
    img: carousalImg2,
    num: '02',
    category: 'Living Room',
    title: 'Nordic Vibe',
  },
  {
    id: 3,
    img: carousalImg1,
    num: '03',
    category: 'Dining Room',
    title: 'Cozy Space',
  },
  {
    id: 4,
    img: carousalImg2,
    num: '04',
    category: 'Bed Room',
    title: 'Modern Space',
  },
]

export default function RoomCarousel() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className='w-full max-w-[1211px]'>
      <div className="relative w-full max-w-[712px]">

        {/* ================= SWIPER ================= */}
        <Swiper
          slidesPerView="auto"
          spaceBetween={21}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}

          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex)
          }}
          className="overflow-visible flex mx-auto"
        >
          {slides.map((slide, index) => {
            const isActive = index === activeIndex

            return (
              <SwiperSlide key={slide.id} className="!w-[362px]">
                <div
                  className={`
                    relative
                    w-[362px]
                    transition-all
                    duration-500
                    ${isActive ? 'h-[520px]' : 'h-[435px]'}
                  `}
                >
                  {/* IMAGE */}
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />

                  {/* ================= INFO BOX ================= */}
                  {isActive && (
                    <div
                      className="
                        absolute
                        left-[565px]
                        top-[2807px]
                        w-[238px]
                        h-[116px]
                        bg-white/90
                        flex
                        flex-col
                        justify-center
                      "
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] text-[#616161]">
                          {slide.num}
                        </span>
                        <span className="w-[24px] h-[1px] bg-[#616161]" />
                        <span className="text-[14px] text-[#616161]">
                          {slide.category}
                        </span>
                      </div>

                      <h3
                        className="
                          font-poppins
                          font-semibold
                          text-[24px]
                          text-[#333333]
                          mt-1
                        "
                      >
                        {slide.title}
                      </h3>
                    </div>
                  )}


                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>

        {/*OUTSIDE NEXT ARROW */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="
            absolute
            right-[0px]
            top-[240px]
            z-30
            w-[48px]
            h-[48px]
            rounded-full
            bg-white
            shadow-md
            flex
            items-center
            justify-center
            text-[#B88E2F]
            text-[28px]
            cursor-pointer
            hover:scale-105
            transition
          "
        >
          →
        </button>

        {/* PAGINATION  */}
        <div className="flex items-center gap-[12px] mt-[24px]">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex

            return (
              <button
                key={slide.id}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`
                  flex
                  items-center
                  justify-center
                  rounded-full
                  cursor-pointer
                  transition-all
                  duration-300
                  ${isActive
                    ? 'w-[24px] h-[24px] border border-[#B88E2F] bg-white'
                    : 'w-[8px] h-[8px] bg-[#D9D9D9]'
                  }
                `}
              >
                {isActive && (
                  <span
                    className="
                      w-[8px]
                      h-[8px]
                      rounded-full
                      bg-[#B88E2F]
                    "
                  />
                )}
              </button>
            )
          })}
        </div>

      </div>
    </div>
  )
}
