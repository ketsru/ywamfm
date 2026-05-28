import Footer from "@/components/layout/landing/footer";
import LandingPageHeader from "@/components/layout/landing/header";
import LoginCard from "@/modules/auth/wizard/login/loginCard";


export default function LoginPage() {
  return (
    <>
      <LandingPageHeader />

      <div className="md:flex flex-col items-center justify-center py-16 gap-10">
        <LoginCard />
      </div>

      <Footer />
    </>
  );
}