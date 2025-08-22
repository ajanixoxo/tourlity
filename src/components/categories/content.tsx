"use client"
import React from 'react'
import Image from 'next/image'
import CTA from '../landing/cta'
function CategoriesContent() {
  
const categories = [
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
  ]


const CategoryCard = ({ category, index }: { category: typeof categories[0], index: number }) => (
    <div key={index} className="relative w-full h-[344px] rounded-[18px] overflow-hidden">
      <Image
        src={category.image}
        alt={category.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pt-6 flex flex-row justify-start items-end shadow-[0px_4px_15px_#888888ff]">
        <div className="flex flex-col gap-2.5 justify-start items-start w-full mt-[140px]">
          <button className="w-14 h-14 mx-6 bg-[#18171799] rounded-[28px] p-4">
            <Image
              src={category.icon}
              alt={`${category.title} icon`}
              width={24}
              height={24}
            />
          </button>
          <div className="flex px-6 pt-4 relative bg-transparent backdrop-blur-xs z-40 flex-col gap-2.5 justify-start items-start w-full">
            <h3 className="text-[24px] sm:text-[28px] font-plus-jakarta font-semibold leading-[31px] sm:leading-[36px] text-left text-white">
              {category.title}
            </h3>
            <p className="text-sm font-inter font-light leading-[17px] sm:leading-[22px] text-left text-white mb-5.5">
              {category.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

return (
    <section className="w-full bg-global-9 py-14">
      <div className="w-full mx-auto mb-16">
        <div className="flex flex-col gap-9 justify-start items-center w-full">
          {/* Section Header */}
          <div className="flex flex-row justify-start items-center w-full">
            <div className="flex flex-col gap-3 justify-start items-start w-full">
              <h2 className="text-[30px] w-max lg:text-[42px] font-plus-jakarta font-semibold leading-[40px] sm:leading-[47px] lg:leading-[53px] text-left text-global-1">
                Explore by Category
              </h2>
              <p className="text-sm font-inter font-normal leading-[17px] text-left text-global-2">
                Find experiences that match your passion, from cultural immersions to thrilling adventures.
              </p>
            </div>
          </div>

          {/* Desktop Grid - Hidden on mobile */}
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} index={index} />
            ))}
          </div>

          
        </div>
      </div>
      <CTA/>
    </section>
  )
}

export default CategoriesContent