import React from 'react'
import Image from 'next/image'
function ExploreCategory() {
  return (
    <section className="w-full bg-global-9 py-14">
          <div className="w-full max-w-[1168px] mx-auto px-4 sm:px-6 lg:px-14">
            <div className="flex flex-col gap-9 justify-start items-center w-full">
              {/* Section Header */}
              <div className="flex flex-row justify-start items-center w-full">
                <div className="flex flex-col gap-3 justify-start items-start w-full">
                  <h2 className="text-[32px] sm:text-[37px] lg:text-[42px] font-plus-jakarta font-bold leading-[40px] sm:leading-[47px] lg:leading-[53px] text-left text-global-1">
                    Explore by Category
                  </h2>
                  <p className="text-sm font-inter font-normal leading-[17px] text-left text-global-2">
                    Find experiences that match your passion, from cultural immersions to thrilling adventures.
                  </p>
                </div>
              </div>
              {/* Category Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                {[
                  {
                    title: 'Food and Cuisine',
                    description: 'Taste authentic dishes, join local cooking classes, and explore street food markets.',
                    image: '/images/img_image.png',
                    icon: '/images/img_kitchen_utensils.svg'
                  },
                  {
                    title: 'Culture and History',
                    description: 'Walk through heritage sites, discover traditions, and experience local customs firsthand.',
                    image: '/images/img_image_344x572.png',
                    icon: '/images/img_home_05.svg'
                  },
                  {
                    title: 'Adventure',
                    description: 'Hike breathtaking trails, explore hidden landscapes, and create unforgettable thrill-seeking memories.',
                    image: '/images/img_bg_image.png',
                    icon: '/images/img_safari.svg'
                  },
                  {
                    title: 'Celebration',
                    description: 'Join weddings, festivals, and once-in-a-lifetime cultural celebrations with local communities.',
                    image: '/images/img_bg_image_344x572.png',
                    icon: '/images/img_icon.svg'
                  }
                ].map((category, index) => (
                  <div key={index} className="relative w-full h-[344px] rounded-[18px] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#00000059] to-[#00000059] p-6 flex flex-row justify-start items-end shadow-[0px_4px_15px_#888888ff]">
                      <div className="flex flex-col gap-2.5 justify-start items-start w-full mt-[140px]">
                        <button className="w-14 h-14 bg-[#18171799] rounded-[28px] p-4">
                          <Image
                            src={category.icon}
                            alt={`${category.title} icon`}
                            width={24}
                            height={24}
                          />
                        </button>
                        <div className="flex flex-col gap-2.5 justify-start items-start w-full">
                          <h3 className="text-[24px] sm:text-[28px] font-plus-jakarta font-semibold leading-[31px] sm:leading-[36px] text-left text-white">
                            {category.title}
                          </h3>
                          <p className="text-sm font-inter font-normal leading-[17px] sm:leading-[22px] text-left text-[#ffffffcc] mb-5.5">
                            {category.description}
                          </p>
                        </div>
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

export default ExploreCategory