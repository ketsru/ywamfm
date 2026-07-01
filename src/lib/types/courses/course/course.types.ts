// @/lib/types/school/course/course.types.ts

// ── Item de liste (GET /courses) — pas de contenuTexte complet ──
export interface CourseListItem {
  id: string;

  promotionId: string;
  promotionName: string;

  planningId: string;
  planningName: string;

  titre: string;
  link?: string | null;

  /** Indique si un contenu texte existe, sans le charger — voir getCourseById pour le contenu complet */
  hasContenuTexte: boolean;

  createdAt: string;
  updatedAt: string;
}

// ── Détail complet (GET /courses/{id}) ──────────────────────────
export interface CourseDetail {
  id: string;

  promotionId: string;
  promotionName: string;

  planningId: string;
  planningName: string;

  titre: string;
  link?: string | null;
  contenuTexte?: string | null;

  createdAt: string;
  updatedAt: string;
}

// ── Payload de création/mise à jour ─────────────────────────────
export interface CourseRequest {
  promotionId: string;
  planningId: string;
  titre: string;
  link?: string | null;
  contenuTexte?: string | null;
}

// ── Filtres pour la liste ────────────────────────────────────────
export interface CourseFilters {
  promotionId?: string;
  planningId?: string;
  search?: string;
}