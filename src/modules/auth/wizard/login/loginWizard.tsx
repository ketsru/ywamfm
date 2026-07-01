// @/modules/auth/wizard/loginWizard.tsx
"use client";

import React from "react";
import { LOGIN_STEP_HEADINGS } from "../wizard.types";
import { LoginWizardProvider, useLoginWizard } from "./loginWizardContext";
import { useLoginWizardActions } from "./useLoginWizardActions";
import OtpStep from "@/components/layout/forms/auth/otp";
import { WizardRenderProps } from "../registerWizard";
import LoginCredentialsStep from "@/components/layout/forms/auth/login/loginCredentials";

function LoginWizardContent({
  onDone,
  onGoToRegister,
  onGoToForgotPassword, // ← ajouté
  children,
}: {
  onDone: () => void;
  onGoToRegister: () => void;
  onGoToForgotPassword: () => void; // ← ajouté
  children: (props: WizardRenderProps) => React.ReactNode;
}) {
  // ← hooks en premier, avant tout usage de `step`
  const { step, state, setField, isLoading, countdown, canResend } = useLoginWizard();
  const { handlePrimary, handleAction } = useLoginWizardActions(onDone);

  const heading = LOGIN_STEP_HEADINGS[step];

  const stepContent = {
    credentials: <LoginCredentialsStep />,
    otp: (
      <OtpStep
        email={state.email}
        otpCode={state.otpCode}
        onChange={(value) => setField("otpCode", value)}
        countdown={countdown}
        canResend={canResend}
        onResend={handleAction}
      />
    ),
  };

  const content = (
    <div className="flex flex-col gap-6">
      {stepContent[step]}
    </div>
  );

  const actionLabel = heading.actionLabel || undefined;

  const onAction =
    step === "credentials" ? onGoToRegister
    : step === "otp"       ? handleAction
    : undefined;

  // ← déclarés après les hooks, plus de référence à `step` avant son initialisation
  const secondaryActionLabel = step === "credentials" ? "Mot de passe oublié ?" : undefined;
  const onSecondaryAction    = step === "credentials" ? onGoToForgotPassword : undefined;

  return (
    <>
      {children({
        title:               heading.title,
        description:         heading.description,
        primaryLabel:        isLoading ? "Chargement…" : heading.primaryLabel,
        actionLabel,
        onPrimary:           handlePrimary,
        onAction,
        isLoading,
        content,
        secondaryActionLabel, // ← dans l'objet, pas en dehors du JSX
        onSecondaryAction,    // ← idem
      })}
    </>
  );
}

export default function LoginWizard({
  onDone,
  onGoToRegister,
  onGoToForgotPassword, // ← ajouté
  children,
}: {
  onDone: () => void;
  onGoToRegister: () => void;
  onGoToForgotPassword: () => void; // ← ajouté
  children: (props: WizardRenderProps) => React.ReactNode;
}) {
  return (
    <LoginWizardProvider>
      <LoginWizardContent
        onDone={onDone}
        onGoToRegister={onGoToRegister}
        onGoToForgotPassword={onGoToForgotPassword} // ← propagé
      >
        {children}
      </LoginWizardContent>
    </LoginWizardProvider>
  );
}