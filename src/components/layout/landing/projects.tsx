import { MoveRight, MoveUpRight } from "lucide-react"

export default function ProjectSection() {
  return (
    <div className="relative z-10 bg-teal-800 py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

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
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 items-center">

          {/* Left / Large */}
          <div className="">
            <ProjectCard
              title="Ukraine"
              description="Spreading light in the middle of war-torn Ukraine"
              image="/assets/images/0af7741991985e2b530c8f62135c3eea.jpg"
              aspect="aspect-[4/5] lg:aspect-[3.5/4]"
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
        transition-transform duration-300 p-4
      `}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out lg:group-hover:scale-110"
        style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.6)), url(${image})`,
        }}
        aria-hidden
    />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between  rounded-xl bg-black/50 py-2 px-4 text-white">
        <div>
          <h3 className={`${large ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} font-bold mb-2`}>
            {title}
          </h3>

          <p className={`${large ? "mb-6 text-base" : "mb-4 text-sm"} text-gray-300`}>
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
      </div>
    </div>
  )
}
