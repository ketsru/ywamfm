import { get, post, put, patch, del } from "@/lib/api/core/apifetch";
import { ProfileResponseDto, ProfileRequestDto } from "./profile.types";

const BASE = "/api/v1/profiles/me";

export const ProfileService = {
  // Récupérer tous les profils (admin)
  getAll: () =>
    get<ProfileResponseDto[]>(BASE),

  // Récupérer un profil par ID
  getById: (id: string) =>
    get<ProfileResponseDto>(`${BASE}/${id}`),

  // Récupérer le profil lié à un utilisateur
  getByUserId: (userId: string) =>
    get<ProfileResponseDto>(`${BASE}/user/${userId}`),

  // Créer un profil
  create: (body: ProfileRequestDto) =>
    post<ProfileRequestDto, ProfileResponseDto>(BASE, body),

  // Mise à jour complète
  update: (id: string, body: ProfileRequestDto) =>
    put<ProfileRequestDto, ProfileResponseDto>(`${BASE}/${id}`, body),

  // Mise à jour partielle
  partialUpdate: (id: string, body: Partial<ProfileRequestDto>) =>
    patch<Partial<ProfileRequestDto>, ProfileResponseDto>(`${BASE}/${id}`, body),

  // Suppression
  delete: (id: string) =>
    del<void>(`${BASE}/${id}`),

  getMe: () => get<ProfileResponseDto | null>("/api/v1/profiles/me"),
};