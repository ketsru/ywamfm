"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { notFound } from "next/navigation";
import { useActivePublicSchoolById } from "@/lib/types/admin/publish-school/publish-school.hooks";
import { PublishSchoolStatus, PUBLISH_SCHOOL_STATUS_LABELS } from "@/lib/types/admin/publish-school/publish-school.types";
import StudentRegistrationForm from "../../forms/metier/studentRegistrationForm";

const DEFAULT_IMAGE = "/images/course-placeholder.jpg";

const STATUS_BADGE_VARIANT: Record<
  PublishSchoolStatus,
  "default" | "secondary" | "destructive"
> = {
  [PublishSchoolStatus.EN_ATTENTE]: "secondary",
  [PublishSchoolStatus.ANNULEE]: "destructive",
  [PublishSchoolStatus.TERMINEE]: "default",
};

/** Calcule une durée lisible ("3 mois" / "5 jours") à partir de deux dates ISO. */
function formatDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const days = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));

  if (days >= 30) {
    const months = Math.round(days / 30);
    return `${months} mois`;
  }
  return `${days} jour${days > 1 ? "s" : ""}`;
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

// ── Sous-composant : bloc d'info avec icône ─────────────────────

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1E2A5A]/5 text-[#1E2A5A]">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

// ── Loading / erreur ─────────────────────────────────────────

function DetailsLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="h-72 w-full animate-pulse rounded-3xl bg-muted" />
      <div className="mt-8 space-y-4">
        <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailsError() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-24 text-center">
      <AlertCircle className="mb-4 h-10 w-10 text-slate-400" />
      <h2 className="text-lg font-semibold text-slate-900">
        Impossible de charger cette formation
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        Une erreur est survenue. Merci de réessayer plus tard.
      </p>
      <Link
        href="/formations"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1E2A5A] underline underline-offset-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux formations
      </Link>
    </div>
  );
}

// ── Composant principal ──────────────────────────────────────

export interface TrainingCourseDetailsProps {
  id: string;
}

export default function TrainingCourseDetails({ id }: TrainingCourseDetailsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isRegistrationOpen, setRegistrationOpen] = React.useState(false);
  const { data: school, isLoading, isError } = useActivePublicSchoolById(id);

  // Ouvre automatiquement la modale si on arrive avec ?register=true
  React.useEffect(() => {
    if (searchParams.get("register") === "true") {
      setRegistrationOpen(true);
    }
  }, [searchParams]);

  // Nettoie l'URL une fois la modale fermée, pour éviter qu'elle se rouvre au refresh
  const handleRegistrationChange = (open: boolean) => {
    setRegistrationOpen(open);
    if (!open && searchParams.get("register") === "true") {
      router.replace(`/formations/${id}`, { scroll: false });
    }
  };

  if (isLoading) return <DetailsLoading />;
  if (isError) return <DetailsError />;
  if (!school) notFound();

  const {
    schoolName,
    promotionName,
    startDate,
    endDate,
    location,
    description,
    imageUrl,
    status,
  } = school;

  const duration = formatDuration(startDate, endDate);
  const isEnrollable = status === PublishSchoolStatus.EN_ATTENTE;

  return (
    <div className="pb-16">
      {/* Hero */}
      <div className="relative min-h-[45vh] w-full overflow-hidden rounded-b-3xl">
        <Image
          src={imageUrl || DEFAULT_IMAGE}
          alt="ywam"
          fill
          unoptimized
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20" />

        <Link
          href="/formations"
          className="absolute left-4 top-6 z-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:left-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux formations
        </Link>

        <Badge
          variant={STATUS_BADGE_VARIANT[status]}
          className="absolute right-4 top-6 z-10 md:right-8"
        >
          {PUBLISH_SCHOOL_STATUS_LABELS[status]}
        </Badge>

        <div className="absolute inset-x-0 bottom-8 mx-auto max-w-3xl px-4 text-center text-white">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            {promotionName}
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
            {schoolName}
          </h1>
        </div>
      </div>

      {/* Contenu */}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InfoTile icon={Clock} label="Durée" value={duration} />
          <InfoTile
            icon={CalendarDays}
            label="Dates"
            value={`${dateFormatter.format(new Date(startDate))} → ${dateFormatter.format(new Date(endDate))}`}
          />
          <InfoTile icon={MapPin} label="Lieu" value={location} />
        </div>

        {description && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-slate-900">À propos de la formation</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {description}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {isEnrollable ? "Prêt à rejoindre cette formation ?" : "Inscriptions closes"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {isEnrollable
                ? "Complétez le formulaire d'inscription en quelques minutes."
                : "Cette formation n'accepte plus de nouvelles inscriptions."}
            </p>
          </div>

          <Button
            className="w-full rounded-xl bg-[#1E2A5A] text-white hover:bg-[#16204a] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8"
            onClick={() => setRegistrationOpen(true)}
            disabled={!isEnrollable}
          >
            S'inscrire
          </Button>
        </div>
      </div>

        {/* Modale d'inscription */}
        <Dialog open={isRegistrationOpen} onOpenChange={handleRegistrationChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Inscription — {schoolName}</DialogTitle>
                </DialogHeader>

                <StudentRegistrationForm
                    schools={[{ id: school.schoolId, name: schoolName }]}
                    defaultValues={{ schoolId: school.schoolId }}
                    onSuccess={() => setRegistrationOpen(false)}
                />
            </DialogContent>
        </Dialog>
    </div>
  );
}