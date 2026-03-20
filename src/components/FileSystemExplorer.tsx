import { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  description: string;
  children?: FileNode[];
}

const linuxTree: FileNode = {
  name: '/',
  type: 'folder',
  description: 'The Root directory. Everything in Linux starts here.',
  children: [
    {
      name: 'bin',
      type: 'folder',
      description: 'Essential command binaries (programs) like ls, cp, and cd.',
    },
    {
      name: 'etc',
      type: 'folder',
      description: 'Host-specific system-wide configuration files.',
      children: [
        { name: 'passwd', type: 'file', description: 'User account information.' },
        { name: 'shadow', type: 'file', description: 'Secure user account information (passwords).' },
      ]
    },
    {
      name: 'home',
      type: 'folder',
      description: 'User home directories.',
      children: [
        { 
          name: 'lotus', 
          type: 'folder', 
          description: 'Your personal folder.',
          children: [
            { name: 'documents', type: 'folder', description: 'Personal docs.' },
            { name: 'labs', type: 'folder', description: 'Cyber lab files.' },
          ]
        }
      ]
    },
    {
      name: 'root',
      type: 'folder',
      description: 'Home directory for the root (super) user.',
    },
    {
      name: 'var',
      type: 'folder',
      description: 'Variable data files like logs.',
      children: [
        { name: 'log', type: 'folder', description: 'System log files.' }
      ]
    }
  ]
};

const windowsTree: FileNode = {
  name: 'C:',
  type: 'folder',
  description: 'The primary hard drive partition.',
  children: [
    {
      name: 'Windows',
      type: 'folder',
      description: 'The operating system files.',
      children: [
        { name: 'System32', type: 'folder', description: 'Critical system binaries and libraries.' }
      ]
    },
    {
      name: 'Users',
      type: 'folder',
      description: 'User profile directories.',
      children: [
        { 
          name: 'Lotus', 
          type: 'folder', 
          description: 'Your user profile.',
          children: [
            { name: 'Desktop', type: 'folder', description: 'Files on your desktop.' },
            { name: 'Downloads', type: 'folder', description: 'Downloaded files.' }
          ]
        }
      ]
    },
    {
      name: 'Program Files',
      type: 'folder',
      description: 'Where 64-bit applications are installed.',
    }
  ]
};

function TreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth === 0);
  const [isHovered, setIsHovered] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-2 p-1.5 rounded-lg cursor-pointer transition-colors ${
          isHovered ? 'bg-indigo-50' : ''
        }`}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ paddingLeft: `${depth * 1.5 + 0.5}rem` }}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />
        ) : (
          <div className="w-3.5" />
        )}
        
        {node.type === 'folder' ? (
          <Folder size={16} className={`${isOpen ? 'text-indigo-500' : 'text-slate-400'}`} />
        ) : (
          <File size={16} className="text-slate-300" />
        )}
        
        <span className={`text-sm font-medium ${node.type === 'folder' ? 'text-slate-700' : 'text-slate-500'}`}>
          {node.name}
        </span>

        {isHovered && (
          <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded ml-auto animate-in fade-in slide-in-from-left-1">
            {node.description}
          </span>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="border-l border-slate-100 ml-[0.7rem]">
          {node.children!.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileSystemExplorer({ os }: { os: 'linux' | 'windows' }) {
  const tree = os === 'linux' ? linuxTree : windowsTree;

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
        <Folder size={24} className="text-indigo-500" />
        Interactive {os === 'linux' ? 'Filesystem' : 'Explorer'}
      </h3>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-100 pr-2">
        <TreeNode node={tree} />
      </div>
      <div className="mt-6 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
        <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest mb-1">Expert Insight</p>
        <p className="text-xs text-slate-600 leading-relaxed italic">
          Hover over any folder or file to reveal its "Theology"—the reason why the machine keeps it in that specific place.
        </p>
      </div>
    </div>
  );
}
