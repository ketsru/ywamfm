// @/lib/types/access/auth/auth.types.ts

import { UserResponseDto } from "../../users/user/user.types";


export type OtpPurpose = "REGISTRATION" | "LOGIN" | "PASSWORD_RESET";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginInitResponse {
  challengeToken: string;
  message: string;
}

export interface VerifyLoginOtpRequest {
  challengeToken: string;
  code: string;
}

export interface LoginResponse {
  token: string;
  message: string;
  user: UserResponseDto; // ← réutilise ton type existant, plus de duplication
  mustChangePassword: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface VerifyOtpRequest {
  email: string;
  code: string;
}

export interface ResendOtpRequest {
  email: string;
  purpose?: OtpPurpose;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
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

export interface CreateManagedAccountRequest {
  firstName: string;
  lastName: string;
  email: string;
  roleKey: string;
}

export interface CreateManagedAccountResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}