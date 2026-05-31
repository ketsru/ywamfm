// @/components/layout/forms/auth/newPassword.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPasswordWizard } from "@/modules/auth/wizard/forgotPassword/forgotPasswordWizardContext";

export default function NewPasswordStep() {
  const { state, setField } = useForgotPasswordWizard();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="newPassword">Nouveau mot de passe</Label>
        <Input
          id="newPassword"
          type="password"
          value={state.newPassword}
          onChange={(e) => setField("newPassword", e.target.value)}
          placeholder="••••••••"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={state.confirmPassword}
          onChange={(e) => setField("confirmPassword", e.target.value)}
          placeholder="••••••••"
        />
      </div>
    </div>
  );
}