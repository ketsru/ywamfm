// src/hooks/use-action.ts
//
// Hook wrapper pour les actions async (mutations, form submit, etc.)
// Gère automatiquement :
//   - le state de chargement (isPending)
//   - le toast de succès
//   - le toast d'erreur via handleApiError
//   - le bouton "Réessayer" sur les ServerError
//
// Usage minimal :
//   const { execute, isPending } = useAction(loginUser, {
//     onSuccess: () => router.push("/dashboard"),
//     successMessage: "Connexion réussie",
//   });
//   <button onClick={() => execute({ email, password })} disabled={isPending}>
//
// Usage avec React Hook Form (injection des erreurs de champ) :
//   const form = useForm<RegisterDto>();
//   const { execute, isPending } = useAction(registerUser, {
//     setError: form.setError,
//     successMessage: "Compte créé avec succès",
//   });

"use client";

import { useCallback, useRef, useState } from "react";
import { handleApiError, handleApiSuccess } from "@/lib/api/handles/handle-api-error";
import { ServerError } from "@/lib/api/core/http-errors";
import { toast } from "sonner";

// ── Types ──────────────────────────────────────────────────────────────────────

type UseActionOptions<TInput, TOutput> = {
    /** Message affiché dans le toast.success après une exécution réussie. */
    successMessage?: string;

    /** Description optionnelle sous le toast de succès. */
    successDescription?: string;

    /**
     * Callback appelé quand l'action réussit.
     * Reçoit le résultat retourné par l'action.
     */
    onSuccess?: (data: TOutput) => void | Promise<void>;

    /**
     * Callback appelé quand l'action échoue.
     * Reçoit l'erreur brute.
     */
    onError?: (err: unknown) => void;

    /**
     * Si fourni (React Hook Form), les ValidationError avec champ
     * seront injectées dans le formulaire.
     */
    setError?: (field: string, error: { type: string; message: string }) => void;

    /**
     * Message de fallback si l'API ne retourne pas de message d'erreur.
     */
    fallbackErrorMessage?: string;
};

type UseActionReturn<TInput> = {
    /** Lance l'action avec les paramètres fournis. */
    execute: (input: TInput) => Promise<void>;
    /** True pendant l'exécution de l'action. */
    isPending: boolean;
};

// ── Hook ───────────────────────────────────────────────────────────────────────

/**
 * Wrappe une action async et gère automatiquement le loading state,
 * les toasts de succès et d'erreur.
 *
 * @param action  Fonction async à exécuter (service call, mutation…)
 * @param options Configuration des messages et callbacks
 */
export function useAction<TInput, TOutput>(
    action: (input: TInput) => Promise<TOutput>,
    options: UseActionOptions<TInput, TOutput> = {}
): UseActionReturn<TInput> {
    const {
        successMessage,
        successDescription,
        onSuccess,
        onError,
        setError,
        fallbackErrorMessage,
    } = options;

    const [isPending, setIsPending] = useState(false);

    // On garde une ref vers le dernier input pour le bouton "Réessayer"
    const lastInputRef = useRef<TInput | undefined>(undefined);

    const execute = useCallback(
        async (input: TInput) => {
            lastInputRef.current = input;
            setIsPending(true);

            try {
                const data = await action(input);

                // Succès
                if (successMessage) {
                    handleApiSuccess(successMessage, successDescription);
                }
                await onSuccess?.(data);
            } catch (err) {
                // ServerError : on ajoute le bouton "Réessayer"
                if (err instanceof ServerError) {
                    const msg = err.message?.trim()
                        ? err.message
                        : fallbackErrorMessage ?? "Une erreur serveur est survenue. Réessayez dans quelques instants.";

                    toast.error(msg, {
                        description: "Notre équipe a été notifiée.",
                        action: {
                            label: "Réessayer",
                            onClick: () => {
                                if (lastInputRef.current !== undefined) {
                                    execute(lastInputRef.current);
                                }
                            },
                        },
                    });
                } else {
                    handleApiError(err, {
                        setError,
                        fallbackMessage: fallbackErrorMessage,
                    });
                }

                onError?.(err);
            } finally {
                setIsPending(false);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [action, successMessage, successDescription, onSuccess, onError, setError, fallbackErrorMessage]
    );

    return { execute, isPending };
}