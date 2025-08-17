import React from 'react'
import HeroSection  from '@/components/landing/hero-section'
import HowTourlityWorks from '@/components/landing/how-tourlity-works'
import ExploreCategory from '@/components/landing/explore-category'
import FeaturedExperience from '@/components/landing/featured-experience'
import PopularDestination from '@/components/landing/popular-destination'
import TopHost from '@/components/landing/top-host'
import CTA from '@/components/landing/cta'
import SharePassion from '@/components/landing/share-passion'
import Reviews from '@/components/landing/review'

function Home() {
  return (
    <div>
      <HeroSection/>
      <HowTourlityWorks/>
      <ExploreCategory />
      <FeaturedExperience />
      <PopularDestination />
      <TopHost />
      <SharePassion/>
      <Reviews/>
      <CTA />
      
    </div>
  )
}

export default Home