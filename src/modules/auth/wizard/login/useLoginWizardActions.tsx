// @/modules/auth/wizard/login/useLoginWizardActions.ts
"use client";

import { toast } from "sonner";
import { useLoginWizard } from "./loginWizardContext";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { authService } from "@/lib/types/access/auth/auth.service";
import { useLogin } from "@/hooks/auth/useLogin";

export function useLoginWizardActions(onDone: () => void) {
  const { step, state, setField, setLoading, goNext, resetCountdown } = useLoginWizard();
  const { finalizeSession } = useLogin();

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
    // Renvoyer l'OTP depuis l'étape otp — purpose LOGIN explicite
    if (step === "otp") {
      try {
        await authService.resendOtp({ email: state.email, purpose: "LOGIN" });
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

    // Étape 1 : valide les credentials, déclenche l'envoi de l'OTP,
    // récupère un challengeToken de courte durée (PAS un token de session).
    const { challengeToken } = await authService.login({
      email: state.email,
      password: state.password,
    });

    setField("challengeToken", challengeToken);
    toast.success("Code envoyé à votre email.");
    goNext();
  }

  async function handleOtp() {
    if (state.otpCode.length !== 6) {
      toast.warning("Le code doit contenir 6 chiffres.");
      return;
    }

    if (!state.challengeToken) {
      toast.error("Session de connexion expirée. Veuillez réessayer.");
      return;
    }

    const res = await authService.verifyLoginOtp({
      challengeToken: state.challengeToken,
      code: state.otpCode,
    });

    const user = finalizeSession(res);
    if (!user) {
      toast.error("Connexion échouée. Réessayez.");
      return;
    }

    toast.success("Connexion réussie !");
    onDone();
  }

  return { handlePrimary, handleAction };

}