import React from 'react'
import { testimonials } from '@/data/testimonial';
import Image from 'next/image';
import Star from '../root/start';
function Reviews() {


    return (
        <section className="w-full bg-global-9 py-14">
            <div className="w-full">
                <div className="flex flex-col gap-9 justify-start items-center w-full">
                    {/* Section Header */}
                    <div className="flex flex-col gap-3 justify-start items-start w-full">
                        <h2 className="text-[32px] sm:text-[37px] lg:text-[42px] font-plus-jakarta font-bold leading-[40px] sm:leading-[47px] lg:leading-[53px] text-left text-global-1">
                            What Our Guests Say
                        </h2>
                        <p className="text-sm font-inter description font-normal leading-[17px] text-left text-global-2">
                            Hear from travelers who have created unforgettable moments with our hosts.
                        </p>
                    </div>
                    {/* Testimonials Grid */}
                    <div className="flex flex-col lg:flex-row gap-6 w-full justify-between">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="flex box-color flex-row justify-start items-center w-full lg:w-[400px] bg-global-8 rounded-[18px] p-6">
                                <div className="flex flex-col gap-3 justify-start items-center w-full">
                                    <div className="flex justify-start items-center w-full">
                                        {/* <StarRating rating={testimonial.rating} /> */}
                                        {Array.from({ length: testimonial.rating }, (_, index) => (
                                            <Star key={index} />
                                        ))}

                                    </div>
                                    <div className="flex flex-col gap-1.5 justify-start items-start w-full">
                                        <p className="text-sm description font-inter font-normal leading-[22px] text-left text-global-2 w-[92%]">
                                            &quot;{testimonial.comment}&quot;
                                        </p>
                                        <div className="flex gap-2.5 justify-start items-center w-full">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                width={46}
                                                height={46}
                                                className="rounded-full object-cover"
                                            />
                                            <div className="flex flex-col gap-1 justify-center items-start w-full">
                                                <h4 className="text-base font-plus-jakarta font-semibold leading-[21px] text-left text-global-1">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-xs description font-inter font-normal leading-[15px] text-left text-global-2">
                                                    {testimonial.country}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Reviews