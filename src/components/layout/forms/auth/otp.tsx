// @/components/auth/register/steps/OtpStep.tsx

"use client";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain || local.length <= 2) return email;
  return `${local[0]}${"*".repeat(local.length - 2)}${local.at(-1)}@${domain}`;
}

interface OtpStepProps {
  email: string;
  otpCode: string;
  onChange: (value: string) => void;
  countdown: number;
  canResend: boolean;
  onResend: () => void;
}

export default function OtpStep({
  email,
  otpCode,
  onChange,
  countdown,
  canResend,
  onResend,
}: OtpStepProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <p className="text-sm text-muted-foreground text-center leading-relaxed">
        Code à 6 chiffres envoyé à{" "}
        <span className="font-medium text-foreground">{maskEmail(email)}</span>
      </p>

      <InputOTP
        maxLength={6}
        value={otpCode}
        onChange={onChange}
        className="gap-2"
      >
        <InputOTPGroup className="gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <p className="text-xs text-muted-foreground">
        Pas reçu ?{" "}
        <span
          onClick={canResend ? onResend : undefined}
          role="button"
          tabIndex={canResend ? 0 : -1}
          onKeyDown={(e) => {
            if (canResend && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              onResend();
            }
          }}
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