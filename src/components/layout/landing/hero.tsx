export default function Hero () {
    return (
        <>
            <div className="relative z-10 flex items-center justify-center min-h-[40vh] px-4">
                <div className="text-center text-white max-w-4xl mx-auto">
                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                        Partagez l'Évangile
                    </h1>
                    
                    {/* Subheading with green italic text */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-light mb-12">
                        <span className="text-green-400 italic font-script" style={{fontFamily: 'cursive'}}>
                            Partout
                        </span>
                    </h2>

                    {/* Call-to-Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <button className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors min-w-[160px]">
                            Toutes les formations
                        </button>
                        <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-colors min-w-[160px]">
                            Nos missions
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}