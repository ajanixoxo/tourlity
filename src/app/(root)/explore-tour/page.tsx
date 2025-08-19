
import ExploreToursHero  from "@/components/explore-tour/explore-tours-hero"
import ToursFiltersAndGrid from "@/components/explore-tour/tours-filter-and-grid"

export default function ExploreToursPage() {
  return (
    <div className="flex flex-col gap-9">
     
        <ExploreToursHero />
        <ToursFiltersAndGrid />
    
     
    </div>
  )
}
