// @/components/layout/forms/auth/loginCredentials.tsx
// Composant UI pour email + password — miroir de register sans firstName/lastName/confirm
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginWizard } from "@/modules/auth/wizard/login/loginWizardContext";

export default function LoginCredentialsStep() {
  const { state, setField } = useLoginWizard();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={state.email}
          onChange={(e) => setField("email", e.target.value)}
          placeholder="vous@exemple.com"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          value={state.password}
          onChange={(e) => setField("password", e.target.value)}
          placeholder="••••••••"
        />
      </div>
    </div>
  );
}