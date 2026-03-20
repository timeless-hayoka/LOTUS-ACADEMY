import React, { useState, useEffect } from 'react';
import { Rocket, Target, Shield, Code, Zap, Search, Copy, CheckCircle, ChevronRight, Star, BookOpen, Database, BarChart3, Terminal, X, PlayCircle } from 'lucide-react';
import { academyData } from '../data/academy_data';

export default function LotusAcademy() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'cheats' | 'guides' | 'stats'>('cheats');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [learnedItems, setLearnedItems] = useState<string[]>([]);
  const [missionTerminal, setMissionTerminal] = useState<{ title: string; cmd: string } | null>(null);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('lotus_academy_progress');
    if (saved) setLearnedItems(JSON.parse(saved));
  }, []);

  const toggleLearned = (id: string) => {
    const newLearned = learnedItems.includes(id) ? learnedItems.filter(i => i !== id) : [...learnedItems, id];
    setLearnedItems(newLearned);
    localStorage.setItem('lotus_academy_progress', JSON.stringify(newLearned));
  };

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const calculateTeamProgress = (team: string) => {
    const total = academyData[team].cheats.length + academyData[team].guides.length;
    const learned = learnedItems.filter(id => id.startsWith(team)).length;
    return Math.round((learned / total) * 100);
  };

  const getRank = () => {
    const totalLearned = learnedItems.length;
    if (totalLearned > 100) return { title: 'Sovereign Architect', color: 'text-purple-400' };
    if (totalLearned > 50) return { title: 'Fleet Commander', color: 'text-indigo-400' };
    if (totalLearned > 20) return { title: 'Lead Operative', color: 'text-green-400' };
    return { title: 'Acolyte Initiate', color: 'text-slate-500' };
  };

  const getTeamIcon = (team: string) => {
    switch (team) {
      case 'Red Team': return <Target size={24} className="text-red-500" />;
      case 'Blue Team': return <Shield size={24} className="text-blue-500" />;
      case 'Programmer': return <Code size={24} className="text-indigo-500" />;
      case 'Hacker': return <Zap size={24} className="text-pink-500" />;
      default: return <Rocket size={24} />;
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[#020202] text-slate-300 font-sans selection:bg-indigo-500/30 relative">
      {/* HUD Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* Header */}
      <div className="mb-16 relative">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_50px_-12px_rgba(99,102,241,0.5)] backdrop-blur-xl">
            <Rocket className="text-indigo-400 animate-pulse" size={40} />
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-white mb-2 italic uppercase">LOTUS ACADEMY</h1>
          <div className="flex items-center gap-2 text-indigo-400/60 uppercase text-[10px] font-bold tracking-[0.5em] mb-6">
            <Star size={10} /> Sovereign Learning Command <Star size={10} />
          </div>
        </div>
      </div>

      {!selectedTeam ? (
        /* Team Selection */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {Object.keys(academyData).map((team) => (
            <div 
              key={team}
              onClick={() => setSelectedTeam(team)}
              className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all cursor-pointer group relative overflow-hidden backdrop-blur-sm"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:scale-150">{getTeamIcon(team)}</div>
              <div className="mb-8 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl border border-white/5">{getTeamIcon(team)}</div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{team}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">{academyData[team].description}</p>
              
              <div className="space-y-2 mb-10">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                  <span>Data Absorption</span>
                  <span className="text-indigo-400">{calculateTeamProgress(team)}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${calculateTeamProgress(team)}%` }}></div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity">
                Authorize Session <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Mission Interface */
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 pb-12 border-b border-white/10">
            <div className="flex items-center gap-6">
              <button onClick={() => setSelectedTeam(null)} className="w-14 h-14 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all text-slate-400 group">
                <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={24} />
              </button>
              <div>
                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{selectedTeam} COMMAND</h2>
                <p className="text-slate-500 text-sm font-medium">Rank: <span className={`font-black ${getRank().color}`}>{getRank().title}</span> | Mastery: {learnedItems.length}/240</p>
              </div>
            </div>

            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
              {[
                { id: 'cheats', icon: <Zap size={16} />, label: 'Tactical Snips' },
                { id: 'guides', icon: <BookOpen size={16} />, label: 'Mission Guides' },
                { id: 'stats', icon: <BarChart3 size={16} />, label: 'Vault' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Unified Search */}
          {(activeTab === 'cheats' || activeTab === 'guides') && (
            <div className="relative max-w-2xl mx-auto mb-12">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500/50" size={24} />
              <input 
                type="text" 
                placeholder={`Search the entire ${selectedTeam} knowledge base...`}
                className="w-full pl-14 pr-6 py-5 bg-white/[0.03] border border-white/10 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-lg text-white placeholder:text-slate-700 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          <div className="min-h-[600px]">
            {activeTab === 'cheats' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {academyData[selectedTeam].cheats
                  .filter((c: any) => c.label.toLowerCase().includes(searchTerm.toLowerCase()) || c.desc.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((cheat: any, i: number) => {
                    const itemId = `${selectedTeam}-cheat-${i}`;
                    const isLearned = learnedItems.includes(itemId);
                    return (
                      <div key={i} className={`bg-white/[0.02] border p-6 rounded-[2rem] hover:bg-white/[0.04] transition-all group relative ${isLearned ? 'border-green-500/30 shadow-[0_0_20px_-10px_rgba(34,197,94,0.2)]' : 'border-white/5'}`}>
                        <div className="flex items-start justify-between mb-4 relative z-10">
                          <div>
                            <h4 className={`font-bold text-sm tracking-wide ${isLearned ? 'text-green-400' : 'text-white'}`}>{cheat.label}</h4>
                            <p className="text-slate-600 text-[11px] mt-1 font-medium">{cheat.desc}</p>
                          </div>
                          <button onClick={() => toggleLearned(itemId)} className={`p-2 rounded-xl transition-all ${isLearned ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-slate-600 hover:text-white'}`}>
                            <CheckCircle size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 bg-black/60 p-4 rounded-2xl border border-white/5 group-hover:border-indigo-500/20 transition-all">
                          <code className="text-indigo-400/80 font-mono text-[10px] flex-1 truncate">{cheat.cmd}</code>
                          <button onClick={() => copyToClipboard(cheat.cmd)} className="text-slate-600 hover:text-white">
                            {copiedCmd === cheat.cmd ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                          </button>
                          <button onClick={() => setMissionTerminal({ title: cheat.label, cmd: cheat.cmd })} className="text-slate-600 hover:text-indigo-400">
                            <Terminal size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {activeTab === 'guides' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {academyData[selectedTeam].guides
                  .filter((g: any) => g.title.toLowerCase().includes(searchTerm.toLowerCase()) || g.text.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((guide: any, i: number) => {
                    const itemId = `${selectedTeam}-guide-${i}`;
                    const isLearned = learnedItems.includes(itemId);
                    return (
                      <div key={i} className={`bg-white/[0.02] border p-10 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group relative ${isLearned ? 'border-green-500/30' : 'border-white/5'}`}>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${isLearned ? 'bg-green-500/10 text-green-400' : 'bg-indigo-500/10 text-indigo-400'}`}><BookOpen size={24} /></div>
                            <h3 className="text-2xl font-black text-white italic tracking-tight">{guide.title}</h3>
                          </div>
                          <button onClick={() => toggleLearned(itemId)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isLearned ? 'bg-green-500 text-black' : 'bg-white/5 text-slate-500 hover:text-white'}`}>
                            {isLearned ? 'Mastered' : 'Mark as Studied'}
                          </button>
                        </div>
                        <p className="text-slate-500 leading-relaxed font-medium mb-8 text-lg">{guide.text}</p>
                        <button onClick={() => setMissionTerminal({ title: `LAB: ${guide.title}`, cmd: '# MISSION INITIALIZED\n# Awaiting command input...' })} className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2">
                          <PlayCircle size={14} /> Launch Guided Lab
                        </button>
                      </div>
                    );
                  })}
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] text-center">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Total Mastery</p>
                    <div className="text-6xl font-black text-white italic">{learnedItems.length}</div>
                    <p className="text-indigo-400/60 text-[10px] font-bold mt-2 uppercase tracking-tighter">Units Captured</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] text-center border-indigo-500/30 shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Global Rank</p>
                    <div className={`text-2xl font-black italic ${getRank().color}`}>{getRank().title.toUpperCase()}</div>
                    <p className="text-indigo-400/60 text-[10px] font-bold mt-2 uppercase tracking-tighter">Clearance Level 10</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] text-center">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Connected Vaults</p>
                    <div className="text-6xl font-black text-white italic">2</div>
                    <p className="text-indigo-400/60 text-[10px] font-bold mt-2 uppercase tracking-tighter">Drives Active</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MISSION TERMINAL OVERLAY */}
      {missionTerminal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 backdrop-blur-md bg-black/60 animate-in fade-in duration-300">
          <div className="bg-[#0a0a0a] w-full max-w-4xl border border-indigo-500/30 rounded-3xl overflow-hidden shadow-[0_0_100px_-20px_rgba(99,102,241,0.5)]">
            <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <Terminal className="text-indigo-400" size={20} />
                <span className="text-xs font-black uppercase tracking-widest text-white italic">{missionTerminal.title}</span>
              </div>
              <button onClick={() => setMissionTerminal(null)} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all text-slate-500"><X size={20} /></button>
            </div>
            <div className="p-8 font-mono text-sm space-y-4">
              <div className="text-slate-500 italic"># Initialize mission sequence...</div>
              <div className="text-green-400 font-bold">$ {missionTerminal.cmd}</div>
              <div className="h-64 bg-black/40 rounded-2xl border border-white/5 p-4 text-slate-400 overflow-y-auto">
                <p className="text-[10px] text-slate-600 mb-2 font-black uppercase tracking-widest">--- System Output ---</p>
                <p>Establishing secure bridge to target...</p>
                <p className="text-indigo-400">Loading module {missionTerminal.title.split(':')[0]}...</p>
                <p className="animate-pulse">_</p>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Clear Logs</button>
                <button className="px-6 py-2 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-indigo-500 transition-all shadow-lg">Execute Logic</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
