import { get, del, postFormData, putFormData, patch } from "@/lib/api/core/apifetch";
import { buildMultipartFormData } from "@/lib/api/core/form-data.util";
import {
  PublishSchool,
  PublishSchoolRequest,
  PublishSchoolFilters,
  PublishSchoolBySchoolFilters,
} from "./publish-school.types";

const ENDPOINT = "/api/v1/schools/publications";

const toLocalDateTime = (value: string, endOfDay = false): string => {
  if (!value) return value;
  if (value.includes("T")) return value;
  return `${value}T${endOfDay ? "23:59:59" : "00:00:00"}`;
};

const normalizeRequest = (data: PublishSchoolRequest): PublishSchoolRequest => ({
  ...data,
  startDate: toLocalDateTime(data.startDate),
  endDate:   toLocalDateTime(data.endDate, true),
});

export const createPublishSchool = (data: PublishSchoolRequest): Promise<PublishSchool> =>
  postFormData<PublishSchool>(ENDPOINT, buildMultipartFormData(normalizeRequest(data)));

export const getPublishSchoolById = (id: string): Promise<PublishSchool> =>
  get<PublishSchool>(`${ENDPOINT}/${id}`);

export const getAllPublishSchools = (filters?: PublishSchoolFilters): Promise<PublishSchool[]> => {
  const params: Record<string, unknown> = {};
  if (filters?.status)      params.status = filters.status;
  else if (filters?.active) params.active = true;
  return get<PublishSchool[]>(ENDPOINT, params);
};

export const getPublishSchoolsBySchool = (
  schoolId: string,
  filters?: PublishSchoolBySchoolFilters
): Promise<PublishSchool[]> =>
  get<PublishSchool[]>(`${ENDPOINT}/school/${schoolId}`, {
    ...(filters?.status && { status: filters.status }),
  });

export const getPublishSchoolsByPromotion = (promotionId: string): Promise<PublishSchool[]> =>
  get<PublishSchool[]>(`${ENDPOINT}/promotion/${promotionId}`);

export const updatePublishSchool = (
  id: string,
  data: PublishSchoolRequest
): Promise<PublishSchool> =>
  putFormData<PublishSchool>(`${ENDPOINT}/${id}`, buildMultipartFormData(normalizeRequest(data)));

export const updatePublishSchoolImage = (id: string, image: File): Promise<PublishSchool> => {
  const formData = new FormData();
  formData.append("image", image);
  return patch(`${ENDPOINT}/${id}/image`, formData) as Promise<PublishSchool>;
};

export const deletePublishSchool = (id: string): Promise<void> =>
  del<void>(`${ENDPOINT}/${id}`);