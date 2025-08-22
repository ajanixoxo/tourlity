/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react";
import Button from "../root/button"
import Star from "../root/start";
export function BecomeHostContent() {
    const [input1, setInput1] = useState('');

    const onChangeInput1 = (value: string) => {
        setInput1(value);
    };
    const benefits = [
        {
            icon: <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5 21C21.2284 21.2035 20.9288 21.3807 20.6062 21.5273C19.5659 22 18.1917 22 15.4432 22H9.55683C6.80834 22 5.4341 22 4.39382 21.5273C4.07124 21.3807 3.77158 21.2035 3.5 21" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2.5 10C2.5 6.46252 2.5 4.69377 3.5528 3.5129C3.72119 3.32403 3.90678 3.14935 4.10746 2.99087C5.36213 2 7.24142 2 11 2H14C17.7586 2 19.6379 2 20.8925 2.99087C21.0932 3.14935 21.2788 3.32403 21.4472 3.5129C22.5 4.69377 22.5 6.46252 22.5 10C22.5 13.5375 22.5 15.3062 21.4472 16.4871C21.2788 16.676 21.0932 16.8506 20.8925 17.0091C19.6379 18 17.7586 18 14 18H11C7.24142 18 5.36213 18 4.10746 17.0091C3.90678 16.8506 3.72119 16.676 3.5528 16.4871C2.5 15.3062 2.5 13.5375 2.5 10Z" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 10H18.991" stroke="#F26457" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 10H5.99102" stroke="#F26457" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.051 10C15.051 11.3807 13.9317 12.5 12.551 12.5C11.1703 12.5 10.051 11.3807 10.051 10C10.051 8.61929 11.1703 7.5 12.551 7.5C13.9317 7.5 15.051 8.61929 15.051 10Z" stroke="#F26457" strokeWidth="1.5" />
            </svg>
            ,
            title: "Earn Extra Income",
            description: "Set your own prices and schedule. Turn your passion into a profitable venture while maintaining flexibility.",
        },
        {
            icon: <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 19L13 22" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 22H15" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx={7} cy={7} r={7} transform="matrix(-1 0 0 1 21 2)" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 4C9.65431 4.0385 9.99236 4.35899 10.5735 4.97301C11.6231 6.08206 12.6727 6.1746 13.3724 5.80492C14.422 5.2504 13.54 4.35221 14.7719 3.86409C15.5748 3.54595 15.6868 2.68026 15.2399 2" stroke="#F26457" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M20.5 10C19 10 18.7338 11.2468 17.5 11C15 10.5 14.2916 11.0589 14.2916 12.2511C14.2916 13.4432 14.2916 13.4432 13.7717 14.3373C13.4335 14.9189 13.3153 15.5004 13.9894 16" stroke="#F26457" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M7 2C5.14864 3.79995 4 6.3082 4 9.08251C4 14.5598 8.47715 19 14 19C16.7255 19 19.1962 17.9187 21 16.165" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            ,
            title: "Global Reach",
            description: "Connect with travelers from around the world and share your unique perspective and local expertise.",
        },
        {
            icon: <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 19L13 22" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 22H15" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx={7} cy={7} r={7} transform="matrix(-1 0 0 1 21 2)" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 4C9.65431 4.0385 9.99236 4.35899 10.5735 4.97301C11.6231 6.08206 12.6727 6.1746 13.3724 5.80492C14.422 5.2504 13.54 4.35221 14.7719 3.86409C15.5748 3.54595 15.6868 2.68026 15.2399 2" stroke="#F26457" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M20.5 10C19 10 18.7338 11.2468 17.5 11C15 10.5 14.2916 11.0589 14.2916 12.2511C14.2916 13.4432 14.2916 13.4432 13.7717 14.3373C13.4335 14.9189 13.3153 15.5004 13.9894 16" stroke="#F26457" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M7 2C5.14864 3.79995 4 6.3082 4 9.08251C4 14.5598 8.47715 19 14 19C16.7255 19 19.1962 17.9187 21 16.165" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            ,
            title: "Full Support",
            description: "Get comprehensive support, insurance coverage, and tools to help you succeed as a host.",
        }

    ]

    const steps = [
        {
            step: "1",
            title: "Create Your Experience",
            description: "Design your unique experience and set your availability, group size, and pricing..",
        },
        {
            step: "2",
            title: "Get Verified",
            description: "Complete our verification process to ensure safety and quality for all users..",
        },
        {
            step: "3",
            title: "Start Hosting",
            description: "Welcome your first guests and start creating memorable experiences..",
        },

    ]
    const successStories = [
        {
            name: "Marco Rossi",
            role: "Cooking Experience Host",
            image: "/images/img_image_12.png",
            testimonial: "Sharing my family's pasta-making traditions has been incredibly rewarding. I've met amazing people from around the world and built a thriving business doing what I love.",
            rating: "4.3 (98 Reviews)",
            stars: 5,
        },
        {
            name: "Yuki Tanaka",
            role: "Tea Ceremony Host",
            image: "/images/img_image_13.png",
            testimonial: "Hosting tea ceremonies allows me to preserve and share our cultural heritage. It's wonderful to see guests discover the beauty and tranquility of this ancient practice.",
            rating: "4.8 (75 Reviews)",
            stars: 5,
        },
        {
            name: "Sofia Martinez",
            role: "Street Art Tour Host",
            image: "/images/img_image_14.png",
            testimonial: "Through my street art tours, I've been able to showcase our city's creative spirit and support local artists. Every tour brings new perspectives and connections.",
            rating: "4.9 (300 Reviews)",
            stars: 5,
        }
    ];

    const requirements = [
        {
            icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/ot4zlc5k_expires_30_days.png",
            text: "Demonstrate knowledge and enthusiasm in your experience area"
        },
        {
            icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/o7yokx8l_expires_30_days.png",
            text: "Maintain required certifications and insurance coverage"
        },
        {
            icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/f2ofbdgm_expires_30_days.png",
            text: "Responsive and clear communication with guests"
        },
        {
            icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/erpusmcf_expires_30_days.png",
            text: "Consistently deliver high-quality experiences"
        }
    ];

    return (
        <section className="py-20 ">
            <div className="">
                {/* Benefits */}
                <div className="text- mb-16 space-y-4">
                    <div>
                        <h2 className="text-3xl md:text-[42px] font-bold  mb-6">Why Host on Tourlity?</h2>
                        <p className="text-xl description">
                            Join hosts sharing experiences and connecting with travelers.
                        </p></div>


                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center p-7 lg:p-15 box-color rounded-[16px]">
                                <div className=" bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-[24px] font-semibold  mb-3">{benefit.title}</h3>
                                <p className=" leading-relaxed description ">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How it Works */}
                <div className=" rounded-2xl  mb-16">
                    <div className="mb-12">
                        <h2 className="text-3xl font-plus-jakarta md:text-[42px] font-bold  mb-6">How to Become a Host</h2>
                        <p className="text-xl description">Start sharing your experiences in three simple steps</p>
                    </div>

                    <div className="grid grid-cols-1  lg:grid-cols-3 gap-8 ">
                        {steps.map((step, index) => (
                            <div key={index} className="mt-6  box-color p-7 lg:p-10 rounded-[18px]">
                                <div className="w-12 h-12 bg-white text-primary-color rounded-full flex items-center justify-center  mb-4 text-xl font-bold">
                                    {step.step}
                                </div>
                                <h3 className="text-lg font-inter font-semibold mb-3">{step.title}</h3>
                                <p className="description leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col mb-16 items-start self-stretch  gap-10">
                    <div className="flex flex-col items-start gap-3">
                        <h2 className="text-[#1E2023] font-plus-jakarta text-[32px] lg:text-[42px] font-bold">
                            Success Stories
                        </h2>
                        <span className="description text-sm">
                            Hear from hosts sharing their passions and creating memorable experiences.
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:gird-cols-3 gap-6">
                        {successStories.map((story, index) => (
                            <div key={index} className="flex flex-1 flex-col items-start box-color p-6 gap-3 rounded-[18px]">
                                <div className="flex flex-col items-start ">
                                    <div className="flex items-center pr-0.5 mb-2.5 gap-2.5">
                                        <img
                                            src={story.image}
                                            className="w-10 h-10 object-cover"
                                            alt={story.name}
                                        />
                                        <div className="flex flex-col shrink-0 items-start gap-1">
                                            <span className="text-[#1E2023] text-sm font-bold">
                                                {story.name}
                                            </span>
                                            <span className="text-[#5A5A5A] text-xs w-32">
                                                {story.role}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-[#5A5A5A] text-sm mb-[1px]">
                                        {story.testimonial}
                                    </span>
                                </div>
                                <div className="flex items-center pr-[3px] gap-1.5">
                                    {Array.from({ length: story.stars }, (_, index) => (
                                        <Star key={index} />
                                    ))}
                                    <span className="text-[#5A5A5A] text-xs">
                                        {story.rating}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Host Requirements Section */}
                <div className="flex flex-col lg:flex-row items-center justify-center bg-[#1E4D4D] py-[90px]  px-5 lg:px-14 gap-[45px] mb-16">
                    <div className="flex flex-col shrink-0 items-start">
                        <h2 className="text-3xl md:text-[42px] font-bold text-white  mb-6">
                            Host Requirements
                        </h2>
                        <p className="description !text-white mb-3 font-light text-[14px]">
                            To ensure the best experience for everyone, we have some basic requirements for our hosts:
                        </p>
                        {requirements.map((requirement, index) => (
                            <div key={index} className="flex items-center mb-2.5 gap-2">
                                <img
                                    src={requirement.icon}
                                    className="w-6 h-6 object-fill"
                                    alt="requirement icon"
                                />
                                <span className="text-white text-sm">
                                    {requirement.text}
                                </span>
                            </div>
                        ))}
                        <Button
                            variant="primary"
                            className=" "
                        >
                            <span className="text-white text-sm font-bold w-24">
                                Become a Host
                            </span>
                        </Button>
                    </div>
                    <div className="flex-1 bg-[#00000000] h-[368px] flex justify-end  rounded-[18px]">
                        <img src="/images/host-req.png" className="h-[400px] rounded-4xl object-cover w-full" alt="" />
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="flex flex-col items-center  justify-center">
                    <div className="flex flex-col w-full gap-6">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <h1 className="font-plus-jakarta text-[32px] lg:text-[42px] font-bold ">
                                Stay Inspired
                            </h1>
                            <p className="description text-sm text-center lg:w-[421px]">
                                Subscribe to our newsletter for travel inspiration, featured experiences, and exclusive offers.
                            </p>
                        </div>
                        <div className="flex flex-col gap-auto  justify-center items-center ">
                            <div className="flex items-between gap-3 lg:w-1/2 bg-white py-1 px-4 rounded-[20px] stroke-color overflow-hidden">
                                <input
                                    placeholder="Enter your email address..."
                                    value={input1}
                                    onChange={(event) => onChangeInput1(event.target.value)}
                                    className="flex-1 min-w-0 w-1/2  border-none outline-none"
                                />

                                <Button variant="primary" className="mx-auto justify-center items-center  py-2.5 w-1/2 whitespace-nowrap flex gap-2 ">
                                    Subscribe  <span className="hidden lg:flex"> to Newsletter</span>
                                </Button>
                            </div>

                            <p className="text-sm mt-2 muted-color text-center w-full break-words text-wrap">
                                By subscribing, you agree to our Privacy Policy and consent to receive updates.
                            </p>
                        </div>

                    </div>
                </div>


            </div>
        </section>
    )
}
