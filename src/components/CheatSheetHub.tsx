import { useState, useEffect } from 'react';
import { FileText, Copy, Check, Search, ExternalLink } from 'lucide-react';
import { getCheatSheetsProgress, saveCheatSheetsProgress } from '../lib/progress';

interface CheatSheet {
  title: string;
  category: string;
  content: { label: string; cmd: string; desc: string }[];
}

const cheatSheets: CheatSheet[] = [
  {
    title: 'Linux Essentials',
    category: 'OS',
    content: [
      { label: 'Permissions', cmd: 'chmod 755 <file>', desc: 'Sets rwxr-xr-x permissions.' },
      { label: 'Owner', cmd: 'chown user:group <file>', desc: 'Changes file ownership.' },
      { label: 'Processes', cmd: 'ps aux | grep <name>', desc: 'Finds a running process.' },
      { label: 'Disk Space', cmd: 'df -h', desc: 'Shows human-readable disk usage.' },
      { label: 'Find Files', cmd: 'find / -name "*.txt"', desc: 'Recursively search for files.' },
      { label: 'Grep Search', cmd: 'grep -ri "password" ./', desc: 'Search text inside files.' }
    ]
  },
  {
    title: 'Nmap Mastery',
    category: 'Cyber',
    content: [
      { label: 'Fast Scan', cmd: 'nmap -F <target>', desc: 'Scans the 100 most common ports.' },
      { label: 'Service Info', cmd: 'nmap -sV <target>', desc: 'Determines service/version info.' },
      { label: 'Full Port Scan', cmd: 'nmap -p- <target>', desc: 'Scans all 65,535 TCP ports.' },
      { label: 'Stealth Scan', cmd: 'nmap -sS <target>', desc: 'TCP SYN scan (half-open).' },
      { label: 'OS Detection', cmd: 'nmap -O <target>', desc: 'Attempts to fingerprint the OS.' },
      { label: 'Aggressive Scan', cmd: 'nmap -A <target>', desc: 'Enables OS detection, version detection, script scanning, and traceroute.' }
    ]
  },
  {
    title: 'Python for Security',
    category: 'Code',
    content: [
      { label: 'Base64 Encode', cmd: 'base64.b64encode(b"text")', desc: 'Encodes text to base64.' },
      { label: 'SHA256 Hash', cmd: 'hashlib.sha256(b"text").hexdigest()', desc: 'Creates a secure hash.' },
      { label: 'Port Check', cmd: 'sock.connect_ex((ip, port))', desc: 'Returns 0 if port is open.' },
      { label: 'HTTP GET', cmd: 'requests.get(url)', desc: 'Makes an HTTP GET request.' },
      { label: 'Regex Match', cmd: 're.search(pattern, text)', desc: 'Searches for a pattern in text.' },
      { label: 'JSON Parse', cmd: 'json.loads(data)', desc: 'Parses a JSON string into a Python dict.' }
    ]
  },
  {
    title: 'Git Quick Ref',
    category: 'Dev',
    content: [
      { label: 'Clone Repo', cmd: 'git clone <url>', desc: 'Download a remote repository.' },
      { label: 'Check Status', cmd: 'git status', desc: 'See current changes and branch.' },
      { label: 'Stage Changes', cmd: 'git add .', desc: 'Stage all modified files.' },
      { label: 'Commit', cmd: 'git commit -m "msg"', desc: 'Save staged changes locally.' },
      { label: 'Push', cmd: 'git push origin main', desc: 'Upload commits to remote.' },
      { label: 'Pull', cmd: 'git pull origin main', desc: 'Download latest remote changes.' }
    ]
  },
  {
    title: 'Bash Scripting',
    category: 'OS',
    content: [
      { label: 'For Loop', cmd: 'for i in {1..10}; do echo $i; done', desc: 'Iterate over a range.' },
      { label: 'If Statement', cmd: 'if [ -f file.txt ]; then echo exists; fi', desc: 'Check if file exists.' },
      { label: 'Variable', cmd: 'NAME="value"; echo $NAME', desc: 'Assign and use a variable.' },
      { label: 'Pipe Output', cmd: 'cat file | grep text', desc: 'Send output of one command to another.' },
      { label: 'Background Job', cmd: 'command &', desc: 'Run a command in the background.' },
      { label: 'Redirect to File', cmd: 'command > output.txt', desc: 'Save command output to a file.' }
    ]
  },
  {
    title: 'Metasploit Quick Ref',
    category: 'Cyber',
    content: [
      { label: 'Start Console', cmd: 'msfconsole', desc: 'Launch the Metasploit framework.' },
      { label: 'Search Modules', cmd: 'search eternalblue', desc: 'Find exploits and payloads.' },
      { label: 'Use Module', cmd: 'use exploit/...', desc: 'Select a module to configure.' },
      { label: 'Set Options', cmd: 'set RHOSTS 192.168.1.1', desc: 'Configure module parameters.' },
      { label: 'Run Exploit', cmd: 'exploit', desc: 'Execute the selected module.' },
      { label: 'Meterpreter Shell', cmd: 'sessions -i 1', desc: 'Interact with a session.' }
    ]
  },
  {
    title: 'Wireshark Filters',
    category: 'Cyber',
    content: [
      { label: 'HTTP Only', cmd: 'http', desc: 'Show only HTTP traffic.' },
      { label: 'DNS Queries', cmd: 'dns', desc: 'Filter for DNS packets.' },
      { label: 'Specific IP', cmd: 'ip.addr == 192.168.1.1', desc: 'Show traffic to/from an IP.' },
      { label: 'TCP Port', cmd: 'tcp.port == 80', desc: 'Filter by TCP port number.' },
      { label: 'GET Requests', cmd: 'http.request.method == "GET"', desc: 'Show only HTTP GET requests.' },
      { label: 'Contains String', cmd: 'tcp contains "password"', desc: 'Find packets containing text.' }
    ]
  },
  {
    title: 'Docker Basics',
    category: 'Dev',
    content: [
      { label: 'Run Container', cmd: 'docker run -d -p 80:80 nginx', desc: 'Run Nginx in detached mode.' },
      { label: 'List Running', cmd: 'docker ps', desc: 'Show active containers.' },
      { label: 'Stop Container', cmd: 'docker stop <id>', desc: 'Stop a running container.' },
      { label: 'Remove Container', cmd: 'docker rm <id>', desc: 'Delete a stopped container.' },
      { label: 'Build Image', cmd: 'docker build -t myapp .', desc: 'Build an image from a Dockerfile.' },
      { label: 'Exec into Container', cmd: 'docker exec -it <id> bash', desc: 'Open a shell inside a container.' }
    ]
  }
];

