
import { ENV } from "@/lib/config/env";
import { ApiResponse } from "./api.types";
import {
    ConflictError, ForbiddenError, HttpError, NotFoundError, ServerError,
    UnauthorizedError, ValidationError,
} from "./http-errors";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchOptions = {
    method?: HttpMethod;
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
    body?: unknown;
    retry?: number;
    retryDelayMs?: number;
};

const buildUrl = (path: string, params?: Record<string, unknown>) => {
    const url = new URL(path, ENV.API_BASE_URL);
    if (params) {
        Object.entries(params)
            .filter(([, v]) => v !== undefined && v !== null)
            .forEach(([k, v]) => url.searchParams.append(k, String(v)));
    }
    return url.toString();
};

const isNoContentStatus = (status: number) =>
    status === 204 || status === 202;

export async function apiFetch<T>(path: string, opts: FetchOptions = {}): Promise<T> {
    const {
        method = "GET",
        headers = {},
        params,
        body,
    } = opts;

    const token = ENV.TOKEN_GETTER();
    const url   = buildUrl(path, params);

    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    let json: ApiResponse<T> | undefined;
    try { json = await res.json(); } catch { /* corps vide ou non-JSON */ }

    if (!res.ok) {
        const msg = json?.message ?? res.statusText;
        switch (res.status) {
            case 400: throw new ValidationError(msg || "Erreur de validation", json?.errors ?? []);
            case 401: throw new UnauthorizedError(msg || "Non authentifié");
            case 403: throw new ForbiddenError(msg || "Accès interdit");
            case 404: throw new NotFoundError(msg || "Ressource inexistante");
            case 409: throw new ConflictError(msg || "Conflit métier");
            case 500: throw new ServerError(msg || "Erreur serveur");
            default:  throw new HttpError(msg || "Erreur HTTP", res.status, json);
        }
    }

    if (isNoContentStatus(res.status) || !json) {
        return undefined as unknown as T;
    }

    if (json.success === true && json.data === null) {
        return undefined as unknown as T;
    }

    if (!json.success) {
        if (res.status === 400 && json.errors) {
            throw new ValidationError(json.message || "Erreur de validation", json.errors);
        }
        throw new HttpError(json.message || "Erreur API", res.status, json);
    }

    return json.data as T;
}

// ── Helpers CRUD ──────────────────────────────────────────────────────────────

export const get = <T>(path: string, params?: Record<string, unknown>) =>
    apiFetch<T>(path, { method: "GET", params });

export const post = <TReq, TRes>(
    path: string,
    body: TReq,
    options?: Omit<FetchOptions, "method" | "body">
) =>
    apiFetch<TRes>(path, { method: "POST", body, ...options });

export const put = <TReq, TRes>(path: string, body: TReq) =>
    apiFetch<TRes>(path, { method: "PUT", body });

export const patch = <TReq, TRes>(path: string, body?: TReq) =>
    apiFetch<TRes>(path, { method: "PATCH", body });

export const del = <T>(path: string) =>
    apiFetch<T>(path, { method: "DELETE" });

/**
 * Envoi multipart/form-data — bypasse apiFetch pour éviter :
 * 1. JSON.stringify() sur un FormData
 * 2. Le header Content-Type: application/json
 *
 * Le Content-Type multipart/form-data + boundary est automatiquement
 * défini par le navigateur quand on ne le spécifie pas explicitement.
 */
