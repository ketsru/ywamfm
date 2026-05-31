// @/components/layout/forms/auth/wizard/wizard.types.ts

export type RegisterStep = "credentials" | "otp" | "profile";

export type LoginStep = "credentials" | "otp";

export type ForgotPasswordStep = "email" | "otp" | "newPassword";

/**
 * Props génériques pour chaque étape du wizard d'inscription, de connexion ou de réinitialisation de mot de passe.
 * - `state` : l'état local de l'étape, typé comme `unknown` pour permettre une flexibilité maximale.
 * - `onUpdate` : fonction pour mettre à jour l'état local de l'étape, prenant des données de type `unknown`.
 * - `onNext` : fonction pour passer à l'étape suivante du wizard.
 * - `formRef` : référence optionnelle au formulaire HTML de l'étape, utile pour la validation ou la soumission.
 */
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


/**
 * Types et constantes spécifiques au wizard de connexion, 
 * qui partage certaines étapes (credentials, otp) avec le wizard 
 * d'inscription mais a un flux plus simple.
 */
export interface LoginWizardState {
  email: string;
  password: string;
  otpCode: string;
}

export const INITIAL_LOGIN_STATE: LoginWizardState = {
  email: "",
  password: "",
  otpCode: "",
};

export interface LoginStepHeading {
  title: string;
  description: string;
  primaryLabel: string;
  actionLabel?: string;
}

export const LOGIN_STEP_HEADINGS: Record<LoginStep, LoginStepHeading> = {
  credentials: {
    title: "Se connecter",
    description: "Renseignez vos identifiants.",
    primaryLabel: "Continuer",
    actionLabel: "Inscription",
  },
  otp: {
    title: "Vérification",
    description: "Un code a été envoyé à votre adresse e-mail.",
    primaryLabel: "Vérifier",
    actionLabel: "",
  },
};

export const LOGIN_STEPS_ORDER: LoginStep[] = ["credentials", "otp"];


/**
 * Types et constantes spécifiques au wizard de réinitialisation de mot de passe,
 * qui a un flux en 3 étapes : email → otp → nouveau mot de passe.
 * Chaque étape a son propre état local et ses propres libellés d'interface.
 */
export interface ForgotPasswordWizardState {
  email: string;
  otpCode: string;
  newPassword: string;
  confirmPassword: string;
}

export const INITIAL_FORGOT_PASSWORD_STATE: ForgotPasswordWizardState = {
  email: "",
  otpCode: "",
  newPassword: "",
  confirmPassword: "",
};

export const FORGOT_PASSWORD_STEP_HEADINGS: Record<ForgotPasswordStep, StepHeading> = {
  email: {
    title: "Mot de passe oublié",
    description: "Entrez votre adresse e-mail pour recevoir un code de vérification.",
    primaryLabel: "Envoyer le code",
    actionLabel: "Connexion",
  },
  otp: {
    title: "Vérification",
    description: "Un code a été envoyé à votre adresse e-mail.",
    primaryLabel: "Vérifier",
    actionLabel: "",
  },
  newPassword: {
    title: "Nouveau mot de passe",
    description: "Choisissez un nouveau mot de passe sécurisé.",
    primaryLabel: "Réinitialiser",
  },
};

export const FORGOT_PASSWORD_STEPS_ORDER: ForgotPasswordStep[] = [
  "email",
  "otp",
  "newPassword",
];