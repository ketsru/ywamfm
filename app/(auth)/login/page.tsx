import Footer from "@/components/layout/landing/footer";
import LandingPageHeader from "@/components/layout/landing/header";
import LoginCard from "@/modules/auth/wizard/login/loginCard";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <>
      <LandingPageHeader />

      <div className="md:flex flex-col items-center justify-center gap-10 min-h-[calc(80vh-4rem)]">
        <Suspense>
          <LoginCard />
        </Suspense>
      </div>

      <Footer />
    </>
  );
}