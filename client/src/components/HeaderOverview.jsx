import React from 'react';
import { Wifi, AlertTriangle, ShieldCheck, Activity, MessageSquare, Cpu, Sparkles, Zap, Server, ChevronRight } from 'lucide-react';

export default function HeaderOverview({ overview, loading }) {
  if (loading || !overview) {
    return (
      <div className="w-full card-linear p-6 mb-6 animate-pulse flex items-center justify-between">
        <div className="h-8 bg-slate-800/60 rounded-xl w-1/3"></div>
        <div className="h-8 bg-slate-800/60 rounded-xl w-1/4"></div>
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

  return (
    <header className="mb-6 space-y-6">
      {/* Top Navbar / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-400 shadow-md">
            <Wifi className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span>DigiPlus Hackathon</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-slate-200">Campus Infrastructure</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-cyan-400 font-semibold font-mono">Q1 Solution</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent mt-0.5">
              Campus Router Health 360
            </h1>
          </div>
        </div>

        {/* Live Stream Beacon & Campus Score Pill */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">Live Telemetry Ingestion</span>
          </div>

          <div className="card-linear px-4 py-2 flex items-center gap-3 border-cyan-500/30">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Fleet Index</span>
              <span className="text-xl font-black font-mono text-cyan-300">{avgHealthScore}<span className="text-slate-500 text-xs">/100</span></span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 flex items-center justify-center text-xs font-bold font-mono text-cyan-300 bg-slate-950">
              {avgHealthScore}%
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total Deployed */}
        <div className="card-linear p-4 hover:border-slate-700">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Inventory</span>
            <Server className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">{totalRouters}</div>
          <div className="text-[11px] text-slate-400 mt-1">10,000 Total Issued</div>
        </div>

        {/* Critical Fleet */}
        <div className="card-linear p-4 border-rose-900/30 bg-rose-950/10 hover:border-rose-500/40">
          <div className="flex items-center justify-between text-rose-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">Critical Fleet</span>
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400">{criticalCount}</div>
          <div className="text-[11px] text-rose-400/80 mt-1 font-medium">Requires Immediate Action</div>
        </div>

        {/* Warning Fleet */}
        <div className="card-linear p-4 border-amber-900/30 bg-amber-950/10 hover:border-amber-500/40">
          <div className="flex items-center justify-between text-amber-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Warning State</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">{warningCount}</div>
          <div className="text-[11px] text-amber-400/80 mt-1 font-medium">Sustained Drops</div>
        </div>

        {/* Healthy Fleet */}
        <div className="card-linear p-4 border-emerald-900/30 bg-emerald-950/10 hover:border-emerald-500/40">
          <div className="flex items-center justify-between text-emerald-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Healthy Fleet</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">{healthyCount}</div>
          <div className="text-[11px] text-emerald-400/80 mt-1 font-medium">Optimal Baseline</div>
        </div>

        {/* User Complaints */}
        <div className="card-linear p-4 border-indigo-900/30 bg-indigo-950/10 hover:border-indigo-500/40 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-indigo-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Helpdesk Tickets</span>
            <MessageSquare className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-300">{totalComplaints}</div>
          <div className="text-[11px] text-indigo-400/80 mt-1 font-medium">Linked Complaint Logs</div>
        </div>
      </div>
    </header>
  );
}
