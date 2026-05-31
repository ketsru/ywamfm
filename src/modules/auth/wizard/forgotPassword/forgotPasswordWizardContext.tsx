// @/modules/auth/wizard/forgotPasswordWizardContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  ForgotPasswordStep,
  ForgotPasswordWizardState,
  INITIAL_FORGOT_PASSWORD_STATE,
  FORGOT_PASSWORD_STEPS_ORDER,
} from "../wizard.types";

const RESEND_DELAY = 60;

interface ForgotPasswordWizardContextValue {
  step: ForgotPasswordStep;
  state: ForgotPasswordWizardState;
  isLoading: boolean;
  setField: <K extends keyof ForgotPasswordWizardState>(key: K, value: ForgotPasswordWizardState[K]) => void;
  setLoading: (v: boolean) => void;
  goNext: () => void;
  stepIndex: number;
  countdown: number;
  canResend: boolean;
  resetCountdown: () => void;
}

const ForgotPasswordWizardContext = createContext<ForgotPasswordWizardContextValue | null>(null);

export function ForgotPasswordWizardProvider({ children }: { children: React.ReactNode }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState]         = useState<ForgotPasswordWizardState>(INITIAL_FORGOT_PASSWORD_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_DELAY);

  const step      = FORGOT_PASSWORD_STEPS_ORDER[stepIndex];
  const canResend = countdown <= 0;

  const setField = useCallback(
    <K extends keyof ForgotPasswordWizardState>(key: K, value: ForgotPasswordWizardState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    }, []
  );

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, FORGOT_PASSWORD_STEPS_ORDER.length - 1));
  }, []);

  const resetCountdown = useCallback(() => setCountdown(RESEND_DELAY), []);

  useEffect(() => {
    if (canResend) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, canResend]);

  return (
    <ForgotPasswordWizardContext.Provider value={{
      step, state, isLoading,
      setField, setLoading: setIsLoading,
      goNext, stepIndex,
      countdown, canResend, resetCountdown,
    }}>
      {children}
    </ForgotPasswordWizardContext.Provider>
  );
}

export function useForgotPasswordWizard() {
  const ctx = useContext(ForgotPasswordWizardContext);
  if (!ctx) throw new Error("useForgotPasswordWizard must be used inside ForgotPasswordWizardProvider");
  return ctx;
}