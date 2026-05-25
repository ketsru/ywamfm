"use client";

import { useState } from "react";
import PhoneInput, { isValidPhoneNumber, Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type PhoneNumberFieldProps = {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
};

export function PhoneNumberField({ id = "phone", value, onChange }: PhoneNumberFieldProps) {
  const [touched, setTouched] = useState(false);

  const isValid = value ? isValidPhoneNumber(value) : null;
  const showError = touched && value && !isValid;
  const showValid = touched && value && isValid;

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground tracking-wide">
        Téléphone
      </Label>

      <div
        className={cn(
          "flex h-11 w-full items-center rounded-xl border bg-secondary/40 px-0",
          "transition-all duration-200",
          // Focus — jade primary, cohérent avec Input/Select/Checkbox
          "focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-0 focus-within:border-primary",
          // États de validation
          showError && "border-destructive focus-within:ring-destructive/30 focus-within:border-destructive",
          showValid && "border-primary/50 focus-within:ring-primary/20 focus-within:border-primary",
          !showError && !showValid && "border-border"
        )}
        onBlur={() => setTouched(true)}
      >
        <PhoneInput
          id={id}
          value={value as Value}
          onChange={(val) => onChange(val ?? "")}
          defaultCountry="TG"
          international
          placeholder="+228 90 00 00 00"
          className={cn(
            "w-full h-full",
            // Séparateur drapeau — bordure jade pâle
            "[&_.PhoneInputCountry]:pl-3 [&_.PhoneInputCountry]:pr-2 [&_.PhoneInputCountry]:border-r [&_.PhoneInputCountry]:border-border",
            // Select pays — transparent, cohérent avec le reste
            "[&_.PhoneInputCountrySelect]:bg-transparent [&_.PhoneInputCountrySelect]:text-sm [&_.PhoneInputCountrySelect]:text-foreground [&_.PhoneInputCountrySelect]:outline-none [&_.PhoneInputCountrySelect]:cursor-pointer",
            // Input téléphone — reset complet, hérite du wrapper
            "[&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:h-full [&_.PhoneInputInput]:px-3 [&_.PhoneInputInput]:text-sm",
            "[&_.PhoneInputInput]:text-foreground [&_.PhoneInputInput]:placeholder:text-muted-foreground/50",
            "[&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:ring-0"
          )}
        />
      </div>

      {/* Feedback de validation */}
      {showError && (
        <p className="flex items-center gap-1.5 text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
          <span className="text-[10px]">✕</span>
          Numéro de téléphone invalide
        </p>
      )}
      {showValid && (
        <p className="flex items-center gap-1.5 text-xs text-primary animate-in fade-in slide-in-from-top-1 duration-200">
          <span className="text-[10px]">✓</span>
          Numéro valide
        </p>
      )}
    </div>
  );
}