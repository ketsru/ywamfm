// components/layout/pages/testimony/testimonyCarousel.tsx
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import TestimonyCard from "./testimonyCard"
import { Testimony } from "@/lib/types/communications/testimonies/testimony.types"

// ── Sous-composant : bouton de navigation circulaire ───────────

function NavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next"
  onClick: () => void
  disabled?: boolean
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Témoignage précédent" : "Témoignage suivant"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-sky-300/60 text-sky-300",
        "transition-colors hover:bg-sky-300/10 disabled:cursor-not-allowed disabled:opacity-40"
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}

// ── Sous-composant : dots de pagination ─────────────────────────

function PaginationDots({
  count,
  selectedIndex,
  onSelect,
}: {
  count: number
  selectedIndex: number
  onSelect: (index: number) => void
}) {
  if (count <= 1) return null

  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Navigation des témoignages">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === selectedIndex}
          aria-label={`Témoignage ${i + 1} sur ${count}`}
          onClick={() => onSelect(i)}
          className={cn(
            "h-2 rounded-full transition-all",
            i === selectedIndex
              ? "w-6 bg-amber-400"
              : "w-2 bg-white/30 hover:bg-white/50"
          )}
        />
      ))}
    </div>
  )
}

// ── Composant principal ──────────────────────────────────────

export interface TestimonyCarouselProps {
  testimonies: Testimony[]
  title?: string
  description?: string
  autoplayDelay?: number
  className?: string
}

export function TestimonyCarousel({
  testimonies,
  title = "Ce que disent nos étudiants",
  description = "Découvrez comment nos étudiants ont transformé leur parcours grâce à un apprentissage pratique et un accompagnement expert.",
  autoplayDelay = 6000,
  className,
}: TestimonyCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  const autoplay = React.useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
      setSelectedIndex(api.selectedScrollSnap())
    }

    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  if (!testimonies.length) return null

  return (
    <section
      className={cn(
        "rounded-3xl bg-[#1E2A5A] px-6 py-16 sm:px-12 lg:px-16",
        className
      )}
    >
      <div className="max-w-2xl text-center lg:text-left">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="mt-4 text-sm text-slate-300 sm:text-base">
          {description}
        </p>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        plugins={prefersReducedMotion ? [] : [autoplay.current]}
        className="mt-14"
      >
        <CarouselContent>
          {testimonies.map((testimony) => (
            <CarouselItem key={testimony.id}>
              <TestimonyCard testimony={testimony} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-8 flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="flex justify-center gap-3">
          <NavButton
            direction="prev"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
          />
          <NavButton
            direction="next"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
          />
        </div>

        <PaginationDots
          count={testimonies.length}
          selectedIndex={selectedIndex}
          onSelect={(index) => api?.scrollTo(index)}
        />
      </div>
    </section>
  )
}

export default TestimonyCarousel