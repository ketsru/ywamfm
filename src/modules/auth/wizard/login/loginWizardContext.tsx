// @/modules/auth/wizard/loginWizardContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  LoginStep,
  LoginWizardState,
  INITIAL_LOGIN_STATE,
  LOGIN_STEPS_ORDER,
} from "../wizard.types";

const RESEND_DELAY = 60;

interface LoginWizardContextValue {
  step: LoginStep;
  state: LoginWizardState;
  isLoading: boolean;
  setField: <K extends keyof LoginWizardState>(key: K, value: LoginWizardState[K]) => void;
  setLoading: (v: boolean) => void;
  goNext: () => void;
  stepIndex: number;
  countdown: number;
  canResend: boolean;
  resetCountdown: () => void;
}

const LoginWizardContext = createContext<LoginWizardContextValue | null>(null);

export function LoginWizardProvider({ children }: { children: React.ReactNode }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState]         = useState<LoginWizardState>(INITIAL_LOGIN_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_DELAY);

  const step      = LOGIN_STEPS_ORDER[stepIndex];
  const canResend = countdown <= 0;

  const setField = useCallback(
    <K extends keyof LoginWizardState>(key: K, value: LoginWizardState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    }, []
  );

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, LOGIN_STEPS_ORDER.length - 1));
  }, []);

  const resetCountdown = useCallback(() => setCountdown(RESEND_DELAY), []);

  useEffect(() => {
    if (canResend) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, canResend]);

  return (
    <LoginWizardContext.Provider value={{
      step, state, isLoading,
      setField, setLoading: setIsLoading,
      goNext, stepIndex,
      countdown, canResend, resetCountdown,
    }}>
      {children}
    </LoginWizardContext.Provider>
  );
}

export function useLoginWizard() {
  const ctx = useContext(LoginWizardContext);
  if (!ctx) throw new Error("useLoginWizard must be used inside LoginWizardProvider");
  return ctx;
}