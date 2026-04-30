import { Mail, Send, Linkedin, Instagram, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gold/10 blur-[100px] rounded-full" />
            <div className="relative border border-neutral-800 rounded-[40px] p-2 overflow-hidden bg-neutral-900 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1573164067507-406c85549ff3?auto=format&fit=crop&q=80&w=800" 
                alt="About Finance Dastak" 
                className="w-full h-auto rounded-[32px] opacity-80"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-gold p-8 rounded-3xl text-black font-display font-bold shadow-2xl hidden md:block">
              <div className="text-3xl">5+ Years</div>
              <div className="text-xs uppercase tracking-wider opacity-70">Experience</div>
            </div>
          </div>
          
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold text-gold uppercase tracking-[0.3em] mb-4"
            >
              Our Mission
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-8"
            >
              What is Finance Dastak?
            </motion.h3>
            <div className="space-y-6 text-neutral-400 leading-relaxed">
              <p>
                <span className="text-white font-bold">Finance Dastak</span> is a platform dedicated to simplifying money, investing, and financial growth for everyone in India. 
                Commonly, finance topics bored lagte hain, but hum inhe entertaining aur simple banate hain.
              </p>
              <p>
                Humara goal hai ki har Indian learner—chahe woh student ho ya working professional—apne financial decisions khud le sake. 
                Wealth creation kisi ek group ke liye nahi, sabke liye hai.
              </p>
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold">✓</div>
                  <span className="text-sm font-bold text-neutral-300">100% Practical Knowledge</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold">✓</div>
                  <span className="text-sm font-bold text-neutral-300">Beginner Friendly Hinglish</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold">✓</div>
                  <span className="text-sm font-bold text-neutral-300">No Complex Jargons</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-neutral-900 border border-neutral-800 rounded-[48px] p-8 md:p-16 flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-display font-bold mb-6"
            >
              Let's Talk Money
            </motion.h2>
            <p className="text-neutral-400 mb-10 leading-relaxed">
              Koi bhi sawal ho ya partnership query, humein reach out karein. 
              Hum hamesha reply karte hain.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center text-gold shadow-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Email Us</div>
                  <div className="text-white font-bold">hello@financedastak.com</div>
                </div>
              </div>
              
              <div className="pt-8">
                <div className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-4">Follow Our Journey</div>
                <div className="flex gap-4">
                  {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 border border-neutral-800 rounded-xl flex items-center justify-center text-neutral-400 hover:border-gold hover:text-gold hover:-translate-y-1 transition-all">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Rahul Sharma"
                  className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-white focus:border-gold outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-white focus:border-gold outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-3 md:col-span-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Your Message</label>
                <textarea 
                  rows={5}
                  placeholder="How can we help you?"
                  className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-white focus:border-gold outline-none transition-colors resize-none"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="bg-gold text-black w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gold-hover transition-all shadow-xl">
                  Send Message
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
