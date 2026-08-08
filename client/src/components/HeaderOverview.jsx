import React from 'react';
import { Wifi, AlertTriangle, ShieldCheck, Activity, MessageSquare, Server, ChevronRight, Radio } from 'lucide-react';
import CsvUploadSection from './CsvUploadSection';

export default function HeaderOverview({ overview, loading }) {
  if (loading || !overview) {
    return (
      <div className="w-full mb-4 animate-pulse space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="space-y-2">
            <div className="h-4 bg-slate-800/60 rounded-lg w-48"></div>
            <div className="h-8 bg-slate-800/60 rounded-xl w-72"></div>
          </div>
          <div className="h-12 bg-slate-800/60 rounded-2xl w-36"></div>
        </div>
        <div className="h-20 bg-slate-800/40 rounded-2xl"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-800/40 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const {
    totalRouters = 0,
    criticalCount = 0,
    warningCount = 0,
    healthyCount = 0,
    avgHealthScore = 0,
    totalComplaints = 0
  } = overview;

  const scoreColor = avgHealthScore >= 75 ? '#10b981' : avgHealthScore >= 50 ? '#f59e0b' : '#f43f5e';

  const kpiCards = [
    {
      label: 'Total Inventory',
      value: totalRouters,
      sub: '10,000 Total Issued',
      icon: Server,
      accent: 'cyan',
      border: 'border-cyan-500/20',
      glow: 'hover:shadow-glow-cyan',
      iconColor: 'text-cyan-400',
      valueColor: 'text-white',
      subColor: 'text-slate-500',
    },
    {
      label: 'Critical Fleet',
      value: criticalCount,
      sub: 'Requires Immediate Action',
      icon: AlertTriangle,
      accent: 'rose',
      border: 'border-rose-500/25',
      glow: 'hover:shadow-glow-rose',
      iconColor: 'text-rose-400',
      valueColor: 'text-rose-400',
      subColor: 'text-rose-400/70',
      bg: 'bg-rose-950/20',
      iconAnimate: 'animate-bounce',
    },
    {
      label: 'Warning State',
      value: warningCount,
      sub: 'Sustained Drops',
      icon: Activity,
      accent: 'amber',
      border: 'border-amber-500/25',
      glow: '',
      iconColor: 'text-amber-400',
      valueColor: 'text-amber-400',
      subColor: 'text-amber-400/70',
      bg: 'bg-amber-950/20',
    },
    {
      label: 'Healthy Fleet',
      value: healthyCount,
      sub: 'Optimal Baseline',
      icon: ShieldCheck,
      accent: 'emerald',
      border: 'border-emerald-500/25',
      glow: '',
      iconColor: 'text-emerald-400',
      valueColor: 'text-emerald-400',
      subColor: 'text-emerald-400/70',
      bg: 'bg-emerald-950/20',
    },
    {
      label: 'Helpdesk Tickets',
      value: totalComplaints,
      sub: 'Linked Complaint Logs',
      icon: MessageSquare,
      accent: 'indigo',
      border: 'border-indigo-500/25',
      glow: 'hover:shadow-glow-indigo',
      iconColor: 'text-indigo-400',
      valueColor: 'text-indigo-300',
      subColor: 'text-indigo-400/70',
      bg: 'bg-indigo-950/20',
      colSpan: 'col-span-2 sm:col-span-1',
    },
  ];

  return (
    <header className="mb-4 lg:mb-5 space-y-4 animate-fade-in-up">
      {/* Top Navbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/25 via-slate-900 to-indigo-600/25 border border-cyan-500/30 text-cyan-300 shadow-glow-cyan animate-float">
              <Wifi className="w-6 h-6" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-dark-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1">
              <span>DigiPlus Hackathon</span>
              <ChevronRight className="w-3 h-3 text-slate-700" />
              <span className="text-slate-400">Campus Infrastructure</span>
              <ChevronRight className="w-3 h-3 text-slate-700" />
              <span className="text-cyan-400 font-semibold font-mono">Q1 Solution</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gradient leading-tight">
              Campus Router Health 360
            </h1>
          </div>
        </div>

        {/* Live Beacon + Fleet Index */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-3.5 py-2 rounded-2xl bg-dark-900/80 border border-white/[0.07] text-xs flex items-center gap-2.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <Radio className="w-3 h-3 text-emerald-400" />
            <span className="text-slate-300 font-semibold tracking-wide">Live Telemetry</span>
          </div>

          <div className="card-linear px-4 py-2.5 flex items-center gap-4 !border-cyan-500/25 animate-glow-pulse">
            <div className="text-right">
              <span className="section-label text-slate-500 block mb-0.5">Fleet Index</span>
              <span className="text-2xl font-black font-mono text-gradient-cyan">{avgHealthScore}<span className="text-slate-600 text-sm font-normal">/100</span></span>
            </div>
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold font-mono text-white relative"
              style={{
                background: `conic-gradient(${scoreColor} ${avgHealthScore * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
              }}
            >
              <div className="absolute inset-[3px] rounded-full bg-dark-950 flex items-center justify-center">
                <span style={{ color: scoreColor }}>{avgHealthScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CsvUploadSection />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 stagger-children">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`card-linear stat-card p-4 ${card.bg || ''} ${card.border} ${card.glow} ${card.colSpan || ''} group cursor-default`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`section-label ${card.iconColor} opacity-80`}>{card.label}</span>
                <div className={`p-1.5 rounded-lg bg-white/[0.04] ${card.iconColor} ${card.iconAnimate || ''}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${card.valueColor} tracking-tight`}>
                {card.value}
              </div>
              <div className={`text-[11px] mt-1.5 font-medium ${card.subColor}`}>{card.sub}</div>
            </div>
          );
        })}
      </div>
    </header>
  );
}
