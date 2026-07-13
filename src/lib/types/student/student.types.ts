// type.ts

// ── Enum ──────────────────────────────────────────────
export enum StudentStatus {
  PENDING = "PENDING",     // inscription soumise, en attente de validation
  VALIDATED = "VALIDATED", // acceptée par le staff
  REJECTED = "REJECTED",   // refusée
  ACTIVE = "ACTIVE",       // en cours de formation
  COMPLETED = "COMPLETED", // formation terminée
  DROPPED = "DROPPED",     // abandon
}

// ── Interfaces ────────────────────────────────────────

// Entité Student (backend JPA)
export interface Student {
  id: string; // UUID
  user: User; // référence vers User
  school: RegisterSchool;
  outreach?: RegisterOutreach | null;
  promotion?: Promotion | null;
  objectif: string;
  attente: string;
  status: StudentStatus;
  createdAt: string; // LocalDateTime → ISO string
  updatedAt: string;
}

// DTO pour requête d’inscription
export interface StudentRequestDto {
  schoolId: string; // UUID
  outreachId?: string | null;
  objectif: string;
  attente: string;
  userId?: string | null; // admin only
}

// DTO pour réponse API
export interface StudentResponseDto {
  id: string;
  userId: string;
  userFullName: string;
  userEmail: string;

  schoolId: string;
  schoolName: string;

  outreachId?: string | null;
  outreachName?: string | null;

  promotionId?: string | null;
  promotionName?: string | null;

  objectif: string;
  attente: string;

  status: StudentStatus;
  createdAt: string;
  updatedAt: string;
}

// DTO pour mise à jour du statut
export interface StudentStatusUpdateDto {
  status: StudentStatus;
}

// ── Types minimaux pour relations (placeholders) ──────
export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface RegisterSchool {
  id: string;
  name: string;
}

export interface RegisterOutreach {
  id: string;
  name: string;
}

export interface Promotion {
  id: string;
  name: string;
}
