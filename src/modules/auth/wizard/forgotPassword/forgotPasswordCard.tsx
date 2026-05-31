// @/modules/auth/forgotPasswordCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { AuthPageShell } from "../../authPageShell";
import ForgotPasswordWizard from "./forgotPasswordWizard";
import { AuthCard } from "../../authCard";

export default function ForgotPasswordCard() {
  const router = useRouter();

  return (
    <AuthPageShell>
      <ForgotPasswordWizard
        onDone={() => router.push("/login")}
        onGoToLogin={() => router.push("/login")}
      >
        {({ title, description, primaryLabel, actionLabel, onPrimary, onAction, isLoading, content }) => (
          <AuthCard
            title={title}
            description={description}
            primaryLabel={primaryLabel}
            onPrimary={onPrimary}
            primaryDisabled={isLoading}
            actionLabel={actionLabel}
            onAction={onAction}
          >
            {content}
          </AuthCard>
        )}
      </ForgotPasswordWizard>
    </AuthPageShell>
  );
}