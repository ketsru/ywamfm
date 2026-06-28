// components/dashboard/total-country-card.tsx
"use client";

import { GlobeIcon } from "lucide-react";
import { StatCard } from "./statCard";

export type TotalCountryCardProps = {
  totalCountries: number;
};

export function TotalCountryCard({ totalCountries }: TotalCountryCardProps) {
  return (
    <StatCard
      icon={GlobeIcon}
      title="Total des pays"
      description="Pays enregistrés dans le système"
      value={totalCountries}
      href="/locations"
      linkLabel="Voir les pays"
    />
  );
}