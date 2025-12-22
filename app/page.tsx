
import BlogSection from '@/components/layout/landing/blogs';
import Footer from '@/components/layout/landing/footer';
import LandingPageGallerie from '@/components/layout/landing/gallerie';
import LandingPageHeader from '@/components/layout/landing/header';
import Hero from '@/components/layout/landing/hero';
import Mission from '@/components/layout/landing/missions';
import NewsletterSection from '@/components/layout/landing/newsletters';
import PartnersSection from '@/components/layout/landing/partners';
import ProjectSection from '@/components/layout/landing/projects';


const LandingPage = () => {

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-b-3xl"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Navigation */}
      <div className='relative pt-5'>
        <LandingPageHeader />
      </div>

      {/* Main Content */}
      <div className='mt-30'> 
        <Hero />
      </div>

      {/* Our Mission Section */}
      <div>
        <Mission />
      </div>

      {/* Equipment Section */}
      <div>
        <LandingPageGallerie />
      </div>

      {/* Projects Section */}
      <ProjectSection />

      {/* Podcast & Stories Section */}
      <BlogSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Section du footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;