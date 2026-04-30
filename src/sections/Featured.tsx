import { motion } from 'motion/react';
import { Clock, Tag, ChevronRight, Twitter, Linkedin, Share2 } from 'lucide-react';
import { FEATURED_ARTICLES } from '../constants';

export function FeaturedArticles() {
  const shareOnTwitter = (title: string) => {
    const url = window.location.href;
    const text = `Check out this article from Finance Dastak: ${title}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnLinkedIn = (title: string) => {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <section id="blog" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-gold uppercase tracking-[0.3em] mb-4"
          >
            Must Read
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold"
          >
            Featured Content
          </motion.h3>
          <p className="text-neutral-400 mt-4 max-w-xl mx-auto">
            Deep insights into the world of money. Seekhein kaise aap apne financial goals achieve kar sakte hain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_ARTICLES.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-neutral-900 border border-neutral-800 rounded-[32px] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 flex justify-between w-[calc(100%-3rem)] items-center">
                  <span className="bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border border-white/10">
                    <Tag size={10} className="text-gold" />
                    {article.category}
                  </span>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => shareOnTwitter(article.title)}
                      className="w-8 h-8 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-gold transition-colors"
                      title="Share on Twitter"
                    >
                      <Twitter size={14} />
                    </button>
                    <button 
                      onClick={() => shareOnLinkedIn(article.title)}
                      className="w-8 h-8 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-gold transition-colors"
                      title="Share on LinkedIn"
                    >
                      <Linkedin size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {article.readTime}
                  </span>
                </div>

                <h4 className="text-2xl font-display font-bold mb-4 leading-[1.3] group-hover:text-gold transition-colors">
                  {article.title}
                </h4>
                <p className="text-neutral-400 text-sm leading-relaxed mb-auto">
                  {article.summary}
                </p>

                <button className="mt-8 pt-8 border-t border-neutral-800 flex items-center justify-between text-white font-bold group-hover:text-gold transition-colors">
                  Continue Reading
                  <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all">
                    <ChevronRight size={18} />
                  </div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
