// @/components/auth/register/RegisterWizardContext.tsx

"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  RegisterStep,
  WizardState,
  INITIAL_WIZARD_STATE,
  STEPS_ORDER,
} from "./wizard.types";

const RESEND_DELAY = 60;

interface RegisterWizardContextValue {
  step: RegisterStep;
  state: WizardState;
  isLoading: boolean;
  setField: <K extends keyof WizardState>(key: K, value: WizardState[K]) => void;
  setLoading: (v: boolean) => void;
  goNext: () => void;
  goPrev: () => void;
  stepIndex: number;
  totalSteps: number;
  countdown: number;
  canResend: boolean;
  resetCountdown: () => void;
}

const RegisterWizardContext = createContext<RegisterWizardContextValue | null>(null);

export function RegisterWizardProvider({ children }: { children: React.ReactNode }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState]         = useState<WizardState>(INITIAL_WIZARD_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_DELAY);

  const step      = STEPS_ORDER[stepIndex];
  const canResend = countdown <= 0;

  const setField = useCallback(
    <K extends keyof WizardState>(key: K, value: WizardState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, STEPS_ORDER.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const resetCountdown = useCallback(() => setCountdown(RESEND_DELAY), []);

  useEffect(() => {
    if (canResend) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, canResend]);

  return (
    <RegisterWizardContext.Provider
      value={{
        step,
        state,
        isLoading,
        setField,
        setLoading: setIsLoading,
        goNext,
        goPrev,
        stepIndex,
        totalSteps: STEPS_ORDER.length,
        countdown,
        canResend,
        resetCountdown,
      }}
    >
      {children}
    </RegisterWizardContext.Provider>
  );
}

export function useRegisterWizard() {
  const ctx = useContext(RegisterWizardContext);
  if (!ctx) throw new Error("useRegisterWizard must be used inside RegisterWizardProvider");
  return ctx;
}