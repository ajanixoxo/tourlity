import React from 'react'
import Button from '../root/button'
import Image from 'next/image'
import { hosts } from '@/data/host'
function TopHost() {
    const StarRating = ({ rating }: { rating: number }) => (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className={`w-3 h-3 rounded-sm ${index < Math.floor(rating) ? 'bg-[#f28315]' : 'bg-gray-300'
                        }`}
                />
            ))}
        </div>
    );
    return (
        <section className="w-full bg-global-9 py-14">
            <div className="w-full max-w-[1168px] mx-auto px-4 sm:px-6 lg:px-14">
                <div className="flex flex-col gap-9 justify-start items-center w-full">
                    {/* Section Header */}
                    <div className="flex flex-col gap-3 justify-start items-start w-full">
                        <h2 className="text-[32px] sm:text-[37px] lg:text-[42px] font-plus-jakarta font-bold leading-[40px] sm:leading-[47px] lg:leading-[53px] text-left text-global-1">
                            Meet Our Top Hosts
                        </h2>
                        <p className="text-sm font-inter font-normal leading-[17px] text-left text-global-2">
                            Meet locals sharing their culture and experiences.
                        </p>
                    </div>
                    {/* Hosts Grid */}
                    <div className="flex flex-col lg:flex-row gap-6 w-full">
                        {hosts.map((host) => (
                            <div key={host.id} className="flex flex-col justify-start items-center w-full lg:w-[372px] bg-global-8 rounded-[18px]">
                                <div className="flex flex-col gap-6 justify-start items-center w-full mb-6.5">
                                    <Image
                                        src={host.image}
                                        alt={host.name}
                                        width={372}
                                        height={292}
                                        className="w-full h-[292px] object-cover rounded-t-[18px]"
                                    />
                                    <div className="flex flex-col gap-3.5 justify-start items-center w-full px-6.5">
                                        <div className="flex flex-col gap-2 justify-start items-center w-full">
                                            <div className="flex justify-start items-center w-full">
                                                <div className="flex gap-2.5 justify-start items-center w-full">
                                                    <Image
                                                        src={host.image}
                                                        alt={host.name}
                                                        width={46}
                                                        height={46}
                                                        className="rounded-full object-cover"
                                                    />
                                                    <div className="flex flex-col gap-1.5 justify-start items-start w-full">
                                                        <h3 className="text-sm font-plus-jakarta font-medium leading-[18px] text-left text-global-1">
                                                            {host.name}
                                                        </h3>
                                                        <p className="text-xs font-inter font-normal leading-[15px] text-left text-global-2">
                                                            {host.location}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end items-center gap-2">
                                                    <StarRating rating={host.rating} />
                                                    <span className="text-xs font-inter font-normal leading-[15px] text-global-2 ml-2">
                                                        {host.rating} ({host.reviews} Reviews)
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-sm font-inter font-normal leading-[22px] text-left text-global-2 w-full">
                                                {host.description}
                                            </p>
                                            <div className="flex justify-start items-center w-full gap-2">
                                                {host.specialties.map((specialty, index) => (
                                                    <Button
                                                        key={index}
                                                        className="bg-button-1 text-global-1 rounded-[16px] px-6 py-2 text-xs flex-1"
                                                    >
                                                        {specialty}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                        <Button
                                            className={`w-full rounded-[14px] px-8.5 py-2.5 text-sm font-medium ${host.isActive
                                                    ? 'bg-[#f26457] text-[#f5f5f4] border border-[#ca3f33] shadow-[0px_7px_25px_#3e3e3e19]'
                                                    : 'bg-white text-[#a0a0a0] border border-[#e0e0e0b2]'
                                                }`}
                                        >
                                            View Experiences
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TopHost