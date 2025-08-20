import React from 'react'
import Button from '../root/button'

function GudilinesContent() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6 ">
            {/* Host Guidelines */}
            <div className="box-color rounded-xl shadow-sm p-6 max-w-lg text-center">
                <h2 className="text-[24px] font-plus-jakarta font-semibold mb-2">Host Guidelines</h2>
                <p className="secondary-text-color mb-4">
                    Learn about best practices for listing your experiences, communicating
                    with guests, ensuring safety, and providing outstanding hospitality.
                </p>
                <Button variant='primary' className="">
                    View Host Guidelines
                </Button>
            </div>

            {/* Guest Guidelines */}
            <div className="box-color rounded-xl shadow-sm p-6 max-w-lg text-center">
                <h2 className="text-[24px] font-plus-jakarta font-semibold mb-2">Guest Guidelines</h2>
                <p className="secondary-text-color mb-4">
                    Understand how to interact respectfully with hosts, prepare for your
                    tour, manage bookings, and make the most of your Tourlify adventures.
                </p>
                <Button variant='secondary' className="!bg-white">
                    View Guest Guidelines
                </Button>
            </div>
        </div>
    )
}

export default GudilinesContent