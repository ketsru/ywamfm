"use client";

import { StatCard } from "./statCard";
import { UsersIcon } from "lucide-react";

export type TotalUserCardProps = {
  totalUsers: number;
};

export function TotalUserCard({ totalUsers }: TotalUserCardProps) {
  return (
    <StatCard
      icon={UsersIcon}
      title="Total des utilisateurs"
      description="Vue d’ensemble du système"
      value={totalUsers}
      href="/users"
      linkLabel="Voir les utilisateurs"
    />
  );
}