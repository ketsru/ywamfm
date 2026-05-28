import { post } from "@/lib/api/core/apifetch";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  VerifyOtpRequest,
  ResendOtpRequest,
  CreateManagedAccountRequest,
  CreateManagedAccountResponse,
  ChangePasswordRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
} from "./auth.types";

const BASE = "/api/v1/auth";

export const authService = {
  register: (data: RegisterRequest) =>
    post<RegisterRequest, void>(`${BASE}/register`, data),

  login: (data: LoginRequest) =>
    post<LoginRequest, LoginResponse>(`${BASE}/login`, data),

  verifyOtp: (data: VerifyOtpRequest) =>
    post<VerifyOtpRequest, void>(`${BASE}/verify-otp`, data),

  resendOtp: (data: ResendOtpRequest) =>
    post<ResendOtpRequest, void>(`${BASE}/resend-otp`, data),

  logout: (userId: string) =>
    post<void, void>(`${BASE}/logout`, undefined as unknown as void, {
      headers: { "X-User-Id": userId },
    }),

  // ── Compte managé (créé par un centre de formation) ───────────────
  createManagedAccount: (data: CreateManagedAccountRequest) =>
    post<CreateManagedAccountRequest, CreateManagedAccountResponse>(
      `${BASE}/managed-account`,
      data
    ),

  // ── Changement de mot de passe (premier login prestataire) ────────
  changePassword: (data: ChangePasswordRequest) =>
    post<ChangePasswordRequest, void>(`${BASE}/change-password`, data),

  // À ajouter dans authService si pas encore présent
  requestPasswordReset: (data: PasswordResetRequest) =>
    post<PasswordResetRequest, void>(`${BASE}/password-reset`, data),

  confirmPasswordReset: (data: PasswordResetConfirmRequest) =>
    post<PasswordResetConfirmRequest, void>(`${BASE}/password-reset/confirm`, data),
};