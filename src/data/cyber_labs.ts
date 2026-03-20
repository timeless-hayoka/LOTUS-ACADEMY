export interface Lab {
  id: string;
  title: string;
  category: 'linux' | 'python' | 'network' | 'web' | 'crypto';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tools: string[];
  objective: string;
  scenario: string;
  steps: { task: string; expected: string; hint?: string }[];
}

const generateLabs = (): Lab[] => {
  const labs: Lab[] = [];

  // 1-10: Linux Fundamentals
  for (let i = 1; i <= 10; i++) {
    labs.push({
      id: `linux-${i}`,
      title: `Linux Mastery Level ${i}: ${i === 1 ? 'Navigation' : 'System Operations'}`,
      category: 'linux',
      difficulty: i < 5 ? 'beginner' : i < 8 ? 'intermediate' : 'advanced',
      tools: ['bash'],
      objective: `Master the command line interface part ${i}.`,
      scenario: `You are a system administrator apprentice. Complete task ${i} to secure the server.`,
      steps: [
        { task: 'Show current path', expected: 'pwd', hint: 'Print Working Directory' },
        { task: 'List all files', expected: 'ls -a', hint: 'ls with -a flag' }
      ]
    });
  }

  // 11-20: Python Security
  for (let i = 1; i <= 10; i++) {
    labs.push({
      id: `python-${i}`,
      title: `Python Security Scripting ${i}`,
      category: 'python',
      difficulty: 'beginner',
      tools: ['python3'],
      objective: 'Build a security tool using Python.',
      scenario: 'Automation is key. Write a script to handle security tasks.',
      steps: [
        { task: 'Check python version', expected: 'python3 --version', hint: 'The command is python3' }
      ]
    });
  }

  // 21-30: Network Recon (Nmap & Sockets)
  for (let i = 1; i <= 10; i++) {
    labs.push({
      id: `recon-${i}`,
      title: `Network Intelligence ${i}`,
      category: 'network',
      difficulty: 'intermediate',
      tools: ['nmap'],
      objective: 'Discover assets on the wire.',
      scenario: 'Find the vulnerabilities before the attackers do.',
      steps: [
        { task: 'Scan target 192.168.1.1', expected: 'nmap 192.168.1.1', hint: 'nmap followed by the IP' }
      ]
    });
  }

  // 31-40: Web Exploitation (SQLi, XSS)
  for (let i = 1; i <= 10; i++) {
    labs.push({
      id: `web-${i}`,
      title: `Web Defender ${i}`,
      category: 'web',
      difficulty: 'intermediate',
      tools: ['curl', 'burp'],
      objective: 'Identify and mitigate web vulnerabilities.',
      scenario: 'The company website is under attack. Find the entry point.',
      steps: [
        { task: 'Inspect headers of google.com', expected: 'curl -I https://google.com', hint: 'Use curl with the -I flag' }
      ]
    });
  }

  // 41-50: Cryptography & Forensics
  for (let i = 1; i <= 9; i++) {
    labs.push({
      id: `crypto-${i}`,
      title: `Digital Forensics Level ${i}`,
      category: 'crypto',
      difficulty: 'advanced',
      tools: ['hashcat', 'wireshark'],
      objective: 'Decrypt the evidence.',
      scenario: 'A mysterious file was found on the victim\'s desktop. Crack the code.',
      steps: [
        { task: 'List active network interfaces', expected: 'ip link', hint: 'Use the ip command' }
      ]
    });
  }

  // --- SPECIAL LAB: FORENSICS 1 ---
  labs.push({
    id: 'forensics-1',
    title: 'Forensics Lab 1: The Three-Way Handshake',
    category: 'crypto',
    difficulty: 'intermediate',
    tools: ['wireshark', 'tcpdump'],
    objective: 'Identify the SYN, SYN-ACK, and ACK packets in a real network capture.',
    scenario: 'You have intercepted traffic from a suspicious connection. Use Wireshark logic to find the handshake that established the link. Use the victim_traffic.pcap in your assets.',
    steps: [
      { 
        task: 'Filter for SYN packets', 
        expected: 'tcp.flags.syn == 1 && tcp.flags.ack == 0', 
        hint: 'In the terminal, we simulate this with filters. Type the Wireshark filter for a pure SYN packet.' 
      },
      { 
        task: 'Find the response (SYN-ACK)', 
        expected: 'tcp.flags.syn == 1 && tcp.flags.ack == 1', 
        hint: 'What filter looks for both SYN and ACK bits set?' 
      },
      { 
        task: 'Confirm the connection (ACK)', 
        expected: 'tcp.flags.syn == 0 && tcp.flags.ack == 1', 
        hint: 'The final step of the handshake only has the ACK bit set.' 
      }
    ]
  });

  return labs;
};

export const cyberLabs = generateLabs();
