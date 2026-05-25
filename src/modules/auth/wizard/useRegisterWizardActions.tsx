// @/modules/auth/wizard/useRegisterWizardActions.ts

"use client";

import { toast } from "sonner";
import { useRegisterWizard } from "./registerWizardContext";
import { handleApiError } from "@/lib/api/handles/handle-api-error";
import { useLogin } from "@/hooks/auth/useLogin";
import { authService } from "@/types/users/auth/auth.service";
import { ProfileService } from "@/types/users/profile/profile.service";

export function useRegisterWizardActions(onDone: () => void) {
  const { step, state, setField, setLoading, goNext, resetCountdown } = useRegisterWizard();
  const { login } = useLogin();

  const handlePrimary = async () => {
    try {
      setLoading(true);
      if (step === "credentials") await handleCredentials();
      else if (step === "otp")    await handleOtp();
      else if (step === "profile") await handleProfile();
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
        resetCountdown(); // ← repart le countdown après succès API
        toast.success("Code renvoyé !");
      } catch (err) {
        handleApiError(err, {
          fallbackMessage: "Impossible de renvoyer le code. Réessayez.",
        });
      }
    }
  };

  // ─── Étape 1 : Création du compte ─────────────────────────────────────────

  async function handleCredentials() {
    if (!state.firstName || !state.lastName || !state.email || !state.password) {
      toast.warning("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (state.password !== state.confirmPassword) {
      toast.warning("Les mots de passe ne correspondent pas.");
      return;
    }

    await authService.register({
      firstName:            state.firstName,
      lastName:             state.lastName,
      email:                state.email,
      password:             state.password,
      passwordConfirmation: state.confirmPassword,
      role: { name: "USER" },
    });

    toast.success("Compte créé ! Vérifiez votre email.");
    goNext();
  }

  // ─── Étape 2 : Vérification OTP ───────────────────────────────────────────

  async function handleOtp() {
    if (state.otpCode.length !== 6) {
      toast.warning("Le code doit contenir 6 chiffres.");
      return;
    }

    await authService.verifyOtp({ email: state.email, code: state.otpCode });

    const user = await login(state.email, state.password);
    if (!user?.id) {
      toast.error("Connexion échouée après vérification. Réessayez.");
      return;
    }

    setField("userId", user.id);
    toast.success("Email vérifié !");
    goNext();
  }

  // ─── Étape 3 : Profil ─────────────────────────────────────────────────────

  async function handleProfile() {
    if (!state.userId) {
      toast.error("Session introuvable. Veuillez recommencer l'inscription.");
      return;
    }

    await ProfileService.create({
      userId:  state.userId,
      phone:   state.phone   || null,
      address: state.address || null,
      country: state.country || null,
      city:    state.city    || null,
    });

    toast.success("Profil enregistré !");
    onDone();  // ← était goNext(), mais c'est la dernière étape
  }

  return { handlePrimary, handleAction };
}