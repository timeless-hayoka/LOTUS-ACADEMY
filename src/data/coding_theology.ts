export interface Lesson {
  id: string;
  title: string;
  category: 'syntax' | 'theology' | 'logic' | 'architecture';
  description: string;
  content: string;
  examples: { code: string; explanation: string }[];
}

export const codingTheology: Lesson[] = [
  {
    id: 'variables',
    title: 'The Divine Vessel: Variables',
    category: 'theology',
    description: 'How a computer names and remembers the fragments of its universe.',
    content: 'In the theology of code, a variable is not just a container; it is a declaration of existence. To name a variable is to carve out a piece of the machine\'s memory and assign it a purpose. Without variables, a program would have no past and no future—it would only exist in the immediate moment of a calculation.',
    examples: [
      {
        code: 'target_ip = "192.168.1.100"\nattempts = 0',
        explanation: 'We have birthed two concepts: an address to watch and a counter for our persistence.'
      }
    ]
  },
  {
    id: 'brackets',
    title: 'The Sacred Boundaries: Brackets & Braces',
    category: 'syntax',
    description: 'Demystifying (), [], and {}—the walls that define your logic.',
    content: 'Brackets are the physical walls of your code\'s architecture. \n\n1. () Parentheses: Used for "Action" (functions) or grouping math. \n2. [] Square Brackets: Used for "Lists" or collections of things. \n3. {} Curly Braces: Used for "Scope" (defining a block of code) or "Dictionaries" (key-value pairs).',
    examples: [
      {
        code: 'def scan(ip):  # () defines the input for the action\n    ports = [80, 443]  # [] defines the collection of ports\n    config = {"mode": "stealth"}  # {} defines the properties',
        explanation: 'Each bracket type serves a distinct spiritual purpose in the hierarchy of the script.'
      }
    ]
  },
  {
    id: 'loops',
    title: 'The Eternal Return: Loops',
    category: 'logic',
    description: 'Mastering iteration—the heartbeat of automation.',
    content: 'A loop is the machine\'s ability to perform a ritual repeatedly until a specific condition is met. It is the core of all automation. Whether you are scanning 65,535 ports or checking a million passwords, the loop is the engine that never tires.',
    examples: [
      {
        code: 'for port in range(1, 1025):\n    check_port(port)',
        explanation: 'The machine will repeat the "check_port" ritual 1,024 times without a single complaint.'
      }
    ]
  },
  {
    id: 'semicolon',
    title: 'The Great Divider: Semicolons',
    category: 'syntax',
    description: 'Why some languages demand a ; and others do not.',
    content: 'The semicolon ; is like a period at the end of a sentence. It tells the computer: "This instruction is finished. Prepare for the next one." In languages like C++, Java, and JavaScript, it is a strict requirement. In Python, the machine uses "white space" (indentation) to understand where thoughts end.',
    examples: [
      {
        code: 'let x = 10; console.log(x); // JavaScript\nx = 10\nprint(x) # Python',
        explanation: 'Note how JavaScript uses the divider, while Python breathes through its indentation.'
      }
    ]
  },
  {
    id: 'functions',
    title: 'The Alchemist\'s Spell: Functions',
    category: 'architecture',
    description: 'Packaging logic into reusable incantations.',
    content: 'A function is a reusable piece of code that performs a specific task. Think of it as a magical spell. You define the components of the spell once, and then you can "cast" it anywhere in your program by simply calling its name.',
    examples: [
      {
        code: 'def fire_firewall_rule(ip):\n    print(f"Blocking {ip}...")\n\nfire_firewall_rule("10.0.0.5")',
        explanation: 'We defined the "fire_firewall_rule" spell and cast it upon a specific intruder.'
      }
    ]
  },
  {
    id: 'conditionals',
    title: 'The Crossroads: Conditionals',
    category: 'logic',
    description: 'Teaching the machine to make decisions based on truth.',
    content: 'Conditionals are the crossroads of your program. They allow the machine to evaluate a statement and choose a path. If the condition is true, one block of code runs. If false, another may run instead. This is how programs adapt to different inputs and situations.',
    examples: [
      {
        code: 'if password == "secret":\n    print("Access granted")\nelse:\n    print("Access denied")',
        explanation: 'The program evaluates the password and chooses between two possible futures.'
      }
    ]
  },
  {
    id: 'datatypes',
    title: 'The Elements: Data Types',
    category: 'theology',
    description: 'Understanding the fundamental building blocks of information.',
    content: 'Every piece of data in a program has a type. Strings hold text. Integers and floats hold numbers. Booleans hold truth values (True or False). Lists hold collections. Dictionaries hold mappings. Understanding these types is essential because operations behave differently depending on the type. You cannot divide a string by a number, but you can concatenate two strings.',
    examples: [
      {
        code: 'name = "Alice"        # String\nage = 25              # Integer\npi = 3.14159          # Float\nis_admin = False      # Boolean\nports = [22, 80, 443] # List',
        explanation: 'Each variable here holds a different kind of information, and the machine treats each one differently.'
      }
    ]
  },
  {
    id: 'apis',
    title: 'The Messenger: APIs',
    category: 'architecture',
    description: 'How applications talk to each other across the digital realm.',
    content: 'An API (Application Programming Interface) is a contract between two pieces of software. It defines how one program can request data or services from another. Web APIs typically use HTTP and return JSON data. When you write a script that fetches weather data or interacts with a cloud service, you are speaking through an API.',
    examples: [
      {
        code: 'import requests\nresponse = requests.get("https://api.example.com/data")\nprint(response.json())',
        explanation: 'This Python script sends an HTTP GET request to an API and prints the JSON response.'
      }
    ]
  },
  {
    id: 'recursion',
    title: 'The Mirror Within: Recursion',
    category: 'logic',
    description: 'A function that calls itself to solve smaller versions of the same problem.',
    content: 'Recursion is a function that invokes itself. Every recursive solution needs a base case (when to stop) and a recursive case (when to call itself again). It is elegant for problems that can be broken into identical sub-problems, like traversing directories or calculating factorials.',
    examples: [
      {
        code: 'def factorial(n):\n    if n == 1:\n        return 1\n    return n * factorial(n - 1)',
        explanation: 'The factorial function calls itself with a smaller number until it reaches the base case of 1.'
      }
    ]
  },
  {
    id: 'oop',
    title: 'The Blueprint: Object-Oriented Programming',
    category: 'architecture',
    description: 'Organizing code into objects that combine data and behavior.',
    content: 'Object-Oriented Programming (OOP) models code after real-world entities. A class is a blueprint. An object is an instance of that blueprint. The four pillars of OOP are Encapsulation (hiding internal details), Inheritance (reusing code through parent classes), Polymorphism (treating different objects through a common interface), and Abstraction (simplifying complex systems).',
    examples: [
      {
        code: 'class Firewall:\n    def __init__(self, name):\n        self.name = name\n    def block(self, ip):\n        print(f"{self.name} blocked {ip}")\n\nfw = Firewall("Perimeter")\nfw.block("10.0.0.5")',
        explanation: 'We defined a Firewall class, created an instance, and called its block method.'
      }
    ]
  },
  {
    id: 'errors',
    title: 'The Safety Net: Error Handling',
    category: 'logic',
    description: 'Gracefully recovering from the unexpected.',
    content: 'Programs will encounter errors. Networks fail. Files go missing. Users enter garbage. Error handling is the practice of anticipating these failures and responding gracefully instead of crashing. Try-catch blocks (or try-except in Python) wrap risky code and define what to do when things go wrong.',
    examples: [
      {
        code: 'try:\n    with open("config.txt") as f:\n        data = f.read()\nexcept FileNotFoundError:\n    print("Config file missing!")',
        explanation: 'If the file does not exist, the program catches the error and prints a message instead of crashing.'
      }
    ]
  },
  {
    id: 'databases',
    title: 'The Archive: Databases & SQL',
    category: 'architecture',
    description: 'Storing, querying, and protecting structured data.',
    content: 'Databases are the vaults of the digital world. Relational databases use tables, rows, and columns, and are queried with SQL. NoSQL databases use documents, key-value pairs, or graphs. Understanding how to write efficient queries, design schemas, and prevent SQL injection is essential for any developer or security professional.',
    examples: [
      {
        code: 'SELECT username, email FROM users WHERE active = 1;',
        explanation: 'This SQL query retrieves the username and email of all active users.'
      }
    ]
  },
  {
    id: 'regex',
    title: 'The Pattern Seeker: Regular Expressions',
    category: 'syntax',
    description: 'Describing text patterns with precision and power.',
    content: 'Regular expressions are a language for describing patterns in text. They are used for validation, search, and extraction. A regex like \\d{3}-\\d{2}-\\d{4} matches a Social Security number format. While incredibly powerful, regex can be difficult to read and vulnerable to ReDoS if written poorly. Always test your patterns.',
    examples: [
      {
        code: 'import re\nmatch = re.search(r"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b", text)',
        explanation: 'This regex searches for an IPv4 address within a larger string.'
      }
    ]
  },
  {
    id: 'http',
    title: 'The Web Protocol: HTTP & HTTPS',
    category: 'architecture',
    description: 'Understanding the foundation of the World Wide Web.',
    content: 'HTTP is the protocol that powers the web. A client sends a request (GET, POST, PUT, DELETE) and a server returns a response with a status code (200 OK, 404 Not Found, 500 Internal Server Error). HTTPS adds TLS/SSL encryption to protect data in transit. Understanding headers, cookies, sessions, and CORS is essential for web development and security testing.',
    examples: [
      {
        code: 'GET /index.html HTTP/1.1\nHost: example.com\nUser-Agent: Mozilla/5.0',
        explanation: 'This is a raw HTTP GET request asking for the index.html page.'
      }
    ]
  },
  {
    id: 'algorithms',
    title: 'The Efficiency Engine: Algorithms & Big O',
    category: 'logic',
    description: 'Measuring how code scales as data grows.',
    content: 'An algorithm is a step-by-step procedure for solving a problem. Big O notation describes how runtime or memory usage grows relative to input size. O(1) means constant time regardless of input. O(n) means linear growth. O(n²) means quadratic growth. Choosing the right algorithm can mean the difference between instant results and hours of waiting.',
    examples: [
      {
        code: '# O(n) - linear search\nfor item in items:\n    if item == target:\n        return item\n\n# O(1) - dictionary lookup\nitems_dict[target]',
        explanation: 'Dictionary lookups are O(1) because hash maps bypass the need to scan every item.'
      }
    ]
  },
  {
    id: 'datastructures',
    title: 'The Scaffolding: Data Structures',
    category: 'architecture',
    description: 'Choosing the right container for your data.',
    content: 'Data structures are specialized formats for organizing and storing data. Arrays provide fast index access. Linked Lists allow efficient insertion. Stacks follow Last-In-First-Out (LIFO). Queues follow First-In-First-Out (FIFO). Trees model hierarchical data. Graphs model networks. Hash Maps provide near-instant lookups. The right structure makes algorithms efficient.',
    examples: [
      {
        code: 'queue = []\nqueue.append("task1")  # enqueue\nqueue.pop(0)           # dequeue\n\nstack = []\nstack.append("task1")  # push\nstack.pop()            # pop',
        explanation: 'Queues process items in order; stacks process the most recent item first.'
      }
    ]
  },
  {
    id: 'concurrency',
    title: 'The Multitude: Concurrency',
    category: 'architecture',
    description: 'Running multiple tasks at the same time.',
    content: 'Concurrency allows programs to perform multiple operations simultaneously. Threads share memory and run within the same process. Processes are isolated and communicate via inter-process communication. Async/await enables cooperative multitasking without the overhead of threads. Concurrency is powerful but introduces challenges like race conditions and deadlocks.',
    examples: [
      {
        code: 'import asyncio\n\nasync def fetch(url):\n    await asyncio.sleep(1)\n    return f"Data from {url}"\n\nasyncio.run(fetch("http://api.com"))',
        explanation: 'Async functions can pause and resume, allowing other tasks to run during the wait.'
      }
    ]
  },
  {
    id: 'testing',
    title: 'The Proof: Testing & TDD',
    category: 'logic',
    description: 'Ensuring code works as intended through automated verification.',
    content: 'Testing is the practice of verifying that code behaves correctly. Unit tests check individual functions. Integration tests check how components work together. End-to-end tests simulate real user journeys. Test-Driven Development (TDD) means writing tests before writing the code itself, forcing you to define requirements and edge cases upfront.',
    examples: [
      {
        code: 'def add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n    assert add(-1, 1) == 0',
        explanation: 'These assertions verify that the add function returns correct results.'
      }
    ]
  },
  {
    id: 'securitycode',
    title: 'The Shield: Security in Code',
    category: 'architecture',
    description: 'Building software that resists adversarial pressure.',
    content: 'Secure coding is the practice of writing software that protects itself against attacks. Key principles include: never trust user input, use parameterized queries, encode output to prevent XSS, validate all data, implement proper authentication, use strong cryptography, and keep dependencies updated. Security is a quality of the code, not a feature added at the end.',
    examples: [
      {
        code: "# INSECURE\nquery = f\"SELECT * FROM users WHERE name = '{user_input}'\"\n\n# SECURE\ncursor.execute(\"SELECT * FROM users WHERE name = ?\", (user_input,))",
        explanation: 'Parameterized queries prevent attackers from injecting malicious SQL.'
      }
    ]
  },
  {
    id: 'devops',
    title: 'The Pipeline: DevOps Basics',
    category: 'architecture',
    description: 'Bridging development and operations through automation.',
    content: 'DevOps is a culture and set of practices that unify software development and IT operations. Continuous Integration (CI) automatically builds and tests code on every commit. Continuous Deployment (CD) automatically releases passing code to production. Infrastructure as Code (IaC) uses tools like Terraform and Ansible to manage servers declaratively.',
    examples: [
      {
        code: 'name: CI Pipeline\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm install\n      - run: npm test',
        explanation: 'This GitHub Actions workflow runs tests automatically on every push.'
      }
    ]
  },
  {
    id: 'clouddev',
    title: 'The Sky: Cloud Computing',
    category: 'architecture',
    description: 'Building scalable applications on shared infrastructure.',
    content: 'Cloud computing delivers computing services over the internet. Key models are IaaS (Infrastructure as a Service), PaaS (Platform as a Service), and SaaS (Software as a Service). Major providers include AWS, Azure, and Google Cloud. Cloud-native development uses microservices, containers, serverless functions, and managed databases to build resilient, scalable systems.',
    examples: [
      {
        code: 'aws s3 cp myfile.txt s3://my-bucket/',
        explanation: 'This AWS CLI command uploads a file to an S3 object storage bucket.'
      }
    ]
  },
  {
    id: 'mlintro',
    title: 'The Learner: Machine Learning Intro',
    category: 'theology',
    description: 'Teaching machines to recognize patterns and make predictions.',
    content: 'Machine Learning is a subset of artificial intelligence where systems learn from data rather than being explicitly programmed. Supervised learning uses labeled data to make predictions. Unsupervised learning finds hidden patterns. Reinforcement learning learns through trial and error. Understanding ML basics helps you build smarter tools and recognize AI-generated threats like deepfakes.',
    examples: [
      {
        code: 'from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)',
        explanation: 'This trains a simple classifier on training data and makes predictions on test data.'
      }
    ]
  },
  {
    id: 'blockchain',
    title: 'The Chain: Blockchain Basics',
    category: 'architecture',
    description: 'Distributed ledgers and the technology behind cryptocurrencies.',
    content: 'A blockchain is a distributed, immutable ledger maintained by a network of nodes. Each block contains a list of transactions and a cryptographic hash of the previous block, forming a chain. Smart contracts are self-executing programs deployed on blockchains like Ethereum. While blockchain enables decentralization, it also introduces unique security challenges around key management and smart contract vulnerabilities.',
    examples: [
      {
        code: 'function store(uint256 num) public {\n    number = num;\n}',
        explanation: 'This simple Solidity smart contract stores a number on the Ethereum blockchain.'
      }
    ]
  },
  {
    id: 'ethics',
    title: 'The Conscience: Ethics in Technology',
    category: 'theology',
    description: 'Understanding the moral weight of what we build.',
    content: 'Technology is not neutral. Algorithms can be biased. Data collection can violate privacy. Automation can displace workers. As technologists, we have a responsibility to consider the societal impact of our creations. Ethical hacking, privacy-by-design, accessibility, and environmental sustainability are not optional extras — they are core obligations for anyone who shapes the digital world.',
    examples: [
      {
        code: '# Before scraping data, ask:\n# 1. Do I have permission?\n# 2. Is this data private?\n# 3. Could this harm someone?',
        explanation: 'These questions form a simple ethical checklist before any data collection task.'
      }
    ]
  }
];
