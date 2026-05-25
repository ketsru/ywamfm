import Footer from "@/components/layout/landing/footer";
import LandingPageHeader from "@/components/layout/landing/header";
import RegisterCard from "@/modules/auth/registerCard";


export default function RegisterPage() {
    return (
      <>
        <LandingPageHeader />

        <div className="md:flex flex-col items-center justify-center py-16 gap-10">
          <RegisterCard/>
        </div>

        <Footer />
      </>
    );
}