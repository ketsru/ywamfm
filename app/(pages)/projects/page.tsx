import Footer from "@/components/layout/landing/footer";
import LandingPageHeader from "@/components/layout/landing/header";
import TrainingsPage from "@/components/layout/pages/formation/trainings";
import ProjectsHero from "@/components/layout/pages/projects/hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets",
  description: "Les projets accomplis au fil du temps.",
};

export default function Projects () {
    return (
        <>
            <div className="relative h-screen">
                {/* Background Image with Overlay */}
                <div 
                    className="absolute bg-fixed inset-0 bg-cover bg-center bg-no-repeat rounded-b-3xl"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                    }}
                />
                
                {/* Navigation */}
                <div className='relative pt-10'>
                    <LandingPageHeader />
                </div>

                {/* Hero Section */}
                <div className=''> 
                    <ProjectsHero />
                </div>

                {/* Traning section  */}
                <div>
                    <TrainingsPage />
                </div>

                {/* Section du footer */}
                <div className="relative">
                    <Footer />
                </div>
            </div>
        </>
    )
}