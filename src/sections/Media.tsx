import { motion } from 'motion/react';
import { Play, ExternalLink } from 'lucide-react';
import { VIDEOS } from '../constants';

export function VideosSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold text-gold uppercase tracking-[0.3em] mb-4"
            >
              Visual Learning
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold"
            >
              Latest Videos
            </motion.h3>
          </div>
          <button className="text-neutral-400 font-bold flex items-center gap-2 hover:text-white transition-all">
            Visit Channel <ExternalLink size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VIDEOS.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-black shadow-2xl">
                    <Play size={24} fill="black" />
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-display font-bold leading-snug group-hover:text-gold transition-colors">
                {video.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MonetizationCTA() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-[48px] p-12 md:p-20 overflow-hidden">
          {/* Ad Placeholder (Subtle) */}
          <div className="absolute top-10 right-10 hidden lg:block">
            <div className="bg-neutral-800/30 border border-neutral-700/50 w-64 h-40 rounded-2xl flex items-center justify-center text-[10px] text-neutral-600 uppercase tracking-widest font-bold">
              Sponsored Content
            </div>
          </div>

          <div className="relative z-10 max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight"
            >
              Start Your Investment Journey Today.
            </motion.h2>
            <p className="text-xl text-neutral-400 mb-12">
              Sahi time hai invest karne ka. Join 10,000+ members who are building wealth with Finance Dastak.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-gold text-black px-10 py-5 rounded-2xl font-bold hover:bg-gold-hover transition-all shadow-[0_20px_40px_rgba(255,215,0,0.15)] flex items-center gap-3">
                Open Demat Account
                <ExternalLink size={20} />
              </button>
              <button className="text-neutral-400 font-bold hover:text-white transition-colors border-b border-neutral-800 pb-1">
                Explore Best Stocks
              </button>
            </div>

            {/* Affiliate Placeholder */}
            <p className="text-[10px] text-neutral-600 mt-12 uppercase tracking-widest font-bold italic">
              * This link supports our free education efforts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
