// components/dashboard/total-refused-contract-card.tsx
"use client";

import { FileXIcon } from "lucide-react";
import { StatCard } from "./statCard";

export type TotalRefusedContractCardProps = {
  totalRefusedContracts: number;
};

export function TotalRefusedContractCard({
  totalRefusedContracts,
}: TotalRefusedContractCardProps) {
  return (
    <StatCard
      icon={FileXIcon}
      title="Contrats refusés"
      description="Nombre total de contrats refusés"
      value={totalRefusedContracts}
      tone="destructive"
      href="/contracts?status=refused"
      linkLabel="Voir les contrats refusés"
    />
  );
}