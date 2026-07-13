import { get, post, del, patch } from "@/lib/api/core/apifetch";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import { Testimony, TestimonyRequest } from "./testimony.types";

const ENDPOINT = "/api/v1/testimonies";

// ── Public ────────────────────────────────────────────────────
export const getApprovedTestimonies = (
  pageRequest?: PageRequest
): Promise<PageResponseDto<Testimony>> =>
  get<PageResponseDto<Testimony>>(`${ENDPOINT}/public`, {
    ...(pageRequest?.page !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size !== undefined && { size: pageRequest.size }),
  });

export const getTestimoniesByCourse = (courseId: string): Promise<Testimony[]> =>
  get<Testimony[]>(`${ENDPOINT}/public/course/${courseId}`);

// ── Self-service ──────────────────────────────────────────────
export const submitTestimony = (data: TestimonyRequest): Promise<Testimony> =>
  post<TestimonyRequest, Testimony>(ENDPOINT, data);

export const getMyTestimonies = (
  pageRequest?: PageRequest
): Promise<PageResponseDto<Testimony>> =>
  get<PageResponseDto<Testimony>>(`${ENDPOINT}/me`, {
    ...(pageRequest?.page !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size !== undefined && { size: pageRequest.size }),
  });

export const deleteMyTestimony = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/me/${id}`);

// ── Administration ────────────────────────────────────────────
export const getAllTestimonies = (
  pageRequest?: PageRequest
): Promise<PageResponseDto<Testimony>> =>
  get<PageResponseDto<Testimony>>(ENDPOINT, {
    ...(pageRequest?.page !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size !== undefined && { size: pageRequest.size }),
  });

export const getTestimonyById = (id: string): Promise<Testimony> =>
  get<Testimony>(`${ENDPOINT}/${id}`);

export const approveTestimony = (id: string): Promise<Testimony> =>
  patch(`${ENDPOINT}/${id}/approve`, {}) as Promise<Testimony>;

export const rejectTestimony = (id: string): Promise<Testimony> =>
  patch(`${ENDPOINT}/${id}/reject`, {}) as Promise<Testimony>;

export const adminDeleteTestimony = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);