import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "@/lib/types/access/auth/auth.service";
import { setToken } from "@/lib/types/access/auth/token";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await authService.login({ email, password });

      setToken(res.token);
      // Pré-alimente useMe() → pas de refetch, navbar s'affiche immédiatement
      queryClient.setQueryData(["users", "me"], res.user);

      return res.user;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Erreur de connexion.";
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};