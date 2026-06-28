import { authService } from "@/lib/types/users/auth/auth.service";
import { useState } from "react";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async (data: any) => {
    setLoading(true);
    try {
      await authService.register(data);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};