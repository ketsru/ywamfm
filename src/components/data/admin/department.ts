import { Department } from "@/types/admin/department"

export const departmentsData: Department[] = [
  {
    id: "1sdjkm",
    nom: "Maçonnerie",
    description: "Travaux de construction, fondations, murs et dalles.",
    image: "/assets/images/0af7741991985e2b530c8f62135c3eea.jpg",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-01-01",
  },
  {
    id: "2dkjs",
    nom: "Plomberie",
    description: "Installation et réparation des systèmes d’eau et sanitaires.",
    image: "/assets/books/cover/8d2bea04d7ee666ab74e47084cf707ad.jpg",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-01-01",
  },
  {
    id: "3sdm",
    nom: "Électricité",
    description: "Câblage, installation électrique et maintenance.",
    image: "/assets/images/0af7741991985e2b530c8f62135c3eea.jpg",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-01-01",
  },
  {
    id: "4smls",
    nom: "Menuiserie",
    description: "Fabrication et pose de meubles, portes et fenêtres.",
    image: "/assets/books/cover/8d2bea04d7ee666ab74e47084cf707ad.jpg",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-01-01",
  },
  {
    id: "5vdlqsk",
    nom: "Peinture",
    description: "Peinture intérieure et extérieure, finitions décoratives.",
    image: "/assets/images/0af7741991985e2b530c8f62135c3eea.jpg",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-01-01",
  },
  {
    id: "6slvksq",
    nom: "Carrelage",
    description: "Pose de carreaux pour sols et murs.",
    image: "/assets/books/cover/8d2bea04d7ee666ab74e47084cf707ad.jpg",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-01-01",
  },
  {
    id: "7svlskqv",
    nom: "Climatisation",
    description: "Installation et entretien de systèmes de climatisation.",
    image: "/assets/images/0af7741991985e2b530c8f62135c3eea.jpg",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-01-01",
  },
]

export const getDepartmentNameById = (id: string): string => {
  return departmentsData.find(dep => dep.id === id)?.nom ?? "—"
}
