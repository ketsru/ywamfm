import { Provenance } from "@/types/users/provenance"

export const provenancesMock: Provenance[] = [
  {
    id: "prov-001",
    user_id: "user-001",

    country: "Togo",
    region: "Maritime",
    town: "Lomé",
    district: "Agoè-Nyivé",

    created_at: "2025-01-10T08:35:00Z",
    updated_at: "2025-01-10T08:35:00Z",
  },
  {
    id: "prov-002",
    user_id: "user-002",

    country: "Togo",
    region: "Plateaux",
    town: "Kpalimé",
    district: "Agomé",

    created_at: "2025-02-01T09:05:00Z",
    updated_at: "2025-02-01T09:05:00Z",
  },
]
