// src/types/users/currentUser.ts

import { UserResponseDto } from "./user.types";

/**
 * Représente l'utilisateur connecté côté client.
 * Actuellement identique à UserResponseDTO + un champ `token` optionnel
 * (conservé pour compat si un endpoint renvoie un token ponctuel, ex. 2FA).
 */
export type CurrentUser = UserResponseDto & {
    token?: string;
};