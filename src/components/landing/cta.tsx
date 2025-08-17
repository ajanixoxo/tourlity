import React from 'react'
import Image from 'next/image'
import Button from '../root/button'
function CTA() {
  return (
   <section className="w-full bg-[#1e4d4d] py-[90px] px-4 sm:px-1 lg:px-12">
          <div className="flex flex-col gap-5.5 justify-start items-center w-full lg:max-width-[50%] mx-auto px-6.5">
            <div className="flex flex-col lg:flex-row items-center gap-2.5 justify-center w-auto">
              <Image
                src="/images/img_images.png"
                alt="Tourlity verified"
                width={136}
                height={40}
                className="w-[136px] h-10"
              />
              <p className="text-xs font-inter font-normal leading-[15px] text-center text-[#ffffffcc]">
                Verified hosts. Live guides. Fully personalized.
              </p>
            </div>
            <div className="flex flex-col gap-3 justify-start items-center w-full">
              <h2 className="text-[32px] sm:text-[37px] lg:text-[42px] font-plus-jakarta font-bold leading-[40px] sm:leading-[47px] lg:leading-[53px] text-center text-white">
                Ready to Start Your Journey?
              </h2>
              <p className="text-sm font-inter font-normal leading-5 text-center text-[#ffffffcc] w-full lg:px-18">
                Join Tourlity today and discover authentic local experiences around the world. Connect with passionate hosts and create unforgettable memories.
              </p>
            </div>
            <div className="flex items-center flex-col lg:flex-row gap-2 justify-center w-auto">
              <Button className="bg-[#f26457] text-[#f5f5f4] border border-[#ca3f33] font-light rounded-[14px] px-4 py-2.5 shadow-[0px_7px_25px_#3e3e3e19]">
                Start Exploring Experiences
              </Button>
              <Button variant='secondary' className='rounded-[14px] bg-white font-light'>
                See What&apos;s Inside
              </Button>
            </div>
          </div>
        </section>
  )
}

export default CTA