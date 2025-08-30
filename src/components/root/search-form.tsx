
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image'
import Button from './button';

interface SearchExperiencesProps {
  onSearch?: (data: { destination: string; category: string; date: string }) => void;
}

const SearchExperiences: React.FC<SearchExperiencesProps> = ({ onSearch }) => {
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const categories = [
    'Adventure',
    'Culture',
    'Food & Drink',
    'Nature',
    'History',
    'Art & Music',
    'Sports',
    'Photography'
  ];

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ destination, category, date });
    }
  };

  return (
    <div className="bg-[#1e050566] rounded-2xl p-3 w-full max-w-6xl mx-auto mb-2">

      <div className="flex flex-col lg:flex-row gap-3 justify-center lg:items-end items-center w-full">
        {/* Destination Input */}
        <div className="flex flex-col gap-2.5 justify-center items-start w-full lg:flex-1">
          <label className="text-sm font-inter font-medium leading-[17px] text-white">
            Where do you want to go too?
          </label>
          <div className='w-full flex relative justify-center items-center'>
            <div
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"

            >
              <Image
                src='/images/img_location05.svg'
                alt="Calendar icon"
                className="w-4 h-4 sm:w-5 sm:h-5"
                width={16}
                height={16}
              />
            </div>

            <input
              type="text"
              placeholder="Destination of your choice"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full lg:w-full pl-10 pr-4 py-3 bg-[#1f1f1f3d] text-white placeholder-[#A0A0A0] rounded-xl border border-[#e0e0e066] focus:outline-none
          focus:ring-2
          focus:ring-[#f26457]
          focus:border-transparent text-[12px]"
            />
          </div>

        </div>
        {/* Separator */}
        <div className="hidden lg:block w-[1px] h-[86px] bg-[#ffffff7a] self-center" />
        {/* Category Dropdown */}

        <div className="flex flex-col gap-2.5 justify-start items-start w-full lg:w-auto">

          <label className="text-sm font-inter font-medium leading-[17px] text-white">
            Category
          </label>
          <div className='flex w-full relative justify-center items-center'>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Image
                src='/images/img_dashboard_square_01.svg'
                alt="Calendar icon"
                className="w-4 h-4 sm:w-5 sm:h-5"
                width={16}
                height={16}
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full lg:w-full pl-10 pr-8 py-3 bg-[#1f1f1f3d] text-[#A0A0A0] rounded-xl border border-[#e0e0e066] focus:outline-none
          focus:ring-2
          focus:ring-[#f26457]
          focus:border-transparent appearance-none cursor-pointer text-[12px]"
            >
              <option value="" className="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="!text-white ">
                  {cat}
                </option>
              ))}
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

        </div>
        {/* Separator */}

        <div className="hidden lg:block w-[1px] h-[86px] bg-[#e0e0e06b] self-center" />

        {/* Date Picker */}
        <div className="flex flex-col gap-2.5 justify-center items-start w-full lg:flex-1">
          <label className="text-sm font-inter font-medium leading-[17px] text-white">
            Preferred Date
          </label>
          <div className='w-full flex relative justify-center items-center'>
            <div
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"

            >
              <Image
                src='/images/img_calendar02.svg'
                alt="Calendar icon"
                className="w-4 h-4 sm:w-5 sm:h-5"
                width={16}
                height={16}
              />
            </div>

            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => (e.currentTarget.type = "text")}
              placeholder="Preferred date of your choice"
              className="w-full lg:w-full pl-10 pr-4 py-3 bg-[#1f1f1f3d] text-white placeholder-[#A0A0A0] rounded-xl border border-[#e0e0e066] focus:outline-none
          focus:ring-2
          focus:ring-[#f26457]
          focus:border-transparent [color-scheme:dark] text-[12px]"
            />
          </div>

        </div>
        {/* Search Button */}
        <Button
          variant='primary'
          onClick={handleSearch}
          className="flex items-center w-full lg:w-auto justify-center gap-2 !border-0 font-medium rounded-xl transition-colors duration-200"
        >
          <Search className="h-5 w-5" />
          <span className="hidden sm:inline">Search Experiences</span>
          <span className="sm:hidden">Search Experiences</span>
        </Button>
      </div>

    </div>
  );
};

export default SearchExperiences;