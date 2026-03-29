import { useState, useEffect } from 'react';
import TerminalSimulator from './TerminalSimulator';
import { Shield, CheckCircle2, Info, PlayCircle, FileDown, Search, Sparkles } from 'lucide-react';
import { gdriveService, type LotusAsset } from '../services/gdrive';
import { cyberLabs, type Lab } from '../data/cyber_labs';
import { getLabsProgress, saveLabsProgress } from '../lib/progress';

const firstBeginnerLab = cyberLabs.find(l => l.difficulty === 'beginner') || cyberLabs[0];

export default function Labs() {
  const [selectedLab, setSelectedLab] = useState<Lab>(firstBeginnerLab);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [assets, setAssets] = useState<LotusAsset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  useEffect(() => {
    gdriveService.getAssets('labs').then(setAssets);
    const progress = getLabsProgress();
    setCompletedSteps(progress[firstBeginnerLab.id] || []);
  }, []);

  useEffect(() => {
    const progress = getLabsProgress();
    setCompletedSteps(progress[selectedLab.id] || []);
    setActiveStep(0);
  }, [selectedLab]);

  const filteredLabs = cyberLabs.filter(lab => 
    (filterCategory === 'all' || lab.category === filterCategory) &&
    (filterDifficulty === 'all' || lab.difficulty === filterDifficulty) &&
    lab.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCommand = (cmd: string) => {
    const currentStep = selectedLab.steps[activeStep];
    if (currentStep && cmd.toLowerCase().trim() === currentStep.expected) {
      if (!completedSteps.includes(activeStep)) {
        const newCompleted = [...completedSteps, activeStep];
        setCompletedSteps(newCompleted);
        const progress = getLabsProgress();
        progress[selectedLab.id] = newCompleted;
        saveLabsProgress(progress);
        if (activeStep < selectedLab.steps.length - 1) {
          setActiveStep(activeStep + 1);
        }
      }
    }
    return '';
  };

  const handleLabSelect = (lab: Lab) => {
    setSelectedLab(lab);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto flex gap-8 h-[calc(100vh-4rem)]">
      {/* Sidebar: Lab Selection */}
      <div className="w-80 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search labs..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {['all', 'linux', 'python', 'network', 'web', 'crypto'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  filterCategory === cat ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'beginner', 'intermediate', 'advanced'].map(diff => (
              <button 
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  filterDifficulty === diff ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-200">
          {filteredLabs.map(lab => (
            <div 
              key={lab.id}
              onClick={() => handleLabSelect(lab)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedLab.id === lab.id 
                  ? 'bg-white border-indigo-500 shadow-lg ring-1 ring-indigo-500' 
                  : 'bg-white border-slate-100 hover:border-indigo-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase text-indigo-500">{lab.category}</span>
                <div className="flex items-center gap-1.5">
                  {lab.featured && lab.difficulty === 'beginner' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-emerald-100 text-emerald-700 flex items-center gap-0.5">
                      <Sparkles size={9} /> Start Here
                    </span>
                  )}
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    lab.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                    lab.difficulty === 'intermediate' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {lab.difficulty}
                  </span>
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-800 leading-tight">{lab.title}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content: Active Lab */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Shield size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h2 className="text-3xl font-black text-slate-900">{selectedLab.title}</h2>
              {selectedLab.featured && selectedLab.difficulty === 'beginner' && (
                <span className="shrink-0 mt-1.5 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-700">
                  <Sparkles size={12} /> Start Here
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-slate-500 mb-6 font-medium">
              <span className="flex items-center gap-1"><Info size={16} /> Objective:</span>
              <span>{selectedLab.objective}</span>
            </div>
            <p className="text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed italic">
              "{selectedLab.scenario}"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Mission Steps</h3>
            {selectedLab.steps.map((step, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  activeStep === idx ? 'bg-white border-indigo-500 shadow-xl scale-[1.02]' :
                  completedSteps.includes(idx) ? 'bg-slate-50 border-slate-200 opacity-60' :
                  'bg-white border-slate-100 opacity-40'
                }`}
              >
                <div className="flex items-start gap-4">
                  {completedSteps.includes(idx) ? (
                    <CheckCircle2 size={24} className="text-green-500" />
                  ) : (
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                      activeStep === idx ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {idx + 1}
                    </div>
                  )}
                  <div>
                    <p className={`font-bold ${activeStep === idx ? 'text-slate-900' : 'text-slate-600'}`}>
                      {step.task}
                    </p>
                    {activeStep === idx && step.hint && (
                      <div className="mt-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-xs text-indigo-600 font-medium animate-in slide-in-from-top-1">
                        💡 Hint: {step.hint}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {completedSteps.length === selectedLab.steps.length && (
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-3xl text-center shadow-2xl animate-in zoom-in fade-in">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-2xl font-black mb-2">Challenge Decrypted!</h4>
                <p className="text-green-50 font-medium mb-6">You have successfully mastered this module.</p>
                <button 
                  className="px-8 py-3 bg-white text-emerald-600 rounded-xl font-black hover:bg-green-50 transition-all shadow-lg active:scale-95"
                  onClick={() => { setCompletedSteps([]); setActiveStep(0); }}
                >
                  Repeat Mission
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <TerminalSimulator onCommand={handleCommand} />
            
            {/* GDrive Assets Integration */}
            <div className="bg-slate-900 p-6 rounded-3xl shadow-xl">
              <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <PlayCircle size={16} className="text-pink-500" />
                Intelligence Vault (2TB Archive)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {assets.map(asset => (
                  <div key={asset.id} className="p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl flex items-center gap-3 transition-all cursor-pointer group">
                    <div className="p-2 bg-slate-700 rounded-lg text-slate-400 group-hover:text-pink-500">
                      {asset.type === 'video' ? <PlayCircle size={18} /> : <FileDown size={18} />}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-black text-slate-200 truncate">{asset.name}</p>
                      <p className="text-[9px] text-slate-500 truncate uppercase font-bold">{asset.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
