// @/components/layout/forms/auth/wizard/RegisterWizard.tsx

"use client";

import React from "react";
import { STEP_HEADINGS } from "./wizard.types";
import { RegisterWizardProvider, useRegisterWizard } from "./registerWizardContext";
import { useRegisterWizardActions } from "./useRegisterWizardActions";
import CredentialsStep from "@/components/layout/forms/auth/register";
import OtpStep from "@/components/layout/forms/auth/otp";
import ProfileStep from "@/components/layout/forms/auth/profile";

// ── Ce que le wizard expose au parent via render prop ──────

export interface WizardRenderProps {
  /** Titre de l'étape courante → AuthCard title */
  title: string;
  /** Description de l'étape courante → AuthCard description */
  description: string;
  /** Label du bouton principal → AuthCard primaryLabel */
  primaryLabel: string;
  /** Label du lien secondaire → AuthCard actionLabel */

  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;

  
  actionLabel?: string;
  /** Déclenche l'action principale (appel API + goNext) → AuthCard onPrimary */
  onPrimary: () => void;
  /** Déclenche l'action secondaire → AuthCard onAction */
  onAction?: () => void;
  /** État de chargement → AuthCard primaryDisabled */
  isLoading: boolean;
  /** Barre de progression + contenu de l'étape → AuthCard children */
  content: React.ReactNode;
}

// ── Contenu interne (a accès au contexte) ──────────────────

function WizardContent({
  onDone,
  onGoToLogin,
  children,
}: {
  onDone: () => void;
  onGoToLogin: () => void;
  children: (props: WizardRenderProps) => React.ReactNode;
}) {
  const { step, isLoading } = useRegisterWizard();
  const { handlePrimary, handleAction } = useRegisterWizardActions(onDone);

  const heading = STEP_HEADINGS[step];

  const stepContent: Record<typeof step, React.ReactNode> = {
    credentials: <CredentialsStep />,
    otp: <OtpStep />,
    profile: <ProfileStep />,
  };

  // Contenu injecté dans AuthCard children
  const content = (
    <div className="flex flex-col gap-6">
      {/* <WizardProgress /> */}
      {stepContent[step]}
    </div>
  );

  // Action secondaire : "Déjà un compte ?" sur credentials, "Renvoyer" sur otp
  const actionLabel =
    step === "credentials" || step === "otp" ? heading.actionLabel : undefined;

  const onAction =
    step === "credentials" ? onGoToLogin
    : step === "otp"       ? handleAction
    : undefined;

  return (
    <>
      {children({
        title:        heading.title,
        description:  heading.description,
        primaryLabel: isLoading ? "Chargement…" : heading.primaryLabel,
        actionLabel,
        onPrimary:    handlePrimary,
        onAction,
        isLoading,
        content,
      })}
    </>
  );
}

// ── Export public ──────────────────────────────────────────

export default function RegisterWizard({
  onDone,
  onGoToLogin,
  children,
}: {
  onDone: () => void;
  onGoToLogin: () => void;
  children: (props: WizardRenderProps) => React.ReactNode;
}) {
  return (
    <RegisterWizardProvider>
      <WizardContent onDone={onDone} onGoToLogin={onGoToLogin}>
        {children}
      </WizardContent>
    </RegisterWizardProvider>
  );
}