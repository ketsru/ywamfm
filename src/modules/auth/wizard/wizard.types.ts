// @/components/layout/forms/auth/wizard/wizard.types.ts

export type RegisterStep = "credentials" | "otp" | "profile";

export type StepProps = {
  state: unknown;
  onUpdate: (data: unknown) => void;
  onNext: () => void;
  formRef?: React.RefObject<HTMLFormElement>;
};

export interface WizardState {
  // Step 1 – Credentials
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;

  // Step 2 – OTP
  otpCode: string;

  // Stocké après login post-OTP, utilisé dans les étapes suivantes
  userId: string;

  // Step 3 – Profile
  phone: string;
  address: string;
  country: string;
  city: string;
}

export const INITIAL_WIZARD_STATE: WizardState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  otpCode: "",
  userId: "",
  phone: "",
  address: "",
  country: "",
  city: "",
};

export interface StepHeading {
  title: string;
  description: string;
  primaryLabel: string;
  actionLabel?: string;
}

export const STEP_HEADINGS: Record<RegisterStep, StepHeading> = {
  credentials: {
    title: "Créer un compte",
    description: "Renseignez vos informations de connexion.",
    primaryLabel: "Continuer",
    actionLabel: "Connexion",
  },
  otp: {
    title: "Vérification",
    description: "Un code a été envoyé à votre adresse e-mail.",
    primaryLabel: "Vérifier",
    actionLabel: "",
  },
  profile: {
    title: "Votre profil",
    description: "Ces informations nous aident à personnaliser votre expérience.",
    primaryLabel: "Continuer",
  },
};

export const STEPS_ORDER: RegisterStep[] = [
  "credentials",
  "otp",
  "profile",
];

export function validateCredentials(state: WizardState): {
  emailValid: boolean;
  passwordMatch: boolean;
  passwordStrong: boolean;
  isComplete: boolean;
} {
  const emailValid    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);
  const passwordMatch = state.password.length > 0 &&
                        state.password === state.confirmPassword;
  const passwordStrong = state.password.length >= 8;
  const isComplete    = !!state.firstName && !!state.lastName &&
                        emailValid && passwordMatch && passwordStrong;

  return { emailValid, passwordMatch, passwordStrong, isComplete };
}