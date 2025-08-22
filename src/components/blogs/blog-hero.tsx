"use client"
import React from 'react'
import { useState } from "react"
import { Search } from "lucide-react"
import Button from "../root/button"

function BlogHero() {
     const [searchQuery, setSearchQuery] = useState("")
    
        const handleSearch = (e: React.FormEvent) => {
            e.preventDefault()
            // Handle search functionality
            console.log("Searching for:", searchQuery)
        }
  return (
      <section className="relative h-[500px] lg:h-[400px] bg-gradient-to-r rounded-[32px] from-black/50 to-black/30">
                <div
                    className="absolute inset-0 bg-cover bg-center rounded-[32px]"
                    style={{
                        backgroundImage: `url('/images/blog-hero.png')`,
                    }}
                />
                <div className="absolute inset-0 bg-black/30 rounded-[32px]" />
    
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="text-center w-full">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                           Travel Stories and   <span className="italic">Insights </span>
                        </h1>
                        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                            Discover travel tips, cultural insights, and inspiring stories from our global community.
                        </p>
    
                         <form onSubmit={handleSearch} className="max-w-xl px-2 mx-auto ">
                                    <div className="flex sm:flex-row gap-4 backdrop-blur-xs bg-[#3e3e3e66] stroke-color !border-[#e0e0e0]/30 !border-[1px] rounded-2xl p-2">
                                      <input
                                        type="text"
                                        placeholder="Search for articles"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-[70%] lg:w-auto flex-1 border-0 text-base text-white focus:outline-none placeholder:muted-color"
                                      />
                                      <Button type="submit" variant="primary" className="w-[30%] lg:w-auto flex items-center justify-center">
                                        <Search className="w-4 h-4 mr-2" />
                                        Search
                                      </Button>
                                    </div>
                                  </form>
                    </div>
                </div>
            </section>
  )
}

export default BlogHero