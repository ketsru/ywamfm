export const TOKEN_KEY = "auth_token"; // ← une seule source de vérité

export const ENV = {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8084",
    TOKEN_GETTER: () =>
        typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null,
    TOKEN_SETTER: (token: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(TOKEN_KEY, token);
        }
    },
    TOKEN_CLEARER: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(TOKEN_KEY);
        }
    },
};