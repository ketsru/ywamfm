import Footer from "@/components/layout/landing/footer";
import LandingPageHeader from "@/components/layout/landing/header";


export default function BecomeOurPartner () {
    return (
        <>
            <div className="min-h-screen relative">
                {/* Background Image with Overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-b-3xl"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                    }}
                />
                
                {/* Navigation */}
                <div className='relative pt-22'>
                    <LandingPageHeader />
                </div>


                <div className="min-h-screen text-center mt-22">
                    Become partner page
                </div>

                {/* Section du footer */}
                <div className="relative">
                    <Footer />
                </div>
            </div>
        </>
    )
}