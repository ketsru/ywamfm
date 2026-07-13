import { post } from "@/lib/api/core/apifetch";
import {
  LoginRequest,
  LoginInitResponse,
  VerifyLoginOtpRequest,
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

  // ── Login étape 1 : credentials → OTP envoyé + challengeToken ──────
  login: (data: LoginRequest) =>
    post<LoginRequest, LoginInitResponse>(`${BASE}/login`, data),

  // ── Login étape 2 : challengeToken + code → JWT de session ─────────
  verifyLoginOtp: (data: VerifyLoginOtpRequest) =>
    post<VerifyLoginOtpRequest, LoginResponse>(`${BASE}/verify-login-otp`, data),

  // ── Vérification OTP d'inscription (inchangé) ───────────────────────
verifyOtp: (data: VerifyOtpRequest) =>
  post<VerifyOtpRequest, LoginResponse>(`${BASE}/verify-otp`, data),

  // ── Renvoi OTP : purpose optionnel (REGISTRATION par défaut côté backend) ──
  resendOtp: (data: ResendOtpRequest) =>
    post<ResendOtpRequest, void>(`${BASE}/resend-otp`, data),

  logout: () =>
    post<void, void>(`${BASE}/logout`, undefined as unknown as void),

  // ── Compte managé (créé par un centre de formation) ───────────────
  createManagedAccount: (data: CreateManagedAccountRequest) =>
    post<CreateManagedAccountRequest, CreateManagedAccountResponse>(
      `${BASE}/managed-account`,
      data
    ),

  // ── Changement de mot de passe (premier login prestataire) ────────
  changePassword: (data: ChangePasswordRequest) =>
    post<ChangePasswordRequest, void>(`${BASE}/change-password`, data),

  // ── Corrigé : /password-reset/request (au lieu de /password-reset) ──
  requestPasswordReset: (data: PasswordResetRequest) =>
    post<PasswordResetRequest, void>(`${BASE}/password-reset/request`, data),

  confirmPasswordReset: (data: PasswordResetConfirmRequest) =>
    post<PasswordResetConfirmRequest, void>(`${BASE}/password-reset/confirm`, data),
};