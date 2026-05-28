// @/modules/auth/wizard/forgotPasswordWizard.tsx
"use client";

import React from "react";
import { FORGOT_PASSWORD_STEP_HEADINGS } from "../wizard.types";
import { ForgotPasswordWizardProvider, useForgotPasswordWizard } from "./forgotPasswordWizardContext";
import { useForgotPasswordWizardActions } from "./useForgotPasswordWizardActions";
import { WizardRenderProps } from "../registerWizard";
import OtpStep from "@/components/layout/forms/auth/otp";
import NewPasswordStep from "@/components/layout/forms/auth/forgotPassword/newPassword";
import ForgotPasswordEmailStep from "@/components/layout/forms/auth/forgotPassword/forgotPasswordEmail";


function ForgotPasswordWizardContent({
  onDone,
  onGoToLogin,
  children,
}: {
  onDone: () => void;
  onGoToLogin: () => void;
  children: (props: WizardRenderProps) => React.ReactNode;
}) {
  const { step, isLoading } = useForgotPasswordWizard();
  const { handlePrimary, handleAction } = useForgotPasswordWizardActions(onDone);

  const heading = FORGOT_PASSWORD_STEP_HEADINGS[step];

  const stepContent = {
    email:       <ForgotPasswordEmailStep />,
    otp:         <OtpStep />,
    newPassword: <NewPasswordStep />,
  };

  const content = (
    <div className="flex flex-col gap-6">
      {stepContent[step]}
    </div>
  );

  const actionLabel = step === "email" ? heading.actionLabel : step === "otp" ? heading.actionLabel : undefined;

  const onAction =
    step === "email" ? onGoToLogin
    : step === "otp" ? handleAction
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

export default function ForgotPasswordWizard({
  onDone,
  onGoToLogin,
  children,
}: {
  onDone: () => void;
  onGoToLogin: () => void;
  children: (props: WizardRenderProps) => React.ReactNode;
}) {
  return (
    <ForgotPasswordWizardProvider>
      <ForgotPasswordWizardContent onDone={onDone} onGoToLogin={onGoToLogin}>
        {children}
      </ForgotPasswordWizardContent>
    </ForgotPasswordWizardProvider>
  );
}