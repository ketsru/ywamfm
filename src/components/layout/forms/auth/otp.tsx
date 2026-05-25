// @/components/auth/register/steps/OtpStep.tsx

"use client";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useRegisterWizard } from "@/modules/auth/wizard/registerWizardContext";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain || local.length <= 2) return email;
  return `${local[0]}${"*".repeat(local.length - 2)}${local.at(-1)}@${domain}`;
}

export default function OtpStep() {
  const { state, setField, countdown, canResend } = useRegisterWizard();

  return (
    <div className="flex flex-col items-center gap-6 py-2">

      {/* Message */}
      <p className="text-sm text-muted-foreground text-center leading-relaxed">
        Code à 6 chiffres envoyé à{" "}
        <span className="font-medium text-foreground">{maskEmail(state.email)}</span>
      </p>

      {/* Slots OTP */}
      <InputOTP
        maxLength={6}
        value={state.otpCode}
        onChange={(value) => setField("otpCode", value)}
        className="gap-2"
      >
        <InputOTPGroup className="gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {/* Renvoi — le click est géré par onAction dans RegisterWizard */}
      <p className="text-xs text-muted-foreground">
        Pas reçu ?{" "}
        <span
          className={[
            "font-medium transition-colors duration-200",
            canResend
              ? "text-amber-400 hover:underline cursor-pointer"
              : "text-muted-foreground/50 cursor-not-allowed",
          ].join(" ")}
        >
          {canResend ? "Renvoyer le code" : `Renvoyer dans ${countdown}s`}
        </span>
      </p>
    </div>
  );
}