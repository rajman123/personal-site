import { Hero } from '@/components/Hero';
import { ProjectCarousel } from '@/components/ProjectCarousel';
import { AboutTeaser } from '@/components/AboutTeaser';
import { ContactTeaser } from '@/components/ContactTeaser';

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectCarousel />
      <AboutTeaser />
      <ContactTeaser />
    </>
  );
}

export const metadata = {
  title: 'Rajveer Gehani — AI agents that run real workflows',
};
