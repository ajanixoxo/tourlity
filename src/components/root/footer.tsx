/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-global-9 py-14">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14">
        <div className="w-full bg-global-8 rounded-[32px] px-4 sm:px-6 lg:px-10 py-10 sm:py-12 lg:py-14">
          <div className="flex flex-col gap-6 lg:gap-10">
            {/* Main Footer Content */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-10 mr-0 lg:mr-10">
              {/* Brand Section */}
              <div className="flex flex-col gap-2 w-full lg:w-[34%]">
                <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-lobster font-normal leading-[30px] sm:leading-[35px] lg:leading-[40px] text-header-1">
                  Tourlity
                </h2>
                <p className="text-sm font-inter font-normal leading-5 text-global-2 w-full">
                  Connecting travelers with authentic local experiences around the world. Our platform brings together passionate hosts and curious explorers.
                </p>
                
                {/* Social Icons */}
                <div className="flex items-center gap-2 mt-4">
                  <button 
                    className="w-10 h-10 bg-header-2 rounded-[20px] p-3 hover:bg-header-1 transition-colors duration-200"
                    aria-label="Social media link"
                  >
                    <img src="/images/img_social_icons.svg" alt="Social icon" className="w-4 h-4" />
                  </button>
                  <button 
                    className="w-10 h-10 bg-header-2 rounded-[20px] p-3 hover:bg-header-1 transition-colors duration-200"
                    aria-label="Social media link"
                  >
                    <img src="/images/img_social_icons_gray_700.svg" alt="Social icon" className="w-4 h-4" />
                  </button>
                  <button 
                    className="w-10 h-10 bg-header-2 rounded-[20px] p-2.5 hover:bg-header-1 transition-colors duration-200"
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
                  <div className="flex flex-col gap-2">
                    <a href="#" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                      Virtual Tours
                    </a>
                    <a href="#" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                      Categories
                    </a>
                    <a href="#" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                      Destinations
                    </a>
                  </div>
                </div>

                {/* Quick Links Section */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-plus-jakarta font-semibold leading-[20px] sm:leading-[23px] lg:leading-[26px] text-global-1">
                    Quick Links
                  </h3>
                  <div className="flex flex-col gap-2">
                    <a href="#" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                      Become a Host
                    </a>
                    <a href="#" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                      About
                    </a>
                    <a href="#" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                      Blogs
                    </a>
                  </div>
                </div>

                {/* Support Section */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-plus-jakarta font-semibold leading-[20px] sm:leading-[23px] lg:leading-[26px] text-global-1">
                    Support
                  </h3>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <a href="#" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                        FAQs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                  <a href="#" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                    Guidelines
                  </a>
                </div>

                {/* Legal Section */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-plus-jakarta font-semibold leading-[20px] sm:leading-[23px] lg:leading-[26px] text-global-1">
                    Legal
                  </h3>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <a href="#" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm font-inter font-normal leading-[17px] text-global-2 hover:text-header-1 transition-colors duration-200">
                        Cookie Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
              <p className="text-sm font-inter font-normal leading-[17px] text-global-2 text-center sm:text-left">
                © 2025 Tourlity. All Rights Reserved
              </p>
              <div className="w-full sm:w-[28%] max-w-[316px]">
                <img 
                  src="/images/img_tourlity.png" 
                  alt="Tourlity brand image" 
                  className="w-full h-auto max-h-[120px] sm:max-h-[150px] lg:max-h-[188px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;