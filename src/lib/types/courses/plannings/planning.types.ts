
// @/lib/types/school/planning/planning.types.ts

// ── Réponse (GET liste / GET by id / POST / PUT) ────────────────
export interface Planning {
  id: string;
  name: string;

  promotionId: string;
  promotionName: string;

  semaine: number;

  themeId: string;
  themeName: string;

  preacherId?: string | null;
  preacherFullName?: string | null;

  bookId?: string | null;
  bookTitle?: string | null;

  createdAt: string;
  updatedAt: string;
}

// ── Payload de création/mise à jour ─────────────────────────────
export interface PlanningRequest {
  name: string;
  promotionId: string;
  semaine: number; // 1 à 10
  themeId: string;
  preacherId?: string | null; // optionnel — peut être assigné plus tard
  bookId?: string | null;     // optionnel — peut être assigné plus tard
}