import { motion } from 'motion/react';
import { Coins, LogIn, ArrowLeft } from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { useEffect } from 'react';

export default function Login() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (isAdmin) navigate('/admin');
      else navigate('/');
    }
  }, [user, isAdmin, navigate]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
      <div className="absolute top-10 left-10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} /> Back to Finance Dastak
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-[40px] p-8 md:p-12 text-center"
      >
        <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,215,0,0.3)]">
          <Coins className="text-black w-8 h-8" />
        </div>

        <h1 className="text-3xl font-display font-bold mb-4">Welcome Back</h1>
        <p className="text-neutral-400 mb-10">
          Admin panel access karne ke liye login karein. Finance Dastak ecosystem ka hissa banein.
        </p>

        <button 
          onClick={handleLogin}
          className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-neutral-200 transition-all shadow-xl"
        >
          <LogIn size={20} />
          Sign in with Google
        </button>

        <div className="mt-8 pt-8 border-t border-neutral-800">
          <p className="text-xs text-neutral-600 uppercase tracking-widest font-bold">
            Secure Admin Access Only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
