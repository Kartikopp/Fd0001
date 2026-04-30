import { motion } from 'motion/react';
import { Menu, X, Coins, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../utils';
import { useAuth } from '../lib/AuthContext';
import { Link } from 'react-router-dom';

export function Navbar() {
  const { isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Trending', href: '#trending' },
    { name: 'Tools', href: '#tools' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled 
          ? 'bg-neutral-950/80 backdrop-blur-md border-neutral-800 py-3' 
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            <Coins className="text-black w-6 h-6" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight">
            Finance <span className="text-gold">Dastak</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-neutral-400 hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {isAdmin && (
            <Link 
              to="/admin" 
              className="flex items-center gap-2 text-sm font-bold text-gold hover:text-white transition-colors"
            >
              <LayoutDashboard size={18} /> Admin
            </Link>
          )}

          <button className="bg-gold text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gold-hover transition-colors shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            Start Learning
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-neutral-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-neutral-900 border-b border-neutral-800 p-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-neutral-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {isAdmin && (
            <Link 
              to="/admin" 
              className="text-lg font-bold text-gold flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard size={20} /> Admin Dashboard
            </Link>
          )}

          <button className="bg-gold text-black w-full py-3 rounded-xl font-bold mt-2">
            Start Learning
          </button>
        </motion.div>
      )}
    </nav>
  );
}
