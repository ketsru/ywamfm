// @/modules/auth/loginCard.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AuthPageShell } from "../../authPageShell";
import { AuthCard } from "../../authCard";
import LoginWizard from "./loginWizard";

export default function LoginCard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDone = () => {
    const redirect = searchParams.get("redirect");
    // Sécurité : n'accepter qu'un chemin interne, jamais une URL absolue externe
    // (évite un open redirect si quelqu'un forge ?redirect=https://evil.com)
    const target = redirect && redirect.startsWith("/") ? redirect : "/";
    router.push(target);
  };

  return (
    <AuthPageShell>
      <LoginWizard
        onDone={handleDone}
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