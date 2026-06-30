import { articles } from "@/components/data/admin/blogs.data"
import Footer from "@/components/layout/landing/footer"
import LandingPageHeader from "@/components/layout/landing/header"
import Link from "next/link"
import type { Metadata } from "next";
import BlogsHero from "@/components/layout/pages/blogs/hero";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Nos nouvelles au fil du temps.",
};


export default function Blogs() {
    return (
        <div className="relative h-screen">
            {/* Background Image with Overlay */}
            <div 
                className="absolute bg-fixed inset-0 bg-cover bg-center bg-no-repeat rounded-b-3xl"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                }}
            />

            {/* Header */}
            <div className="relative py-10">
                <LandingPageHeader />
            </div>

            {/* Hero Section */}
            <div className=''> 
                <BlogsHero />
            </div>

            {/* Articles */}
            <div className="relative z-10 bg-teal-800 py-8 md:py-16">
                <section className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                    {articles.map(article => (
                    <article key={article.id} className="group cursor-pointer">
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                            <img
                                src={article.image.src}
                                alt={article.image.alt}
                                sizes="(min-width: 1024px) 33vw, 100vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* <span
                                className={`absolute top-4 left-4 ${
                                badgeColorMap[article.badge.color]
                                } text-white px-3 py-1 rounded-full text-xs font-medium`}
                            >
                                {article.badge.label}
                            </span> */}
                        </div>

                        <h3 className="text-white text-xl font-bold mb-2 transition-colors group-hover:text-green-400">
                            {article.title}
                        </h3>

                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                            {article.excerpt}
                        </p>

                        <Link
                            href={`/blog/${article.id}`}
                            className="text-teal-300 hover:text-white text-sm font-medium underline underline-offset-2 hover:no-underline transition-all"
                        >
                            {article.actionLabel}
                        </Link>
                    </article>
                    ))}
                </section>
            </div>

            {/* Footer */}
            <div className="z-10 relative">
                <Footer />
            </div>
        </div>
    )
}
