import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Terminal, Shield, MessageSquare, Home, Monitor, User as UserIcon, LogOut, FileText } from 'lucide-react';
import Library from './components/Library';
import Labs from './components/Labs';
import Mentor from './components/Mentor';
import ConceptLibrary from './components/ConceptLibrary';
import OSModule from './components/OSModule';
import Auth from './components/Auth';
import CheatSheetHub from './components/CheatSheetHub';
import { supabase } from './lib/supabase';

import { LotusProvider } from './context/LotusContext';

function Navigation() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="w-64 h-screen bg-slate-900 text-slate-300 p-4 fixed left-0 top-0 flex flex-col shadow-xl">
      <div className="flex items-center gap-3 mb-10 px-2 mt-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center">
          <span className="text-white font-bold text-xl">L</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-wide">Lotus</h1>
      </div>
      
      <div className="space-y-2 flex-1">
        <Link to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
          <Home size={20} className="text-slate-400" />
          <span>Dashboard</span>
        </Link>
        <Link to="/os" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
          <Monitor size={20} className="text-slate-400" />
          <span>OS 101</span>
        </Link>
        <Link to="/library" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
          <BookOpen size={20} className="text-slate-400" />
          <span>Command Library</span>
        </Link>
        <Link to="/cheatsheets" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
          <FileText size={20} className="text-slate-400" />
          <span>Cheat Sheets</span>
        </Link>
        <Link to="/labs" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
          <Shield size={20} className="text-slate-400" />
          <span>Cyber Labs</span>
        </Link>
        <Link to="/mentor" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
          <MessageSquare size={20} className="text-slate-400" />
          <span>AI Mentor</span>
        </Link>
      </div>

      <div className="mt-auto space-y-4">
        {user ? (
          <div className="p-4 bg-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <UserIcon size={16} className="text-pink-500" />
              <span className="text-xs font-bold truncate">{user.email}</span>
            </div>
            <button onClick={() => supabase.auth.signOut()} className="text-slate-500 hover:text-red-400 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <Link to="/auth" className="flex items-center gap-3 p-3 rounded-lg bg-pink-600 text-white font-bold hover:bg-pink-700 transition-colors text-center justify-center shadow-lg shadow-pink-900/20">
            <UserIcon size={20} />
            <span>Identity Link</span>
          </Link>
        )}
        <div className="p-4 bg-slate-800/50 rounded-xl">
          <p className="text-[10px] text-slate-500 text-center leading-tight uppercase font-bold tracking-widest">
            Lotus Foundation v1.0
          </p>
        </div>
      </div>
    </nav>
  );
}

function Dashboard() {
  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold text-slate-900 mb-6">Welcome to Lotus</h2>
      <p className="text-slate-600 text-lg max-w-2xl mb-8">
        Your journey into code, operating systems, and cybersecurity starts here. 
        Whether you're writing your first script or learning how to secure a network, Lotus is built for you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <Terminal className="text-pink-500 mb-4" size={32} />
          <h3 className="text-xl font-semibold mb-2">Coding Theology</h3>
          <p className="text-slate-500">Learn what {`{}`} means, why we use `;`, and the fundamental logic behind all programming languages.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <Shield className="text-indigo-500 mb-4" size={32} />
          <h3 className="text-xl font-semibold mb-2">Cyber Defense</h3>
          <p className="text-slate-500">Understand the mindset of attackers to build better defenses. Interactive ethical hacking labs await.</p>
        </div>
      </div>

      <ConceptLibrary />
    </div>
  );
import LotusAcademy from './components/LotusAcademy';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="ml-64 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/os" element={<OSModule />} />
            <Route path="/library" element={<Library />} />
            <Route path="/cheatsheets" element={<CheatSheetHub />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/academy" element={<LotusAcademy />} />
            <Route path="/mentor" element={<Mentor />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
    </Router>
  );
}

export default App;
