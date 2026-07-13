// @/lib/types/school/rapport/rapport.types.ts

// ── Réponse liste (RapportResponseDto) ─────────────────────────────
export interface RapportResponseDto {
  id: string;

  // Livre
  nomLivre: string;
  auteur: string;
  hasContenu: boolean;

  // Références
  schoolId: string;
  schoolName: string;

  studentId: string;
  studentFullName: string;
  studentEmail: string;

  // Audit
  createdAt: string;
  updatedAt: string;
}

// ── Réponse détail (RapportDetailResponseDto) ─────────────────────
export interface RapportDetailResponseDto extends RapportResponseDto {
  contenuRapport: string;        // contenu complet
  feedback?: string | null;      // commentaire du superviseur
  grade?: number | null;         // note attribuée
  gradedByUserId?: string | null;
  gradedAt?: string | null;
}

// ── Payload création/mise à jour (RapportRequestDto) ──────────────
export interface RapportRequest {
  nomLivre: string;
  auteur: string;
  contenuRapport: string;
  schoolId: string;
  studentId?: string | null; // optionnel — admin peut soumettre au nom d’un étudiant
}

// ── Payload notation (RapportGradeRequest) ───────────────────────
export interface RapportGradeRequest {
  grade: number; // 0 à 20
  feedback?: string;
}
