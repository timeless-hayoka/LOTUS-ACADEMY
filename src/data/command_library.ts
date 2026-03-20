export interface Command {
  name: string;
  syntax: string;
  os: 'linux' | 'windows' | 'mac' | 'agnostic';
  language?: string;
  category: 'file' | 'search' | 'permissions' | 'user' | 'process' | 'network' | 'system' | 'web' | 'code' | 'package' | 'exploit';
  description: string;
  example: string;
}

export const commandData: Command[] = [
  // --- EXISTING COMMANDS ---
  {
    name: 'Print Working Directory',
    syntax: 'pwd',
    os: 'linux',
    category: 'file',
    description: 'Shows the full path of the directory you are currently in.',
    example: 'pwd'
  },
  {
    name: 'List Files (All)',
    syntax: 'ls -la',
    os: 'linux',
    category: 'file',
    description: 'Lists all files, including hidden ones, with detailed info.',
    example: 'ls -la'
  },
  // --- METASPLOIT ---
  {
    name: 'Start Metasploit',
    syntax: 'msfconsole',
    os: 'linux',
    category: 'exploit',
    description: 'Launches the Metasploit Framework console.',
    example: 'msfconsole'
  },
  {
    name: 'Search Modules',
    syntax: 'search <keyword>',
    os: 'linux',
    category: 'exploit',
    description: 'Searches Metasploit for exploits, payloads, or auxiliary modules.',
    example: 'search eternalblue'
  },
  {
    name: 'Use Module',
    syntax: 'use <module_path>',
    os: 'linux',
    category: 'exploit',
    description: 'Selects a specific module to configure and run.',
    example: 'use exploit/windows/smb/ms17_010_eternalblue'
  },
  {
    name: 'Meterpreter: Get User ID',
    syntax: 'getuid',
    os: 'linux',
    category: 'exploit',
    description: 'Inside a Meterpreter session, shows the user identity of the compromised process.',
    example: 'getuid'
  },
  // --- SQL INJECTION ---
  {
    name: 'Basic SQLi Bypass',
    syntax: "' OR '1'='1",
    os: 'agnostic',
    category: 'web',
    description: 'Classic payload to bypass login forms by forcing a TRUE condition.',
    example: "admin' OR '1'='1"
  },
  {
    name: 'SQLMap Automate',
    syntax: 'sqlmap -u "<URL>" --dbs',
    os: 'linux',
    category: 'web',
    description: 'Uses SQLMap to automatically detect and exploit SQL injection, then list databases.',
    example: 'sqlmap -u "http://target.com/id=1" --dbs'
  },
  // --- BURP SUITE ---
  {
    name: 'Intercept Toggle',
    syntax: 'Ctrl+Shift+P',
    os: 'agnostic',
    category: 'web',
    description: 'Burp Suite shortcut to quickly toggle Intercept on or off.',
    example: 'Shortcut in Burp'
  },
  // --- NETWORKING ---
  {
    name: 'Stealth Port Scan',
    syntax: 'nmap -sS <target>',
    os: 'linux',
    category: 'network',
    description: 'Performs a TCP SYN scan (half-open), which is harder to detect than a full connection.',
    example: 'nmap -sS 192.168.1.1'
  },
  {
    name: 'Service Fingerprint',
    syntax: 'nmap -sV <target>',
    os: 'linux',
    category: 'network',
    description: 'Connects to open ports to determine what software and version is running.',
    example: 'nmap -sV 192.168.1.1'
  },
  // --- SYSTEM ---
  {
    name: 'Force Kill Process',
    syntax: 'kill -9 <PID>',
    os: 'linux',
    category: 'process',
    description: 'Immediately terminates a process by its ID.',
    example: 'kill -9 1234'
  },
  {
    name: 'Watch Disk Space',
    syntax: 'df -h',
    os: 'linux',
    category: 'system',
    description: 'Displays disk usage in megabytes and gigabytes.',
    example: 'df -h'
  }
];
