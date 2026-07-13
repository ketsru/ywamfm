import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { PublishSchoolStatus, PublishSchool, PUBLISH_SCHOOL_STATUS_LABELS } from "@/lib/types/admin/publish-school/publish-school.types"

// ── Config ───────────────────────────────────────────────────

const DEFAULT_IMAGE = "/images/course-placeholder.jpg"

const STATUS_BADGE_VARIANT: Record<
  PublishSchoolStatus,
  "default" | "secondary" | "destructive"
> = {
  [PublishSchoolStatus.EN_ATTENTE]: "secondary",
  [PublishSchoolStatus.ANNULEE]: "destructive",
  [PublishSchoolStatus.TERMINEE]: "default",
}

// ── Helpers ──────────────────────────────────────────────────

/** Calcule une durée lisible ("3 mois" / "5 jours") à partir de deux dates ISO. */
function formatDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  const days = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)))

  if (days >= 30) {
    const months = Math.round(days / 30)
    return `${months} mois`
  }
  return `${days} jour${days > 1 ? "s" : ""}`
}

// ── Component ────────────────────────────────────────────────

export interface CourseCardProps {
  school: PublishSchool
  imageFallback?: string
  onViewPrograms?: (school: PublishSchool) => void
  onEnrollNow?: (school: PublishSchool) => void
  className?: string
}

function CourseCardImpl({
  school,
  imageFallback = DEFAULT_IMAGE,
  onViewPrograms,
  onEnrollNow,
  className,
}: CourseCardProps) {
  const {
    schoolName,
    promotionName,
    startDate,
    endDate,
    location,
    imageUrl,
    status,
  } = school

  const duration = React.useMemo(
    () => formatDuration(startDate, endDate),
    [startDate, endDate]
  )

  // Seules les formations "en attente" (à venir) restent ouvertes aux inscriptions.
  const isEnrollable = status === PublishSchoolStatus.EN_ATTENTE

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl border-0 p-0 shadow-md transition-shadow hover:shadow-lg",
        className
      )}
    >
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || imageFallback}
          alt={schoolName}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <Badge
          variant={STATUS_BADGE_VARIANT[status]}
          className="absolute right-3 top-3"
        >
          {PUBLISH_SCHOOL_STATUS_LABELS[status]}
        </Badge>
      </div>

      <CardContent className="space-y-2 p-6">
        <h3 className="line-clamp-1 text-xl font-semibold text-slate-900">
          {schoolName}
        </h3>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {promotionName}
        </p>

        <p className="text-sm text-slate-500">
          Durée : <span className="text-slate-500">{duration}</span>
        </p>
        <p className="line-clamp-1 text-sm text-slate-500">
          Lieu : <span className="text-slate-500">{location}</span>
        </p>

        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-50"
            onClick={() => onViewPrograms?.(school)}
          >
            Voir le programme
          </Button>
          <Button
            className="flex-1 rounded-xl bg-[#1E2A5A] text-white hover:bg-[#16204a] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => onEnrollNow?.(school)}
            disabled={!isEnrollable}
            title={!isEnrollable ? "Inscriptions closes" : undefined}
          >
            S'inscrire
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export const CourseCard = React.memo(CourseCardImpl)
export default CourseCard