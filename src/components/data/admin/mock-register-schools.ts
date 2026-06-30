// mock-register-schools.ts

import { RegisterSchool, SchoolType, SchoolCategory, SchoolStatus } from "@/lib/types/admin/school/school.types";


export const mockRegisterSchools: RegisterSchool[] = [
  {
    id: "b1a2c3d4-e5f6-7890-ab12-cd34ef56gh78",
    departmentId: "11111111-2222-3333-4444-555555555555",
    departmentName: "Informatique",
    name: "École de Développement Web",
    type: SchoolType.EN_LIGNE,
    category: SchoolCategory.GRATUITE,
    price: null,
    status: SchoolStatus.EN_COURS,
    duration: 30,
    createdAt: "2026-06-01T09:00:00.000Z",
    updatedAt: "2026-06-15T12:30:00.000Z",
  },
  {
    id: "c9d8e7f6-a5b4-3210-9876-543210fedcba",
    departmentId: "66666666-7777-8888-9999-000000000000",
    departmentName: "Gestion",
    name: "Formation Management Agile",
    type: SchoolType.EN_PRESENTIELLE,
    category: SchoolCategory.PAYANTE,
    price: 1200,
    status: SchoolStatus.EN_ATTENTE,
    duration: 10,
    createdAt: "2026-05-20T08:45:00.000Z",
    updatedAt: "2026-05-21T10:00:00.000Z",
  },
  {
    id: "abcd1234-ef56-7890-abcd-1234567890ef",
    departmentId: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
    departmentName: "Design",
    name: "Atelier UX/UI",
    type: SchoolType.EN_PRESENTIELLE,
    category: SchoolCategory.GRATUITE,
    price: null,
    status: SchoolStatus.TERMINEE,
    duration: 5,
    createdAt: "2026-04-10T14:00:00.000Z",
    updatedAt: "2026-04-15T16:00:00.000Z",
  },
  {
    id: "12345678-90ab-cdef-1234-567890abcdef",
    departmentId: "99999999-8888-7777-6666-555555555555",
    departmentName: "Langues",
    name: "Cours Intensif d’Anglais",
    type: SchoolType.EN_LIGNE,
    category: SchoolCategory.PAYANTE,
    price: 500,
    status: SchoolStatus.ANNULEE,
    duration: 20,
    createdAt: "2026-03-01T07:00:00.000Z",
    updatedAt: "2026-03-05T09:30:00.000Z",
  },
];
