/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { TrendingTopics } from './sections/Trending';
import { FeaturedArticles } from './sections/Featured';
import { ToolsSection } from './sections/Tools';
import { VideosSection, MonetizationCTA } from './sections/Media';
import { AboutSection, ContactSection } from './sections/Communication';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 overflow-x-hidden selection:bg-gold selection:text-black">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-60 origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        
        {/* Trusted By Section (Implicitly requested asbadges in Trust Section) */}
        <section className="py-12 border-y border-neutral-900 bg-neutral-950/50">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tighter">
                 <span className="text-gold">TRUSTED</span> EDUCATION
               </div>
               <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tighter">
                 <span className="text-gold">10K+</span> LEARNERS
               </div>
               <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tighter">
                 <span className="text-gold">BEGINNER</span> FRIENDLY
               </div>
               <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tighter">
                 <span className="text-gold">HINGLISH</span> CONTENT
               </div>
            </div>
          </div>
        </section>

        <TrendingTopics />
        <FeaturedArticles />
        <ToolsSection />
        <VideosSection />
        <AboutSection />
        <MonetizationCTA />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

