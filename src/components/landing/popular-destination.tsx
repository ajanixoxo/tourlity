import React from 'react'
import Image from 'next/image'
import Button from '../root/button'
import { destinations } from '@/data/destinations'
function PopularDestination() {
  return (
    <section className="w-full bg-global-9 py-14">
      <div className="w-full mx-auto ">
        <div className="flex flex-col gap-9 justify-start items-center w-full">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-center gap-3 lg:items-center w-full">
            <div className="flex flex-col gap-3 justify-start items-start w-full">
              <h2 className="text-[32px] sm:text-[37px] lg:text-[42px] font-plus-jakarta font-bold leading-[40px] sm:leading-[47px] lg:leading-[53px] text-left text-global-1">
                Popular Destinations
              </h2>
              <p className="text-sm description font-inter font-normal leading-[17px] text-left text-global-2">
                Discover the places travelers love most, handpicked for unforgettable experiences.
              </p>
            </div>
            <Button variant='secondary'
              className='w-[150px] flex justify-between items-center text-sm rounded-[14px] py-2.5'>
              View More
              <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.667 7.99902L2.66699 7.99902" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 4.66602L12.6262 7.29224C12.9596 7.62558 13.1262 7.79224 13.1262 7.99935C13.1262 8.20646 12.9596 8.37312 12.6262 8.70646L10 11.3327" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>


            </Button>
          </div>
          {/* Destinations Grid */}
          <div className="flex flex-col sm:flex-row  justify-between gap-4 w-full overflow-x-auto">
            {destinations.map((destination) => (
              <div key={destination.id} className="relative w-full sm:w-[300px] h-[276px] rounded-3xl overflow-hidden">
                <Image
                  src={destination.image}
                  alt={`${destination.name}, ${destination.country}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute  inset-0 bg-gradient-to-b from-transparent to-black/30 pt-6  flex flex-col justify-end items-center shadow-[0px_4px_15px_#888888ff]">
                  <div className="flex py-2 px-4 flex-col relative bg-transparent backdrop-blur-xs z-40   gap-1.5 justify-center items-start w-full mt-[162px]">
                    <h3 className="text-[20px] sm:text-[24px] font-plus-jakarta font-semibold leading-[26px] sm:leading-[31px] text-left text-white">
                      {destination.name}, {destination.country}
                    </h3>
                    <p className="text-sm font-inter font-normal leading-[17px] text-left text-[#ffffffcc]">
                      {destination.experienceCount} Experiences
                    </p>
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

export default PopularDestination