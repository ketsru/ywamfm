import { MoveRight } from "lucide-react"
import Link from "next/link"

const missionCards = [
    {
        title: "Equipment",
        description: "Tools to help you share the Gospel",
        image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Projects",
        description: "Programs and innovative initiatives",
        image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Stories",
        description: "Sharing what God is doing in the nations",
        image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80",
    },
]

export default function Mission() {
    return (
        <section className="relative z-10 bg-teal-800 py-10 md:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Badge */}
                <div className="flex justify-center mb-8">
                    <span className="bg-teal-700 text-white text-sm font-medium px-6 py-2 rounded-full">
                        Notre Mission
                    </span>
                </div>

                {/* Title */}
                <div className="text-center mb-16">
                    <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed max-w-6xl mx-auto">
                        Renew empowers others to spread God's Word to{" "}
                        <span className="text-green-400 italic font-script">
                        every corner
                        </span>{" "}
                        of the globe through...
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {missionCards.map((card) => (
                        <MissionCard key={card.title} {...card} />
                    ))}
                </div>
            </div>
        </section>
    )
}


function MissionCard({
    title,
    description,
    image,
}: {
    title: string
    description: string
    image: string
}) {
    return (
        <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer">
            {/* Background */}
            <div className=" absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out lg:group-hover:scale-110"
                style={{
                    backgroundImage: `
                    linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.6)),
                    url(${image})
                    `,
                }}
            />
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl lg:text-2xl font-bold mb-2">{title}</h3>
                <p className="text-gray-300 mb-6 text-sm">{description}</p>

                <div className="flex justify-end">
                    <Link href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transition-colors lg:group-hover:bg-white/30">
                        <MoveRight />
                    </Link>
                </div>
            </div>
        </div>
    )
}
