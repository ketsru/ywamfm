// @/lib/types/school/rapport/rapport.types.ts
// CONSTRUIT PAR DÉDUCTION — RapportRequestDto/ResponseDto/DetailResponseDto/GradeRequest
// n'ont pas été fournis. Champs à vérifier/compléter avant utilisation réelle.

export interface RapportResponseDto {
  id: string;
  studentId: string;
  studentFullName?: string;
  schoolId: string;
  schoolName?: string;
  title?: string;
  status?: string; // ex: "SUBMITTED" | "GRADED" | ... — enum réel inconnu
  grade?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface RapportDetailResponseDto extends RapportResponseDto {
  content?: string; // contenu complet du rapport, probablement absent de la liste
  feedback?: string | null; // commentaire du superviseur après notation
}

export interface RapportRequest {
  studentId?: string | null; // forcé à null côté self-service (voir controller: dto.setStudentId(null))
  schoolId: string;
  title?: string;
  content?: string;
}

export interface RapportGradeRequest {
  grade: number;
  feedback?: string;
}