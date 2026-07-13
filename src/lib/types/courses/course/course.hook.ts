"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from "@tanstack/react-query";

import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "./course.service";

import { type PageRequest, type PageResponseDto } from "@/lib/api/core/api.types";
import {
  type CourseListItem,
  type CourseDetail,
  type CourseRequest,
  type CourseFilters,
} from "./course.types";

export const courseKeys = {
  all: ["courses"] as const,
  lists: () => [...courseKeys.all, "list"] as const,
  list: (filters?: CourseFilters, pageRequest?: PageRequest) =>
    [...courseKeys.lists(), filters ?? {}, pageRequest ?? {}] as const,
  details: () => [...courseKeys.all, "detail"] as const,
  detail: (id: string) => [...courseKeys.details(), id] as const,
};

export function useCoursesQuery(
  filters?: CourseFilters,
  pageRequest?: PageRequest
): UseQueryResult<PageResponseDto<CourseListItem>, Error> {
  return useQuery({
    queryKey: courseKeys.list(filters, pageRequest),
    queryFn: () => getAllCourses(filters, pageRequest),
  });
}

export function useCourseQuery(
  id: string | undefined
): UseQueryResult<CourseDetail, Error> {
  return useQuery({
    queryKey: courseKeys.detail(id ?? ""),
    queryFn: () => getCourseById(id!),
    enabled: !!id,
  });
}

export function useCreateCourse(): UseMutationResult<
  CourseListItem,
  Error,
  CourseRequest
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
    },
  });
}

export function useUpdateCourse(): UseMutationResult<
  CourseDetail,
  Error,
  { id: string; data: CourseRequest }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateCourse(id, data),
    onSuccess: (_updated, { id }) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(id) });
    },
  });
}

export function useDeleteCourse(): UseMutationResult<
  void,
  Error,
  string
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
    },
  });
}