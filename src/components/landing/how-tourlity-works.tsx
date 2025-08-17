import React from "react";
import Image from "next/image";
import Button from "../root/button"; // ✅ adjust this import to where your Button is located

function HowTourlityWorks() {
  return (
    <section className="w-full bg-global-9 py-14">
      <div className="w-full max-w-[1168px] mx-auto px-4 sm:px-6 lg:px-14">
        <div className="flex flex-col gap-9 justify-start items-center w-full">
          {/* Section Header */}
          <div className="flex flex-col gap-3 justify-start items-center w-auto px-5">
            <h2 className="text-[32px] sm:text-[37px] lg:text-[42px] font-plus-jakarta font-bold leading-[40px] sm:leading-[47px] lg:leading-[53px] text-center text-global-1">
              How Tourlity Works
            </h2>
            <p className="text-sm font-inter font-normal leading-[17px] text-center text-global-2">
              The easiest way to book local experiences.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            {[
              {
                title: "Discover and Explore",
                description:
                  "Browse a world of tours by category, interest, or what's trending. Find virtual or in-person adventures.",
                image: "/images/img_phone_mock_1.png",
                icon: "/images/img_search_gray_100.svg",
              },
              {
                title: "Connect and Customize",
                description:
                  "Chat with hosts, negotiate terms, and tailor your experience. It's your tour, your way.",
                image: "/images/img_phone_mock_1.png",
                icon: "/images/img_user_switch.svg",
              },
              {
                title: "Book and Experience",
                description:
                  "Securely book your tour and get ready for an unforgettable experience, live-streamed or on the ground.",
                image: "/images/img_phone_mock_1.png",
                icon: "/images/img_book_edit.svg",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col justify-start items-center w-full lg:w-[376px] bg-global-8 rounded-[18px] p-7 sm:p-11"
              >
                <div className="flex flex-col justify-start items-center w-full gap-9 mt-9">
                  {/* Phone Mockup with Icon */}
                  <div className="flex flex-col justify-start items-center w-full">
                    <div className="flex justify-center items-center w-full max-w-[244px] relative">
                      <div className="flex flex-col justify-center items-end w-full">
                        <Image
                          src={step.image}
                          alt="Phone mockup"
                          width={216}
                          height={254}
                          className="w-full max-w-[216px] h-auto ml-3.5"
                        />
                      </div>
                      <button className="absolute bottom-2 right-0 w-10 h-10 bg-[#f26457] rounded-[20px] p-3 -ml-7.5 mb-2">
                        <Image
                          src={step.icon}
                          alt="Step icon"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                    <Image
                      src="/images/img_blur.svg"
                      alt="Blur effect"
                      width={312}
                      height={72}
                      className="w-full max-w-[312px] h-auto -mt-10.5"
                    />
                  </div>

                  {/* Step Content */}
                  <div className="flex flex-col gap-2.5 justify-start items-center w-full px-2">
                    <div className="flex flex-col gap-1 justify-center items-center w-full">
                      <h3 className="text-[20px] sm:text-[24px] font-plus-jakarta font-semibold leading-[26px] sm:leading-[31px] text-center text-global-1">
                        {step.title}
                      </h3>
                      <p className="text-sm font-inter font-normal leading-[22px] text-center text-global-2 w-full">
                        {step.description}
                      </p>
                    </div>
                    <Button className="bg-[#f26457] text-[#f5f5f4] border border-[#ca3f33] rounded-[14px] px-4 py-2.5 shadow-[0px_7px_25px_#3e3e3e19] w-full max-w-[240px]">
                      Get Started for Free
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowTourlityWorks;
