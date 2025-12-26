import { ArrowUpRight } from "lucide-react";

export default function PartnersSection () {
  return (
    <>
      <div className="relative z-10 bg-teal-800 py-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            {/* Row 1 */}
            <div className="bg-white rounded-2xl p-8 flex items-center justify-center h-24 hover:shadow-lg transition-shadow">
              <div className="text-red-600 font-bold text-lg">
                <span className="bg-red-600 text-white px-2 py-1 rounded mr-2">Jesus</span>
                <span className="text-red-600">Film Project</span>
                <div className="text-xs text-gray-500 mt-1">A Cru Ministry</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 flex items-center justify-center h-24 hover:shadow-lg transition-shadow">
              <div className="text-red-700 font-bold text-xl">
                Faith Comes By Hearing
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 flex items-center justify-center h-24 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-sm font-bold">ABS</span>
                </div>
                <span className="text-blue-800 font-semibold text-lg">AMERICAN BIBLE SOCIETY</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="bg-white rounded-2xl p-8 flex items-center justify-center h-24 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-sm font-bold">B</span>
                </div>
                <div>
                  <div className="text-blue-800 font-bold text-sm">Biblica</div>
                  <div className="text-gray-600 text-xs">The International Bible Society</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 flex items-center justify-center h-24 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 border-2 border-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-gray-800 text-xs font-bold">YM</span>
                </div>
                <span className="text-gray-800 font-semibold">youth with a mission</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 flex items-center justify-center h-24 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-800 transform rotate-45"></div>
                <span className="text-gray-800 font-semibold">In Touch Ministries</span>
              </div>
            </div>

            {/* Row 3 - Placeholder cards with teal background (partially visible) */}
            <div className="bg-teal-700 bg-opacity-50 rounded-2xl p-8 flex items-center justify-center h-24">
              <div className="w-full h-full bg-teal-600 bg-opacity-30 rounded-lg"></div>
            </div>
            <div className="bg-teal-700 bg-opacity-50 rounded-2xl p-8 flex items-center justify-center h-24">
              <div className="w-full h-full bg-teal-600 bg-opacity-30 rounded-lg"></div>
            </div>
            <div className="bg-teal-700 bg-opacity-50 rounded-2xl p-8 flex items-center justify-center h-24">
              <div className="w-full h-full bg-teal-600 bg-opacity-30 rounded-lg"></div>
            </div>
          </div>

          {/* Show More Button */}
          <div className="relative flex justify-center">
            <button className="flex gap-2 bg-teal-900 bg-opacity-80 text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-100 transition-all cursor-pointer">
              Voir plus 
              <ArrowUpRight />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}