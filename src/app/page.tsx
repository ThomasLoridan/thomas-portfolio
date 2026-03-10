import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SocialSidebar } from '@/components/layout/SocialSidebar';
import { HeroAbout } from '@/components/sections/HeroAbout';
import { CareerArc } from '@/components/sections/CareerArc';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { PauseSection } from '@/components/sections/PauseSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { Projects } from '@/components/sections/Projects';
import { Hobbies } from '@/components/Hobbies';
import { Certifications } from '@/components/sections/Certifications';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <main>
        {/* Hero + About section + quote interlude */}
        <HeroAbout />

        {/* Career progression arc */}
        <CareerArc />

        {/* Skills marquee */}
        <Skills />

        {/* Work experience by company */}
        <Experience />

        {/* Pause — after Experience */}
        <PauseSection
          stat="€30M+"
          label="programs managed"
          statement="Four companies. Eight roles. Every program delivered on scope."
          variant="dark"
        />

        {/* Testimonials */}
        <Testimonials />

        {/* Projects grid */}
        <Projects />

        {/* Pause — after Projects */}
        <PauseSection
          stat="100%"
          label="shipped to production"
          statement="Not prototypes. Not slides. Real tools, real users, real metrics."
          variant="light"
        />

        {/* Hobbies */}
        <Hobbies />

        {/* Certifications */}
        <Certifications />
      </main>
      <Footer />
    </>
  );
}