export async function postFormData<TRes>(path: string, formData: FormData): Promise<TRes> {
    const token = ENV.TOKEN_GETTER();
    const url   = buildUrl(path);

    const res = await fetch(url, {
        method: "POST",
        headers: {
            // NE PAS ajouter Content-Type ici —
            // le navigateur le génère automatiquement avec le boundary correct
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
    });

    let json: ApiResponse<TRes> | undefined;
    try { json = await res.json(); } catch { /* corps vide */ }

    if (!res.ok) {
        const msg = json?.message ?? res.statusText;
        switch (res.status) {
            case 400: throw new ValidationError(msg || "Erreur de validation", json?.errors ?? []);
            case 401: throw new UnauthorizedError(msg || "Non authentifié");
            case 403: throw new ForbiddenError(msg || "Accès interdit");
            case 404: throw new NotFoundError(msg || "Ressource inexistante");
            case 409: throw new ConflictError(msg || "Conflit métier");
            case 500: throw new ServerError(msg || "Erreur serveur");
            default:  throw new HttpError(msg || "Erreur HTTP", res.status, json);
        }
    }

    if (isNoContentStatus(res.status) || !json) {
        return undefined as unknown as TRes;
    }

    if (json.success === true && json.data === null) {
        return undefined as unknown as TRes;
    }

    if (!json.success) {
        if (res.status === 400 && json.errors) {
            throw new ValidationError(json.message || "Erreur de validation", json.errors);
        }
        throw new HttpError(json.message || "Erreur API", res.status, json);
    }

    return json.data as TRes;
}

export async function putFormData<TRes>(path: string, formData: FormData): Promise<TRes> {
    const token = ENV.TOKEN_GETTER();
    const url   = buildUrl(path);

    const res = await fetch(url, {
        method: "PUT",
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
    });

    let json: ApiResponse<TRes> | undefined;
    try { json = await res.json(); } catch { /* corps vide */ }

    if (!res.ok) {
        const msg = json?.message ?? res.statusText;
        switch (res.status) {
            case 400: throw new ValidationError(msg || "Erreur de validation", json?.errors ?? []);
            case 401: throw new UnauthorizedError(msg || "Non authentifié");
            case 403: throw new ForbiddenError(msg || "Accès interdit");
            case 404: throw new NotFoundError(msg || "Ressource inexistante");
            case 409: throw new ConflictError(msg || "Conflit métier");
            case 500: throw new ServerError(msg || "Erreur serveur");
            default:  throw new HttpError(msg || "Erreur HTTP", res.status, json);
        }
    }

    if (isNoContentStatus(res.status) || !json) {
        return undefined as unknown as TRes;
    }

    if (json.success === true && json.data === null) {
        return undefined as unknown as TRes;
    }

    if (!json.success) {
        if (res.status === 400 && json.errors) {
            throw new ValidationError(json.message || "Erreur de validation", json.errors);
        }
        throw new HttpError(json.message || "Erreur API", res.status, json);
    }

    return json.data as TRes;
}

export async function patchFormData<TRes>(path: string, formData: FormData): Promise<TRes> {
    const token = ENV.TOKEN_GETTER();
    const url   = buildUrl(path);

    const res = await fetch(url, {
        method: "PATCH",
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
    });

    let json: ApiResponse<TRes> | undefined;
    try { json = await res.json(); } catch { /* corps vide */ }

    if (!res.ok) {
        const msg = json?.message ?? res.statusText;
        switch (res.status) {
            case 400: throw new ValidationError(msg || "Erreur de validation", json?.errors ?? []);
            case 401: throw new UnauthorizedError(msg || "Non authentifié");
            case 403: throw new ForbiddenError(msg || "Accès interdit");
            case 404: throw new NotFoundError(msg || "Ressource inexistante");
            case 409: throw new ConflictError(msg || "Conflit métier");
            case 500: throw new ServerError(msg || "Erreur serveur");
            default:  throw new HttpError(msg || "Erreur HTTP", res.status, json);
        }
    }

    if (isNoContentStatus(res.status) || !json) {
        return undefined as unknown as TRes;
    }

    if (json.success === true && json.data === null) {
        return undefined as unknown as TRes;
    }

    if (!json.success) {
        if (res.status === 400 && json.errors) {
            throw new ValidationError(json.message || "Erreur de validation", json.errors);
        }
        throw new HttpError(json.message || "Erreur API", res.status, json);
    }

    return json.data as TRes;
}