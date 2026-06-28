

// components/dashboard/total-reservation-card.tsx
"use client";

import { CalendarCheckIcon } from "lucide-react";
import { StatCard } from "./statCard";

export type TotalStudentiRegistrationCardProps = {
  totalReservations: number;
};

export function TotalStudentiRegistrationCard({
  totalReservations,
}: TotalStudentiRegistrationCardProps) {
  return (
    <StatCard
      icon={CalendarCheckIcon}
      title="Total des réservations"
      description="Réservations effectuées cette année"
      value={totalReservations}
      href="/reservations"
      linkLabel="Voir les réservations"
    />
  );
}