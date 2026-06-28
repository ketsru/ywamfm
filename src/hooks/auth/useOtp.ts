import { authService } from "@/lib/types/users/auth/auth.service";

export const useOtp = () => {
  const verify = (email: string, code: string) =>
    authService.verifyOtp({ email, code });

  const resend = (email: string) =>
    authService.resendOtp({ email });

  return { verify, resend };
};