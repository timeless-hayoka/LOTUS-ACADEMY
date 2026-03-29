export interface Lab {
  id: string;
  title: string;
  category: 'linux' | 'python' | 'network' | 'web' | 'crypto' | 'windows' | 'forensics' | 'cloud' | 're';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  featured?: boolean;
  tools: string[];
  objective: string;
  scenario: string;
  steps: { task: string; expected: string; hint?: string }[];
}

export const cyberLabs: Lab[] = [
  // --- BEGINNER ---
  {
    id: 'linux-1',
    title: 'Linux Basics: File Detective',
    category: 'linux',
    difficulty: 'beginner',
    featured: true,
    tools: ['bash', 'ls', 'cat'],
    objective: 'Find the hidden flag file in the home directory.',
    scenario: 'A secret message was left in a hidden file somewhere in the home directory. Use basic Linux commands to locate and read it.',
    steps: [
      { task: 'List all files including hidden ones', expected: 'ls -la', hint: 'The -a flag shows hidden files starting with a dot.' },
      { task: 'Read the hidden flag file', expected: 'cat .flag.txt', hint: 'Use cat to display the contents of .flag.txt' }
    ]
  },
  {
    id: 'windows-1',
    title: 'Windows Event Log Analysis',
    category: 'windows',
    difficulty: 'beginner',
    featured: true,
    tools: ['powershell', 'Get-WinEvent'],
    objective: 'Identify a successful brute-force login from Windows Security logs.',
    scenario: 'A Windows server has been targeted. Use PowerShell to query the Security event log for Event ID 4624 (successful logon) and find the suspicious IP.',
    steps: [
      { task: 'Query successful logons', expected: "Get-WinEvent -FilterHashtable @{LogName='Security';ID=4624}", hint: 'Event ID 4624 indicates a successful logon.' },
      { task: 'Filter for remote connections', expected: "Get-WinEvent -FilterHashtable @{LogName='Security';ID=4624} | Where-Object {$_.Message -like '*Remote*'}" , hint: 'Look for logon type 10 (RemoteInteractive).' }
    ]
  },
  {
    id: 'python-1',
    title: 'Python: Build a Port Scanner',
    category: 'python',
    difficulty: 'beginner',
    featured: true,
    tools: ['python3', 'socket'],
    objective: 'Write a simple TCP port scanner in Python.',
    scenario: 'You need to check which ports are open on a local target. Instead of using nmap, you will build your own scanner using Python\'s socket library.',
    steps: [
      { task: 'Create a socket object', expected: 'import socket', hint: 'Start by importing the socket module.' },
      { task: 'Scan port 80 on localhost', expected: 's = socket.socket(); s.connect(("127.0.0.1", 80))', hint: 'Create a socket and attempt to connect to port 80.' }
    ]
  },
  {
    id: 'python-2',
    title: 'Python: Password Strength Checker',
    category: 'python',
    difficulty: 'beginner',
    tools: ['python3', 're'],
    objective: 'Write a script that evaluates password complexity.',
    scenario: 'Users keep choosing weak passwords. Your script should check if a password meets minimum security requirements: length, uppercase, lowercase, digits, and special characters.',
    steps: [
      { task: 'Import the regex module', expected: 'import re', hint: 'Regular expressions make pattern matching easy.' },
      { task: 'Check password length', expected: 'len(password) >= 12', hint: 'A strong password should be at least 12 characters.' }
    ]
  },
  {
    id: 'network-1',
    title: 'Network Recon with Nmap',
    category: 'network',
    difficulty: 'beginner',
    tools: ['nmap'],
    objective: 'Map the target network and identify open services.',
    scenario: 'You are on a penetration test and need to discover what hosts and services are alive on the 192.168.1.0/24 network.',
    steps: [
      { task: 'Ping scan the subnet', expected: 'nmap -sn 192.168.1.0/24', hint: 'A ping scan discovers live hosts without port scanning.' },
      { task: 'Scan top ports on a live host', expected: 'nmap -sV 192.168.1.1', hint: 'Service detection reveals what software is running.' }
    ]
  },
  {
    id: 'web-1',
    title: 'Web: SQL Injection Lab',
    category: 'web',
    difficulty: 'beginner',
    tools: ['browser', 'sqlmap'],
    objective: 'Bypass authentication using SQL injection.',
    scenario: 'A vulnerable login form does not sanitize user input. Your goal is to log in as the administrator without knowing the password.',
    steps: [
      { task: 'Test for SQL injection', expected: "' OR '1'='1", hint: 'This classic payload forces the query to always return true.' },
      { task: 'Comment out the rest of the query', expected: "' OR '1'='1' --", hint: 'The -- comments out everything after your payload.' }
    ]
  },
  {
    id: 'web-2',
    title: 'Web: Cross-Site Scripting (XSS)',
    category: 'web',
    difficulty: 'beginner',
    tools: ['browser'],
    objective: 'Execute a JavaScript alert via a reflected XSS vulnerability.',
    scenario: 'A search page reflects user input directly into the HTML without encoding. Inject a script tag to trigger an alert box.',
    steps: [
      { task: 'Inject a basic script tag', expected: '<script>alert(1)</script>', hint: 'If the input is reflected without sanitization, this will execute.' },
      { task: 'Use an image onerror payload', expected: '<img src=x onerror=alert(1)>', hint: 'Some filters block script tags but miss event handlers.' }
    ]
  },
  {
    id: 'web-4',
    title: 'Web: Insecure Direct Object Reference',
    category: 'web',
    difficulty: 'beginner',
    tools: ['browser'],
    objective: 'Access another user\'s data by manipulating an ID parameter.',
    scenario: 'An application uses predictable numeric IDs to reference user profiles. By changing the ID in the URL, you can view other users\' private information.',
    steps: [
      { task: 'Access your own profile', expected: '/profile?id=1', hint: 'Note the ID parameter in the URL.' },
      { task: 'Access another profile', expected: '/profile?id=2', hint: 'Increment the ID to see if access controls are enforced.' }
    ]
  },
  {
    id: 'crypto-1',
    title: 'Crypto: Caesar Cipher',
    category: 'crypto',
    difficulty: 'beginner',
    tools: ['python3'],
    objective: 'Decrypt a message encoded with a Caesar cipher.',
    scenario: 'You intercepted an ancient-looking message: "Khoor Zruog". It was encrypted with a simple shift cipher. Decrypt it.',
    steps: [
      { task: 'Write a Caesar brute-forcer', expected: 'for shift in range(26):', hint: 'Try all 26 possible shifts.' },
      { task: 'Decode with shift 3', expected: 'chr((ord(c) - 65 - 3) % 26 + 65)', hint: 'Caesar cipher traditionally uses a shift of 3.' }
    ]
  },
  {
    id: 'forensics-1',
    title: 'Forensics: Image Metadata',
    category: 'forensics',
    difficulty: 'beginner',
    tools: ['exiftool', 'strings'],
    objective: 'Extract hidden information from an image file.',
    scenario: 'A suspect uploaded an image to a forum. Your task is to analyze the metadata for GPS coordinates, camera model, and any hidden comments.',
    steps: [
      { task: 'Extract all metadata', expected: 'exiftool image.jpg', hint: 'Exiftool reads EXIF, IPTC, and XMP metadata.' },
      { task: 'Search for hidden strings', expected: 'strings image.jpg | grep -i flag', hint: 'Images can contain appended data after the EOF marker.' }
    ]
  },
  {
    id: 'cloud-1',
    title: 'Cloud: S3 Bucket Misconfiguration',
    category: 'cloud',
    difficulty: 'beginner',
    tools: ['awscli', 's3scanner'],
    objective: 'Identify and access a publicly exposed S3 bucket.',
    scenario: 'A company accidentally left an S3 bucket public. Your task is to discover the bucket name, list its contents, and download a sensitive file.',
    steps: [
      { task: 'List bucket contents', expected: 'aws s3 ls s3://target-bucket --no-sign-request', hint: 'Public buckets can be listed without authentication.' },
      { task: 'Download a file', expected: 'aws s3 cp s3://target-bucket/secret.txt . --no-sign-request', hint: 'Public read permissions allow anyone to download objects.' }
    ]
  },
  {
    id: 're-1',
    title: 'RE: Strings & File Analysis',
    category: 're',
    difficulty: 'beginner',
    tools: ['strings', 'file', 'binwalk'],
    objective: 'Analyze a suspicious binary to find hardcoded strings and embedded files.',
    scenario: 'You recovered a malware sample. Before running it in a sandbox, perform static analysis to extract indicators of compromise.',
    steps: [
      { task: 'Identify file type', expected: 'file suspicious.bin', hint: 'The file command reveals the binary format.' },
      { task: 'Extract strings', expected: 'strings -n 8 suspicious.bin', hint: 'Readable strings often reveal C2 domains and file paths.' }
    ]
  },
  {
    id: 'linux-6',
    title: 'Linux: Bash Automation Script',
    category: 'linux',
    difficulty: 'beginner',
    tools: ['bash', 'nano', 'chmod'],
    objective: 'Write a Bash script that automates user creation and logging.',
    scenario: 'You need to onboard 10 new users to a lab server. Instead of running commands manually, write a Bash script that reads usernames from a file and creates them with home directories.',
    steps: [
      { task: 'Create the script file', expected: 'nano create_users.sh', hint: 'Use a text editor to write your script.' },
      { task: 'Make it executable', expected: 'chmod +x create_users.sh', hint: 'Scripts need execute permission to run directly.' }
    ]
  },
  {
    id: 'linux-8',
    title: 'Linux: Package Management Audit',
    category: 'linux',
    difficulty: 'beginner',
    tools: ['bash', 'dpkg', 'apt'],
    objective: 'Identify outdated or suspicious packages installed on the system.',
    scenario: 'Attackers sometimes install backdoored packages or leave malicious tools behind. Audit the installed packages and look for anything unusual.',
    steps: [
      { task: 'List installed packages', expected: 'dpkg -l', hint: 'This shows all packages installed via the package manager.' },
      { task: 'Search for suspicious tools', expected: 'dpkg -l | grep -E "ncat|netcat|nmap|metasploit"', hint: 'Pentesting tools may indicate compromise if unexpectedly installed.' }
    ]
  },
  {
    id: 'linux-11',
    title: 'Linux: Log Rotation & Analysis',
    category: 'linux',
    difficulty: 'beginner',
    tools: ['bash', 'logrotate', 'zcat'],
    objective: 'Analyze compressed rotated logs for evidence of web attacks.',
    scenario: 'The web server logs have been rotated and compressed. Use zcat to search through archived logs without extracting them, looking for SQL injection attempts.',
    steps: [
      { task: 'Search archived logs', expected: 'zcat /var/log/apache2/access.log.*.gz | grep "union"', hint: 'zcat reads compressed files on the fly.' },
      { task: 'Count attack attempts', expected: 'zcat /var/log/apache2/access.log.*.gz | grep -c "union"', hint: 'Count how many times the word "union" appears in archived logs.' }
    ]
  },

  // --- INTERMEDIATE ---
  {
    id: 'linux-2',
    title: 'Permission Escalation Hunt',
    category: 'linux',
    difficulty: 'intermediate',
    tools: ['bash', 'find', 'ls'],
    objective: 'Identify a file with dangerous permissions that could lead to privilege escalation.',
    scenario: 'System administrators often misconfigure file permissions. Your job is to audit the system and find any SUID binaries or world-writable files.',
    steps: [
      { task: 'Find all SUID binaries', expected: 'find / -perm -4000 -type f 2>/dev/null', hint: 'SUID binaries run with the owner\'s privileges.' },
      { task: 'Find world-writable files', expected: 'find / -type f -perm -002 2>/dev/null', hint: 'World-writable files can be modified by any user.' }
    ]
  },
  {
    id: 'linux-3',
    title: 'Log Analysis: Intrusion Detection',
    category: 'linux',
    difficulty: 'intermediate',
    tools: ['bash', 'grep', 'awk'],
    objective: 'Analyze authentication logs to identify a brute-force attack.',
    scenario: 'Someone has been trying to break into the server via SSH. The evidence is in /var/log/auth.log. Find the attacking IP address.',
    steps: [
      { task: 'Count failed login attempts', expected: 'grep "Failed password" /var/log/auth.log', hint: 'Look for lines containing "Failed password".' },
      { task: 'Extract the top attacking IP', expected: 'grep "Failed password" /var/log/auth.log | awk "{print $11}" | sort | uniq -c | sort -nr', hint: 'Extract the IP field and count occurrences.' }
    ]
  },
  {
    id: 'linux-4',
    title: 'Cron Job Backdoor',
    category: 'linux',
    difficulty: 'intermediate',
    tools: ['bash', 'crontab', 'cat'],
    objective: 'Discover a malicious cron job used for persistence.',
    scenario: 'An attacker gained access and established persistence via a cron job. Inspect the system crontab and user crontabs to find the backdoor.',
    steps: [
      { task: 'List system-wide cron jobs', expected: 'cat /etc/crontab', hint: 'System cron jobs are stored in /etc/crontab and /etc/cron.d/' },
      { task: 'List user cron jobs', expected: 'crontab -l', hint: 'Each user can have their own crontab.' }
    ]
  },
  {
    id: 'windows-2',
    title: 'Windows Persistence: Registry Run Keys',
    category: 'windows',
    difficulty: 'intermediate',
    tools: ['powershell', 'reg'],
    objective: 'Find a malicious program set to run at startup via the registry.',
    scenario: 'An attacker added a payload to the Windows registry to maintain persistence across reboots. Inspect the Run and RunOnce keys.',
    steps: [
      { task: 'Check HKLM Run key', expected: 'reg query "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run"', hint: 'Machine-wide startup programs are stored here.' },
      { task: 'Check HKCU Run key', expected: 'reg query "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run"', hint: 'User-specific startup programs are stored here.' }
    ]
  },
  {
    id: 'python-3',
    title: 'Python: Hash Cracker',
    category: 'python',
    difficulty: 'intermediate',
    tools: ['python3', 'hashlib'],
    objective: 'Crack an MD5 hash using a wordlist.',
    scenario: 'You have intercepted an MD5 hash: 5f4dcc3b5aa765d61d8327deb882cf99. Use Python to brute-force it against a wordlist.',
    steps: [
      { task: 'Import hashlib', expected: 'import hashlib', hint: 'hashlib provides MD5, SHA1, SHA256, and more.' },
      { task: 'Hash a test word', expected: 'hashlib.md5(b"password").hexdigest()', hint: 'Compare this output to the target hash.' }
    ]
  },
  {
    id: 'python-4',
    title: 'Python: Web Directory Brute-Forcer',
    category: 'python',
    difficulty: 'intermediate',
    tools: ['python3', 'requests'],
    objective: 'Write a script that discovers hidden directories on a web server.',
    scenario: 'You want to find admin panels, backup files, and hidden folders. Build a simple directory brute-forcer using Python requests.',
    steps: [
      { task: 'Import requests', expected: 'import requests', hint: 'The requests library makes HTTP calls simple.' },
      { task: 'Check a single path', expected: 'requests.get("http://target.com/admin")', hint: 'A 200 status means the path exists.' }
    ]
  },
  {
    id: 'network-2',
    title: 'Wireshark: Capture the Flag',
    category: 'network',
    difficulty: 'intermediate',
    tools: ['wireshark', 'tshark'],
    objective: 'Extract a hidden flag from a PCAP file.',
    scenario: 'A suspicious PCAP file was captured during an incident. Analysts believe an attacker exfiltrated data via DNS queries. Find the flag.',
    steps: [
      { task: 'List DNS queries in the PCAP', expected: 'tshark -r capture.pcap -Y dns', hint: 'Filter the PCAP for DNS traffic only.' },
      { task: 'Extract query names', expected: 'tshark -r capture.pcap -T fields -e dns.qry.name', hint: 'DNS query names may contain encoded data.' }
    ]
  },
  {
    id: 'network-4',
    title: 'ARP Spoofing Lab',
    category: 'network',
    difficulty: 'intermediate',
    tools: ['ettercap', 'arpspoof'],
    objective: 'Perform a man-in-the-middle attack using ARP spoofing.',
    scenario: 'In a controlled lab environment, use ARP spoofing to intercept traffic between a victim and the gateway. This demonstrates how attackers can eavesdrop on local networks.',
    steps: [
      { task: 'Enable IP forwarding', expected: 'echo 1 > /proc/sys/net/ipv4/ip_forward', hint: 'Your machine must forward packets to avoid breaking connectivity.' },
      { task: 'Start ARP spoofing', expected: 'arpspoof -i eth0 -t victim.ip gateway.ip', hint: 'Poison the victim\'s ARP cache to redirect traffic through you.' }
    ]
  },
  {
    id: 'network-5',
    title: 'Firewall Rules Analysis',
    category: 'network',
    difficulty: 'intermediate',
    tools: ['iptables', 'ufw'],
    objective: 'Audit firewall rules and identify overly permissive entries.',
    scenario: 'A server has been configured with iptables rules. Some rules may be too permissive, allowing unauthorized access. Review and identify the risky rules.',
    steps: [
      { task: 'List iptables rules', expected: 'iptables -L -v -n', hint: 'This shows all chains with verbose output and numeric addresses.' },
      { task: 'Identify permissive SSH rule', expected: 'iptables -L | grep ACCEPT', hint: 'Look for rules accepting traffic from any source to sensitive ports.' }
    ]
  },
  {
    id: 'web-3',
    title: 'Web: Command Injection',
    category: 'web',
    difficulty: 'intermediate',
    tools: ['browser', 'burp'],
    objective: 'Execute arbitrary system commands through a vulnerable web application.',
    scenario: 'A web app has a feature that pings a user-supplied IP address. The backend runs a shell command with the input. Can you inject your own commands?',
    steps: [
      { task: 'Test for command injection', expected: '127.0.0.1; whoami', hint: 'The semicolon terminates the ping command and starts a new one.' },
      { task: 'Read the passwd file', expected: '127.0.0.1; cat /etc/passwd', hint: 'If command injection works, you can read sensitive files.' }
    ]
  },
  {
    id: 'web-5',
    title: 'Web: Local File Inclusion',
    category: 'web',
    difficulty: 'intermediate',
    tools: ['browser'],
    objective: 'Read arbitrary files from the server using a file inclusion vulnerability.',
    scenario: 'A web application includes files based on a user-supplied parameter without proper validation. Exploit this to read system files.',
    steps: [
      { task: 'Test for LFI', expected: 'page.php?file=../../../../etc/passwd', hint: 'Directory traversal sequences (../) navigate up the filesystem.' },
      { task: 'Read the hosts file', expected: 'page.php?file=../../../../etc/hosts', hint: 'Try reading other common system files.' }
    ]
  },
  {
    id: 'web-6',
    title: 'Web: JWT Weak Secret',
    category: 'web',
    difficulty: 'intermediate',
    tools: ['jwt_tool', 'hashcat'],
    objective: 'Crack a JWT secret and forge a token with admin privileges.',
    scenario: 'The application uses JWT for authentication but signed the token with a weak secret. Your task is to crack the secret and forge an admin token.',
    steps: [
      { task: 'Crack JWT secret', expected: 'jwt_tool.py token.txt -C -d secrets.txt', hint: 'Use a dictionary attack against the JWT signature.' },
      { task: 'Forge admin token', expected: 'jwt_tool.py token.txt -S hs256 -p secret -I -pc role -pv admin', hint: 'Once you know the secret, forge a token with elevated privileges.' }
    ]
  },
  {
    id: 'crypto-2',
    title: 'Crypto: Hash Identification',
    category: 'crypto',
    difficulty: 'intermediate',
    tools: ['hash-identifier', 'john'],
    objective: 'Identify the type of a given hash and select the correct cracking tool.',
    scenario: 'You found the following hash: 21232f297a57a5a743894a0e4a801fc3. Identify what algorithm produced it and crack it.',
    steps: [
      { task: 'Identify the hash type', expected: 'hash-identifier', hint: 'MD5 hashes are 32 hexadecimal characters.' },
      { task: 'Crack with John', expected: 'john --format=raw-md5 hash.txt', hint: 'Use a wordlist like rockyou.txt for fast cracking.' }
    ]
  },
  {
    id: 'crypto-3',
    title: 'Crypto: XOR Encryption',
    category: 'crypto',
    difficulty: 'intermediate',
    tools: ['python3'],
    objective: 'Decrypt a message encrypted with a single-byte XOR key.',
    scenario: 'A secret message was encrypted using single-byte XOR. Use frequency analysis or brute force to recover the plaintext and the key.',
    steps: [
      { task: 'Brute force XOR key', expected: 'for key in range(256):', hint: 'There are only 256 possible single-byte keys.' },
      { task: 'Decrypt with candidate key', expected: 'bytes([b ^ key for b in ciphertext])', hint: 'XOR the ciphertext with the candidate key.' }
    ]
  },
  {
    id: 'cloud-2',
    title: 'Cloud: IAM Policy Analysis',
    category: 'cloud',
    difficulty: 'intermediate',
    tools: ['awscli', 'prowler'],
    objective: 'Find an overly permissive IAM policy in an AWS account.',
    scenario: 'A developer created an IAM policy with wildcard permissions. Use the AWS CLI to inspect policies and identify the risky one.',
    steps: [
      { task: 'List IAM policies', expected: 'aws iam list-policies --scope Local', hint: 'Customer-managed policies are more likely to contain errors.' },
      { task: 'Check policy document', expected: 'aws iam get-policy-version --policy-arn <arn> --version-id v1', hint: 'Look for Action: * and Resource: * which grant full access.' }
    ]
  },
  {
    id: 'linux-7',
    title: 'Linux: SSH Hardening Audit',
    category: 'linux',
    difficulty: 'intermediate',
    tools: ['bash', 'grep', 'sshd_config'],
    objective: 'Audit the SSH configuration and identify weak security settings.',
    scenario: 'The SSH daemon on this server may be configured insecurely. Review /etc/ssh/sshd_config to find settings that should be hardened, such as root login, password auth, and allowed users.',
    steps: [
      { task: 'Check PermitRootLogin', expected: 'grep PermitRootLogin /etc/ssh/sshd_config', hint: 'Root login should be disabled or set to prohibit-password.' },
      { task: 'Check PasswordAuthentication', expected: 'grep PasswordAuthentication /etc/ssh/sshd_config', hint: 'Key-based auth is preferred over passwords.' }
    ]
  },
  {
    id: 'linux-10',
    title: 'Linux: Systemd Persistence',
    category: 'linux',
    difficulty: 'intermediate',
    tools: ['bash', 'systemctl', 'cat'],
    objective: 'Find a malicious systemd service configured for persistence.',
    scenario: 'An attacker created a systemd service to ensure their payload runs on boot. Inspect the systemd directories to find and analyze the malicious service.',
    steps: [
      { task: 'List all services', expected: 'systemctl list-unit-files --type=service', hint: 'Look for services with unusual names.' },
      { task: 'Inspect a suspicious service', expected: 'cat /etc/systemd/system/suspicious.service', hint: 'Check the ExecStart line to see what command is run.' }
    ]
  },
  {
    id: 'linux-12',
    title: 'Linux: Environment Variable Leak',
    category: 'linux',
    difficulty: 'intermediate',
    tools: ['bash', 'grep', 'procfs'],
    objective: 'Extract sensitive environment variables from running processes.',
    scenario: 'Developers sometimes hardcode API keys in environment variables. On Linux, these can be read from /proc/<pid>/environ if permissions allow. Find a process leaking secrets.',
    steps: [
      { task: 'Find target process PID', expected: 'ps aux | grep webapp', hint: 'Identify the process ID of the running web application.' },
      { task: 'Read process environment', expected: 'cat /proc/<pid>/environ | tr "\\0" "\\n"', hint: 'Environment variables in /proc are null-delimited.' }
    ]
  },

  // --- ADVANCED ---
  {
    id: 'linux-5',
    title: 'Kernel Exploit Research',
    category: 'linux',
    difficulty: 'advanced',
    tools: ['bash', 'uname', 'searchsploit'],
    objective: 'Identify a known kernel vulnerability on the target system.',
    scenario: 'The target is running an outdated Linux kernel. Your task is to find the kernel version and match it against known exploits.',
    steps: [
      { task: 'Check kernel version', expected: 'uname -r', hint: 'This reveals the exact kernel release.' },
      { task: 'Search for kernel exploits', expected: 'searchsploit linux kernel <version>', hint: 'Use SearchSploit to find public exploits for this kernel.' }
    ]
  },
  {
    id: 'windows-3',
    title: 'Windows Service Misconfiguration',
    category: 'windows',
    difficulty: 'advanced',
    tools: ['powershell', 'accesschk'],
    objective: 'Exploit a weak service permission to escalate privileges.',
    scenario: 'A Windows service has weak permissions allowing any user to modify its binary path. Use PowerShell or Sysinternals to find and exploit it.',
    steps: [
      { task: 'List service permissions', expected: 'accesschk.exe -uwcqv *', hint: 'AccessChk from Sysinternals reveals weak service DACLs.' },
      { task: 'Check unquoted service paths', expected: 'wmic service get name,pathname | findstr /v "\""', hint: 'Unquoted paths with spaces can be hijacked.' }
    ]
  },
  {
    id: 'python-5',
    title: 'Python: Keylogger Detection',
    category: 'python',
    difficulty: 'advanced',
    tools: ['python3', 'psutil'],
    objective: 'Write a script that monitors for suspicious keyboard hooking processes.',
    scenario: 'Keyloggers often inject into running processes or create hidden listeners. Use psutil to enumerate processes and flag suspicious names.',
    steps: [
      { task: 'Import psutil', expected: 'import psutil', hint: 'psutil provides cross-platform process monitoring.' },
      { task: 'List all process names', expected: '[p.name() for p in psutil.process_iter()]', hint: 'Iterate over all running processes.' }
    ]
  },
  {
    id: 'network-3',
    title: 'Subnetting Challenge',
    category: 'network',
    difficulty: 'advanced',
    tools: ['ipcalc', 'python3'],
    objective: 'Calculate the network address, broadcast address, and usable host range for a given CIDR.',
    scenario: 'You are designing a secure network segment. The allocated range is 10.20.30.0/26. Determine how many hosts can fit and what the boundaries are.',
    steps: [
      { task: 'Calculate usable hosts', expected: '2^(32-26) - 2', hint: 'A /26 subnet has 64 total addresses. Subtract 2 for network and broadcast.' },
      { task: 'Find the broadcast address', expected: '10.20.30.63', hint: 'The last address in a /26 block is the broadcast address.' }
    ]
  },
  {
    id: 'crypto-4',
    title: 'Crypto: RSA Basics',
    category: 'crypto',
    difficulty: 'advanced',
    tools: ['python3', 'pycryptodome'],
    objective: 'Understand RSA key generation and encrypt/decrypt a message.',
    scenario: 'RSA is the foundation of modern public-key cryptography. Generate a key pair, encrypt a message with the public key, and decrypt it with the private key.',
    steps: [
      { task: 'Generate RSA key pair', expected: 'from Crypto.PublicKey import RSA\nkey = RSA.generate(2048)', hint: 'Use pycryptodome to generate a 2048-bit RSA key.' },
      { task: 'Encrypt a message', expected: 'from Crypto.Cipher import PKCS1_OAEP\ncipher = PKCS1_OAEP.new(key.publickey())', hint: 'Use OAEP padding for secure RSA encryption.' }
    ]
  },
  {
    id: 'forensics-2',
    title: 'Forensics: Memory Dump Analysis',
    category: 'forensics',
    difficulty: 'advanced',
    tools: ['volatility3'],
    objective: 'Identify a malicious process from a Windows memory dump.',
    scenario: 'A compromised workstation was memory-dumped before shutdown. Use Volatility to list processes, network connections, and loaded DLLs to find the malware.',
    steps: [
      { task: 'List processes', expected: 'volatility -f memory.dmp windows.pslist', hint: 'Look for processes with suspicious names or parent-child relationships.' },
      { task: 'List network connections', expected: 'volatility -f memory.dmp windows.netscan', hint: 'Identify processes communicating with external IPs.' }
    ]
  },
  {
    id: 'linux-9',
    title: 'Linux: Container Escape Basics',
    category: 'linux',
    difficulty: 'advanced',
    tools: ['bash', 'id', 'capsh'],
    objective: 'Determine if a Docker container can be escaped to the host.',
    scenario: 'You are inside a Docker container. Assess whether dangerous capabilities, mounted volumes, or privileged mode allow escape to the host system.',
    steps: [
      { task: 'Check for privileged mode', expected: 'id', hint: 'If you are root inside the container, check capabilities.' },
      { task: 'List container capabilities', expected: 'capsh --print', hint: 'CAP_SYS_ADMIN or dangerous caps may allow escape.' }
    ]
  },
  {
    id: 're-2',
    title: 'RE: Disassembly with Ghidra',
    category: 're',
    difficulty: 'advanced',
    tools: ['ghidra'],
    objective: 'Analyze a simple crackme program to find the correct password.',
    scenario: 'A beginner crackme asks for a password. By analyzing the disassembly in Ghidra, you can identify the hardcoded password or the validation logic.',
    steps: [
      { task: 'Import binary into Ghidra', expected: 'File > Import File > crackme', hint: 'Ghidra will auto-analyze the binary.' },
      { task: 'Find main function', expected: 'Search for "main" in the Symbol Tree', hint: 'The main function usually contains the core logic.' }
    ]
  },
];
