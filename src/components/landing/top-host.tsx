import React from 'react'
import Button from '../root/button'
import Image from 'next/image'
import { hosts } from '@/data/host'
function TopHost() {

    return (
        <section className="w-full bg-global-9 py-14">
            <div className="w-full ">
                <div className="flex flex-col gap-9 justify-start items-center w-full">
                    {/* Section Header */}
                    <div className="flex flex-col gap-3 justify-start items-start w-full">
                        <h2 className="text-[32px] sm:text-[37px] lg:text-[42px] font-plus-jakarta font-bold leading-[40px] sm:leading-[47px] lg:leading-[53px] text-left text-global-1">
                            Meet Our Top Hosts
                        </h2>
                        <p className="text-sm font-inter description font-normal leading-[17px] text-left text-global-2">
                            Meet locals sharing their culture and experiences.
                        </p>
                    </div>
                    {/* Hosts Grid */}
                    <div className="flex flex-col justify-between  lg:flex-row gap-6 w-full">
                        {hosts.map((host) => (
                            <div key={host.id} className="flex flex-col box-color justify-start items-center w-full  bg-global-8 rounded-[18px]">
                                <div className="flex flex-col gap-6 justify-start items-center w-full mb-6.5">
                                    <Image
                                        src={host.image}
                                        alt={host.name}
                                        width={372}
                                        height={292}
                                        className="w-full h-[292px] object-cover rounded-t-[18px]"
                                    />
                                    <div className="flex flex-col gap-3.5 justify-start items-center w-full px-2 lg:px-6.5">
                                        <div className="flex flex-col gap-2 justify-start items-center w-full">
                                            <div className="flex justify-start items-center w-full">
                                                <div className="flex gap-2.5 justify-start items-center w-full">
                                                    <Image
                                                        src={host.image}
                                                        alt={host.name}
                                                        width={46}
                                                        height={46}
                                                        className="rounded-full h-10 w-10 border-2 border-white"
                                                    />
                                                    <div className="flex flex-col gap-1.5 justify-start items-start w-full">
                                                        <h3 className="text-sm w-max font-plus-jakarta font-medium leading-[18px] text-left text-global-1">
                                                            {host.name}
                                                        </h3>
                                                        <p className="!text-xs font-inter description font-normal leading-[15px] text-left text-global-2">
                                                            {host.location}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end items-center lg:gap-2">
                                                    {/* <StarRating rating={host.rating} /> */}
                                                    <svg width={19} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.04894 0.927052C9.3483 0.00574112 10.6517 0.00573993 10.9511 0.927051L12.4697 5.60081C12.6035 6.01284 12.9875 6.2918 13.4207 6.2918H18.335C19.3037 6.2918 19.7065 7.53141 18.9228 8.10081L14.947 10.9894C14.5966 11.244 14.4499 11.6954 14.5838 12.1074L16.1024 16.7812C16.4017 17.7025 15.3472 18.4686 14.5635 17.8992L10.5878 15.0106C10.2373 14.756 9.7627 14.756 9.41221 15.0106L5.43648 17.8992C4.65276 18.4686 3.59828 17.7025 3.89763 16.7812L5.41623 12.1074C5.55011 11.6954 5.40345 11.244 5.05296 10.9894L1.07722 8.10081C0.293507 7.53141 0.696283 6.2918 1.66501 6.2918H6.57929C7.01252 6.2918 7.39647 6.01284 7.53035 5.60081L9.04894 0.927052Z" fill="#F28315" />
                                                    </svg>
                                                    <span className="text-xs font-inter w-max font-normal leading-[15px] text-global-2 ml-2">
                                                        {host.rating} ({host.reviews} Reviews)
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-sm font-inter description font-normal leading-[22px] text-left text-global-2 w-full">
                                                {host.description}
                                            </p>
                                            <div className="flex justify-start items-center w-full gap-2">
                                                {host.specialties.map((specialty, index) => (
                                                    <button
                                                        key={index}
                                                        
                                                        className="bg-button-1 w-max font-light  text-[12px] text-global-1 rounded-[16px]  lg:px-5 py-2 text-xs flex-1"
                                                    >
                                                        {specialty}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <Button
                                            className={`w-full rounded-[14px] px-8.5 py-2.5 text-sm font-medium ${host.isActive
                                                ? 'bg-[#f26457] text-[#f5f5f4] border border-[#ca3f33] shadow-[0px_7px_25px_#3e3e3e19]'
                                                : 'bg-white text-[#a0a0a0] border border-[#e0e0e0b2]'
                                                }`}
                                                variant={`${host.isActive ? "primary": "secondary"}`}
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