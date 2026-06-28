"use client";

import { UsersIcon } from "lucide-react";
import { StatCard } from "./statCard";

export type TotalRevenueCardProps = {
  totalRevenue: number;
  currency?: string;
};

export function TotalRevenueCard({
  totalRevenue,
  currency = "FCFA",
}: TotalRevenueCardProps) {
  return (
    <StatCard
      icon={UsersIcon}
      title="Revenu total"
      description="Revenus générés cette année"
      value={totalRevenue}
      suffix={currency}
      tone="success"
      href="/revenue"
      linkLabel="Voir les détails"
    />
  );
}