"use client";

import { OutreachCategory, RegisterOutreach } from "@/lib/types/admin/outreach/outreach.types";
import * as React from "react";
import { SearchX, ServerCrash } from "lucide-react";
import OutreachCard from "./outreachCard";
import { useActivePublicOutreaches } from "@/lib/types/admin/outreach/outreach.hooks";

interface OutreachGridProps {
  searchTerm?: string | null;
  selectedCategory?: OutreachCategory | null;
  selectedDepartmentId?: string | null;
  onEnrollNow?: (outreach: RegisterOutreach) => void;
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-64 w-full max-w-[260px] animate-pulse rounded-t-[110px] rounded-b-2xl border-2 border-border/60 bg-muted"
        />
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
        Impossible de récupérer les missions pour le moment. Merci de réessayer plus tard.
      </p>
    </div>
  );
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
      <SearchX className="mb-4 h-10 w-10 text-muted-foreground" />
      <h3 className="text-lg font-semibold">Aucune mission trouvée</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {hasFilters ? "Essayez de modifier vos filtres." : "Aucune mission n'est disponible pour le moment."}
      </p>
    </div>
  );
}

export default function OutreachGrid({
  searchTerm,
  selectedCategory,
  selectedDepartmentId,
  onEnrollNow,
}: OutreachGridProps) {
  const { data: outreaches = [], isLoading, isError } = useActivePublicOutreaches();

  const filteredOutreaches = React.useMemo(() => {
    const term = searchTerm?.trim().toLowerCase();

    return outreaches.filter((outreach) => {
      if (selectedCategory && outreach.category !== selectedCategory) return false;
      if (selectedDepartmentId && outreach.departmentId !== selectedDepartmentId) return false;

      if (term) {
        return (
          outreach.name.toLowerCase().includes(term) ||
          outreach.departmentName.toLowerCase().includes(term)
        );
      }

      return true;
    });
  }, [outreaches, selectedCategory, selectedDepartmentId, searchTerm]);

  if (isLoading) return <LoadingGrid />;
  if (isError) return <ErrorState />;
  if (!filteredOutreaches.length) {
    return <EmptyState hasFilters={!!searchTerm?.trim() || !!selectedCategory || !!selectedDepartmentId} />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {filteredOutreaches.map((outreach) => (
          <OutreachCard key={outreach.id} outreach={outreach} onEnrollNow={onEnrollNow} />
        ))}
      </div>
    </div>
  );
}