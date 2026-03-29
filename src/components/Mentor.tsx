import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Trash2, AlertCircle } from 'lucide-react';
import { useLotus } from '../context/LotusContext';
import { genAI, LOTUS_MENTOR_SYSTEM_PROMPT, speak } from '../lib/gemini';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function Mentor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hi there! I am your Lotus learning buddy. I can help explain code, break down tricky commands, or walk you through a lab. What are we working on today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { mentorContext, setMentorContext } = useLotus();

  useEffect(() => {
    if (mentorContext) {
      handleSend(null, mentorContext);
      setMentorContext(null);
    }
  }, [mentorContext]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent | null, textOverride?: string) => {
    e?.preventDefault();
    const userMsg = textOverride || input.trim();
    if (!userMsg || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    if (!textOverride) setInput('');
    setIsLoading(true);

    try {
      if (!genAI) {
        // Fallback to simulation mode
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'bot', 
            content: `[Demo Mode] I see you're asking about: "${userMsg}". Add a VITE_GEMINI_API_KEY to unlock the full mentor experience.` 
          }]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${LOTUS_MENTOR_SYSTEM_PROMPT}\n\nStudent: ${userMsg}\nMentor:`
      });
      
      const botResponse = response.text || "Hmm, I didn't get a response. Let's try again?";

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      speak(botResponse);
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      setMessages(prev => [...prev, { role: 'bot', content: "I'm sorry, I'm having a hard time focusing right now. Could you try asking me again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 h-[calc(100vh-4rem)] flex flex-col max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <div className="p-2 bg-pink-500 rounded-lg shadow-lg shadow-pink-200">
          <Bot className="text-white" size={24} />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900">Lotus Mentor</h2>
          <p className="text-sm text-slate-500 font-medium">Here to help you learn, one question at a time</p>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'bot', content: 'Chat cleared. What would you like to explore next?' }])}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          title="Clear Chat"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* API Warning if missing */}
      {!genAI && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3 text-amber-800 text-xs animate-pulse">
          <AlertCircle size={16} className="mt-0.5" />
          <div>
            <p className="font-bold uppercase tracking-tight">Voice Mode Unavailable</p>
            <p className="mt-1 opacity-80 font-medium">Gemini API Key is missing, so I'm running in demo mode right now.</p>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4 scrollbar-thin scrollbar-thumb-slate-200">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-200'
              }`}>
                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-slate-600" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 className="animate-spin text-pink-500" size={16} />
              <span className="text-xs text-slate-400 font-medium italic">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={(e) => handleSend(e)} className="relative group">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about code or security..."
          className="w-full pl-6 pr-14 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-lg group-hover:border-slate-300"
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50"
          disabled={!input.trim() || isLoading}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
