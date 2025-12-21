
import { User } from "@/types/users/user"

export const usersMock: User[] = [
  {
    id: "user-001",

    name: "Komi Atsu",
    email: "komi.atsu@example.com",
    email_verified_at: "2025-01-15T10:00:00Z",

    password: null,
    remember_token: null,

    created_at: "2025-01-10T08:30:00Z",
    updated_at: "2025-01-15T10:00:00Z",
  },
  {
    id: "user-002",

    name: "Ama Dossi",
    email: "ama.dossi@example.com",
    email_verified_at: null,

    password: null,
    remember_token: null,

    created_at: "2025-02-01T09:00:00Z",
    updated_at: "2025-02-01T09:00:00Z",
  },
]
