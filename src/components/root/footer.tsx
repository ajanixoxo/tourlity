/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-global-9 pt-14  mb-3">
      <div className="w-full box-color rounded-2xl relative overflow-hidden">
        <div className="w-full bg-global-8 rounded-[32px] px-4 sm:px-6 lg:px-10 pt-10 sm:pt-12 lg:pt-14">
          <div className="flex flex-col gap-6 lg:gap-10">
            {/* Main Footer Content */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-10 mr-0 lg:mr-10">
              {/* Brand Section */}
              <div className="flex flex-col gap-2 w-full lg:w-[34%]">
                <Link href="/" className='flex items-end justify-end'>
                  <img src={"/images/logo/logo.svg"} alt="" className='w-10' />
                  <h1 className='lobster !text-3xl'>Tourlity</h1>
                </Link>
                <p className="text-sm font-inter description font-normal leading-5 text-global-2 w-full">
                  Connecting travelers with authentic local experiences around the world. Our platform brings together passionate hosts and curious explorers.
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    className="w-10 bg-button-1 rounded-full h-10 bg-header-2  p-3 hover:bg-header-1 transition-colors duration-200"
                    aria-label="Social media link"
                  >
                    <img src="/images/img_social_icons.svg" alt="Social icon" className="w-4 h-4" />
                  </button>
                  <button
                    className="w-10 h-10 bg-button-1 rounded-full bg-header-2  p-3 hover:bg-header-1 transition-colors duration-200"
                    aria-label="Social media link"
                  >
                    <img src="/images/img_social_icons_gray_700.svg" alt="Social icon" className="w-4 h-4" />
                  </button>
                  <button
                    className="w-10 h-10 bg-header-2 bg-button-1 rounded-full p-2.5 hover:bg-header-1 transition-colors duration-200"
                    aria-label="Social media link"
                  >
                    <img src="/images/img_vector.svg" alt="Social icon" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Sections */}
              <div className="flex flex-col sm:flex-row lg:flex-row gap-8 sm:gap-12 lg:gap-16 w-full lg:w-auto">
                {/* Explore Section */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-plus-jakarta font-semibold leading-[20px] sm:leading-[23px] lg:leading-[26px] text-global-1">
                    Explore
                  </h3>
                  <div className="flex flex-col gap-2 description">
                    <Link href="/explore-tour" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                      Virtual Tours
                    </Link>
                    <Link href="/categories" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                      Categories
                    </Link>
                    <Link href="/destinations" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                      Destinations
                    </Link>
                  </div>
                </div>

                {/* Quick Links Section */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-plus-jakarta font-semibold leading-[20px] sm:leading-[23px] lg:leading-[26px] text-global-1">
                    Quick Links
                  </h3>
                  <div className="flex flex-col gap-2 description">
                    <Link href="/become-a-host" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                      Become a Host
                    </Link>
                    <Link href="/about" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                      About
                    </Link>
                    <Link href="/blog" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                      Blogs
                    </Link>
                  </div>
                </div>

                {/* Support Section */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-plus-jakarta font-semibold leading-[20px] sm:leading-[23px] lg:leading-[26px] text-global-1">
                    Support
                  </h3>
                  <ul className="flex flex-col gap-2 description">
                    <li>
                      <Link href="/faqs" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                  <Link href="/guidelines" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                    Guidelines
                  </Link>
                </div>

                {/* Legal Section */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-plus-jakarta font-semibold leading-[20px] sm:leading-[23px] lg:leading-[26px] text-global-1">
                    Legal
                  </h3>
                  <ul className="flex flex-col gap-2 description">
                    <li>
                      <Link href="/terms-of-service" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link href="/policy" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/cookies" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                        Cookie Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col mt-16 sm:flex-row justify-between  gap-4 sm:gap-8">
              <p className="text-sm relative -top-10 lg:top-0 description font-inter font-normal leading-[17px] text-global-2  sm:text-left">
                © 2025 Tourlity. All Rights Reserved
              </p>
            </div>
          </div>
        </div>

        {/* Positioned Image - moved outside the inner container but inside box-color container */}
        <div className="absolute bottom-0 -rotate-30 lg:rotate-0 right-0 w-[40%] sm:w-[35%] lg:w-[30%] max-w-[316px] transform translate-y-[20%] translate-x-[0%]">
          <img
            src="/images/img_tourlity.png"
            alt="Tourlity brand image"
            className="w-full h-auto max-h-[120px] sm:max-h-[150px] lg:max-h-[188px] object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;