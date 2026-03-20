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
  }
];
