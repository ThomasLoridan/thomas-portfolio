import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SocialSidebar } from '@/components/layout/SocialSidebar';
import { HeroAbout } from '@/components/sections/HeroAbout';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Certifications } from '@/components/sections/Certifications';
import { Testimonials } from '@/components/sections/Testimonials';
import { Projects } from '@/components/sections/Projects';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <main>
        <HeroAbout />
        <Skills />
        <Experience />
        <Testimonials />
        <Certifications />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
