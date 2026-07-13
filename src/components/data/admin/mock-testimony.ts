import { Testimony } from "@/lib/types/communications/testimonies/testimony.types";

export const mockTestimonies: Testimony[] = [
  {
    id: "a3f2c1d4-5678-4b9a-9123-abcdef123456",
    studentName: "Alice Johnson",
    role: "Python Learner",
    rating: 5,
    content: "Le cours était clair et progressif. J’ai pu passer de zéro à écrire mes propres scripts en quelques semaines.",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    courseId: "course-001",
  },
  {
    id: "b7e9d2f1-2345-4c67-8901-fedcba654321",
    studentName: "Mohamed Diallo",
    role: "JavaScript Developer",
    rating: 4,
    content: "Très bonne expérience, surtout les exercices pratiques. J’aurais aimé plus de projets collaboratifs.",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    courseId: "course-002",
  },
  {
    id: "c9a8b7d6-3456-4e78-9012-123456abcdef",
    studentName: "Sophie Martin",
    role: "Data Science Enthusiast",
    rating: 5,
    content: "Les explications sur les algorithmes étaient limpides. J’ai enfin compris comment appliquer le machine learning à mes données.",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    courseId: "course-003",
  },
  {
    id: "d1e2f3a4-4567-4f89-0123-abcdef987654",
    studentName: "Carlos Ramirez",
    role: "React Beginner",
    rating: 3,
    content: "Le contenu est bon mais parfois trop rapide. Quelques vidéos supplémentaires auraient aidé.",
    avatarUrl: "https://randomuser.me/api/portraits/men/15.jpg",
    courseId: null,
  },
  {
    id: "e5f6a7b8-5678-4c90-1234-abcdef654321",
    studentName: "Fatoumata Koné",
    role: "Spring Boot Learner",
    rating: 4,
    content: "J’ai apprécié la partie sur la sécurité et JWT. Les exemples étaient concrets et applicables directement.",
    avatarUrl: null,
    courseId: "course-004",
  },
];
