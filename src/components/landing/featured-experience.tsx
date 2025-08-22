
import React from 'react'
import Button from '../root/button'
import Image from 'next/image'
import { tours as experiences } from '@/data/tours'
function FeaturedExperience() {

  return (
    <section className="w-full bg-global-9 py-14">
      <div className="w-full ">
        <div className="flex flex-col gap-9 justify-start items-start w-full">
          {/* Section Header */}
          <div className="flex flex-row justify-start items-center w-full">
            <div className="flex flex-col gap-3 justify-start items-start w-full">
              <h2 className="text-[30px] lg:text-[42px] font-plus-jakarta font-bold leading-[40px] sm:leading-[47px] lg:leading-[53px] text-left text-global-1">
                Featured Experiences
              </h2>
              <p className="text-sm font-inter description font-normal leading-[17px] text-left text-global-2">
                Handpicked tours offering unique perspectives and unforgettable moments.
              </p>
            </div>
          </div>
          {/* Experiences List */}
          <div className="w-full lg:overflow-x-auto " style={{ scrollbarWidth: "none" }}>
            <div className="flex flex-col lg:flex-row gap-6 w-full lg:w-full">
              {experiences.map((experience) => (
                <div key={experience.id} className="flex flex-col box-color justify-start items-center w-full lg:w-[400px] bg-global-8 rounded-[18px] flex-shrink-0">
                  <div className="flex flex-col gap-6 justify-start items-center w-full mb-6.5">
                    {/* Experience Image */}
                    <div className="relative w-full h-[292px] rounded-t-[18px] overflow-hidden">
                      <Image
                        src={experience.images}
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
                    <div className="flex flex-col gap-3.5 justify-start items-center w-full px-4 lg:px-6">
                      <div className="flex flex-col gap-2.5 justify-start items-start w-full">
                        <div className="flex flex-col gap-1 justify-center items-start w-full">
                          <h4 className="text-[20px] sm:text-[24px] font-plus-jakarta font-semibold leading-[26px] sm:leading-[31px] text-left text-global-1">
                            {experience.title}
                          </h4>
                          <p className="text-sm font-inter description font-normal leading-[22px] text-left text-global-2 w-full">
                            {experience.description}
                          </p>
                        </div>
                        <button className="bg-button-1 text-global-1 rounded-[16px] px-2 lg:px-4 py-2 text-xs">
                          {experience.categories[0]}
                        </button>

                        {/* Location + Rating side by side */}
                        <div className="flex justify-between items-center w-full">
                          {/* Location */}
                          <div className="flex items-center gap-2">
                            <Image
                              src="/images/img_location05.svg"
                              alt="Location"
                              width={16}
                              height={16}
                            />
                            <span className="text-sm font-inter font-light description leading-[17px] text-global-2">
                              {experience.location}
                            </span>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            <svg
                              width={19}
                              height={19}
                              viewBox="0 0 20 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.04894 0.927052C9.3483 0.00574112 10.6517 0.00573993 10.9511 0.927051L12.4697 5.60081C12.6035 6.01284 12.9875 6.2918 13.4207 6.2918H18.335C19.3037 6.2918 19.7065 7.53141 18.9228 8.10081L14.947 10.9894C14.5966 11.244 14.4499 11.6954 14.5838 12.1074L16.1024 16.7812C16.4017 17.7025 15.3472 18.4686 14.5635 17.8992L10.5878 15.0106C10.2373 14.756 9.7627 14.756 9.41221 15.0106L5.43648 17.8992C4.65276 18.4686 3.59828 17.7025 3.89763 16.7812L5.41623 12.1074C5.55011 11.6954 5.40345 11.244 5.05296 10.9894L1.07722 8.10081C0.293507 7.53141 0.696283 6.2918 1.66501 6.2918H6.57929C7.01252 6.2918 7.39647 6.01284 7.53035 5.60081L9.04894 0.927052Z"
                                fill="#F28315"
                              />
                            </svg>
                            <span className="font-inter font-light text-[10px] lg:text-[14px] leading-[15px] description text-global-2 ml-2">
                              {experience.rating} ({experience.host.reviewCount} Reviews)
                            </span>
                          </div>
                        </div>

                      </div>
                      <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center w-full">
                          <span className="text-[18px] flex sm:text-[20px] font-inter font-medium leading-[23px] sm:leading-[25px] text-global-1">
                            ${experience.price}
                          </span>
                          <div className="flex justify-start items-center w-full px-2">
                            <span className="text-xs description font-inter font-normal leading-[17px] text-global-2">
                              /
                            </span>
                            <span className="text-xs description font-inter font-normal leading-[17px] text-global-2 ml-2">
                              Person
                            </span>
                          </div>
                        </div>
                        <Button
                          variant={`${experience.isLive ? "primary" : "secondary"}`}
                          className=' text-[#F5F5F4]  w-[200px] lg:w-[150px] rounded-[14px]'
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