// CredentialsStep.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRegisterWizard } from "@/modules/auth/wizard/registerWizardContext";
import { validateCredentials } from "@/modules/auth/wizard/wizard.types";

export default function CredentialsStep() {
  const { state, setField } = useRegisterWizard();
  const { emailValid, passwordMatch, passwordStrong } = validateCredentials(state);

  const showEmailError    = state.email.length > 4 && !emailValid;
  const showPasswordWeak  = state.password.length > 0 && !passwordStrong;
  const showPasswordMatch = state.confirmPassword.length > 0 && !passwordMatch;

  return (
    <div className="flex flex-col gap-3">

      {/* Nom / Prénom */}
      <div className="grid lg:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lastName" className="text-xs font-medium text-muted-foreground tracking-wide">
            Nom
          </Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={state.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="firstName" className="text-xs font-medium text-muted-foreground tracking-wide">
            Prénom(s)
          </Label>
          <Input
            id="firstName"
            placeholder="John"
            value={state.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-xs font-medium text-muted-foreground tracking-wide">
          E-mail
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="vous@exemple.com"
          value={state.email}
          onChange={(e) => setField("email", e.target.value)}
          className={showEmailError ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        {showEmailError && (
          <p className="text-xs text-destructive">Adresse e-mail invalide.</p>
        )}
      </div>

      {/* Mot de passe */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password" className="text-xs font-medium text-muted-foreground tracking-wide">
          Mot de passe
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={state.password}
          onChange={(e) => setField("password", e.target.value)}
          className={showPasswordWeak ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        {showPasswordWeak && (
          <p className="text-xs text-destructive">8 caractères minimum.</p>
        )}
      </div>

      {/* Confirmer */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword" className="text-xs font-medium text-muted-foreground tracking-wide">
          Confirmer le mot de passe
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={state.confirmPassword}
          onChange={(e) => setField("confirmPassword", e.target.value)}
          className={showPasswordMatch ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        {showPasswordMatch && (
          <p className="text-xs text-destructive">Les mots de passe ne correspondent pas.</p>
        )}
      </div>

      {/* Termes */}
      <div className="mt-1 flex items-start gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3">
        <Checkbox
          id="terms"
          defaultChecked
          disabled
          className="mt-0.5 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400"
        />
        <p className="text-xs leading-relaxed text-muted-foreground">
          En créant un compte, vous acceptez nos{" "}
          <Link href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
            termes et conditions
          </Link>{" "}
          et notre{" "}
          <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
            politique de confidentialité
          </Link>.
        </p>
      </div>
    </div>
  );
}