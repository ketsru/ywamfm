"use client";

import { PublishSchool } from "@/lib/types/admin/publish-school/publish-school.types";
import * as React from "react";
import { useRouter } from "next/navigation";
import { SearchX, ServerCrash } from "lucide-react";
import CourseCard from "./trainingCard";
import { useActivePublicSchools } from "@/lib/types/admin/publish-school/publish-school.hooks";

interface CourseGridProps {
  searchTerm?: string | null;
  selectedSchoolId?: string | null;
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-72 animate-pulse rounded-2xl border border-border/60 bg-muted" />
      ))}
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
      <ServerCrash className="mb-4 h-10 w-10 text-muted-foreground" />
      <h3 className="text-lg font-semibold">Erreur de chargement</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Impossible de récupérer les formations pour le moment. Merci de réessayer plus tard.
      </p>
    </div>
  );
}

function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
      <SearchX className="mb-4 h-10 w-10 text-muted-foreground" />
      <h3 className="text-lg font-semibold">Aucune formation trouvée</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {hasSearch ? "Essayez avec d'autres mots-clés." : "Aucune formation n'est disponible pour le moment."}
      </p>
    </div>
  );
}

export default function TrainingCourseGrid({
  searchTerm,
  selectedSchoolId,
}: CourseGridProps) {
  const router = useRouter();
  const { data: schools = [], isLoading, isError } = useActivePublicSchools();

  const filteredSchools = React.useMemo(() => {
    const term = searchTerm?.trim().toLowerCase();
    return schools.filter((school) => {
      if (selectedSchoolId && school.schoolId !== selectedSchoolId) return false;
      if (term) {
        return (
          school.schoolName.toLowerCase().includes(term) ||
          school.promotionName.toLowerCase().includes(term) ||
          school.location.toLowerCase().includes(term)
        );
      }
      return true;
    });
  }, [schools, selectedSchoolId, searchTerm]);

  if (isLoading) return <LoadingGrid />;
  if (isError) return <ErrorState />;
  if (!filteredSchools.length) return <EmptyState hasSearch={!!searchTerm?.trim()} />;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {filteredSchools.map((school) => (
          <CourseCard
            key={school.id}
            school={school}
            onViewPrograms={(s) => router.push(`/formations/${s.id}`)}
            onEnrollNow={(s) => router.push(`/formations/${s.id}?register=true`)}
          />
        ))}
      </div>
    </div>
  );
}