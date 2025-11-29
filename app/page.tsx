'use client';

import { useState, useEffect } from 'react';
import HeroScene from '@/components/HeroShader';
import Projects from '@/components/Projects';
import GlitchText from '@/components/GlitchText';
import Preloader from '@/components/Preloader';
import { AnimatePresence } from 'framer-motion';
import TechMarquee from '@/components/TechMarquee';
import Terminal from '@/components/Terminal';
import SystemStatus from '@/components/SystemStatus';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-black overflow-x-hidden">


      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>


      {!isLoading && (
        <>
          <SystemStatus />
          <ScrollProgress />
          <div className="fixed inset-0 z-0 animate-in fade-in duration-1000">
            <HeroScene />
          </div>

          <section className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4 animate-in slide-in-from-bottom-10 duration-1000 fade-in">
            <div className="text-center text-white">
              {/* Glitch Component */}
              <GlitchText
                text="TUĞBERK KARADAĞ"
                className="text-6xl md:text-9xl font-bold tracking-tight mb-4 font-rajdhani uppercase"
              />

              <p className="text-xl md:text-2xl font-light text-gray-300 mb-8 max-w-2xl mx-auto">
                Software Engineer & Creative Technologist <br />
                <span className="text-sm text-indigo-400 font-mono mt-2 block tracking-widest">
                  [ C++/C# :: JUCE :: DSP :: WEB :: UNITY ]
                </span>
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={scrollToProjects}
                  className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
                >
                  Projects
                </button>
                <a
                  href="https://github.com/TugberkKaradag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border border-white/30 backdrop-blur-sm rounded hover:bg-white/10 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </section>
          <TechMarquee />
          <Projects />
          <Terminal />
        </>
      )}

    </main>
  );
}