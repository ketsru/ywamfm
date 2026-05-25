import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileService } from "./profile.service";
import { mapProfileDtoToModel } from "./profile.mapper";
import { ProfileRequestDto } from "./profile.types";

const KEYS = {
  all: ["profiles"] as const,
  me: ["profiles", "me"] as const,   
  detail: (id: string) => ["profiles", id] as const,
  byUser: (userId: string) => ["profiles", "user", userId] as const,
};

export const useMyProfile = () =>
  useQuery({
    queryKey: KEYS.me,
    queryFn: async () => {
      const dto = await ProfileService.getMe(); // GET /api/v1/profiles/me
      return dto ? mapProfileDtoToModel(dto) : null; // null si pas encore de profil
    },
  });

// --- Liste complète (admin) ---
export const useProfiles = () =>
  useQuery({
    queryKey: KEYS.all,
    queryFn: async () => {
      const dtos = await ProfileService.getAll();
      return dtos.map(mapProfileDtoToModel);
    },
  });

// --- Détail par ID ---
export const useProfile = (id: string) =>
  useQuery({
    queryKey: KEYS.detail(id),
    queryFn: async () => {
      const dto = await ProfileService.getById(id);
      return mapProfileDtoToModel(dto);
    },
    enabled: !!id,
  });

// --- Profil par userId ---
export const useProfileByUser = (userId: string) =>
  useQuery({
    queryKey: KEYS.byUser(userId),
    queryFn: async () => {
      const dto = await ProfileService.getByUserId(userId);
      return mapProfileDtoToModel(dto);
    },
    enabled: !!userId,
  });

// --- Création ---
export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ProfileRequestDto) => ProfileService.create(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: KEYS.all }),
  });
};

// --- Mise à jour complète ---
export const useUpdateProfile = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ProfileRequestDto) => ProfileService.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.detail(id) });
    },
  });
};

// --- Mise à jour partielle ---
export const usePatchProfile = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<ProfileRequestDto>) =>
      ProfileService.partialUpdate(id, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: KEYS.detail(id) });
      // Invalide aussi le cache par userId si on le connaît
      queryClient.invalidateQueries({ queryKey: KEYS.byUser(data.userId) });
    },
  });
};

// --- Suppression ---
export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ProfileService.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: KEYS.all }),
  });
};