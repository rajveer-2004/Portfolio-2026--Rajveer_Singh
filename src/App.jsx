import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import TechMarquee from './components/TechMarquee';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Particles from './components/Particles';
import SpotifyStatus from './components/SpotifyStatus';

export default function App() {
  return (
    <>
      <CustomCursor />

      {/* Animated background layers */}
      <div className="bg-mesh" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <Particles />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <div className="section-divider max-w-5xl mx-auto" />
          <About />
          <TechMarquee />
          <Experience />
          <Projects />
          <div className="section-divider max-w-5xl mx-auto" />
          <Skills />
          <div className="section-divider max-w-5xl mx-auto" />
          <Contact />
        </main>
        <Footer />
        <SpotifyStatus />
      </div>
    </>
  );
}
