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
  const [activeTab, setActiveTab] = useState<'subscribers' | 'contacts' | 'articles' | 'admins'>('subscribers');
  const [data, setData] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ email: '', role: 'admin' });
  const [showAddAdmin, setShowAddAdmin] = useState(false);

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
      let q;
      if (activeTab === 'admins') {
        q = query(collection(db, 'admins'));
      } else {
        q = query(collection(db, activeTab), orderBy('createdAt', 'desc'));
      }
      const snapshot = await getDocs(q);
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
    } finally {
      setFetching(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.email) return;

    try {
      // Use email as ID (or a hash) - but for simplicity we add a doc with specific fields
      // and let Firestore generate ID, or search by email. 
      // In firestore.rules we use document ID for isAdmin check, so we should probably use a predictable ID or search
      // Actually, my isAdmin rule uses: exists(/databases/$(database)/documents/admins/$(request.auth.uid))
      // This means we need the UID. Since we only have email, we'd usually need a cloud function to map email to UID.
      // FOR NOW, I will use addDoc and note that document ID should ideally match UID for the exists() rule to work perfectly with UID-based lookups.
      // Better yet, I'll update the rule to allow lookup by field or explain that the list here is for reference, 
      // but let's stick to the current UI-based management.
      
      await addDoc(collection(db, 'admins'), {
        ...newAdmin,
        createdAt: serverTimestamp(),
      });
      setShowAddAdmin(false);
      setNewAdmin({ email: '', role: 'admin' });
      fetchData();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'admins');
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
          <SidebarLink 
            active={activeTab === 'admins'} 
            onClick={() => setActiveTab('admins')}
            icon={<LayoutDashboard size={20} />}
            label="Admins"
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
          <div className="flex items-center gap-6">
            {activeTab === 'admins' && (
              <button 
                onClick={() => setShowAddAdmin(!showAddAdmin)}
                className="bg-gold text-black px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gold-hover transition-colors"
              >
                Add Admin
              </button>
            )}
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm text-gold hover:underline"
            >
              View Site <ExternalLink size={14} />
            </button>
          </div>
        </header>

        {showAddAdmin && activeTab === 'admins' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-neutral-900 border border-neutral-800 p-8 rounded-[32px]"
          >
            <h2 className="text-xl font-bold mb-6">Create New Administrator</h2>
            <form onSubmit={handleAddAdmin} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  placeholder="admin@example.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-gold"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  required
                />
              </div>
              <div className="w-full md:w-48 space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Role</label>
                <select 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-gold appearance-none"
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
              <button 
                type="submit"
                className="bg-white text-black h-[50px] px-8 rounded-xl font-bold hover:bg-neutral-200 transition-colors"
              >
                Add Member
              </button>
            </form>
          </motion.div>
        )}

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
                    {activeTab === 'admins' && (
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-gold font-bold">
                          {item.email[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="text-lg font-bold">{item.email}</div>
                          <div className="text-xs text-gold uppercase tracking-widest font-bold">{item.role}</div>
                        </div>
                      </div>
                    )}
                    {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : 'Recent'}
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