export default function CheatSheetHub() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedItems, setCopiedItems] = useState<string[]>([]);

  useEffect(() => {
    setCopiedItems(getCheatSheetsProgress());
  }, []);

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
    if (!copiedItems.includes(cmd)) {
      const updated = [...copiedItems, cmd];
      setCopiedItems(updated);
      saveCheatSheetsProgress(updated);
    }
  };

  const filteredSheets = cheatSheets.filter(sheet => 
    sheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sheet.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sheet.content.some(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Cheat Sheet Hub</h2>
          <p className="text-slate-500 font-medium mt-1 text-lg text-pretty">Your operational tactical guides, ready for action.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search sheets..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredSheets.map((sheet, sIdx) => (
          <div key={sIdx} className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                  <FileText size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{sheet.title}</h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter bg-slate-200 text-slate-600 px-2 py-1 rounded-md">
                {sheet.category}
              </span>
            </div>
            
            <div className="p-2 flex-1">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                    <th className="px-4 py-3">Function</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {sheet.content.map((item, cIdx) => (
                    <tr key={cIdx} className="group hover:bg-indigo-50/30 transition-colors">
                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-800 text-sm">{item.label}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{item.desc}</p>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button 
                          onClick={() => copyToClipboard(item.cmd)}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                            copiedCmd === item.cmd 
                              ? 'bg-green-500 text-white shadow-lg shadow-green-200' 
                              : 'bg-slate-900 text-pink-400 hover:bg-slate-800'
                          }`}
                        >
                          {copiedCmd === item.cmd ? <Check size={14} /> : <Copy size={14} />}
                          {item.cmd.length > 20 ? item.cmd.substring(0, 17) + '...' : item.cmd}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-slate-50/50 border-t border-slate-100">
              <button className="text-[10px] font-bold text-indigo-600 uppercase flex items-center gap-1 hover:underline mx-auto tracking-widest">
                <ExternalLink size={12} /> View Full Reference
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSheets.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 mt-8">
          <FileText size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">No cheat sheets match your search.</p>
        </div>
      )}
    </div>
  );
}
