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
    description: 'The backbone of the internet and the hacker\'s playground. Linux is modular, powerful, and built around files.',
    structure: [
      { path: '/', purpose: 'The Root. Where everything begins.' },
      { path: '/home', purpose: 'Where user files (like yours) live.' },
      { path: '/etc', purpose: 'The configuration center of the system.' },
      { path: '/bin', purpose: 'Where the essential program binaries reside.' }
    ],
    keyCommands: [
      { cmd: 'ls', action: 'List files' },
      { cmd: 'cd', action: 'Change directory' },
      { cmd: 'sudo', action: 'Execute as Super User (Powerful!)' }
    ]
  },
  {
    id: 'windows',
    name: 'Windows',
    description: 'The most popular desktop OS. Known for its user-friendly interface and vast application support.',
    structure: [
      { path: 'C:\\', purpose: 'The primary hard drive.' },
      { path: 'C:\\Users', purpose: 'Personal files and settings.' },
      { path: 'C:\\Program Files', purpose: 'Where installed apps live.' },
      { path: 'C:\\Windows\\System32', purpose: 'Critical system files (Don\'t delete!)' }
    ],
    keyCommands: [
      { cmd: 'dir', action: 'List files' },
      { cmd: 'cls', action: 'Clear screen' },
      { cmd: 'ipconfig', action: 'Check network settings' }
    ]
  }
];
