import { articles } from "@/components/data/admin/blogs";
import Link from "next/link";

export default function BlogSection () {
  return (
    <>
      <div className="relative z-10 bg-teal-800 py-16 md:py-20">
        <div className="bg-teal-900 bg-opacity-60 rounded-3xl mx-4 md:mx-8 lg:mx-12 py-12 md:py-16 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            {/* Podcast & Stories Badge */}
            <div className="flex justify-center mb-4">
              <div className="bg-teal-700 px-6 py-2 rounded-full">
                <span className="text-white text-sm font-medium">Nos nouvelles</span>
              </div>
            </div>

            {/* Section Title */}
            <div className="text-center mb-6">
              <h2 className="text-white text-2xl md:text-3xl lg:text-5xl font-light leading-tight max-w-4xl mx-auto">
                Derniers{' '}
                <span className="text-green-400 italic font-script" style={{ fontFamily: 'cursive' }}>
                  podcasts
                </span>{' '}
                et{' '}
                <span className="text-green-400 italic font-script" style={{ fontFamily: 'cursive' }}>
                  récits
                </span>
              </h2>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
              {articles.map(article => (
                <div key={article.id} className="group cursor-pointer">
                  {/* Story 1 - A Nation Transformed */}
                  <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video">
                    <img 
                      src={article.image.src}
                      alt={article.image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium`}>badge</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <Link href="#" className="text-teal-300 hover:text-white text-sm font-medium underline decoration-1 underline-offset-2 hover:no-underline transition-all">
                      Lire plus 
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* See More Button */}
            <div className="text-center">
              <button className="bg-white text-teal-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Voir plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}