
export default function NewsletterSection () {
  return (
    <>
      <div className="relative z-10 bg-teal-800 py-8 md:py-16">
        <div className="bg-white rounded-3xl mx-4 md:mx-8 lg:mx-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Content */}
            <div className="p-8 md:p-12 lg:p-16">
              {/* Subscribe Badge */}
              <div className="mb-6">
                <div className="bg-gray-200 px-4 py-2 rounded-full inline-block">
                  <span className="text-gray-600 text-sm font-medium">Abonnement</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-teal-700 text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-6">
                Restez{' '}
                <span className="text-green-400 italic font-script" style={{fontFamily: 'cursive'}}>
                  informé
                </span>
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg mb-1 leading-relaxed">
                Vous souhaitez recevoir nos dernières nouvelles sur la mission ?
              </p>

              <p className="text-gray-700 font-medium mb-8">
                Inscrivez-vous ci-dessous et rejoignez la communauté
              </p>

              {/* Email Form */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Entrer votre email..."
                  className="flex-1 px-6 py-4 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 placeholder-gray-500"
                />
                <button type="submit" className="bg-teal-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-800 transition-colors whitespace-nowrap cursor-pointer">
                  S'abonner
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-64 lg:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Two women in traditional clothing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}