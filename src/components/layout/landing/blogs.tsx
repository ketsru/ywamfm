export default function BlogSection () {
  return (
    <>
      <div className="relative z-10 bg-teal-800 py-16 md:py-20">
        <div className="bg-teal-900 bg-opacity-60 rounded-3xl mx-4 md:mx-8 lg:mx-12 py-12 md:py-16 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            {/* Podcast & Stories Badge */}
            <div className="flex justify-center mb-8">
              <div className="bg-teal-700 px-6 py-2 rounded-full">
                <span className="text-white text-sm font-medium">Nos nouvelles</span>
              </div>
            </div>

            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed max-w-5xl mx-auto">
                Latest{' '}
                <span className="text-green-400 italic font-script" style={{fontFamily: 'cursive'}}>
                  podcast
                </span>{' '}
                episodes and{' '}
                <span className="text-green-400 italic font-script" style={{fontFamily: 'cursive'}}>
                  stories
                </span>
              </h2>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
              {/* Story 1 - A Nation Transformed */}
              <div className="group cursor-pointer">
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="A Nation Transformed"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">Story</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                    A Nation Transformed through the Gospel
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    But as the team packed up to leave, a sudden panic swept over Ali. The Lightstream was gone.
                  </p>
                  <button className="text-teal-300 hover:text-white text-sm font-medium underline decoration-1 underline-offset-2 hover:no-underline transition-all">
                    Read more
                  </button>
                </div>
              </div>

              {/* Podcast - Holy Ambition */}
              <div className="group cursor-pointer">
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Holy Ambition Podcast"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">Podcast</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs font-medium">EPISODE 04</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                    Holy Ambition and God-Sized Dreams
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    In this season's final episode, we dive deep into what it means to go after God-sized dreams and live with supernatural faith.
                  </p>
                  <button className="text-teal-300 hover:text-white text-sm font-medium underline decoration-1 underline-offset-2 hover:no-underline transition-all">
                    Watch now
                  </button>
                </div>
              </div>

              {/* Story 2 - How It All Started */}
              <div className="group cursor-pointer">
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="How It All Started"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">Story</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                    How It All Started
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    Renew traces its roots deep into the Amazon jungle...
                  </p>
                  <button className="text-teal-300 hover:text-white text-sm font-medium underline decoration-1 underline-offset-2 hover:no-underline transition-all">
                    Read more
                  </button>
                </div>
              </div>
            </div>

            {/* See More Button */}
            <div className="text-center">
              <button className="bg-white text-teal-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                See More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}