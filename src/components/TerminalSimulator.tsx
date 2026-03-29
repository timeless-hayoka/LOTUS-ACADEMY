import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, HelpCircle } from 'lucide-react';
import { useLotus } from '../context/LotusContext';
import { useNavigate } from 'react-router-dom';

interface TerminalProps {
  initialPrompt?: string;
  onCommand?: (cmd: string) => string;
}

export default function TerminalSimulator({ initialPrompt = 'lotus@learner:~$ ', onCommand }: TerminalProps) {
  const [history, setHistory] = useState<string[]>(['Welcome to the Lotus Cyber Lab Sandbox.', 'Type "help" to see available commands.']);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setMentorContext } = useLotus();
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleAskMentor = () => {
    const lastCommand = history[history.length - 2];
    const lastOutput = history[history.length - 1];
    setMentorContext(`I am confused about this terminal command and output:\nCommand: ${lastCommand}\nOutput: ${lastOutput}`);
    navigate('/mentor');
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const fullCommand = `${initialPrompt}${input}`;
    const response = processCommand(input);
    
    setHistory(prev => [...prev, fullCommand, response]);
    setInput('');
  };

  const processCommand = (cmd: string): string => {
    const command = cmd.trim().toLowerCase();
    
    if (onCommand) {
      const externalResponse = onCommand(command);
      if (externalResponse) return externalResponse;
    }

    switch (command) {
      case 'help':
        return 'Available commands: help, clear, whoami, ls, nmap, date';
      case 'clear':
        setHistory([]);
        return '';
      case 'whoami':
        return 'lotus_learner';
      case 'ls':
        return 'documents/  downloads/  labs/  secret_plans.txt';
      case 'date':
        return new Date().toLocaleString();
      case 'nmap':
        return 'Usage: nmap <target_ip>. Example: nmap 192.168.1.1';
      default:
        if (command.startsWith('nmap ')) {
          const target = cmd.split(' ')[1];
          return `Starting Nmap 7.92 ( https://nmap.org ) at ${new Date().toLocaleTimeString()}\nNmap scan report for ${target}\nHost is up (0.0021s latency).\nNot shown: 998 closed tcp ports (conn-refused)\nPORT   STATE SERVICE\n80/tcp  open  http\n443/tcp open  https\n\nNmap done: 1 IP address (1 host up) scanned in 0.15 seconds`;
        }
        return `lotus: command not found: ${command}`;
    }
  };

  return (
    <div className="w-full h-[500px] bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col font-mono">
      {/* Title Bar */}
      <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TerminalIcon size={14} className="text-slate-400" />
            <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Lotus Terminal</span>
          </div>
          <button 
            onClick={handleAskMentor}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors border border-indigo-500/20"
          >
            <HelpCircle size={12} />
            <span className="text-[10px] font-bold uppercase tracking-tight">Ask Mentor</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-700" />
          <div className="w-3 h-3 rounded-full bg-slate-700" />
          <div className="w-3 h-3 rounded-full bg-slate-700" />
        </div>
      </div>

      {/* Output Area */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-800"
      >
        {history.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap mb-1 ${
            line.startsWith('lotus@') ? 'text-pink-400' : 'text-slate-300'
          }`}>
            {line}
          </div>
        ))}
        
        {/* Input Line */}
        <form onSubmit={handleCommand} className="flex items-center">
          <span className="text-pink-400 mr-2">{initialPrompt}</span>
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-slate-300 focus:ring-0 p-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
