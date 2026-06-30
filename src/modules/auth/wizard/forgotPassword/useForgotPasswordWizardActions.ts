// @/modules/auth/wizard/useForgotPasswordWizardActions.ts
"use client";

import { toast } from "sonner";
import { useForgotPasswordWizard } from "./forgotPasswordWizardContext";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { authService } from "@/lib/types/access/auth/auth.service";

export function useForgotPasswordWizardActions(onDone: () => void) {
  const { step, state, setLoading, goNext, resetCountdown } = useForgotPasswordWizard();

  const handlePrimary = async () => {
    try {
      setLoading(true);
      if (step === "email")       await handleEmail();
      else if (step === "otp")    await handleOtp();
      else if (step === "newPassword") await handleNewPassword();
    } catch (err: unknown) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (step === "otp") {
      try {
        await authService.resendOtp({ email: state.email });
        resetCountdown();
        toast.success("Code renvoyé !");
      } catch (err) {
        handleApiError(err, { fallbackMessage: "Impossible de renvoyer le code." });
      }
    }
  };

  async function handleEmail() {
    if (!state.email) {
      toast.warning("Veuillez entrer votre adresse e-mail.");
      return;
    }

    await authService.requestPasswordReset({ email: state.email });
    toast.success("Code envoyé à votre adresse e-mail.");
    goNext();
  }

  async function handleOtp() {
    if (state.otpCode.length !== 6) {
      toast.warning("Le code doit contenir 6 chiffres.");
      return;
    }

    // On vérifie l'OTP mais sans logger l'utilisateur — on passe juste à l'étape suivante
    await authService.verifyOtp({ email: state.email, code: state.otpCode });
    toast.success("Code vérifié !");
    goNext();
  }

  async function handleNewPassword() {
    if (!state.newPassword || !state.confirmPassword) {
      toast.warning("Veuillez remplir tous les champs.");
      return;
    }
    if (state.newPassword !== state.confirmPassword) {
      toast.warning("Les mots de passe ne correspondent pas.");
      return;
    }
    if (state.newPassword.length < 8) {
      toast.warning("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    await authService.confirmPasswordReset({
      email:                   state.email,
      token:                   state.otpCode, // ← le code OTP sert de token
      newPassword:             state.newPassword,
      newPasswordConfirmation: state.confirmPassword,
    });

    toast.success("Mot de passe réinitialisé !");
    onDone();
  }

  return { handlePrimary, handleAction };
}