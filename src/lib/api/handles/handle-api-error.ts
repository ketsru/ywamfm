// src/lib/api/handle-api-error.ts
//
// Mappe les erreurs typées (HttpError et sous-classes) vers les toasts Sonner.
// À appeler dans les catch de tes actions / mutations.
//
// Usage basique :
//   try { await post(...) } catch (err) { handleApiError(err) }
//
// Usage avec message de succès (ex. après un post()) :
//   handleApiSuccess("Profil mis à jour avec succès")
//
// Usage avec champs de validation dans un formulaire React Hook Form :
//   handleApiError(err, { setError })

import { toast } from "sonner";
import {
    ConflictError,
    ForbiddenError,
    HttpError,
    NotFoundError,
    ServerError,
    UnauthorizedError,
    ValidationError,
} from "@/lib/api/core/http-errors";

// ── Types ──────────────────────────────────────────────────────────────────────

/** Options passées à handleApiError */
type HandleApiErrorOptions = {
    /**
     * Si fourni (React Hook Form ou équivalent), les erreurs de champ
     * (ValidationError avec field) sont injectées dans le formulaire
     * au lieu d'être listées dans le toast.
     */
    setError?: (field: string, error: { type: string; message: string }) => void;

    /**
     * Message de fallback affiché si l'API ne retourne pas de message.
     * Par défaut : message générique selon le type d'erreur.
     */
    fallbackMessage?: string;
};

// ── Helpers internes ───────────────────────────────────────────────────────────

/**
 * Retourne le libellé du toast d'erreur.
 * Priorité : message API → fallback option → message générique par type.
 */
function resolveMessage(err: HttpError, fallback?: string): string {
    if (err.message && err.message.trim().length > 0) return err.message;
    if (fallback) return fallback;

    if (err instanceof ValidationError)   return "Données invalides. Vérifiez les champs.";
    if (err instanceof UnauthorizedError) return "Session expirée. Veuillez vous reconnecter.";
    if (err instanceof ForbiddenError)    return "Vous n'avez pas les droits pour effectuer cette action.";
    if (err instanceof NotFoundError)     return "La ressource demandée est introuvable.";
    if (err instanceof ConflictError)     return "Cette action entre en conflit avec une règle métier.";
    if (err instanceof ServerError)       return "Une erreur serveur est survenue. Réessayez dans quelques instants.";
    return "Une erreur inattendue est survenue.";
}

// ── Exports principaux ─────────────────────────────────────────────────────────

/**
 * Affiche un toast de succès avec le message fourni.
 * À appeler après une action réussie.
 */
export function handleApiSuccess(message: string, description?: string) {
    toast.success(message, { description });
}

/**
 * Intercepte une erreur, mappe son type et affiche le toast Sonner approprié.
 *
 * - ValidationError  → toast.error avec liste des champs OU injection setError()
 * - UnauthorizedError → toast.warning (invite à se reconnecter)
 * - ForbiddenError   → toast.error (accès refusé)
 * - NotFoundError    → toast.error (ressource introuvable)
 * - ConflictError    → toast.warning (conflit métier, ex. email déjà utilisé)
 * - ServerError      → toast.error avec action "Réessayer"
 * - Erreur inconnue  → toast.error générique
 */
export function handleApiError(
    err: unknown,
    options: HandleApiErrorOptions = {}
): void {
    const { setError, fallbackMessage } = options;

    // ── Erreur non-HTTP (réseau, timeout, etc.) ────────────────────────────
    if (!(err instanceof HttpError)) {
        console.error("[EK-BUILD] Erreur réseau ou inconnue :", err);
        toast.error(fallbackMessage ?? "Impossible de contacter le serveur. Vérifiez votre connexion.");
        return;
    }

    const message = resolveMessage(err, fallbackMessage);

    // ── ValidationError ────────────────────────────────────────────────────
    if (err instanceof ValidationError) {
        const fieldErrors  = err.errors.filter(e => !!e.field);
        const globalErrors = err.errors.filter(e => !e.field);

        // Injection dans le formulaire si setError est fourni
        if (setError && fieldErrors.length > 0) {
            fieldErrors.forEach(({ field, error }) =>
                setError!(field!, { type: "server", message: error })
            );
        }

        // Toast pour les erreurs globales (sans champ) ou si pas de setError
        const errorsToShow = setError ? globalErrors : err.errors;

        if (errorsToShow.length > 0) {
            const description = errorsToShow.map(e =>
                e.field ? `${e.field} : ${e.error}` : e.error
            ).join("\n");
            toast.error(message, { description });
        } else if (!setError) {
            // Aucune erreur de champ à afficher mais validation échouée
            toast.error(message);
        }
        return;
    }

    // ── UnauthorizedError (401) ────────────────────────────────────────────
    if (err instanceof UnauthorizedError) {
        toast.warning(message, {
            description: "Votre session a peut-être expiré.",
            action: {
                label: "Se connecter",
                onClick: () => {
                    // Redirige vers la page de connexion
                    // Adapter selon ton routeur (Next.js router, window.location…)
                    window.location.href = "/auth/login";
                },
            },
        });
        return;
    }

    // ── ForbiddenError (403) ───────────────────────────────────────────────
    if (err instanceof ForbiddenError) {
        toast.error(message, {
            description: "Contactez un administrateur si vous pensez qu'il s'agit d'une erreur.",
        });
        return;
    }

    // ── NotFoundError (404) ────────────────────────────────────────────────
    if (err instanceof NotFoundError) {
        toast.error(message);
        return;
    }

    // ── ConflictError (409) : conflit métier (doublon email, booking, etc.) ─
    if (err instanceof ConflictError) {
        toast.warning(message, {
            description: "Vérifiez les informations saisies ou contactez le support.",
        });
        return;
    }

    // ── ServerError (500) ──────────────────────────────────────────────────
    if (err instanceof ServerError) {
        toast.error(message, {
            description: "Notre équipe a été notifiée.",
            // L'action "Réessayer" est injectée côté useAction (voir ci-dessous)
            // pour pouvoir relancer la requête originale.
        });
        return;
    }

    // ── HttpError générique ────────────────────────────────────────────────
    toast.error(message);
    console.error(`[EK-BUILD] HttpError ${err.status} :`, err);
}