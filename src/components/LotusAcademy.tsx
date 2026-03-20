import React, { useState, useEffect } from 'react';
import { Rocket, Target, Shield, Code, Zap, Search, Copy, CheckCircle, ChevronRight, Star, BookOpen, Database, BarChart3, Terminal, Monitor, LayoutGrid } from 'lucide-react';
import { academyData } from '../data/academy_data';

export default function LotusAcademy() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'cheats' | 'guides' | 'stats'>('cheats');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [learnedItems, setLearnedItems] = useState<string[]>([]);
  const [isHudMode, setIsHudMode] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lotus_academy_progress');
    if (saved) setLearnedItems(JSON.parse(saved));
  }, []);

  const toggleLearned = (id: string) => {
    const newLearned = learnedItems.includes(id) 
      ? learnedItems.filter(i => i !== id) 
      : [...learnedItems, id];
    setLearnedItems(newLearned);
    localStorage.setItem('lotus_academy_progress', JSON.stringify(newLearned));
  };

  const teamKeys = Object.keys(academyData);

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
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

  const calculateProgress = (team: string) => {
    const teamCheats = academyData[team].cheats.length;
    const teamGuides = academyData[team].guides.length;
    const total = teamCheats + teamGuides;
    const learnedCount = learnedItems.filter(id => id.startsWith(team)).length;
    return Math.round((learnedCount / total) * 100);
  };

  return (
    <div className={`p-8 min-h-screen transition-colors duration-700 ${isHudMode ? 'bg-[#0a0a0a]' : 'bg-[#020202]'} text-slate-300 font-sans selection:bg-indigo-500/30`}>
      {/* HUD Mode Scanlines */}
      {isHudMode && (
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      )}

      {/* Theme Toggle */}
      <button 
        onClick={() => setIsHudMode(!isHudMode)}
        className="fixed top-8 right-8 z-50 p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-indigo-600/20 transition-all group"
        title="Toggle HUD Mode"
      >
        {isHudMode ? <LayoutGrid size={20} className="text-indigo-400" /> : <Monitor size={20} className="text-slate-500 group-hover:text-white" />}
      </button>

      {/* Header */}
      <div className="mb-16 relative">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_50px_-12px_rgba(99,102,241,0.5)] backdrop-blur-xl group cursor-help">
            <Rocket className={`transition-all duration-1000 ${isHudMode ? 'text-green-400 rotate-45' : 'text-indigo-400 animate-pulse'}`} size={40} />
          </div>
          <h1 className={`text-6xl font-black tracking-tighter mb-2 italic uppercase transition-colors ${isHudMode ? 'text-green-500 font-mono' : 'text-white'}`}>LOTUS ACADEMY</h1>
          <div className="flex items-center gap-2 text-indigo-400/60 uppercase text-[10px] font-bold tracking-[0.5em] mb-6">
            <Star size={10} /> The Sovereign Knowledge Engine <Star size={10} />
          </div>
        </div>
      </div>

      {!selectedTeam ? (
        /* Team Selection Orbit */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {teamKeys.map((team) => (
            <div 
              key={team}
              onClick={() => setSelectedTeam(team)}
              className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all cursor-pointer group relative overflow-hidden backdrop-blur-sm"
            >
              <div className="mb-8 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-xl border border-white/5">
                {getTeamIcon(team)}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform tracking-tight">{team}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">{academyData[team].description}</p>
              
              {/* Team Progress Bar */}
              <div className="space-y-2 mb-10">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                  <span>Knowledge Depth</span>
                  <span className="text-indigo-400">{calculateProgress(team)}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-1000" 
                    style={{ width: `${calculateProgress(team)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity">
                Initialize Mission <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Mission Control Hub */
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 pb-12 border-b border-white/10">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setSelectedTeam(null)}
                className="w-14 h-14 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all text-slate-400 group"
              >
                <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={24} />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  {getTeamIcon(selectedTeam)}
                  <h2 className={`text-4xl font-black italic tracking-tighter uppercase ${isHudMode ? 'text-green-400 font-mono' : 'text-white'}`}>{selectedTeam} COMMAND</h2>
                </div>
                <p className="text-slate-500 text-sm font-medium">Clearance Level 10 Active | User: crex</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
              {[
                { id: 'cheats', icon: <Zap size={16} />, label: 'Cheat Sheets' },
                { id: 'guides', icon: <BookOpen size={16} />, label: 'Tactical Guides' },
                { id: 'stats', icon: <BarChart3 size={16} />, label: 'Vault Status' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                    activeTab === tab.id 
                      ? (isHudMode ? 'bg-green-600 text-black' : 'bg-indigo-600 text-white shadow-lg') 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-[600px]">
            {activeTab === 'cheats' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="relative max-w-2xl mx-auto mb-12">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500/50" size={24} />
                  <input 
                    type="text" 
                    placeholder={`Query ${selectedTeam} database...`}
                    className="w-full pl-14 pr-6 py-5 bg-white/[0.03] border border-white/10 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-lg text-white placeholder:text-slate-700 transition-all shadow-2xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {academyData[selectedTeam].cheats
                    .filter((c: any) => c.label.toLowerCase().includes(searchTerm.toLowerCase()) || c.desc.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((cheat: any, i: number) => {
                      const itemId = `${selectedTeam}-cheat-${i}`;
                      const isLearned = learnedItems.includes(itemId);
                      return (
                        <div key={i} className={`bg-white/[0.02] border p-6 rounded-[2rem] hover:bg-white/[0.04] transition-all group relative overflow-hidden ${isLearned ? 'border-green-500/30' : 'border-white/5'}`}>
                          <div className="flex items-start justify-between mb-4 relative z-10">
                            <div>
                              <h4 className={`font-bold text-sm tracking-wide transition-colors ${isLearned ? 'text-green-400' : 'text-white group-hover:text-indigo-400'}`}>{cheat.label}</h4>
                              <p className="text-slate-600 text-[11px] mt-1 font-medium leading-relaxed">{cheat.desc}</p>
                            </div>
                            <button 
                              onClick={() => toggleLearned(itemId)}
                              className={`p-2 rounded-xl transition-all ${isLearned ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-slate-600 hover:text-white'}`}
                            >
                              <CheckCircle size={16} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3 bg-black/60 p-4 rounded-2xl border border-white/5 group-hover:border-indigo-500/20 transition-all relative z-10">
                            <code className="text-indigo-400/80 font-mono text-[10px] flex-1 truncate">{cheat.cmd}</code>
                            <div className="flex gap-1">
                              <button 
                                onClick={() => copyToClipboard(cheat.cmd)}
                                className="p-2 hover:bg-white/5 rounded-lg text-slate-600 hover:text-white transition-colors"
                                title="Copy Command"
                              >
                                {copiedCmd === cheat.cmd ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                              </button>
                              <button className="p-2 hover:bg-white/5 rounded-lg text-slate-600 hover:text-white transition-colors" title="Execute in Terminal">
                                <Terminal size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {activeTab === 'guides' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
                {academyData[selectedTeam].guides
                  .filter((g: any) => g.title.toLowerCase().includes(searchTerm.toLowerCase()) || g.text.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((guide: any, i: number) => {
                    const itemId = `${selectedTeam}-guide-${i}`;
                    const isLearned = learnedItems.includes(itemId);
                    return (
                      <div key={i} className={`bg-white/[0.02] border p-10 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group relative ${isLearned ? 'border-green-500/30' : 'border-white/5'}`}>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl transition-all ${isLearned ? 'bg-green-500/10 text-green-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                              <BookOpen size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-white italic group-hover:translate-x-1 transition-transform tracking-tight">{guide.title}</h3>
                          </div>
                          <button 
                            onClick={() => toggleLearned(itemId)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isLearned ? 'bg-green-500 text-black' : 'bg-white/5 text-slate-500 hover:text-white'}`}
                          >
                            {isLearned ? 'Mastered' : 'Mark as Studied'}
                          </button>
                        </div>
                        <p className="text-slate-500 leading-relaxed font-medium mb-8 text-lg">
                          {guide.text}
                        </p>
                        <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-lg flex items-center justify-center gap-2">
                          <Rocket size={14} /> Launch Guided Lab
                        </button>
                      </div>
                    );
                  })}
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] text-center">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Knowledge Depth</p>
                    <div className="text-5xl font-black text-white italic">244</div>
                    <p className="text-indigo-400/60 text-[10px] font-bold mt-2 italic">Active Skills Verified</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] text-center border-indigo-500/20 shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Mastery Rank</p>
                    <div className="text-5xl font-black text-indigo-500 italic">L-10</div>
                    <p className="text-indigo-400/60 text-[10px] font-bold mt-2 italic">Interstellar Architect</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] text-center">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Archive Density</p>
                    <div className="text-5xl font-black text-white italic">156</div>
                    <p className="text-indigo-400/60 text-[10px] font-bold mt-2 italic">Lessons Completed</p>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12">
                    <Database size={150} />
                  </div>
                  <h3 className="text-xl font-black text-white mb-8 italic uppercase tracking-wider flex items-center gap-3 relative z-10">
                    <Database size={20} className="text-indigo-500" /> Intelligence Vault Status
                  </h3>
                  <div className="space-y-4 relative z-10">
                    {[
                      { name: 'GO-GO-GADET (Cybersec Learning)', size: '566MB Archive', status: '🟢 ONLINE' },
                      { name: 'PortableSSD (Network Scans)', size: '1.2TB Vault', status: '🟢 ONLINE' },
                      { name: 'BLKKNIGHT (Emergency Recovery)', size: 'System Backup', status: '🟠 STANDBY' }
                    ].map(vault => (
                      <div key={vault.name} className="flex items-center justify-between p-6 bg-black/40 rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
                        <div>
                          <p className="text-sm font-bold text-white tracking-wide group-hover:text-indigo-400 transition-colors">{vault.name}</p>
                          <p className="text-[10px] text-slate-600 font-bold uppercase mt-1">{vault.size}</p>
                        </div>
                        <span className="text-[10px] font-black text-indigo-400/80 tracking-widest">{vault.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
