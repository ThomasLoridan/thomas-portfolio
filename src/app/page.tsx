import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SocialSidebar } from '@/components/layout/SocialSidebar';
import { HeroAbout } from '@/components/sections/HeroAbout';
import { ProofQuote } from '@/components/sections/ProofQuote';
import { CareerArc } from '@/components/sections/CareerArc';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { PauseSection } from '@/components/sections/PauseSection';
import { Projects } from '@/components/sections/Projects';
import { Testimonials } from '@/components/sections/Testimonials';
import { Hobbies } from '@/components/Hobbies';
import { Certifications } from '@/components/sections/Certifications';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <main>
        {/* Hero (dark) + About (white) */}
        <HeroAbout />

        {/* Proof quote — white bg, after About */}
        <ProofQuote />

        {/* Career arc progression — dark bg */}
        <CareerArc />

        {/* Skills — light gray bg */}
        <Skills />

        {/* Work experience by company — dark bg */}
        <Experience />

        {/* Pause 1 — after Experience */}
        <PauseSection
          stat="€16.3M+"
          label="Total ARR impact delivered across Amazon systems in 3 years."
          variant="dark"
        />

        {/* Projects grid — dark bg */}
        <Projects />

        {/* Pause 2 — after Projects */}
        <PauseSection
          stat="7,000+"
          label="Lines of production Python. Not a side project — operational infrastructure."
          variant="dark"
        />

        {/* Testimonials */}
        <Testimonials />

        {/* Hobbies */}
        <Hobbies />

        {/* Certifications */}
        <Certifications />
      </main>
      <Footer />
    </>
  );
}
