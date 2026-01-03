import Link from "next/link"
import { MoveRight, MoveUpRight } from "lucide-react"
import { memo } from "react"

type MissionCardProps = {
  title: string
  description: string
  href: string
  image: string
}

const missionCards: MissionCardProps[] = [
    {
        title: "Formation",
        description: "Tools to help you share the Gospel",
        href: "/formation",
        image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Evangélisation",
        description: "Programs and innovative initiatives",
        href:"/evangelisation",
        image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Entraide",
        description: "Sharing God dids in the nations",
        href:"/entraide",
        image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80",
    },
]

export default function Mission() {
    return (
        <section className="relative z-10 bg-teal-800 px-4 py-10 md:py-12">
            <div className="mx-auto max-w-7xl">
                {/* Badge */}
                <div className="mb-8 flex justify-center">
                    <span className="rounded-full bg-teal-700 px-6 py-2 text-sm font-medium text-white">
                        Missions
                    </span>
                </div>

                {/* Title */}
                <div className="mb-10 text-center">
                    <h2 className="mx-auto max-w-4xl text-2xl font-light leading-tight text-white md:text-4xl lg:text-4xl">
                        YWAM FM aide les autres à{" "}
                        <span className="font-script italic text-green-400">
                        diffuser la Parole de Dieu
                        </span>{" "}
                        aux quatre coins du globe
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                    {missionCards.map((card) => (
                        <MissionCard key={card.title} {...card} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const MissionCard = memo(function MissionCard({
    title,
    description,
    image,
    href,
}: MissionCardProps) {
    return (
        <div className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl transition-all">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out lg:group-hover:scale-110"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.6)), url(${image})`,
                }}
                aria-hidden
            />

            {/* Content */}
            <Link href={href} className="relative z-10 mx-5 flex items-end mt-3 justify-between rounded-xl bg-black/50 p-4 text-white">
                <div className="max-w-[85%]">
                    <h3 className="mb-2 text-xl font-bold lg:text-2xl">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-300">
                        {description}
                    </p>
                </div>

                <div
                    aria-label={`Voir ${title}`}
                    className="
                        relative flex h-10 w-10 items-center justify-center rounded-full
                        bg-gradient-to-tr from-green-600 to-blue-600
                        transition-all duration-300
                        lg:group-hover:scale-110 lg:group-hover:to-blue-500
                    "
                >
                    {/* Default icon */}
                    <MoveRight
                        className="
                            absolute text-white transition-all duration-300
                            lg:group-hover:opacity-0 lg:group-hover:scale-75
                        "
                    />

                    {/* Hover icon */}
                    <MoveUpRight
                        className="
                            absolute text-white opacity-0 scale-75 transition-all duration-300
                            lg:group-hover:opacity-100 lg:group-hover:scale-100
                        "
                    />
                </div>
            </Link>
        </div>
    )
})
