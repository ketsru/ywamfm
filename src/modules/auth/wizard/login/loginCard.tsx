// @/modules/auth/loginCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { AuthPageShell } from "../../authPageShell";
import { AuthCard } from "../../authCard";
import LoginWizard from "./loginWizard";

export default function LoginCard() {
  const router = useRouter();

  return (
    <AuthPageShell>
      <LoginWizard
        onDone={() => router.push("/")}
        onGoToRegister={() => router.push("/register")}
        onGoToForgotPassword={() => router.push("/forgot-password")} 
      >
        {({
          title,
          description,
          primaryLabel,
          actionLabel,
          onPrimary,
          onAction,
          isLoading,
          content,
          secondaryActionLabel, 
          onSecondaryAction,    
        }) => (
          <AuthCard
            title={title}
            description={description}
            primaryLabel={primaryLabel}
            onPrimary={onPrimary}
            primaryDisabled={isLoading}
            actionLabel={actionLabel}
            onAction={onAction}
            secondaryActionLabel={secondaryActionLabel} 
            onSecondaryAction={onSecondaryAction}       
          >
            {content}
          </AuthCard>
        )}
      </LoginWizard>
    </AuthPageShell>
  );
}