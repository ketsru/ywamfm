"use client";

import { useRouter } from "next/navigation";
import RegisterWizard from "./wizard/registerWizard";
import { AuthCard } from "./authCard";
import { AuthPageShell } from "./authPageShell";

export default function RegisterCard() {
  const router = useRouter();

  const handleRegistrationDone = () => {
    sessionStorage.setItem("show_profile_setup", "true"); // ← déclenche le trigger
    router.push("/");
  };

  return (
    <AuthPageShell>
      <RegisterWizard
        onDone={handleRegistrationDone}
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
      </RegisterWizard>
    </AuthPageShell>
  );
}