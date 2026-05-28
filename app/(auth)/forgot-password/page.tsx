
import Footer from "@/components/layout/landing/footer";
import LandingPageHeader from "@/components/layout/landing/header";
import ForgotPasswordCard from "@/modules/auth/wizard/forgotPassword/forgotPasswordCard";

export default function ForgotPasswordPage() {
  return (
    <>
      <LandingPageHeader />

      <div className="md:flex flex-col items-center justify-center py-16 gap-10">
        <ForgotPasswordCard />
      </div>

      <Footer />
    </>
  );
}