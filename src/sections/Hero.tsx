import { motion } from 'motion/react';
import { ArrowRight, Play, TrendingUp, ShieldCheck, Users } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-1.5 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              India's #1 Finance Education Hub
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-8"
          >
            Master Your Money with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">
              Finance Dastak
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12 leading-relaxed"
          >
            Learn Investing, Trading & Smart Finance in Simple Hindi. 
            Apni financial journey aaj hi shuru karein.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 215, 0, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-gold text-black px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gold-hover transition-colors group"
            >
              Start Learning
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 255, 255, 0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-neutral-900 text-white border border-neutral-800 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
            >
              <Play size={18} className="fill-gold text-gold" />
              Explore Tools
            </motion.button>
          </motion.div>

          {/* Quick Trust Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-24 pt-12 border-t border-neutral-900 w-full"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-gold">
                <Users size={20} />
              </div>
              <div className="text-left">
                <div className="text-xl font-display font-bold text-white">10K+</div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider">Learners</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 border-l md:border-x border-neutral-900">
              <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-gold">
                <TrendingUp size={20} />
              </div>
              <div className="text-left">
                <div className="text-xl font-display font-bold text-white">Simple</div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider">Education</div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-gold">
                <ShieldCheck size={20} />
              </div>
              <div className="text-left">
                <div className="text-xl font-display font-bold text-white">Trusted</div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider">Expert Advice</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
