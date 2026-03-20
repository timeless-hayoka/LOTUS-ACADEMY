import { useState } from 'react';
import { Search, Terminal, Globe } from 'lucide-react';

interface Command {
  name: string;
  syntax: string;
  os: 'linux' | 'windows' | 'mac' | 'agnostic';
  language?: string;
  description: string;
  example: string;
}

const commandData: Command[] = [
  {
    name: 'List Files',
    syntax: 'ls',
    os: 'linux',
    description: 'Displays all files and folders in your current location.',
    example: 'ls -la'
  },
  {
    name: 'List Files (Windows)',
    syntax: 'dir',
    os: 'windows',
    description: 'The Windows equivalent of ls. Shows everything in the folder.',
    example: 'dir /w'
  },
  {
    name: 'Print Message',
    syntax: 'print()',
    os: 'agnostic',
    language: 'Python',
    description: 'Tells the computer to show text on the screen.',
    example: 'print("Hello World")'
  },
  {
    name: 'Network Scan',
    syntax: 'nmap',
    os: 'linux',
    description: 'Scans a network to find active devices and open ports.',
    example: 'nmap -v 192.168.1.1'
  }
];

export default function Library() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCommands = commandData.filter(cmd => 
    cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.syntax.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Command Library</h2>
          <p className="text-slate-500 mt-1">The ultimate translator for computer instructions.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for a command (e.g. 'list files' or 'nmap')..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCommands.map((cmd, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-pink-200 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-pink-50 transition-colors">
                  <Terminal size={20} className="text-slate-600 group-hover:text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{cmd.name}</h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded-md font-medium uppercase tracking-wider ${
                cmd.os === 'linux' ? 'bg-orange-100 text-orange-700' :
                cmd.os === 'windows' ? 'bg-blue-100 text-blue-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {cmd.language || cmd.os}
              </span>
            </div>
            
            <code className="block w-full bg-slate-900 text-pink-400 p-3 rounded-lg mb-4 font-mono text-sm">
              {cmd.syntax}
            </code>
            
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              {cmd.description}
            </p>
            
            <div className="pt-4 border-t border-slate-50">
              <span className="text-xs font-semibold text-slate-400 uppercase block mb-2">Example Usage</span>
              <code className="text-indigo-600 font-mono text-xs italic">
                $ {cmd.example}
              </code>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCommands.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <Globe size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">We don't have that command yet. Ask the AI Mentor to explain it!</p>
        </div>
      )}
    </div>
  );
}
