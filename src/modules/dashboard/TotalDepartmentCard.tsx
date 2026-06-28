// components/dashboard/total-category-card.tsx
"use client";

import { TagIcon } from "lucide-react";
import { StatCard } from "./statCard";

export type TotalDepartmentCardProps = {
  totalCategories: number;
};

export function TotalDepartmentCard ({ totalCategories }: TotalDepartmentCardProps) {
  return (
    <StatCard
      icon={TagIcon}
      title="Total des catégories"
      description="Catégories disponibles dans le système"
      value={totalCategories}
      href="/categories"
      linkLabel="Voir les catégories"
    />
  );
}