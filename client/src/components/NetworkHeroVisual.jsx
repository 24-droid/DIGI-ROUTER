import React, { useState } from 'react';
import { Wifi, Activity, ShieldCheck, AlertTriangle, Radio, Server, Cpu, Database, Signal } from 'lucide-react';

export default function NetworkHeroVisual() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Campus building router nodes matching user reference image
  const nodes = [
    {
      id: 'main-block',
      name: 'Main Block',
      routers: '12 Routers',
      status: 'Healthy',
      statusColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      ringColor: '#10b981',
      x: '26%',
      y: '22%',
      ping: '12ms',
      cpu: '34%',
      temp: '42°C',
    },
    {
      id: 'library',
      name: 'Library AP Mesh',
      routers: '6 Routers',
      status: 'Healthy',
      statusColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      ringColor: '#10b981',
      x: '24%',
      y: '74%',
      ping: '14ms',
      cpu: '28%',
      temp: '39°C',
    },
    {
      id: 'hostel-a',
      name: 'Hostel-A',
      routers: '8 Routers',
      status: 'Warning',
      statusColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      ringColor: '#f59e0b',
      x: '84%',
      y: '28%',
      ping: '86ms',
      cpu: '79%',
      temp: '68°C',
    },
    {
      id: 'hostel-b',
      name: 'Hostel-B',
      routers: '10 Routers',
      status: 'Critical',
      statusColor: 'text-rose-400',
      badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
      ringColor: '#f43f5e',
      x: '86%',
      y: '76%',
      ping: '240ms',
      cpu: '96%',
      temp: '88°C',
    },
  ];

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[590px] rounded-3xl overflow-hidden card-linear border border-cyan-500/30 shadow-2xl group">
      {/* 3D Render Background Image with subtle parallax levitation animation */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_3d_network_topology.jpg"
          alt="3D Campus Network Topology"
          className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-110 transition-transform duration-700 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040608] via-transparent to-[#040608]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      </div>

      {/* Futuristic Scanline Overlay */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none z-10" />

      {/* Top HUD Bar overlay */}
      <div className="relative z-20 p-5 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-950/85 border border-cyan-500/40 text-xs backdrop-blur-md shadow-glow-cyan">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-mono text-cyan-300 font-bold text-[11px] tracking-wider uppercase">
            3D Topology Engine • Real-time Sync
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-950/80 border border-white/10 text-[10px] font-mono text-emerald-400 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>ACTIVE MONITORING</span>
        </div>
      </div>

      {/* Animated SVG Glowing Laser Data Cables Layer */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cyanBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="roseBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
          </linearGradient>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic laser connecting lines connecting center router to nodes */}
        <line x1="50" y1="48" x2="26" y2="28" stroke="url(#cyanBeam)" strokeWidth="0.6" strokeDasharray="1.5,1.5" filter="url(#neonGlow)" />
        <line x1="50" y1="48" x2="24" y2="72" stroke="url(#cyanBeam)" strokeWidth="0.6" strokeDasharray="1.5,1.5" filter="url(#neonGlow)" />
        <line x1="50" y1="48" x2="84" y2="30" stroke="url(#cyanBeam)" strokeWidth="0.6" strokeDasharray="1.5,1.5" filter="url(#neonGlow)" />
        <line x1="50" y1="48" x2="86" y2="74" stroke="url(#roseBeam)" strokeWidth="0.8" strokeDasharray="2,2" filter="url(#neonGlow)" />

        {/* Animated laser pulse particles traveling along line paths */}
        <circle cx="50" cy="48" r="1.5" fill="#06b6d4" filter="url(#neonGlow)">
          <animate attributeName="cx" values="50;26;50" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="cy" values="48;28;48" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="48" r="1.5" fill="#10b981" filter="url(#neonGlow)">
          <animate attributeName="cx" values="50;24;50" dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="cy" values="48;72;48" dur="3.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="48" r="1.5" fill="#f59e0b" filter="url(#neonGlow)">
          <animate attributeName="cx" values="50;84;50" dur="3.1s" repeatCount="indefinite" />
          <animate attributeName="cy" values="48;30;48" dur="3.1s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="48" r="2" fill="#f43f5e" filter="url(#neonGlow)">
          <animate attributeName="cx" values="50;86;50" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="48;74;48" dur="2.2s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Central Router Glowing Ring Target */}
      <div className="absolute top-[48%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-cyan-400/40 animate-ping opacity-40" />
          <div className="absolute w-32 h-32 rounded-full border border-indigo-500/25 animate-radar" />
          <div className="absolute w-12 h-12 rounded-full bg-cyan-500/20 filter blur-md animate-pulse" />
        </div>
      </div>

      {/* Building Node Cards Overlaid in Isometric Coordinates */}
      {nodes.map((node) => {
        const isHovered = hoveredNode === node.id;
        const isSelected = selectedNode === node.id;

        return (
          <div
            key={node.id}
            className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{ top: node.y, left: node.x }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => setSelectedNode(isSelected ? null : node.id)}
          >
            {/* Pulsing Signal Waves above node */}
            <div className="relative flex flex-col items-center">
              {/* Wi-Fi Icon Beacon */}
              <div className={`p-1.5 rounded-full bg-slate-950/90 border border-white/20 shadow-lg ${node.statusColor} mb-1 animate-float`}>
                <Wifi className="w-3.5 h-3.5" />
              </div>

              {/* Node Card Box */}
              <div
                className={`px-3 py-2 rounded-2xl bg-slate-950/90 border backdrop-blur-xl transition-all duration-300 shadow-2xl min-w-[120px] ${
                  node.badgeBg
                } ${isHovered ? 'scale-110 shadow-glow-cyan border-cyan-400' : ''}`}
              >
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="font-bold text-white text-xs tracking-tight">{node.name}</span>
                  <span className={`text-[9px] font-mono font-bold ${node.statusColor}`}>
                    {node.status}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-300 flex items-center justify-between">
                  <span>{node.routers}</span>
                  <span className="text-slate-400">{node.ping}</span>
                </div>
              </div>

              {/* Glowing floor target point */}
              <div className="w-4 h-4 mt-1.5 rounded-full flex items-center justify-center relative">
                <div
                  className="w-full h-full rounded-full animate-ping opacity-60"
                  style={{ backgroundColor: node.ringColor }}
                />
                <div
                  className="absolute w-2 h-2 rounded-full shadow-lg"
                  style={{ backgroundColor: node.ringColor }}
                />
              </div>
            </div>

            {/* Hover Telemetry Detail Tooltip */}
            {(isHovered || isSelected) && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 p-3 rounded-2xl bg-slate-900/95 border border-cyan-400/50 shadow-2xl text-xs w-48 backdrop-blur-2xl z-30 animate-fade-in-up">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2">
                  <span className="font-mono font-bold text-white text-[11px]">{node.name}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${node.badgeBg}`}>
                    {node.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Ping Latency</span>
                    <span className="text-cyan-300 font-semibold">{node.ping}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">CPU Load</span>
                    <span className="text-amber-300 font-semibold">{node.cpu}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Thermal Temp</span>
                    <span className="text-rose-300 font-semibold">{node.temp}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Active Units</span>
                    <span className="text-emerald-300 font-semibold">{node.routers}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom HUD Bar overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 border-t border-white/[0.08] bg-slate-950/80 backdrop-blur-xl flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Server className="w-3.5 h-3.5 text-cyan-400" />
          <span>ROUTER UNITS: <strong className="text-white">60 Operational</strong></span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-emerald-400 font-semibold">
          <Signal className="w-3.5 h-3.5 animate-pulse" />
          <span>3D TELEMETRY MATRIX LIVE</span>
        </div>
      </div>
    </div>
  );
}
