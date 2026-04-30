import { motion } from 'motion/react';
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error("Subscription failed:", error);
      setStatus('idle');
      handleFirestoreError(error, OperationType.CREATE, 'subscribers');
    }
  };

  return (
    <section className="py-24 bg-neutral-950 border-y border-neutral-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-neutral-900 rounded-[48px] p-8 md:p-16 border border-neutral-800 relative overflow-hidden text-center">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center justify-center text-gold mx-auto mb-8"
          >
            <Mail size={32} />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Join the <span className="text-gold">Money Club</span>
          </h2>
          <p className="text-neutral-400 text-lg mb-10 max-w-xl mx-auto">
            Haar hafte seekhein investment tricks aur financial tips directly apne inbox mein. 
            Koi spam nahi, sirf quality content.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gold/10 border border-gold/20 p-6 rounded-2xl text-gold font-bold inline-block"
            >
              Shukriya! Aapne subscribe kar liya hai. 🚀
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
              <input
                type="email"
                required
                placeholder="Apna email darj karein..."
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-2xl px-6 py-4 text-white focus:border-gold outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                disabled={status === 'loading'}
                className="bg-gold text-black px-8 py-4 rounded-2xl font-bold hover:bg-gold-hover transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? 'Processing...' : 'Subscribe Now'}
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-3 text-xs text-neutral-500 font-bold uppercase tracking-widest">
            <ShieldCheck size={14} className="text-gold" />
            Join 12,000+ Smart Investors
          </div>
        </div>
      </div>
    </section>
  );
}
