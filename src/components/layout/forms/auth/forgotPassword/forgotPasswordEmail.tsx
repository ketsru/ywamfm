// @/components/layout/forms/auth/forgotPasswordEmail.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPasswordWizard } from "@/modules/auth/wizard/forgotPassword/forgotPasswordWizardContext";

export default function ForgotPasswordEmailStep() {
  const { state, setField } = useForgotPasswordWizard();

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
    </div>
  );
}