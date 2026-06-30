// mock-register-outreach.ts

import { RegisterOutreach, OutreachCategory, OutreachStatus } from "@/lib/types/admin/outreach/outreach.types";


export const mockRegisterOutreaches: RegisterOutreach[] = [
  {
    id: "11111111-2222-3333-4444-555555555555",
    departmentId: "aaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
    departmentName: "Informatique",
    category: OutreachCategory.ECOLE,
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA", // placeholder
    status: OutreachStatus.EN_ATTENTE,
    createdAt: "2026-06-01T09:00:00.000Z",
    updatedAt: "2026-06-10T12:00:00.000Z",
  },
  {
    id: "66666666-7777-8888-9999-000000000000",
    departmentId: "ffffffff-1111-2222-3333-444444444444",
    departmentName: "Gestion",
    category: OutreachCategory.INDEPENDANT,
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA", // placeholder
    status: OutreachStatus.ANNULEE,
    createdAt: "2026-05-15T08:30:00.000Z",
    updatedAt: "2026-05-20T10:45:00.000Z",
  },
  {
    id: "abcd1234-ef56-7890-abcd-1234567890ef",
    departmentId: "99999999-8888-7777-6666-555555555555",
    departmentName: "Design",
    category: OutreachCategory.ECOLE,
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA", // placeholder
    status: OutreachStatus.TERMINEE,
    createdAt: "2026-04-01T14:00:00.000Z",
    updatedAt: "2026-04-05T16:00:00.000Z",
  },
  {
    id: "12345678-90ab-cdef-1234-567890abcdef",
    departmentId: "55555555-6666-7777-8888-999999999999",
    departmentName: "Langues",
    category: OutreachCategory.INDEPENDANT,
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA", // placeholder
    status: OutreachStatus.EN_ATTENTE,
    createdAt: "2026-03-10T07:00:00.000Z",
    updatedAt: "2026-03-12T09:30:00.000Z",
  },
]
