import { get, del, postFormData, putFormData, patch } from "@/lib/api/core/apifetch";
import { buildMultipartFormData } from "@/lib/api/core/form-data.util";
import { PageRequest, PageResponseDto } from "@/lib/api/core/api.types";
import { ArticleFilters, Article, ArticleRequest } from "./blog.types";

const ENDPOINT = "/api/v1/articles";

// ── Public ────────────────────────────────────────────────────
export const getPublishedArticles = (
  filters?: ArticleFilters,
  pageRequest?: PageRequest
): Promise<PageResponseDto<Article>> =>
  get<PageResponseDto<Article>>(`${ENDPOINT}/public`, {
    ...(filters?.type && { type: filters.type }),
    ...(pageRequest?.page !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size !== undefined && { size: pageRequest.size }),
  });

export const getArticleBySlug = (slug: string): Promise<Article> =>
  get<Article>(`${ENDPOINT}/public/${slug}`);

// ── Administration ────────────────────────────────────────────
export const getAllArticles = (
  filters?: ArticleFilters,
  pageRequest?: PageRequest
): Promise<PageResponseDto<Article>> =>
  get<PageResponseDto<Article>>(ENDPOINT, {
    ...(filters?.type && { type: filters.type }),
    ...(pageRequest?.page !== undefined && { page: pageRequest.page }),
    ...(pageRequest?.size !== undefined && { size: pageRequest.size }),
  });

export const getArticleById = (id: string): Promise<Article> =>
  get<Article>(`${ENDPOINT}/${id}`);

export const createArticle = (data: ArticleRequest): Promise<Article> =>
  postFormData<Article>(ENDPOINT, buildMultipartFormData(data));

export const updateArticle = (id: string, data: ArticleRequest): Promise<Article> =>
  putFormData<Article>(`${ENDPOINT}/${id}`, buildMultipartFormData(data));

export const updateArticleImage = (id: string, image: File): Promise<Article> => {
  const formData = new FormData();
  formData.append("image", image);
  return patch(`${ENDPOINT}/${id}/image`, formData) as Promise<Article>;
};

export const toggleArticlePublish = (id: string): Promise<Article> =>
  patch(`${ENDPOINT}/${id}/publish`, {}) as Promise<Article>;

export const deleteArticle = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);