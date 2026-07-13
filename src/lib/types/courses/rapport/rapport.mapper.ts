// @/lib/types/school/rapport/rapport.mapper.ts

import { RapportResponseDto, RapportDetailResponseDto } from "./rapport.types";

// ── Formatage de la note ──────────────────────────────────────
export const formatGrade = (grade: number | null | undefined): string => {
  if (grade == null) return "—";
  return `${grade}/20`;
};

// ── Statut de notation ────────────────────────────────────────
export const getRapportGradeStatus = (
  rapport: RapportResponseDto | RapportDetailResponseDto
): "graded" | "pending" => {
  return "grade" in rapport && rapport.grade != null ? "graded" : "pending";
};

// ── Label affiché pour la date ────────────────────────────────
export const formatRapportDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

// ── Résumé court pour les listes ─────────────────────────────
export const toRapportSummary = (rapport: RapportResponseDto) => ({
  id:              rapport.id,
  livre:           `${rapport.nomLivre} — ${rapport.auteur}`,
  etudiant:        rapport.studentFullName,
  email:           rapport.studentEmail,
  ecole:           rapport.schoolName,
  gradeStatus:     getRapportGradeStatus(rapport),
  createdAt:       formatRapportDate(rapport.createdAt),
});

export type RapportSummary = ReturnType<typeof toRapportSummary>;