import React from 'react'
import Image from 'next/image'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/src/components/ui/breadcrumb';


interface BreadcrumbParent {
    label: string;
    href: string;
}

interface ReusableBannerProps {
    title?: string;
    image?: any;
    parents?: BreadcrumbParent[];
    breadcrumbPosition?: "center" | "start";
    makeLineBigger?: "small" | "large"
}

export default function ReusableBanner({ title, image, parents = [], breadcrumbPosition = "center", makeLineBigger = "small" }: ReusableBannerProps) {
    return (
        <div className="w-full  mx-auto">

            <div className={`relative w-full ${image ? "h-auto" : "h-[170px]"}`}>
                {image && (
                    <Image
                        src={image}
                        alt="banner-image"
                        className="w-full h-auto block"
                        priority
                    />
                )}

                <div
                    className={`absolute top-1/2 -translate-y-1/2 flex flex-col gap-2 w-full px-4 ${breadcrumbPosition === "start"
                        ? "left-0 items-start text-left px-[60px]"
                        : "left-1/2 -translate-x-1/2 items-center text-center"
                        }`}
                >
                    <h1 className='font-poppins font-bold tracking-normal text-3xl md:text-5xl text-black'>
                        {title}
                    </h1>

                    <Breadcrumb>
                        <BreadcrumbList className="font-poppins text-sm md:text-base text-neutral-600 flex flex-wrap items-center justify-center gap-1 md:gap-2">

                            {/* Home Link */}
                            <BreadcrumbItem>
                                <BreadcrumbLink render={<a href='/' className='hover:text-black  font-poppins transition-colors font-medium'>Home</a>}>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            {parents.map((parent, index) => (
                                <React.Fragment key={index}>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink render={<a href={parent.href} className='hover:text-black  font-poppins transition-colors font-medium'>{parent.label}</a>}>

                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </React.Fragment>
                            ))}

                            {/* FIXED: The pipe separator is now safely contained within a BreadcrumbItem structure to keep horizontal alignment unbroken */}
                            <li
                                className={`text-neutral-400 font-light px-1 select-none flex  items-center 
    ${makeLineBigger === "large" ? "text-5xl leading-0 text-[#9F9F9F]" : "h-4"}`}
                                aria-hidden="true"
                            >
                                |
                            </li>






                            {/* Current Page Title */}
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-neutral-900 font-normal">
                                    {title}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
        </div>
    )
}
