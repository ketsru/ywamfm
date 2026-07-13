import { get, post, put, patch } from "@/lib/api/core/apifetch";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import {
  StaffProfileRequestDto,
  StaffProfileResponseDto,
  StaffType,
} from "./staff.types";

const ENDPOINT = "/api/v1/staff-profiles";

// ── Self-service ─────────────────────────────────────────────

/** Crée une nouvelle affectation pour l'utilisateur courant. */
export const create = (
  request: StaffProfileRequestDto
): Promise<StaffProfileResponseDto> =>
  post<StaffProfileRequestDto, StaffProfileResponseDto>(ENDPOINT, request);

/** Récupère les affectations (staff profiles) de l'utilisateur courant. */
export const getMyStaffProfiles = (): Promise<StaffProfileResponseDto[]> =>
  get<StaffProfileResponseDto[]>(`${ENDPOINT}/me`);

/** Met à jour une affectation appartenant à l'utilisateur courant. */
export const updateMyStaffProfile = (
  id: string,
  request: StaffProfileRequestDto
): Promise<StaffProfileResponseDto> =>
  put<StaffProfileRequestDto, StaffProfileResponseDto>(
    `${ENDPOINT}/me/${id}`,
    request
  );

// ── Lecture (ABAC : admin tout, staff son département, agent lui-même) ──

/** Liste paginée des staff profiles, scopée côté back selon le rôle. */
export const list = (
  pageRequest?: PageRequest
): Promise<PageResponseDto<StaffProfileResponseDto>> =>
  get<PageResponseDto<StaffProfileResponseDto>>(ENDPOINT, pageRequest);

/** Récupère un staff profile par id (scopé ABAC). */
export const getById = (id: string): Promise<StaffProfileResponseDto> =>
  get<StaffProfileResponseDto>(`${ENDPOINT}/${id}`);

/** Liste paginée des staff profiles d'un département donné. */
export const getByDepartment = (
  departmentId: string,
  pageRequest?: PageRequest
): Promise<PageResponseDto<StaffProfileResponseDto>> =>
  get<PageResponseDto<StaffProfileResponseDto>>(
    `${ENDPOINT}/department/${departmentId}`,
    pageRequest
  );

/** Liste paginée des staff profiles filtrés par type (plein temps / temps partiel). */
export const getByType = (
  type: StaffType,
  pageRequest?: PageRequest
): Promise<PageResponseDto<StaffProfileResponseDto>> =>
  get<PageResponseDto<StaffProfileResponseDto>>(
    `${ENDPOINT}/type/${type}`,
    pageRequest
  );

/** Recherche paginée de staff profiles par terme libre. */
export const search = (
  term: string,
  pageRequest?: PageRequest
): Promise<PageResponseDto<StaffProfileResponseDto>> =>
  get<PageResponseDto<StaffProfileResponseDto>>(`${ENDPOINT}/search`, {
    term,
    ...pageRequest,
  });

// ── Administration ───────────────────────────────────────────

/** Met à jour la décision du parcours local (validation + liste). */
export const updateParcoursDecision = (
  id: string,
  dto: Pick<StaffProfileRequestDto, "decisionParcours" | "parcoursList">
): Promise<StaffProfileResponseDto> =>
  patch<typeof dto, StaffProfileResponseDto>(
    `${ENDPOINT}/${id}/parcours`,
    dto
  );

/** Met à jour la décision du parcours YWAM (validation + liste). */
export const updateYwamParcoursDecision = (
  id: string,
  dto: Pick<
    StaffProfileRequestDto,
    "ywamDecisionParcours" | "ywamParcoursList"
  >
): Promise<StaffProfileResponseDto> =>
  patch<typeof dto, StaffProfileResponseDto>(
    `${ENDPOINT}/${id}/ywam-parcours`,
    dto
  );

/** Réaffecte un staff profile à un autre département. */
export const assignDepartment = (
  id: string,
  departmentId: string
): Promise<StaffProfileResponseDto> =>
  patch<undefined, StaffProfileResponseDto>(
    `${ENDPOINT}/${id}/department/${departmentId}`
  );