import { motion } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { logout, db, OperationType, handleFirestoreError } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { 
  Users, 
  Mail, 
  FileText, 
  LogOut, 
  Trash2, 
  LayoutDashboard,
  ExternalLink 
} from 'lucide-react';
import { formatINR } from '../utils';

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'subscribers' | 'contacts' | 'articles'>('subscribers');
  const [data, setData] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/login');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [activeTab, user, isAdmin]);

  const fetchData = async () => {
    setFetching(true);
    try {
      const q = query(collection(db, activeTab), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
      // We don't necessarily call handleFirestoreError here unless we want to crash/show toast
    } finally {
      setFetching(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      await deleteDoc(doc(db, activeTab, id));
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${activeTab}/${id}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-8 flex flex-col gap-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center text-black font-bold">A</div>
          <span className="font-display font-bold">Admin Panel</span>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarLink 
            active={activeTab === 'subscribers'} 
            onClick={() => setActiveTab('subscribers')}
            icon={<Users size={20} />}
            label="Subscribers"
          />
          <SidebarLink 
            active={activeTab === 'contacts'} 
            onClick={() => setActiveTab('contacts')}
            icon={<Mail size={20} />}
            label="Messages"
          />
          <SidebarLink 
            active={activeTab === 'articles'} 
            onClick={() => setActiveTab('articles')}
            icon={<FileText size={20} />}
            label="Articles"
          />
        </nav>

        <div className="mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-neutral-500 hover:text-red-400 transition-colors w-full p-3 rounded-xl hover:bg-red-400/10"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold capitalize">{activeTab}</h1>
            <p className="text-neutral-500 mt-2">Manage your website data and interactions.</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-gold hover:underline"
          >
            View Site <ExternalLink size={14} />
          </button>
        </header>

        {fetching ? (
          <div className="animate-pulse flex flex-col gap-4">
            {[1,2,3].map(i => <div key={i} className="h-20 bg-neutral-900 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid gap-6">
            {data.length === 0 ? (
              <div className="p-20 text-center border-2 border-dashed border-neutral-800 rounded-[40px] text-neutral-600 font-bold uppercase tracking-widest">
                No data available
              </div>
            ) : (
              data.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl flex items-center justify-between group"
                >
                  <div className="flex-1">
                    {activeTab === 'subscribers' && (
                      <div className="text-lg font-bold">{item.email}</div>
                    )}
                    {activeTab === 'contacts' && (
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-white">{item.name}</span>
                          <span className="text-xs text-neutral-500">{item.email}</span>
                        </div>
                        <p className="text-neutral-400 text-sm line-clamp-2">{item.message}</p>
                      </div>
                    )}
                    {activeTab === 'articles' && (
                      <div>
                        <div className="font-bold">{item.title}</div>
                        <div className="text-xs text-neutral-500">{item.category}</div>
                      </div>
                    )}
                    <div className="text-[10px] text-neutral-600 uppercase tracking-widest mt-2">
                       {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : 'Recent'}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarLink({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-4 rounded-2xl transition-all font-bold ${
        active 
          ? 'bg-gold text-black shadow-lg shadow-gold/20' 
          : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
      }`}
    >
      {icon} {label}
    </button>
  );
}
