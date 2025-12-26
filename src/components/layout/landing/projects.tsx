export default function ProjectSection () {
  return (
    <>
      <div className="relative z-10 bg-teal-800 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          {/* Projects Badge */}
          <div className="flex justify-start mb-8">
            <div className="bg-teal-700 px-6 py-2 rounded-full">
              <span className="text-white text-sm font-medium">Projects</span>
            </div>
          </div>

          {/* Section Title */}
          <div className="mb-8">
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed max-w-3xl">
              Exciting initiatives to advance{' '}
              <span className="text-green-400 italic font-script" style={{fontFamily: 'cursive'}}>
                the Kingdom
              </span>
            </h2>
          </div>

          {/* All Projects Button */}
          <div className="mb-12">
            <button className="bg-white bg-opacity-20 px-8 py-3 rounded-full font-semibold hover:bg-opacity-30 transition-colors backdrop-blur-sm">
              All Projects
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {/* Left Column - Ukraine (Large) */}
            <div className="lg:row-span-2">
              <div className="group relative bg-black rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-[3/4] hover:transform hover:scale-102 transition-all duration-300 cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                  }}
                />
                <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Ukraine</h3>
                  <p className="text-gray-300 mb-6 text-base">Spreading light in the middle of war-torn Ukraine</p>
                  <div className="flex justify-end">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-102 transition-transform">
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* The Rescue Project */}
              <div className="group relative bg-black rounded-2xl overflow-hidden aspect-[16/9] hover:transform hover:scale-102 transition-all duration-300 cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                  }}
                />
                <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">The Rescue Project</h3>
                  <p className="text-gray-300 mb-4 text-sm">How do you reach over 70 million Deaf?</p>
                  <div className="flex justify-end">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Peru - The Aurora Project */}
              <div className="group relative bg-black rounded-2xl overflow-hidden aspect-[16/9] hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1531968455001-5c5272a41129?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                  }}
                />
                <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Peru – The Aurora Project</h3>
                  <p className="text-gray-300 mb-4 text-sm">Equipping the Indigenous to reach the Indigenous</p>
                  <div className="flex justify-end">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
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