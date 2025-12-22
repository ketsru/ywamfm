
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const equipments = [
    {
        id: "vista-500",
        name: "Vista 500",
        category: "Video Projectors",
        image:
        "/assets/images/0af7741991985e2b530c8f62135c3eea.jpg",
    },
    {
        id: "vista-1000",
        name: "Vista 1000",
        category: "Video Projectors",
        image:
        "/assets/images/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg",
    },
    {
        id: "vista-5000",
        name: "LightStream",
        category: "LightStreams",
        image:
        "/assets/books/cover/8d2bea04d7ee666ab74e47084cf707ad.jpg",
    },
    {
        id: "vista-50O0",
        name: "Vista 1000",
        category: "Video Projectors",
        image:
        "/assets/images/0af7741991985e2b530c8f62135c3eea.jpg",
    },
    {
        id: "vista-A500",
        name: "LightStream",
        category: "LightStreams",
        image:
        "/assets/images/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg",
    },
]

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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border">
                            <Carousel opts={{ align: "start" }} className="w-full mx-auto">
                                <CarouselContent className="-ml-4">
                                    {equipments.map((item, index) => (
                                    <CarouselItem
                                        key={`${item.name}-${index}`}
                                        className="pl-4 md:basis-1/2 lg:basis-1/3"
                                    >
                                        {/* Carte IDENTIQUE à ton design */}
                                        <div className="cursor-pointer rounded-2xl mb-4 flex items-center justify-center overflow-hidden transition-colors">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={400}
                                                height={400}
                                                className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                                            />

                                            <div className="text-center">
                                                <h3 className="text-xl font-bold text-gray-800 mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm">{item.category}</p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>

                                {/* Navigation */}
                                <div className="flex justify-between items-center mt-8">
                                    {/* Dots Indicator */}
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    </div>

                                    {/* Navigation Arrows */}
                                    <div className="flex space-x-2">
                                        <CarouselPrevious className="static translate-y-0" />
                                        <CarouselNext className="static translate-y-0" />
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}