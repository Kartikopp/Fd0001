import { Coins, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <Coins className="text-black w-5 h-5" />
              </div>
              <span className="text-xl font-display font-bold">
                Finance <span className="text-gold">Dastak</span>
              </span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Simplifying money, investing, and financial growth for everyone in India. Master your money with us.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold hover:border-gold transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#blog" className="hover:text-gold transition-colors">Blog Articles</a></li>
              <li><a href="#tools" className="hover:text-gold transition-colors">Finance Tools</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6">Categories</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-gold transition-colors">SIP & Mutual Funds</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Stock Market Basics</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Real Estate</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Tax Solutions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold shrink-0" />
                <span>contact@financedastak.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-500 text-xs text-center md:text-left">
            © 2026 Finance Dastak. All rights reserved. Made with ❤️ for Indian Learners.
          </p>
          <div className="flex gap-8 text-xs text-neutral-500">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
