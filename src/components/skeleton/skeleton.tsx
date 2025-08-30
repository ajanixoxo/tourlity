import React from 'react'

function Skeleton() {
    return (
        <div className="flex h-auto ">
            <div className="w-full  p-8 rounded-lg shadow bg-white animate-pulse">
                {/* Sidebar skeleton */}
                <div className="flex">
                    <div className="w-56 mr-8">
                        <div className="h-10 bg-gray-200 rounded mb-6" />
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-8 bg-gray-200 rounded mb-4" />
                        ))}
                        <div className="h-10 bg-gray-200 rounded mt-8" />
                    </div>
                    {/* Main content skeleton */}
                    <div className="flex-1">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
                        <div className="h-48 bg-gray-200 rounded mb-6" />
                        <div className="grid grid-cols-3 gap-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-24 bg-gray-200 rounded" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skeleton