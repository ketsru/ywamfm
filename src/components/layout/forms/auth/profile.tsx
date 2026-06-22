// @/components/auth/steps/profileStep.tsx

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterWizard } from "@/modules/auth/wizard/registerWizardContext";
import { PhoneNumberField } from "@/modules/shared/phoneNumberForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaritalStatus, Sexe } from "@/types/users/profile/profile.types";

export default function ProfileStep() {
  const { state, setField } = useRegisterWizard();

  return (
    <div className="flex flex-col gap-3">

      {/* ── Téléphone ───────────────────────────────────────── */}
      <PhoneNumberField
        value={state.phone}
        onChange={(val) => setField("phone", val)}
      />

      {/* ── Adresse ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address" className="text-xs font-medium text-muted-foreground tracking-wide">
          Adresse
        </Label>
        <Input
          id="address"
          placeholder="123 rue de la Paix"
          value={state.address ?? ""}
          onChange={(e) => setField("address", e.target.value)}
        />
      </div>

      {/* ── Pays / Ville ────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="country" className="text-xs font-medium text-muted-foreground tracking-wide">
            Pays
          </Label>
          <Input
            id="country"
            placeholder="Togo"
            value={state.country ?? ""}
            onChange={(e) => setField("country", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="city" className="text-xs font-medium text-muted-foreground tracking-wide">
            Ville
          </Label>
          <Input
            id="city"
            placeholder="Lomé"
            value={state.city ?? ""}
            onChange={(e) => setField("city", e.target.value)}
          />
        </div>
      </div>

      {/* ── Démographie ─────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium text-muted-foreground tracking-wide">
            Sexe
          </Label>
          <Select
            value={state.sexe ?? ""}
            onValueChange={(val) => setField("sexe", val as Sexe)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Homme</SelectItem>
              <SelectItem value="F">Femme</SelectItem>
              <SelectItem value="OTHER">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium text-muted-foreground tracking-wide">
            Statut marital
          </Label>
          <Select
            value={state.maritalStatus ?? ""}
            onValueChange={(val) => setField("maritalStatus", val as MaritalStatus)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SINGLE">Célibataire</SelectItem>
              <SelectItem value="MARRIED">Marié(e)</SelectItem>
              <SelectItem value="DIVORCED">Divorcé(e)</SelectItem>
              <SelectItem value="WIDOWED">Veuf/Veuve</SelectItem>
              <SelectItem value="SEPARATED">Séparé(e)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Date de naissance ───────────────────────────────── */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="birthDate" className="text-xs font-medium text-muted-foreground tracking-wide">
          Date de naissance
        </Label>
        <Input
          id="birthDate"
          type="date"
          value={state.birthDate ?? ""}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setField("birthDate", e.target.value)}
        />
      </div>

    </div>
  );
}