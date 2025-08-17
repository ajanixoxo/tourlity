
import React from 'react'
import Button from '../root/button'
import Image from 'next/image'
import { tours as experiences } from '@/data/tours'
function FeaturedExperience() {
const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-sm ${
            index < Math.floor(rating) ? 'bg-[#f28315]' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
  return (
    <section className="w-full bg-global-9 py-14">
          <div className="w-full max-w-[1168px] mx-auto px-4 sm:px-6 lg:px-14">
            <div className="flex flex-col gap-9 justify-start items-start w-full">
              {/* Section Header */}
              <div className="flex flex-row justify-start items-center w-full">
                <div className="flex flex-col gap-3 justify-start items-start w-full">
                  <h2 className="text-[32px] sm:text-[37px] lg:text-[42px] font-plus-jakarta font-bold leading-[40px] sm:leading-[47px] lg:leading-[53px] text-left text-global-1">
                    Featured Experiences
                  </h2>
                  <p className="text-sm font-inter font-normal leading-[17px] text-left text-global-2">
                    Handpicked tours offering unique perspectives and unforgettable moments.
                  </p>
                </div>
              </div>
              {/* Experiences List */}
              <div className="w-full overflow-x-auto">
                <div className="flex flex-row gap-6 w-max lg:w-full">
                  {experiences.map((experience) => (
                    <div key={experience.id} className="flex flex-col justify-start items-center w-[368px] bg-global-8 rounded-[18px] flex-shrink-0">
                      <div className="flex flex-col gap-6 justify-start items-center w-full mb-6.5">
                        {/* Experience Image */}
                        <div className="relative w-full h-[292px] rounded-t-[18px] overflow-hidden">
                          <Image
                            src={experience.images[0]}
                            alt={experience.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-[#00000059] to-[#00000059] p-6 flex flex-col gap-[184px] justify-start items-start shadow-[0px_4px_15px_#888888ff]">
                            <button className="self-end w-9 h-9 bg-[#18171799] rounded-[18px] p-1.5">
                              <Image
                                src="/images/img_favourite.svg"
                                alt="Favorite"
                                width={24}
                                height={24}
                              />
                            </button>
                            <div className="flex items-center gap-2 bg-[#18171799] rounded-[20px] px-2 py-2">
                              <Image
                                src={experience.host.avatar}
                                alt={experience.host.name}
                                width={24}
                                height={24}
                                className="rounded-full"
                              />
                              <span className="text-xs font-inter font-normal leading-[15px] text-[#ffffffcc]">
                                {experience.host.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Experience Content */}
                        <div className="flex flex-col gap-3.5 justify-start items-center w-full px-6">
                          <div className="flex flex-col gap-2.5 justify-start items-start w-full">
                            <div className="flex flex-col gap-1 justify-center items-start w-full">
                              <h3 className="text-[20px] sm:text-[24px] font-plus-jakarta font-semibold leading-[26px] sm:leading-[31px] text-left text-global-1">
                                {experience.title}
                              </h3>
                              <p className="text-sm font-inter font-normal leading-[22px] text-left text-global-2 w-full">
                                {experience.description}
                              </p>
                            </div>
                            <Button className="bg-button-1 text-global-1 rounded-[16px] px-4 py-2 text-xs">
                              {experience.categories[0]}
                            </Button>
                            <div className="flex justify-start items-center w-full">
                              <div className="flex justify-start items-center w-full">
                                <Image
                                  src="/images/img_location05.svg"
                                  alt="Location"
                                  width={16}
                                  height={16}
                                />
                                <span className="text-sm font-inter font-normal leading-[17px] text-global-2 ml-2">
                                  {experience.location}
                                </span>
                              </div>
                              <div className="flex justify-end items-center gap-2">
                                <StarRating rating={experience.rating} />
                                <span className="text-xs font-inter font-normal leading-[15px] text-global-2 ml-2">
                                  {experience.rating} ({experience.host.reviewCount} Reviews)
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center items-center w-full">
                            <div className="flex justify-center items-center w-full">
                              <span className="text-[18px] sm:text-[20px] font-inter font-medium leading-[23px] sm:leading-[25px] text-global-1">
                                {experience.price}
                              </span>
                              <div className="flex justify-start items-center w-full px-2">
                                <span className="text-sm font-inter font-normal leading-[17px] text-global-2">
                                  /
                                </span>
                                <span className="text-sm font-inter font-normal leading-[17px] text-global-2 ml-2">
                                  Person
                                </span>
                              </div>
                            </div>
                            <Button
                              className={`rounded-[14px] px-4 py-2.5 text-sm font-medium ${
                                experience.isLive
                                  ? 'bg-[#f26457] text-[#f5f5f4] border border-[#ca3f33] shadow-[0px_7px_25px_#3e3e3e19]'
                                  : 'bg-white text-[#a0a0a0] border border-[#e0e0e0b2]'
                              }`}
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

export default FeaturedExperience