import { get, post, put, patch } from "@/lib/api/core/apifetch";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import {
  StudentRequestDto,
  StudentResponseDto,
  StudentStatusUpdateDto,
  StudentStatus,
} from "./student.types";

const ENDPOINT = "/api/v1/students";

// ── Self-service ─────────────────────────────────────────────

/** Crée une nouvelle inscription pour l'utilisateur courant. */
export const enroll = (request: StudentRequestDto): Promise<StudentResponseDto> =>
  post<StudentRequestDto, StudentResponseDto>(ENDPOINT, request);

/** Récupère les inscriptions de l'utilisateur courant. */
export const getMyEnrollments = (): Promise<StudentResponseDto[]> =>
  get<StudentResponseDto[]>(`${ENDPOINT}/me`);

/** Met à jour une inscription appartenant à l'utilisateur courant. */
export const updateMyEnrollment = (
  studentId: string,
  request: StudentRequestDto
): Promise<StudentResponseDto> =>
  put<StudentRequestDto, StudentResponseDto>(
    `${ENDPOINT}/me/${studentId}`,
    request
  );

// ── Lecture (ABAC : admin tout, staff son département, student lui-même) ──

/** Liste paginée des étudiants, scopée côté back selon le rôle de l'utilisateur. */
export const list = (
  pageRequest?: PageRequest
): Promise<PageResponseDto<StudentResponseDto>> =>
  get<PageResponseDto<StudentResponseDto>>(ENDPOINT, pageRequest);

/** Récupère un étudiant par id (scopé ABAC). */
export const getById = (id: string): Promise<StudentResponseDto> =>
  get<StudentResponseDto>(`${ENDPOINT}/${id}`);

/** Liste paginée des étudiants filtrés par statut. */
export const getByStatus = (
  status: StudentStatus,
  pageRequest?: PageRequest
): Promise<PageResponseDto<StudentResponseDto>> =>
  get<PageResponseDto<StudentResponseDto>>(
    `${ENDPOINT}/status/${status}`,
    pageRequest
  );

/** Liste paginée des étudiants d'une école donnée. */
export const getBySchool = (
  schoolId: string,
  pageRequest?: PageRequest
): Promise<PageResponseDto<StudentResponseDto>> =>
  get<PageResponseDto<StudentResponseDto>>(
    `${ENDPOINT}/school/${schoolId}`,
    pageRequest
  );

/** Liste paginée des étudiants d'une promotion donnée. */
export const getByPromotion = (
  promotionId: string,
  pageRequest?: PageRequest
): Promise<PageResponseDto<StudentResponseDto>> =>
  get<PageResponseDto<StudentResponseDto>>(
    `${ENDPOINT}/promotion/${promotionId}`,
    pageRequest
  );

/** Recherche paginée d'étudiants par terme libre. */
export const search = (
  term: string,
  pageRequest?: PageRequest
): Promise<PageResponseDto<StudentResponseDto>> =>
  get<PageResponseDto<StudentResponseDto>>(`${ENDPOINT}/search`, {
    term,
    ...pageRequest,
  });

// ── Administration ───────────────────────────────────────────

/** Met à jour le statut d'un étudiant (validation, refus, etc.). */
export const updateStatus = (
  id: string,
  dto: StudentStatusUpdateDto
): Promise<StudentResponseDto> =>
  patch<StudentStatusUpdateDto, StudentResponseDto>(
    `${ENDPOINT}/${id}/status`,
    dto
  );

/** Assigne un étudiant à une promotion. */
export const assignPromotion = (
  id: string,
  promotionId: string
): Promise<StudentResponseDto> =>
  patch<undefined, StudentResponseDto>(
    `${ENDPOINT}/${id}/promotion/${promotionId}`
  );