// type.ts

// ── Enums ──────────────────────────────────────────────
export enum StaffType {
  PLEIN_TEMPS = "PLEIN_TEMPS",
  TEMPS_PARTIEL = "TEMPS_PARTIEL",
}

export enum Sexe {
  M = "M",
  F = "F",
}

export enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}

// ── Interfaces ────────────────────────────────────────

// Entité StaffProfile (backend JPA)
export interface StaffProfile {
  id: string; // UUID
  user: User;
  department: Department;
  type: StaffType;
  debut: string; // LocalDate → ISO string
  fin: string;
  objectif: string;
  attente: string;
  decisionParcours: boolean;
  parcoursList?: string | null;
  ywamDecisionParcours: boolean;
  ywamParcoursList?: string | null;
  createdAt: string; // LocalDateTime → ISO string
  updatedAt: string;
}

// DTO pour création/mise à jour
export interface StaffProfileRequestDto {
  departmentId: string; // UUID
  type: StaffType;
  debut: string; // LocalDate
  fin: string;   // LocalDate
  objectif: string;
  attente: string;
  decisionParcours?: boolean;
  parcoursList?: string | null;
  ywamDecisionParcours?: boolean;
  ywamParcoursList?: string | null;
  userId?: string | null; // admin only
}

// DTO pour réponse API
export interface StaffProfileResponseDto {
  id: string;

  // Utilisateur
  userId: string;
  userFullName: string;
  userEmail: string;

  // Département
  departmentId: string;
  departmentName: string;

  // Affectation
  type: StaffType;
  debut: string;
  fin: string;
  durationDays?: number | null; // calculé côté frontend si besoin

  // Motivation
  objectif: string;
  attente: string;

  // Parcours local
  decisionParcours: boolean;
  parcoursList?: string | null;

  // Parcours YWAM
  ywamDecisionParcours: boolean;
  ywamParcoursList?: string | null;

  // Audit
  createdAt: string;
  updatedAt: string;
}

// ── Types minimaux pour relations (placeholders) ──────
export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface Department {
  id: string;
  name: string;
}
