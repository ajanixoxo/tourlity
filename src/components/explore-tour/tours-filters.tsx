"use client"

// import { useState } from "react"
import Button from "../root/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import type { SearchFilters } from "@/types"
import { categories } from "@/data/categories"

interface ToursFiltersProps {
    filters: SearchFilters
    onFiltersChange: (filters: SearchFilters) => void
}

export default function ToursFilters({ filters, onFiltersChange }: ToursFiltersProps) {
    // const [isExpanded, setIsExpanded] = useState(true)

    const handlePriceRangeChange = (value: number[]) => {
        onFiltersChange({
            ...filters,
            priceRange: [value[0], value[1]],
        })
    }

    const handleCategoryChange = (categoryName: string, checked: boolean) => {
        const newCategories = checked
            ? [...filters.categories, categoryName]
            : filters.categories.filter((cat) => cat !== categoryName)

        onFiltersChange({
            ...filters,
            categories: newCategories,
        })
    }

    const handleDurationChange = (duration: string, checked: boolean) => {
        onFiltersChange({
            ...filters,
            duration: checked ? duration : "",
        })
    }

    const handleGroupSizeChange = (groupSize: string, checked: boolean) => {
        onFiltersChange({
            ...filters,
            groupSize: checked ? groupSize : "",
        })
    }

    const handleLanguageChange = (language: string, checked: boolean) => {
        onFiltersChange({
            ...filters,
            language: checked ? language : "",
        })
    }

    const resetFilters = () => {
        onFiltersChange({
            query: "",
            priceRange: [0, 200],
            categories: [],
            duration: "",
            groupSize: "",
            language: "",
        })
    }

    const durations = ["Under 3 hours", "3-4 hours", "4-8 hours", "Full day"]
    const groupSizes = ["1-5 people", "6-10 people", "11-20 people", "20+ people"]
    const languages = ["All", "English", "Spanish", "French", "German", "Japanese"]

    return (
        <div className="box-color rounded-lg shadow-sm p-6 sticky top-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Filters</h2>

            </div>

            {/* Price Range */}
            <div className="mb-8 ">

                <h3 className="font-medium text-gray-900 mb-4">Price Range</h3>
                <div className="mb-2 flex items-center justify-center gap-2">
                    <input type="number" className="w-1/2 stroke-color p-2 rounded-3xl placeholder:muted-color" placeholder="Min Price" />
                    <span className="secondary-text-color">to</span>
                    <input type="number" className="w-1/2 stroke-color p-2 rounded-3xl placeholder:muted-color" placeholder="Max Price" />
                </div>

                <div className="px-2 mt-3">
                    <Slider
                        value={filters.priceRange}
                        onValueChange={handlePriceRangeChange}
                        max={200}
                        min={0}
                        step={5}
                        className="mb-4 "
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Min Price</span>
                        <span>Max Price</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                    </div>
                </div>
            </div>
            {/* SEPERATOR */}
            <div className="mb-2">
                <svg width={245} height={1} viewBox="0 0 245 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.5" y1="0.5" x2="244.5" y2="0.5" stroke="#E0E0E0" strokeOpacity="0.7" strokeLinecap="round" />
                </svg>
            </div>

            {/* Categories */}
            <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">By Categories</h3>
                <div className="space-y-3">
                    {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`category-${category.id}`}
                                checked={filters.categories.includes(category.name)}
                                onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
                                className="focus:bg-primary-color custom-checkbox"
                            />
                            <Label htmlFor={`category-${category.id}`} className="text-sm text-gray-700">
                                {category.name}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-2">
                <svg width={245} height={1} viewBox="0 0 245 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.5" y1="0.5" x2="244.5" y2="0.5" stroke="#E0E0E0" strokeOpacity="0.7" strokeLinecap="round" />
                </svg>
            </div>

            {/* Duration */}
            <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Duration</h3>
                <div className="space-y-3">
                    {durations.map((duration) => (
                        <div key={duration} className="flex items-center space-x-2">
                            <Checkbox
                                id={`duration-${duration}`}
                                checked={filters.duration === duration}
                                onCheckedChange={(checked) => handleDurationChange(duration, checked as boolean)}
                                className="rounded-full custom-checkbox"
                            />
                            <Label htmlFor={`duration-${duration}`} className="text-sm text-gray-700">
                                {duration}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-2">
                <svg width={245} height={1} viewBox="0 0 245 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.5" y1="0.5" x2="244.5" y2="0.5" stroke="#E0E0E0" strokeOpacity="0.7" strokeLinecap="round" />
                </svg>
            </div>

            {/* Group Size */}
            <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Group Size</h3>
                <div className="space-y-3">
                    {groupSizes.map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                            <Checkbox
                                id={`group-${size}`}
                                checked={filters.groupSize === size}
                                onCheckedChange={(checked) => handleGroupSizeChange(size, checked as boolean)}
                                className="rounded-full custom-checkbox"
                            />
                            <Label htmlFor={`group-${size}`} className="text-sm text-gray-700">
                                {size}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-2">
                <svg width={245} height={1} viewBox="0 0 245 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.5" y1="0.5" x2="244.5" y2="0.5" stroke="#E0E0E0" strokeOpacity="0.7" strokeLinecap="round" />
                </svg>
            </div>

            {/* Language */}
            <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Language</h3>
                <div className="space-y-3">
                    {languages.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                            <Checkbox
                                id={`language-${language}`}
                                checked={filters.language === language}
                                onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                                className="rounded-full custom-checkbox"
                            />
                            <Label htmlFor={`language-${language}`} className="text-sm text-gray-700">
                                {language}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <svg width={245} height={1} viewBox="0 0 245 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.5" y1="0.5" x2="244.5" y2="0.5" stroke="#E0E0E0" strokeOpacity="0.7" strokeLinecap="round" />
                </svg>
            </div>
            {/* Tour Type */}
            <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Tour Type</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="tour-all" className="rounded-full custom-checkbox" />
                        <Label htmlFor="tour-all" className="text-sm text-gray-700">
                            All
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="tour-virtual" className="rounded-full custom-checkbox" />
                        <Label htmlFor="tour-virtual" className="text-sm text-gray-700">
                            Virtual
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="tour-in-person" className="rounded-full custom-checkbox" />
                        <Label htmlFor="tour-in-person" className="text-sm text-gray-700">
                            In-person
                        </Label>
                    </div>
                </div>
            </div>
            <div className="flex w-max justify-center items-center gap-2">
                <Button variant="primary" className="w-max">Apply Filters</Button>
                <Button variant="secondary" onClick={resetFilters} className="w-max ">
                    Reset Filters
                </Button>
            </div>

        </div>
    )
}
