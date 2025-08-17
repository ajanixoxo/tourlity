import React from 'react'
import Button from '../root/button'
function SharePassion() {
  return (
    <section className="w-full relative">
      <video
        className="absolute inset-0 w-full h-full object-cover "
        autoPlay
        muted
        loop
        playsInline
        poster="/images/mountain-lake-bridge-travelers.png" // Fallback image while video loads
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
        <source src="/videos/hero-background.webm" type="video/webm" />
        {/* Fallback for browsers that don't support video */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-4xl"
          style={{
            backgroundImage: `url('/images/hero-bg.jpg')`,
          }}
        />
      </video>
      <div className="absolute inset-0 z-30 bg-black/40 rounded-4xl" />
      <div
        className="w-full relative z-40 rounded-2xl py-36 px-4 sm:px-6 lg:px-14"

      >
        <div className="flex flex-col gap-5.5 justify-start items-center w-full lg:max-w-[66%] mx-auto">
          <div className="flex flex-col gap-3 justify-start items-center w-full px-4 sm:px-6 lg:px-14">
            <h2 className="text-[32px] sm:text-[37px] lg:text-[42px] font-plus-jakarta font-bold leading-[40px] sm:leading-[47px] lg:leading-[53px] text-center text-white">
              Share Your Passion with the World
            </h2>
            <p className="text-sm font-inter font-normal leading-5 text-center text-[#ffffffcc] w-full">
              Turn your knowledge, skills, and local expertise into unforgettable experiences for travelers. Join our community of hosts and earn while sharing what you love.
            </p>
          </div>
          <Button className="bg-[#f26457] text-white border border-[#ca3f33] rounded-[14px] px-4 py-2.5 shadow-[0px_7px_25px_#3e3e3e19]">
            Become a Host
          </Button>
        </div>
      </div>
    </section>
  )
}

export default SharePassion