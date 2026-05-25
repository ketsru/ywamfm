// @/components/auth/steps/profileStep.tsx

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterWizard } from "@/modules/auth/wizard/registerWizardContext";
import { PhoneNumberField } from "@/modules/shared/phoneNumberForm";

export default function ProfileStep() {
  const { state, setField } = useRegisterWizard();

  return (
    <div className="flex flex-col gap-3">

      <PhoneNumberField
        value={state.phone}
        onChange={(val) => setField("phone", val)}
      />

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address" className="text-xs font-medium text-muted-foreground tracking-wide">
          Adresse
        </Label>
        <Input
          id="address"
          placeholder="123 rue de la Paix"
          value={state.address}
          onChange={(e) => setField("address", e.target.value)}
          className=""
        />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="country" className="text-xs font-medium text-muted-foreground tracking-wide">
            Pays
          </Label>
          <Input
            id="country"
            placeholder="Togo"
            value={state.country}
            onChange={(e) => setField("country", e.target.value)}
            className=""
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="city" className="text-xs font-medium text-muted-foreground tracking-wide">
            Ville
          </Label>
          <Input
            id="city"
            placeholder="Lomé"
            value={state.city}
            onChange={(e) => setField("city", e.target.value)}
            className=""
          />
        </div>
      </div>

    </div>
  );
}