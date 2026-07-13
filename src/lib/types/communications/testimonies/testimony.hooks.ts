import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { Testimony, TestimonyRequest } from "./testimony.types";
import {
  getApprovedTestimonies, getTestimoniesByCourse,
  submitTestimony, getMyTestimonies, deleteMyTestimony,
  getAllTestimonies, getTestimonyById,
  approveTestimony, rejectTestimony, adminDeleteTestimony,
} from "./testimony.service";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";

export const testimonyKeys = {
  all:      ["testimonies"] as const,
  public:   (page?: PageRequest)        => ["testimonies", "public", page] as const,
  byCourse: (courseId: string)          => ["testimonies", "course", courseId] as const,
  mine:     (page?: PageRequest)        => ["testimonies", "me", page] as const,
  list:     (page?: PageRequest)        => ["testimonies", "list", page] as const,
  detail:   (id: string)                => ["testimonies", id] as const,
};

export const useApprovedTestimonies = (
  pageRequest?: PageRequest,
  options?: UseQueryOptions<PageResponseDto<Testimony>>
) =>
  useQuery({
    queryKey: testimonyKeys.public(pageRequest),
    queryFn:  () => getApprovedTestimonies(pageRequest),
    ...options,
  });

export const useTestimoniesByCourse = (
  courseId: string,
  options?: UseQueryOptions<Testimony[]>
) =>
  useQuery({
    queryKey: testimonyKeys.byCourse(courseId),
    queryFn:  () => getTestimoniesByCourse(courseId),
    enabled:  !!courseId,
    ...options,
  });

export const useMyTestimonies = (
  pageRequest?: PageRequest,
  options?: UseQueryOptions<PageResponseDto<Testimony>>
) =>
  useQuery({
    queryKey: testimonyKeys.mine(pageRequest),
    queryFn:  () => getMyTestimonies(pageRequest),
    ...options,
  });

export const useSubmitTestimony = (onSuccess?: (result: Testimony) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TestimonyRequest) => submitTestimony(data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: testimonyKeys.mine() });
      toast.success("Témoignage soumis. Il sera visible après validation.");
      onSuccess?.(result);
    },
    onError: (err) => handleApiError(err, { fallbackMessage: "Erreur lors de la soumission." }),
  });
};

export const useDeleteMyTestimony = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMyTestimony(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testimonyKeys.mine() });
      toast.success("Témoignage supprimé.");
      onSuccess?.();
    },
    onError: (err) => handleApiError(err),
  });
};

export const useAllTestimonies = (
  pageRequest?: PageRequest,
  options?: UseQueryOptions<PageResponseDto<Testimony>>
) =>
  useQuery({
    queryKey: testimonyKeys.list(pageRequest),
    queryFn:  () => getAllTestimonies(pageRequest),
    ...options,
  });

export const useTestimonyById = (
  id: string,
  options?: UseQueryOptions<Testimony>
) =>
  useQuery({
    queryKey: testimonyKeys.detail(id),
    queryFn:  () => getTestimonyById(id),
    enabled:  !!id,
    ...options,
  });

export const useApproveTestimony = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveTestimony(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: testimonyKeys.all });
      queryClient.invalidateQueries({ queryKey: testimonyKeys.detail(id) });
      toast.success("Témoignage approuvé.");
    },
    onError: (err) => handleApiError(err),
  });
};

export const useRejectTestimony = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => rejectTestimony(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: testimonyKeys.all });
      queryClient.invalidateQueries({ queryKey: testimonyKeys.detail(id) });
      toast.success("Témoignage rejeté.");
    },
    onError: (err) => handleApiError(err),
  });
};

export const useAdminDeleteTestimony = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminDeleteTestimony(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testimonyKeys.all });
      toast.success("Témoignage supprimé.");
      onSuccess?.();
    },
    onError: (err) => handleApiError(err),
  });
};