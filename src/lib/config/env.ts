// @/lib/config/env.ts
export const TOKEN_KEY = "auth_token"; // ← une seule source de vérité

// env.ts
export const ENV = {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
    TOKEN_GETTER: () =>
        typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null,
};