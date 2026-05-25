
// -------------------- REQUESTS --------------------

import { UserResponseDto } from "../user/user.types";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: { name: string };
}

export interface LoginRequest {
  email: string;
  password: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  email: string;
  token: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface DeleteAccountRequest {
  password: string;
}

// -------------------- OTP --------------------

export interface VerifyOtpRequest {
  email: string;
  code: string;
}

export interface ResendOtpRequest {
  email: string;
}

// -------------------- RESPONSES --------------------

export interface LoginResponse {
  token: string;
  message: string;
  user: UserResponseDto;
}

export interface LoginResult {
  token: string;
  user: UserResponseDto;
}

// Création d'un compte managé (par un centre)
export interface CreateManagedAccountRequest {
  firstName: string;
  lastName:  string;
  email:     string;
  roleKey:   string; // "BTP_PROVIDER"
}

export interface CreateManagedAccountResponse {
  id:        string;
  email:     string;
  firstName: string;
  lastName:  string;
  roleKey:   string;
}

// Changement de mot de passe (premier login)
export interface ChangePasswordRequest {
  currentPassword:         string;
  newPassword:             string;
  newPasswordConfirmation: string;
}