"use client";

import { UnauthorizedError } from "@/lib/api/core/http-errors";
import { CurrentUser } from "@/lib/types/users/user/currentUser";
import { UserService } from "@/lib/types/users/user/user.service";
import { ENV } from "@/lib/config/env";
import { useEffect, useState, useCallback } from "react";

interface UseCurrentUserResult {
    user:    CurrentUser | null;
    loading: boolean;
    error:   unknown;
    refresh: () => Promise<void>;
}

export function useCurrentUser(): UseCurrentUserResult {
    const [user,    setUser]    = useState<CurrentUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState<unknown>(null);

    const fetchUser = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const currentUser = await UserService.getMe();
            setUser(currentUser);
        } catch (err) {
            if (err instanceof UnauthorizedError) {
                ENV.TOKEN_CLEARER(); // token expiré/invalide — on l'efface pour éviter une boucle de 401
                setUser(null);
            } else {
                setError(err);
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { user, loading, error, refresh: fetchUser };
}