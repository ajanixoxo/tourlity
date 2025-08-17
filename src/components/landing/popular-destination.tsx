import React from 'react'
import Image from 'next/image'
import Button from '../root/button'
import { destinations } from '@/data/destinations'
function PopularDestination() {
  return (
    <section className="w-full bg-global-9 py-14">
          <div className="w-full max-w-[1168px] mx-auto px-4 sm:px-6 lg:px-14">
            <div className="flex flex-col gap-9 justify-start items-center w-full">
              {/* Section Header */}
              <div className="flex flex-row justify-center items-center w-full">
                <div className="flex flex-col gap-3 justify-start items-start w-full">
                  <h2 className="text-[32px] sm:text-[37px] lg:text-[42px] font-plus-jakarta font-bold leading-[40px] sm:leading-[47px] lg:leading-[53px] text-left text-global-1">
                    Popular Destinations
                  </h2>
                  <p className="text-sm font-inter font-normal leading-[17px] text-left text-global-2">
                    Discover the places travelers love most, handpicked for unforgettable experiences.
                  </p>
                </div>
                <Button className="bg-white text-button-1 border border-[#a0a0a090] rounded-[14px] px-4 py-2.5 shadow-[0px_7px_25px_#3e3e3e19] flex items-center gap-2 self-end">
                  View More
                  <Image
                    src="/images/img_arrowright02sharp.svg"
                    alt="Arrow right"
                    width={16}
                    height={16}
                  />
                </Button>
              </div>
              {/* Destinations Grid */}
              <div className="flex flex-col sm:flex-row gap-6 w-full">
                {destinations.map((destination) => (
                  <div key={destination.id} className="relative w-full sm:w-[274px] h-[276px] rounded-[18px] overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={`${destination.name}, ${destination.country}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0000007f] to-[#0000007f] p-6 flex flex-col justify-end items-center shadow-[0px_4px_15px_#888888ff]">
                      <div className="flex flex-col gap-1.5 justify-center items-start w-full mt-[162px]">
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