"use client"

import SearchExperiences from "../root/search-form"

// import { Search } from 'lucide-react'
// import { useState } from 'react'
// import Button from '../root/button'

export default function HeroSection() {
//   const [searchQuery, setSearchQuery] = useState('')

//   const handleSearch = (e:React.FormEvent) => {
//     e.preventDefault()
//     console.log('Searching for:', searchQuery)
//   }

  return (
    <section className="relative h-[700px]  top-5 lg:h-[600px] rounded-4xl flex flex-col  overflow-hidden bg-gradient-to-r from-black/50 to-black/30">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover rounded-4xl"
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-4xl" />

      {/* Content */}
      <div className=" mt-2 lg:mt-auto relative z-10 max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-center w-full">
          <h1 className="[font-family:'Inter',Roboto] text-[40px] font-bold  text-white lg:text-[78px] lg:leading-[130px]">
            Discover Authentic Local <span className="italic">Experiences</span>
          </h1>
          <p className="text-[14px] lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
           Book immersive tours with trusted local hosts virtual or in-person.
          </p>

          {/* <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-lg p-2">
              <input
                type="text"
                placeholder="What do you want to explore?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 text-lg placeholder:text-gray-500 px-4 py-2 focus:outline-none"
              />
              <Button variant="primary" type="submit" className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-3">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </form> */}
          <SearchExperiences />
        </div>
      </div>

    </section>
  )
}