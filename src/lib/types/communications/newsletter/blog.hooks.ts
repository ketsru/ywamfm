import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import { getPublishedArticles, getArticleBySlug, getAllArticles, getArticleById, createArticle, updateArticle, toggleArticlePublish, deleteArticle } from "./blog.service";
import { ArticleFilters, Article, ArticleRequest } from "./blog.types";

export const articleKeys = {
  all:       ["articles"] as const,
  public:    (filters?: object, page?: PageRequest) => ["articles", "public", filters, page] as const,
  list:      (filters?: object, page?: PageRequest) => ["articles", "list",   filters, page] as const,
  detail:    (id: string)   => ["articles", id]     as const,
  bySlug:    (slug: string) => ["articles", "slug", slug] as const,
};

export const usePublishedArticles = (
  filters?: ArticleFilters,
  pageRequest?: PageRequest,
  options?: UseQueryOptions<PageResponseDto<Article>>
) =>
  useQuery({
    queryKey: articleKeys.public(filters, pageRequest),
    queryFn:  () => getPublishedArticles(filters, pageRequest),
    ...options,
  });

export const useArticleBySlug = (
  slug: string,
  options?: UseQueryOptions<Article>
) =>
  useQuery({
    queryKey: articleKeys.bySlug(slug),
    queryFn:  () => getArticleBySlug(slug),
    enabled:  !!slug,
    ...options,
  });

export const useAllArticles = (
  filters?: ArticleFilters,
  pageRequest?: PageRequest,
  options?: UseQueryOptions<PageResponseDto<Article>>
) =>
  useQuery({
    queryKey: articleKeys.list(filters, pageRequest),
    queryFn:  () => getAllArticles(filters, pageRequest),
    ...options,
  });

export const useArticleById = (
  id: string,
  options?: UseQueryOptions<Article>
) =>
  useQuery({
    queryKey: articleKeys.detail(id),
    queryFn:  () => getArticleById(id),
    enabled:  !!id,
    ...options,
  });

export const useCreateArticle = (onSuccess?: (result: Article) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ArticleRequest) => createArticle(data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: articleKeys.all });
      toast.success("Article créé avec succès.");
      onSuccess?.(result);
    },
    onError: (err) => handleApiError(err, { fallbackMessage: "Erreur lors de la création." }),
  });
};

export const useUpdateArticle = (onSuccess?: (result: Article) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ArticleRequest }) => updateArticle(id, data),
    onSuccess: (result, { id }) => {
      queryClient.invalidateQueries({ queryKey: articleKeys.all });
      queryClient.invalidateQueries({ queryKey: articleKeys.detail(id) });
      toast.success("Article mis à jour.");
      onSuccess?.(result);
    },
    onError: (err) => handleApiError(err, { fallbackMessage: "Erreur lors de la mise à jour." }),
  });
};

export const useToggleArticlePublish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleArticlePublish(id),
    onSuccess: (result, id) => {
      queryClient.invalidateQueries({ queryKey: articleKeys.all });
      queryClient.invalidateQueries({ queryKey: articleKeys.detail(id) });
      toast.success(result.isPublish ? "Article publié." : "Article dépublié.");
    },
    onError: (err) => handleApiError(err),
  });
};

export const useDeleteArticle = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.all });
      toast.success("Article supprimé.");
      onSuccess?.();
    },
    onError: (err) => handleApiError(err, { fallbackMessage: "Erreur lors de la suppression." }),
  });
};