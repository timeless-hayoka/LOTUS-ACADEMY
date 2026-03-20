import { useState } from 'react';
import { osData, type OSEntry } from '../data/os_data';
import { Command, Info } from 'lucide-react';
import FileSystemExplorer from './FileSystemExplorer';

export default function OSModule() {
  const [selectedOS, setSelectedOS] = useState<OSEntry>(osData[0]);

  return (
    <div className="p-8 max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-4rem)]">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900">Operating Systems 101</h2>
        <p className="text-slate-500 font-medium mt-1">Understanding the digital environments where your code resides.</p>
      </div>

      {/* OS Selector */}
      <div className="flex gap-4 mb-10">
        {osData.map(os => (
          <button
            key={os.id}
            onClick={() => setSelectedOS(os)}
            className={`px-8 py-2.5 rounded-2xl font-black transition-all active:scale-95 ${
              selectedOS.id === os.id 
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200 shadow-sm'
            }`}
          >
            {os.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden">
        {/* Left Column: About & Commands */}
        <div className="lg:col-span-1 flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-thin">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
              <Info className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-black mb-4 text-slate-900">The Essence of {selectedOS.name}</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              {selectedOS.description}
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-slate-300 shadow-2xl">
            <h3 className="text-white font-black mb-8 flex items-center gap-2 tracking-widest text-xs uppercase">
              <Command size={16} className="text-pink-500" />
              Tactical Commands
            </h3>
            <div className="space-y-5">
              {selectedOS.keyCommands.map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-800 pb-4 group cursor-help">
                  <code className="text-pink-400 font-mono font-bold text-sm bg-slate-800 px-2 py-1 rounded group-hover:bg-pink-500 group-hover:text-white transition-all">{item.cmd}</code>
                  <span className="text-xs font-bold uppercase tracking-tight text-slate-500 group-hover:text-slate-300 transition-colors">{item.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: File Explorer (Expanded) */}
        <div className="lg:col-span-2 overflow-hidden">
          <FileSystemExplorer os={selectedOS.id as 'linux' | 'windows'} />
        </div>
      </div>
    </div>
  );
}
