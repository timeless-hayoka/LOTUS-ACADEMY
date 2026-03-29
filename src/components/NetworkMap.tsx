import { useState, useEffect } from 'react';
import { Network, Server, Wifi, Smartphone, Laptop, Lock, Activity, Radio, Zap, FolderOpen, FileDown, X, Compass, MapPin, SignalLow, SignalMedium, SignalHigh, Database } from 'lucide-react';

export default function NetworkMap() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [attackingMac, setAttackingMac] = useState<string | null>(null);
  const [exploringNode, setExploringNode] = useState<any | null>(null);
  const [exfilResults, setExfilResults] = useState<any | null>(null);
  const [gpsData, setGpsData] = useState<any>({});
  const [viewMode, setViewMode] = useState<'topology' | 'gps'>('topology');

  const demoNodes = [
    { id: 'gw', type: 'router', ip: '192.168.10.1', mac: 'GATEWAY-01', name: 'Main Gateway', status: 'secure' },
    { id: 'lap1', type: 'laptop', ip: '192.168.10.15', mac: 'LAPTOP-01', name: 'Dev Workstation', status: 'online' },
    { id: 'phone1', type: 'phone', ip: '192.168.10.22', mac: 'PHONE-01', name: 'Mobile Device', status: 'online' },
    { id: 'srv1', type: 'server', ip: '192.168.10.50', mac: 'SERVER-01', name: 'Lab Server', status: 'warning' }
  ];

  const demoGps = {
    'GATEWAY-01': { rssi: -45, coords: { x: 0, y: 0, dist: 0 } },
    'LAPTOP-01': { rssi: -62, coords: { x: -120, y: 80, dist: 4.2 } },
    'PHONE-01': { rssi: -58, coords: { x: 140, y: -60, dist: 3.8 } },
    'SERVER-01': { rssi: -71, coords: { x: 90, y: 120, dist: 6.5 } }
  };

  const fetchLiveData = async () => {
    try {
      const response = await fetch('http://localhost:8888/live_network_data.json');
      if (response.ok) {
        const data = await response.json();
        setNodes(data);
      } else {
        setNodes(demoNodes);
      }
      
      const exResponse = await fetch('http://localhost:8888/exfil_results.json');
      if (exResponse.ok) setExfilResults(await exResponse.json());

      const gpsResponse = await fetch('http://localhost:8888/live_gps_data.json');
      if (gpsResponse.ok) {
        setGpsData(await gpsResponse.json());
      } else {
        setGpsData(demoGps);
      }

    } catch (e) {
      setNodes(demoNodes);
      setGpsData(demoGps);
    }
  };

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerDeauth = async (mac: string) => {
    setAttackingMac(mac);
    setTimeout(() => setAttackingMac(null), 5000);
  };

  const startExfil = (node: any) => {
    setExploringNode(node);
    setExfilResults(null);
  };

  const getSignalIcon = (mac: string) => {
    const rssi = gpsData[mac]?.rssi || -70;
    if (rssi > -50) return <SignalHigh size={14} className="text-emerald-400" />;
    if (rssi > -75) return <SignalMedium size={14} className="text-orange-400" />;
    return <SignalLow size={14} className="text-red-400" />;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'router': return <Wifi size={32} className="text-emerald-400" />;
      case 'laptop': return <Laptop size={32} className="text-indigo-400" />;
      case 'phone': return <Smartphone size={32} className="text-purple-400" />;
      case 'server': return <Server size={32} className="text-blue-400" />;
      default: return <Radio size={32} className="text-pink-400" />;
    }
  };

  return (
    <div className="p-8 min-h-full bg-[#050505] text-slate-300 font-sans relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px]"></div>

      {attackingMac && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-red-600/20 border border-red-500/50 rounded-full backdrop-blur-xl animate-bounce flex items-center gap-3">
          <Zap className="text-red-500 fill-red-500" size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Sending disconnect signal to: {attackingMac}</span>
        </div>
      )}

      {/* FILE EXPLORER MODAL */}
      {exploringNode && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-12 backdrop-blur-xl bg-black/80 animate-in zoom-in-95 duration-300">
          <div className="bg-[#0a0a0a] w-full max-w-5xl h-[700px] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400"><FolderOpen size={24}/></div>
                <div>
                  <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Remote Explorer</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Node: {exploringNode.name} ({exploringNode.ip})</p>
                </div>
              </div>
              <button onClick={() => setExploringNode(null)} className="p-3 hover:bg-white/5 rounded-2xl transition-all text-slate-500"><X size={24}/></button>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto">
              {exfilResults && exfilResults.ip === exploringNode.ip ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exfilResults.shares.length > 0 ? exfilResults.shares.map((share: any, i: number) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] hover:border-indigo-500/30 transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400"><Database size={18}/></div>
                          <span className="font-bold text-white tracking-wide">{share.name}</span>
                        </div>
                        <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">{share.type}</span>
                      </div>
                      <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2">
                        <FileDown size={14} /> Download Share
                      </button>
                    </div>
                  )) : (
                    <div className="col-span-2 py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                      <Lock size={48} className="mx-auto text-slate-800 mb-4" />
                      <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">No open shares detected.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Activity size={48} className="text-indigo-500 animate-spin mb-6" />
                  <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs">Scanning node filesystem...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]">
                <Network size={32} className="text-indigo-400" />
              </div>
              <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">Live Network Map</h1>
            </div>
            <p className="text-slate-500 text-lg font-medium italic">"Mapping the invisible, capturing the celestial."</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
              <button 
                onClick={() => setViewMode('topology')}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'topology' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                <Activity size={14}/> Topology
              </button>
              <button 
                onClick={() => setViewMode('gps')}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'gps' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                <Compass size={14}/> Signal GPS
              </button>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-400">
              <Activity size={12} className="animate-pulse" /> Link Active
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/[0.01] border border-white/5 rounded-[3rem] p-12 min-h-[650px] relative overflow-hidden backdrop-blur-sm shadow-inner">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none"></div>
            
            {viewMode === 'topology' ? (
              <div className="relative z-10 flex flex-wrap justify-center gap-16 pt-16">
                {nodes.map((node, idx) => (
                  <div key={node.id || idx} className="relative group cursor-crosshair animate-in zoom-in duration-500">
                    <div className={`p-8 rounded-[2rem] border transition-all duration-500 ${
                      attackingMac === node.mac ? 'bg-red-600/40 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.6)] animate-pulse' :
                      exploringNode?.id === node.id ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.4)]' :
                      'bg-white/[0.03] border-white/10 hover:border-indigo-500/50'
                    }`}>
                      <div className="flex flex-col items-center gap-5">
                        <div className="relative">
                          {getIcon(node.type)}
                          <div className="absolute -bottom-2 -right-2">
                            {getSignalIcon(node.mac)}
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-white text-sm tracking-tight">{node.name}</p>
                          <p className="text-[10px] font-mono text-indigo-400/60 mt-1">{node.ip}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-72 bg-[#0a0a0a] border border-white/10 p-6 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 shadow-2xl scale-95 group-hover:scale-100 translate-y-2 group-hover:translate-y-0">
                      <div className="space-y-3">
                        <div className="flex justify-between border-b border-white/5 pb-2 text-[9px] font-black uppercase text-slate-600 tracking-widest">
                          <span>RSSI Signal</span>
                          <span className="text-indigo-400">{gpsData[node.mac]?.rssi || -70} dBm</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <button onClick={() => triggerDeauth(node.mac)} className="py-3 bg-red-600/20 border border-red-500/30 hover:bg-red-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"><Zap size={12}/> Kick</button>
                          <button onClick={() => startExfil(node)} className="py-3 bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"><FolderOpen size={12}/> Explore</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* SIGNAL GPS PLANE */
              <div className="relative w-full h-[550px] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[100px] h-[100px] border border-white/10 rounded-full animate-ping opacity-20"></div>
                  <div className="w-[250px] h-[250px] border border-white/5 rounded-full opacity-40"></div>
                  <div className="w-[450px] h-[450px] border border-white/5 rounded-full opacity-20"></div>
                </div>
                
                <div className="relative p-6 bg-indigo-500/20 border border-indigo-500/40 rounded-3xl z-20">
                  <Server className="text-indigo-400" size={40} />
                  <p className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[9px] font-black uppercase text-white tracking-[0.3em]">Gateway</p>
                </div>

                {nodes.filter(n => n.mac !== 'FLIPPER-AP').map((node, i) => {
                  const gps = gpsData[node.mac];
                  const x = gps?.coords?.x || (i * 100 - 150);
                  const y = gps?.coords?.y || (i * 100 - 150);
                  return (
                    <div 
                      key={node.mac} 
                      className="absolute transition-all duration-1000 ease-out flex flex-col items-center group"
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      <MapPin className="text-pink-500 group-hover:scale-125 transition-transform drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" size={24} />
                      <div className="bg-black/80 border border-white/10 px-3 py-1.5 rounded-lg mt-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <p className="text-[10px] font-black text-white">{node.name}</p>
                        <p className="text-[8px] font-mono text-slate-500">{gps?.coords?.dist}m from Probe</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-3 mb-8">
                <Compass className="text-indigo-500" size={18} /> Signal Telemetry
              </h3>
              <div className="space-y-4">
                {nodes.map((node, idx) => (
                  <div key={idx} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">{node.name}</p>
                      <p className="text-[9px] text-slate-600 font-bold uppercase mt-1">Dist: {gpsData[node.mac]?.coords?.dist || '??'}m</p>
                    </div>
                    <div className="text-right">
                      {getSignalIcon(node.mac)}
                      <p className="text-[9px] font-mono text-indigo-400 mt-1">{gpsData[node.mac]?.rssi || -70} dBm</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
