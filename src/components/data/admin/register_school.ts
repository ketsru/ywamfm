import { RegisterSchool } from "@/types/admin/register_school"

export const registerSchoolData: RegisterSchool[] = [
  {
    id: "act-001",
    departement_id: "1sdjkm", // Maçonnerie
    nom: "Initiation à la maçonnerie",
    type: "En présentielle",
    categorie: "Gratuite",
    prix: null,
    status: "En cours",
    duree: 40,
    created_at: "2025-01-10",
    updated_at: "2025-01-15",
  },
  {
    id: "act-002",
    departement_id: "2dkjs", // Plomberie
    nom: "Installation sanitaire moderne",
    type: "En présentielle",
    categorie: "Payante",
    prix: 75000,
    status: "En attente",
    duree: 60,
    created_at: "2025-01-12",
    updated_at: "2025-01-12",
  },
  {
    id: "act-003",
    departement_id: "3sdm", // Électricité
    nom: "Bases de l’électricité domestique",
    type: "En ligne",
    categorie: "Gratuite",
    prix: null,
    status: "Terminée",
    duree: 30,
    created_at: "2024-12-01",
    updated_at: "2024-12-30",
  },
  {
    id: "act-004",
    departement_id: "4smls", // Menuiserie
    nom: "Fabrication de meubles en bois",
    type: "En présentielle",
    categorie: "Payante",
    prix: 120000,
    status: "En cours",
    duree: 80,
    created_at: "2025-01-05",
    updated_at: "2025-01-18",
  },
  {
    id: "act-005",
    departement_id: "5vdlqsk", // Peinture
    nom: "Techniques de peinture décorative",
    type: "En ligne",
    categorie: "Payante",
    prix: 50000,
    status: "En attente",
    duree: 25,
    created_at: "2025-01-20",
    updated_at: "2025-01-20",
  },
  {
    id: "act-006",
    departement_id: "6slvksq", // Carrelage
    nom: "Pose professionnelle de carrelage",
    type: "En présentielle",
    categorie: "Gratuite",
    prix: null,
    status: "Annulée",
    duree: 35,
    created_at: "2025-01-08",
    updated_at: "2025-01-09",
  },
]
