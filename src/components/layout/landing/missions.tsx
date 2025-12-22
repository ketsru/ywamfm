export default function Mission () {
    return (
        <>
            <div className="relative z-10 bg-teal-800 py-16 md:py-24">
                <div className="container mx-auto">
                    {/* Our Mission Badge */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-teal-700 px-6 py-2 rounded-full">
                        <span className="text-white text-sm font-medium">Our Mission</span>
                        </div>
                    </div>

                    {/* Mission Statement */}
                    <div className="text-center mb-16">
                        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed max-w-6xl mx-auto">
                        Renew empowers others to spread God's Word to{' '}
                        <span className="text-green-400 italic font-script" style={{fontFamily: 'cursive'}}>
                            every corner
                        </span>{' '}
                        of the globe through...
                        </h2>
                    </div>

                    {/* Three Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {/* Equipment Card */}
                        <div className="group relative bg-black rounded-2xl overflow-hidden aspect-[4/5] hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`
                            }}
                        />
                        <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                            <h3 className="text-2xl font-bold mb-2">Equipment</h3>
                            <p className="text-gray-300 mb-6 text-sm">Tools to help you share the Gospel</p>
                            <div className="flex justify-end">
                            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* Projects Card */}
                    <div className="group relative bg-black rounded-2xl overflow-hidden aspect-[4/5] hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`
                        }}
                    />
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">Projects</h3>
                        <p className="text-gray-300 mb-6 text-sm">Programs and innovative initiatives</p>
                        <div className="flex justify-end">
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Stories Card */}
                    <div className="group relative bg-black rounded-2xl overflow-hidden aspect-[4/5] hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`
                        }}
                    />
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">Stories</h3>
                        <p className="text-gray-300 mb-6 text-sm">Sharing what God is doing in the nations</p>
                        <div className="flex justify-end">
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}