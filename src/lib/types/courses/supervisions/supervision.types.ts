// @/lib/types/school/supervision/supervision.types.ts

export interface SupervisionResponseDto {
  id: string;

  studentId: string;
  studentFirstName: string;
  studentLastName: string;

  supervisorId: string;
  supervisorFirstName: string;
  supervisorLastName: string;

  promotionId: string;
  promotionName: string;

  active: boolean;

  createdAt: string;
}

export interface SupervisionAssignRequest {
  studentId: string;    // Student.id (pas User.id)
  supervisorId: string; // User.id du staff
  promotionId: string;
}