import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Terminal, Shield, MessageSquare, Home, Monitor, User as UserIcon, LogOut, FileText, Rocket, Network, Sparkles, Target, Zap, ChevronRight, BarChart3 } from 'lucide-react';
import Library from './components/Library';
import Labs from './components/Labs';
import Mentor from './components/Mentor';
import ConceptLibrary from './components/ConceptLibrary';
import OSModule from './components/OSModule';
import Auth from './components/Auth';
import CheatSheetHub from './components/CheatSheetHub';
import LotusAcademy from './components/LotusAcademy';
import NetworkMap from './components/NetworkMap';
import { supabase } from './lib/supabase';

import { LotusProvider } from './context/LotusContext';
import { getProgressOverview, isFirstTimeUser, getNextRecommendation } from './lib/progress';

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
    <nav className="w-64 h-screen bg-slate-900 text-slate-300 p-4 fixed left-0 top-0 flex flex-col shadow-xl z-[100]">
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
        <Link to="/academy" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
          <Rocket size={20} className="text-slate-400" />
          <span>Lotus Academy</span>
        </Link>
        <Link to="/network" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
          <Network size={20} className="text-slate-400" />
          <span>Live Network</span>
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
            <span>Sign In</span>
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
  const [progress, setProgress] = useState(getProgressOverview());
  const [firstTime, setFirstTime] = useState(true);
  const [recommendation, setRecommendation] = useState(getNextRecommendation());

  useEffect(() => {
    setProgress(getProgressOverview());
    setFirstTime(isFirstTimeUser());
    setRecommendation(getNextRecommendation());
  }, []);

  const progressItems = [
    { label: 'Lotus Academy', value: progress.academy, icon: <Rocket size={18} className="text-indigo-500" />, color: 'bg-indigo-500' },
    { label: 'Cyber Labs', value: progress.labs, icon: <Shield size={18} className="text-pink-500" />, color: 'bg-pink-500' },
    { label: 'Coding Theology', value: progress.concepts, icon: <Sparkles size={18} className="text-emerald-500" />, color: 'bg-emerald-500' },
    { label: 'OS 101', value: progress.os, icon: <Monitor size={18} className="text-blue-500" />, color: 'bg-blue-500' },
    { label: 'Cheat Sheets', value: progress.cheatsheets, icon: <FileText size={18} className="text-amber-500" />, color: 'bg-amber-500' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Welcome to Lotus</h2>
        <p className="text-slate-600 text-lg max-w-2xl">
          Your journey into code, operating systems, and cybersecurity starts here.
          Whether you're writing your first script or learning how to secure a network, Lotus is built for you.
        </p>
      </div>

      {/* First-time welcome banner */}
      {firstTime && (
        <div className="mb-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Sparkles size={20} /> New here? Let's get you started.
          </h3>
          <p className="text-indigo-100">
            Follow the Beginner's Path below to unlock your first achievements and build momentum.
          </p>
        </div>
      )}

      {/* Beginner's Path */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Target className="text-pink-500" size={22} />
          Beginner's Path
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/os"
            className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-200 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
              <Monitor size={20} className="text-indigo-600" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">1</span>
              <h4 className="font-semibold text-slate-900">Explore OS 101</h4>
            </div>
            <p className="text-sm text-slate-500">Learn how Linux, Windows, and macOS work under the hood.</p>
          </Link>

          <Link
            to="/labs"
            className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-pink-200 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center mb-4 group-hover:bg-pink-100 transition-colors">
              <Terminal size={20} className="text-pink-600" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-pink-600 text-white text-xs font-bold flex items-center justify-center">2</span>
              <h4 className="font-semibold text-slate-900">Try Your First Lab</h4>
            </div>
            <p className="text-sm text-slate-500">
              Start with <span className="font-medium text-pink-600">Linux Basics: File Detective</span> — no experience needed.
            </p>
          </Link>

          <Link
            to="/mentor"
            className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-200 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
              <MessageSquare size={20} className="text-emerald-600" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">3</span>
              <h4 className="font-semibold text-slate-900">Meet Your AI Mentor</h4>
            </div>
            <p className="text-sm text-slate-500">Ask questions, get guidance, and accelerate your learning.</p>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Overview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <BarChart3 className="text-indigo-500" size={20} />
            Progress Overview
          </h3>
          <div className="space-y-5">
            {progressItems.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-700`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Overall Completion</span>
            <span className="text-2xl font-black text-slate-900">{progress.overall}%</span>
          </div>
        </div>

        {/* Continue Learning */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-lg flex flex-col">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Zap className="text-amber-400" size={20} />
            Continue Learning
          </h3>
          {recommendation ? (
            <>
              <p className="text-slate-400 text-sm mb-2">Pick up where you left off:</p>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-xl font-bold mb-1">{recommendation.title}</p>
                <p className="text-slate-400 text-sm capitalize mb-6">{recommendation.type} Module</p>
              </div>
              <Link
                to={recommendation.path}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-center transition-colors flex items-center justify-center gap-2"
              >
                Resume <ChevronRight size={18} />
              </Link>
            </>
          ) : (
            <>
              <p className="text-slate-400 text-sm mb-2">You've completed everything!</p>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-xl font-bold mb-1">Sovereign Architect</p>
                <p className="text-slate-400 text-sm mb-6">All modules mastered. Explore anything you want.</p>
              </div>
              <Link
                to="/academy"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-center transition-colors flex items-center justify-center gap-2"
              >
                Explore Academy <ChevronRight size={18} />
              </Link>
            </>
          )}
        </div>
      </div>

      <ConceptLibrary />
    </div>
  );
}

function App() {
  return (
    <LotusProvider>
      <Router>
        <div className="flex min-h-screen bg-slate-50">
          <Navigation />
          <main className="ml-64 flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/os" element={<OSModule />} />
              <Route path="/library" element={<Library />} />
              <Route path="/cheatsheets" element={<CheatSheetHub />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/academy" element={<LotusAcademy />} />
              <Route path="/network" element={<NetworkMap />} />
              <Route path="/mentor" element={<Mentor />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
        </div>
      </Router>
    </LotusProvider>
  );
}

export default App;