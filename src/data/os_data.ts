export interface OSEntry {
  id: string;
  name: string;
  description: string;
  structure: { path: string; purpose: string }[];
  keyCommands: { cmd: string; action: string }[];
}

export const osData: OSEntry[] = [
  {
    id: 'linux',
    name: 'Linux',
    description: 'The backbone of the internet and the hacker\'s playground. Linux is modular, powerful, and built around files. Every device, process, and configuration is represented as a file somewhere in the filesystem. Mastering Linux is non-negotiable for anyone in cybersecurity or systems administration.',
    structure: [
      { path: '/', purpose: 'The Root. Where everything begins.' },
      { path: '/home', purpose: 'Where user files (like yours) live.' },
      { path: '/etc', purpose: 'The configuration center of the system.' },
      { path: '/bin', purpose: 'Where the essential program binaries reside.' },
      { path: '/sbin', purpose: 'System administration binaries (root-only tools).' },
      { path: '/var', purpose: 'Variable data: logs, caches, spool files.' },
      { path: '/tmp', purpose: 'Temporary files. Often world-writable and volatile.' },
      { path: '/proc', purpose: 'Virtual filesystem exposing process and kernel info.' },
      { path: '/dev', purpose: 'Device files representing hardware and virtual devices.' },
      { path: '/usr', purpose: 'User programs, libraries, and documentation.' }
    ],
    keyCommands: [
      { cmd: 'ls', action: 'List files in a directory' },
      { cmd: 'cd', action: 'Change current directory' },
      { cmd: 'pwd', action: 'Print working directory' },
      { cmd: 'cat', action: 'Display file contents' },
      { cmd: 'sudo', action: 'Execute as superuser' },
      { cmd: 'chmod', action: 'Change file permissions' },
      { cmd: 'chown', action: 'Change file owner' },
      { cmd: 'ps', action: 'List running processes' },
      { cmd: 'kill', action: 'Terminate a process' },
      { cmd: 'df', action: 'Check disk space' },
      { cmd: 'free', action: 'Check memory usage' },
      { cmd: 'ip addr', action: 'Show network interfaces' },
      { cmd: 'ss -tulnp', action: 'Show listening ports' },
      { cmd: 'find', action: 'Search for files' },
      { cmd: 'grep', action: 'Search text patterns' }
    ]
  },
  {
    id: 'windows',
    name: 'Windows',
    description: 'The most popular desktop OS and a major target in enterprise environments. Windows uses a registry-based configuration model, drive letters instead of a unified filesystem, and a permission model based on Access Control Lists (ACLs). Understanding Windows is critical for both attackers and defenders in corporate networks.',
    structure: [
      { path: 'C:\\', purpose: 'The primary hard drive partition.' },
      { path: 'C:\\Users', purpose: 'Personal files and settings for each user.' },
      { path: 'C:\\Program Files', purpose: 'Where 64-bit applications are installed.' },
      { path: 'C:\\Program Files (x86)', purpose: 'Where 32-bit applications are installed.' },
      { path: 'C:\\Windows', purpose: 'The core operating system files.' },
      { path: 'C:\\Windows\\System32', purpose: 'Critical system binaries and libraries.' },
      { path: 'C:\\Windows\\Temp', purpose: 'Temporary files used by the OS and apps.' },
      { path: 'C:\\Windows\\Logs', purpose: 'System and application log files.' },
      { path: 'HKLM\\SOFTWARE', purpose: 'Registry hive for machine-wide settings.' },
      { path: 'HKCU', purpose: 'Registry hive for current user settings.' }
    ],
    keyCommands: [
      { cmd: 'dir', action: 'List files in a directory' },
      { cmd: 'cd', action: 'Change directory' },
      { cmd: 'cls', action: 'Clear the screen' },
      { cmd: 'type', action: 'Display file contents' },
      { cmd: 'copy', action: 'Copy a file' },
      { cmd: 'move', action: 'Move or rename a file' },
      { cmd: 'del', action: 'Delete a file' },
      { cmd: 'tasklist', action: 'List running processes' },
      { cmd: 'taskkill', action: 'Terminate a process' },
      { cmd: 'ipconfig', action: 'Check network settings' },
      { cmd: 'netstat', action: 'Show active connections' },
      { cmd: 'systeminfo', action: 'Display system information' },
      { cmd: 'whoami', action: 'Show current user' },
      { cmd: 'net user', action: 'Manage user accounts' },
      { cmd: 'icacls', action: 'Modify file permissions' }
    ]
  },
  {
    id: 'mac',
    name: 'macOS',
    description: 'Apple\'s Unix-based operating system. macOS combines a polished graphical interface with a powerful BSD-derived core. It uses the same Terminal and many of the same commands as Linux, but with Apple-specific directories and the Gatekeeper security model.',
    structure: [
      { path: '/', purpose: 'The root of the filesystem.' },
      { path: '/Applications', purpose: 'Where installed applications live.' },
      { path: '/Users', purpose: 'Home directories for all user accounts.' },
      { path: '/Library', purpose: 'System-wide support files and preferences.' },
      { path: '/System', purpose: 'Core macOS system files. Protected by SIP.' },
      { path: '/Volumes', purpose: 'Mounted drives and external storage.' },
      { path: '/private/var/log', purpose: 'System log files.' },
      { path: '/usr/local', purpose: 'User-installed command-line tools (Homebrew).' },
      { path: '/etc', purpose: 'Configuration files (symlinked from /private/etc).' },
      { path: '/tmp', purpose: 'Temporary files (symlinked from /private/tmp).' }
    ],
    keyCommands: [
      { cmd: 'ls', action: 'List files' },
      { cmd: 'cd', action: 'Change directory' },
      { cmd: 'pwd', action: 'Print working directory' },
      { cmd: 'cat', action: 'Display file contents' },
      { cmd: 'sudo', action: 'Execute as superuser' },
      { cmd: 'chmod', action: 'Change file permissions' },
      { cmd: 'chown', action: 'Change file owner' },
      { cmd: 'ps aux', action: 'List running processes' },
      { cmd: 'kill', action: 'Terminate a process' },
      { cmd: 'df -h', action: 'Check disk space' },
      { cmd: 'ifconfig', action: 'Show network interfaces' },
      { cmd: 'netstat', action: 'Show active connections' },
      { cmd: 'brew install', action: 'Install software via Homebrew' },
      { cmd: 'open', action: 'Open a file or application' },
      { cmd: 'defaults read', action: 'Read system preferences' }
    ]
  }
];
