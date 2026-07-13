import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  OutreachStatus,
  RegisterOutreach,
  OUTREACH_STATUS_LABELS,
  OUTREACH_CATEGORY_LABELS,
} from "@/lib/types/admin/outreach/outreach.types";

const DEFAULT_IMAGE = "/images/outreach-placeholder.jpg";

const STATUS_BADGE_VARIANT: Record<
  OutreachStatus,
  "default" | "secondary" | "destructive"
> = {
  [OutreachStatus.EN_ATTENTE]: "secondary",
  [OutreachStatus.ANNULEE]: "destructive",
  [OutreachStatus.TERMINEE]: "default",
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export interface OutreachCardProps {
  outreach: RegisterOutreach;
  imageFallback?: string;
  onEnrollNow?: (outreach: RegisterOutreach) => void;
  className?: string;
}

function OutreachCardImpl({
  outreach,
  imageFallback = DEFAULT_IMAGE,
  onEnrollNow,
  className,
}: OutreachCardProps) {
  const { name, category, departmentName, imageUrl, status, createdAt } = outreach;

  const publishedAt = React.useMemo(
    () => dateFormatter.format(new Date(createdAt)),
    [createdAt]
  );

  const isEnrollable = status === OutreachStatus.EN_ATTENTE;

  return (
    <Card
      className={cn(
        "group w-full max-w-[300px] overflow-hidden rounded-2xl border-0 p-0 shadow-md transition-shadow hover:shadow-xl",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageUrl || imageFallback}
          alt={name}
          fill
          unoptimized
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <Badge
          variant={STATUS_BADGE_VARIANT[status]}
          className="absolute right-3 top-3"
        >
          {OUTREACH_STATUS_LABELS[status]}
        </Badge>

        <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#1E2A5A] backdrop-blur-sm">
          {OUTREACH_CATEGORY_LABELS[category]}
        </span>
      </div>

      <CardContent className="flex flex-col gap-2 p-5">
        <h3 className="line-clamp-2 min-h-[3.25rem] text-lg font-semibold leading-snug text-slate-900">
          {name}
        </h3>

        {departmentName && (
          <p className="line-clamp-1 text-sm text-slate-500">{departmentName}</p>
        )}

        <p className="text-xs text-slate-400">Publiée le {publishedAt}</p>

        <Button
          className="mt-2 w-full rounded-lg bg-[#1E2A5A] text-white hover:bg-[#16204a] disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => onEnrollNow?.(outreach)}
          disabled={!isEnrollable}
          title={!isEnrollable ? "Candidatures closes" : undefined}
        >
          {isEnrollable ? "S'inscrire" : "Candidatures closes"}
        </Button>
      </CardContent>
    </Card>
  );
}

export const OutreachCard = React.memo(OutreachCardImpl);
export default OutreachCard;