// @/modules/auth/wizard/login/useLoginWizardActions.ts
"use client";

import { toast } from "sonner";
import { useLoginWizard } from "./loginWizardContext";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { useLogin } from "@/hooks/auth/useLogin";
import { authService } from "@/lib/types/access/auth/auth.service";

export function useLoginWizardActions(onDone: () => void) {
  const { step, state, setLoading, goNext, resetCountdown } = useLoginWizard();
  const { login } = useLogin();

  const handlePrimary = async () => {
    try {
      setLoading(true);
      if (step === "credentials") await handleCredentials();
      else if (step === "otp")    await handleOtp();
    } catch (err: unknown) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    // Renvoyer l'OTP depuis l'étape otp
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

  async function handleCredentials() {
    if (!state.email || !state.password) {
      toast.warning("Veuillez remplir tous les champs.");
      return;
    }

    // Le login déclenche l'envoi de l'OTP côté backend
    await authService.login({ email: state.email, password: state.password });
    toast.success("Code envoyé à votre email.");
    goNext();
  }

  async function handleOtp() {
    if (state.otpCode.length !== 6) {
      toast.warning("Le code doit contenir 6 chiffres.");
      return;
    }

    await authService.verifyOtp({ email: state.email, code: state.otpCode });

    // Login final pour récupérer le token
    const user = await login(state.email, state.password);
    if (!user) {
      toast.error("Connexion échouée. Réessayez.");
      return;
    }

    toast.success("Connexion réussie !");
    onDone();
  }

  return { handlePrimary, handleAction };
}