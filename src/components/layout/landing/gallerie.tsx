export default function LandingPageGallerie () {
    return (
        <>
            <div className="relative z-10 bg-teal-900 py-8 md:py-16 rounded-b-4xl">
                <div className="bg-white rounded-3xl mx-4 md:mx-8 lg:mx-12 py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-8 lg:px-12">
                    {/* Equipment Badge */}
                    <div className="flex justify-center mb-4">
                    <div className="bg-gray-200 px-6 py-2 rounded-full">
                        <span className="text-gray-600 text-xs font-medium">Equipment</span>
                    </div>
                    </div>

                    {/* Section Title */}
                    <div className="text-center mb-6">
                    <h2 className="text-teal-700 text-3xl md:text-4xl lg:text-5xl font-light max-w-5xl mx-auto">
                        Tools to help you share the Gospel{' '}
                        <span className="text-green-400 italic font-script" style={{fontFamily: 'cursive'}}>
                        anywhere
                        </span>{' '}
                        in the world.
                    </h2>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
                    <button className="bg-teal-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-800 transition-colors min-w-[180px]">
                        View All Equipment
                    </button>
                    <button className="bg-transparent border-2 border-teal-700 text-teal-700 px-8 py-3 rounded-full font-semibold hover:bg-teal-700 hover:text-white transition-colors min-w-[150px]">
                        Get Equipment
                    </button>
                    </div>

                    {/* Equipment Carousel */}
                    <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Vista 500 */}
                        <div className="group cursor-pointer">
                        <div className="bg-gray-100 rounded-2xl p-8 mb-4 aspect-square flex items-center justify-center overflow-hidden hover:bg-gray-50 transition-colors">
                            <div className="relative w-full h-full flex items-center justify-center">
                            <img 
                                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                                alt="Vista 500 Equipment"
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">Vista 500</h3>
                            <p className="text-gray-600 text-sm">Video Projectors</p>
                        </div>
                        </div>

                        {/* Vista 1000 */}
                        <div className="group cursor-pointer">
                        <div className="bg-gray-100 rounded-2xl p-8 mb-4 aspect-square flex items-center justify-center overflow-hidden hover:bg-gray-50 transition-colors">
                            <div className="relative w-full h-full flex items-center justify-center">
                            <img 
                                src="https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                                alt="Vista 1000 Equipment"
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">Vista 1000</h3>
                            <p className="text-gray-600 text-sm">Video Projectors</p>
                        </div>
                        </div>

                        {/* LightStream */}
                        <div className="group cursor-pointer">
                        <div className="bg-gray-100 rounded-2xl p-8 mb-4 aspect-square flex items-center justify-center overflow-hidden hover:bg-gray-50 transition-colors">
                            <div className="relative w-full h-full flex items-center justify-center">
                            <img 
                                src="https://images.unsplash.com/photo-1591652337371-8f404c61f70c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                                alt="LightStream Equipment"
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">LightStream</h3>
                            <p className="text-gray-600 text-sm">LightStreams</p>
                        </div>
                        </div>
                    </div>

                    {/* Carousel Navigation */}
                    <div className="flex justify-between items-center mt-8">
                        {/* Dots Indicator */}
                        <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex space-x-2">
                        <button className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-teal-700 hover:text-teal-700 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-teal-700 hover:text-teal-700 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}