// components/layout/pages/testimony/testimonyCard.tsx
import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Testimony } from "@/lib/types/communications/testimonies/testimony.types"

// ── Sous-composant : portrait entouré d'étoiles décoratives ────
// (les étoiles restent purement décoratives, il n'existe aucun champ
// de notation côté back — voir Testimony, qui n'a pas de "rating")

function DecoratedAvatar({
  src,
  alt,
}: {
  src?: string | null
  alt: string
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[280px]">
      {/* Anneau décoratif */}
      <div className="absolute inset-0 rounded-full border-2 border-amber-300/80" />

      {/* Portrait */}
      <div className="absolute inset-[10%] overflow-hidden rounded-full bg-slate-700">
        {src ? (
          <Image src={src} alt={alt} fill unoptimized className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-white">
            {alt.charAt(0)}
          </div>
        )}
      </div>

      {/* Étoiles décoratives */}
      <Star className="absolute -top-3 left-1/2 h-8 w-8 -translate-x-1/2 fill-amber-400 text-amber-400" />
      <Star className="absolute left-[-14px] top-1/2 h-7 w-7 -translate-y-1/2 fill-amber-400 text-amber-400" />
      <Star className="absolute right-[-14px] top-1/2 h-7 w-7 -translate-y-1/2 fill-amber-400 text-amber-400" />
      <Star className="absolute -bottom-3 left-1/2 h-8 w-8 -translate-x-1/2 fill-amber-400 text-amber-400" />
    </div>
  )
}

// ── Composant principal ──────────────────────────────────────

export interface TestimonyCardProps {
  testimony: Testimony
  className?: string
}

function TestimonyCardImpl({ testimony, className }: TestimonyCardProps) {
  const { userName, domaine, content, userImage } = testimony

  return (
    <Card
      className={cn(
        "border-0 bg-transparent p-0 shadow-none",
        className
      )}
    >
      <CardContent className="grid gap-10 p-0 lg:grid-cols-2 lg:items-center">
        {/* Colonne texte */}
        <div className="space-y-5 text-center lg:text-left">
          <Quote className="mx-auto h-9 w-9 fill-sky-400 text-sky-400 lg:mx-0" />

          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-white">{userName}</h3>
            <p className="text-sm text-sky-300">{domaine}</p>
          </div>

          <p className="text-sm leading-relaxed text-slate-300">{content}</p>
        </div>

        {/* Colonne portrait */}
        <DecoratedAvatar src={userImage} alt={userName} />
      </CardContent>
    </Card>
  )
}

export const TestimonyCard = React.memo(TestimonyCardImpl)
export default TestimonyCard