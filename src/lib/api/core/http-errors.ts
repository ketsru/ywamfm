// src/api/core/http-errors.ts

export class HttpError extends Error {
    constructor(
        message: string,
        public status: number,
        public body?: unknown
    ) { super(message); }
}

export class ValidationError extends HttpError {
    constructor(message: string, public errors: { field?: string; error: string }[]) {
        super(message, 400, errors);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message = "Non authentifié") { super(message, 401); }
}

export class ForbiddenError extends HttpError {
    constructor(message = "Accès interdit") { super(message, 403); }
}

export class NotFoundError extends HttpError {
    constructor(message = "Ressource inexistante") { super(message, 404); }
}

export class ConflictError extends HttpError {
    constructor(message = "Conflit métier") { super(message, 409); }
}

export class ServerError extends HttpError {
    constructor(message = "Erreur serveur") { super(message, 500); }
}