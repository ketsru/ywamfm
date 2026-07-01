import { useQueryClient } from "@tanstack/react-query";
import { setToken } from "@/lib/types/access/auth/token";
import { LoginResponse } from "@/lib/types/access/auth/auth.types";
import { mapLoginResponse } from "@/lib/types/access/auth/auth.mapper"; // ← adapte le chemin réel

export const useLogin = () => {
  const queryClient = useQueryClient();

  const finalizeSession = (res: LoginResponse) => {
    const { token, user } = mapLoginResponse(res);

    setToken(token);
    queryClient.setQueryData(["users", "me"], user);

    return user;
  };

  return { finalizeSession };
};