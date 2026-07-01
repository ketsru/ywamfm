// ============================================================
// course.service.ts
// ============================================================

import { get, post, put, del } from "@/lib/api/core/apifetch";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import {
  CourseListItem,
  CourseDetail,
  CourseRequest,
  CourseFilters,
} from "./course.types";

const ENDPOINT = "/api/v1/courses";

// ── CREATE ────────────────────────────────────────────────────
export const createCourse = (data: CourseRequest): Promise<CourseListItem> =>
  post<CourseRequest, CourseListItem>(ENDPOINT, data);

// ── READ ONE (détail complet, avec contenuTexte) ────────────────
export const getCourseById = (id: string): Promise<CourseDetail> =>
  get<CourseDetail>(`${ENDPOINT}/${id}`);

// ── READ ALL (paginé, filtres combinables) ──────────────────────
export const getAllCourses = (
  filters?: CourseFilters,
  pageRequest?: PageRequest
): Promise<PageResponseDto<CourseListItem>> =>
  get<PageResponseDto<CourseListItem>>(ENDPOINT, {
    ...(filters?.promotionId && { promotionId: filters.promotionId }),
    ...(filters?.planningId  && { planningId:  filters.planningId }),
    ...(filters?.search?.trim() && { search: filters.search.trim() }),
    ...(pageRequest?.page !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size !== undefined && { size: pageRequest.size }),
  });

// ── UPDATE (retourne le détail complet) ──────────────────────────
export const updateCourse = (id: string, data: CourseRequest): Promise<CourseDetail> =>
  put<CourseRequest, CourseDetail>(`${ENDPOINT}/${id}`, data);

// ── DELETE ────────────────────────────────────────────────────
export const deleteCourse = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);