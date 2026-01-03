export default function ProjectSection() {
  return (
    <div className="relative z-10 bg-teal-800 py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">

        {/* Badge */}
        <div className="mb-2 flex justify-start">
          <span className="rounded-full bg-teal-700 px-6 py-2 text-sm font-medium text-white">
            Projects
          </span>
        </div>

        {/* Title */}
        <div className="mb-8 max-w-4xl">
          <h2 className="text-2xl font-light leading-tight text-white md:text-3xl lg:text-4xl">
            Exciting initiatives to advance{" "}
            <span className="font-script italic text-green-400">
              the Kingdom
            </span>
          </h2>
        </div>

        {/* CTA 
        <div className="mb-5">
          <button
            className="
              rounded-full bg-white/20 px-8 py-3 font-semibold
              backdrop-blur-sm transition-colors hover:bg-white/30
            "
          >
            All Projects
          </button>
        </div>*/}

        {/* Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Left / Large */}
          <div className="lg:row-span-2">
            <ProjectCard
              title="Ukraine"
              description="Spreading light in the middle of war-torn Ukraine"
              image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80"
              aspect="aspect-[4/5] lg:aspect-[3/4]"
              large
            />
          </div>

          {/* Right */}
          <div className="space-y-6">
            <ProjectCard
              title="The Rescue Project"
              description="How do you reach over 70 million Deaf?"
              image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80"
              aspect="aspect-[16/9]"
            />

            <ProjectCard
              title="Peru – The Aurora Project"
              description="Equipping the Indigenous to reach the Indigenous"
              image="https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&w=800&q=80"
              aspect="aspect-[16/9]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}


function ProjectCard({
  title,
  description,
  image,
  aspect,
  large = false,
}: {
  title: string
  description: string
  image: string
  aspect: string
  large?: boolean
}) {
  return (
    <div
      className={`
        group relative cursor-pointer overflow-hidden rounded-2xl bg-black
        ${aspect}
        transition-transform duration-300 hover:scale-[1.02]
      `}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.6)), url(${image})`,
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 flex justify-between items-end rounded-xl bg-black/50 h-full p-6 text-white">
        <div>
          <h3 className={`${large ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} font-bold mb-2`}>
            {title}
          </h3>

          <p className={`${large ? "mb-6 text-base" : "mb-4 text-sm"} text-gray-300`}>
            {description}
          </p>
        </div>

        <div className="flex justify-end">
          <div
            className={`
              flex items-center justify-center rounded-full bg-white text-black
              transition-transform group-hover:scale-110
              ${large ? "h-12 w-12" : "h-10 w-10"}
            `}
          >
            <svg
              className={large ? "h-6 w-6" : "h-5 w-5"}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
