import { useState } from 'react';
import { codingTheology, type Lesson } from '../data/coding_theology';
import { Sparkles, X, Terminal, ChevronRight } from 'lucide-react';

export default function ConceptLibrary() {
  const [selectedConcept, setSelectedConcept] = useState<Lesson | null>(null);

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Sparkles className="text-pink-500" size={20} />
        The Syntax & Theology of Code
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {codingTheology.map((concept) => (
          <div 
            key={concept.id}
            onClick={() => setSelectedConcept(concept)}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all active:scale-95"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-pink-500 transition-colors">
                {concept.category}
              </span>
              <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-pink-600 transition-colors">
              {concept.title}
            </h4>
            <p className="text-sm text-slate-500 line-clamp-2">
              {concept.description}
            </p>
          </div>
        ))}
      </div>

      {/* Concept Modal */}
      {selectedConcept && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in fade-in duration-200">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Sparkles className="text-pink-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{selectedConcept.title}</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{selectedConcept.category}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedConcept(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            
            <div className="p-8">
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                {selectedConcept.content}
              </p>
              
              <div className="space-y-6">
                <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} />
                  Practical Example
                </h5>
                {selectedConcept.examples.map((ex, i) => (
                  <div key={i} className="bg-slate-900 rounded-2xl overflow-hidden">
                    <div className="p-4 font-mono text-sm text-pink-400 border-b border-slate-800">
                      <pre><code>{ex.code}</code></pre>
                    </div>
                    <div className="p-4 bg-slate-800 text-slate-300 text-xs italic">
                      {ex.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
              <button 
                onClick={() => setSelectedConcept(null)}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
              >
                I Understand the Mystery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
