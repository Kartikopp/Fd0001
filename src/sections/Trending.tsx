import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { TRENDING_TOPICS } from '../constants';

export function TrendingTopics() {
  return (
    <section id="trending" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold text-gold uppercase tracking-[0.3em] mb-4"
            >
              Market Buzz
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold"
            >
              What's Trending Now?
            </motion.h3>
            <p className="text-neutral-400 mt-4 leading-relaxed">
              Financial trends move fast. In important topics par dhyan dein aur apni wealth grow karein.
            </p>
          </div>
          <button className="text-gold font-bold flex items-center gap-2 hover:gap-3 transition-all shrink-0">
            View All Topics <Icons.ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {TRENDING_TOPICS.map((topic, index) => {
            // @ts-ignore
            const Icon = Icons[topic.icon] || Icons.HelpCircle;
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-gold/30 hover:bg-neutral-900 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center justify-center text-gold mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Icon size={28} />
                </div>
                
                <h4 className="text-xl font-display font-bold mb-4 group-hover:text-gold transition-colors">
                  {topic.title}
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                  {topic.description}
                </p>

                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
                  Read More <Icons.ChevronRight size={14} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
